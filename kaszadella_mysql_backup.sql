-- 🏠 KASZADELLA MYSQL BACKUP - HOSTINGER DEPLOYMENT
-- Létrehozás dátuma: 2025-01-12
-- Kompatibilitás: MySQL 8.0+ (Hostinger)

-- ⚠️ FIGYELEM: Futtatás előtt cPanel-ben:
-- 1. Hozz létre adatbázist: kaszadella_prod
-- 2. Hozz létre felhasználót: kaszadella_user
-- 3. Adj teljes jogosultságot a user-nek

-- 📊 TÁBLÁK LÉTREHOZÁSA

-- 1. FELHASZNÁLÓK TÁBLA
CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(36) PRIMARY KEY,
  `full_name` VARCHAR(255) NOT NULL,
  `email` TEXT NOT NULL,
  `password` TEXT NOT NULL,
  `status` ENUM('Pending', 'Approved', 'Customer') DEFAULT 'Pending',
  `role` ENUM('USER', 'ADMIN') DEFAULT 'USER',
  `package_id` TEXT NOT NULL,
  `last_activity_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `subscription_start` DATETIME,
  `subscription_end` DATETIME
);

-- 2. HETI TIPPEK TÁBLA
CREATE TABLE IF NOT EXISTS `weeklyTips` (
  `id` VARCHAR(36) PRIMARY KEY,
  `package` ENUM('START', 'KASZA', 'KASZADELLA') NOT NULL,
  `day` ENUM('Hétfő', 'Kedd', 'Szerda', 'CSütörtök', 'Péntek', 'Szombat', 'Vasárnap') NOT NULL,
  `tip` TEXT NOT NULL,
  `total_odds` DECIMAL(10,2)
);

-- 3. ELFELEJTETT JELSZÓ TOKENEK
CREATE TABLE IF NOT EXISTS `forgot_password_tokens` (
  `id` VARCHAR(36) PRIMARY KEY,
  `email` TEXT NOT NULL,
  `token` TEXT NOT NULL,
  `expires_at` DATETIME NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 4. TICKET TIPPEK TÁBLA
CREATE TABLE IF NOT EXISTS `ticket_tips` (
  `id` VARCHAR(36) PRIMARY KEY,
  `date` DATETIME NOT NULL,
  `day_name` VARCHAR(20) NOT NULL,
  `subscription` VARCHAR(50) NOT NULL,
  `package` VARCHAR(50) NOT NULL,
  `combination` VARCHAR(20) NOT NULL,
  `slip_name` VARCHAR(100) NOT NULL,
  `tip_name` VARCHAR(100) NOT NULL,
  `tip_description` VARCHAR(255) NOT NULL,
  `odds_value` VARCHAR(10) NOT NULL,
  `sum_odds` VARCHAR(10) NOT NULL
);

-- 5. 🎫 KUPON KÓDOK TÁBLA
CREATE TABLE IF NOT EXISTS `coupons` (
  `id` VARCHAR(36) PRIMARY KEY,
  `code` VARCHAR(50) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `type` ENUM('percentage', 'fixed', 'free') NOT NULL,
  `value` INT NOT NULL,
  `min_amount` INT DEFAULT 0,
  `max_discount` INT,
  `usage_limit` INT,
  `used_count` INT DEFAULT 0,
  `valid_from` DATETIME NOT NULL,
  `valid_until` DATETIME NOT NULL,
  `is_active` BOOLEAN DEFAULT TRUE,
  `applicable_packages` TEXT,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 6. 🎫 KUPON HASZNÁLAT NYILVÁNTARTÁS
CREATE TABLE IF NOT EXISTS `coupon_usages` (
  `id` VARCHAR(36) PRIMARY KEY,
  `coupon_id` VARCHAR(36) NOT NULL,
  `user_id` VARCHAR(36) NOT NULL,
  `package_id` INT NOT NULL,
  `original_price` INT NOT NULL,
  `discount_amount` INT NOT NULL,
  `final_price` INT NOT NULL,
  `stripe_session_id` VARCHAR(200),
  `used_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 📈 DEMO ADATOK BESZÚRÁSA

-- Demo felhasználó
INSERT INTO `users` (`id`, `full_name`, `email`, `password`, `status`, `role`, `package_id`, `created_at`) VALUES
('demo-user-1', 'Demo Felhasználó', 'demo@kaszadella.com', 'demo-password', 'Customer', 'USER', '1', NOW())
ON DUPLICATE KEY UPDATE `id` = `id`;

-- Demo admin
INSERT INTO `users` (`id`, `full_name`, `email`, `password`, `status`, `role`, `package_id`, `created_at`) VALUES
('admin-user-1', 'Admin Felhasználó', 'admin@kaszadella.com', 'admin-password', 'Approved', 'ADMIN', '3', NOW())
ON DUPLICATE KEY UPDATE `id` = `id`;

-- Demo heti tippek
INSERT INTO `weeklyTips` (`id`, `package`, `day`, `tip`, `total_odds`) VALUES
('tip-1', 'START', 'Hétfő', 'Ferencváros - Újpest: 1 (2.10)', 2.10),
('tip-2', 'START', 'Kedd', 'Debrecen - Fehérvár: X (3.20)', 3.20),
('tip-3', 'KASZA', 'Hétfő', 'Ferencváros - Újpest: 1 (2.10) + Over 2.5 (1.85)', 3.89),
('tip-4', 'KASZADELLA', 'Hétfő', 'Teljes napi kombináció: 5 meccs (12.50)', 12.50)
ON DUPLICATE KEY UPDATE `id` = `id`;

-- 🎫 DEMO KUPON KÓDOK
INSERT INTO `coupons` (`id`, `code`, `name`, `type`, `value`, `min_amount`, `max_discount`, `usage_limit`, `used_count`, `valid_from`, `valid_until`, `is_active`, `applicable_packages`) VALUES
('coupon-1', 'WELCOME20', 'Üdvözlő kedvezmény', 'percentage', 20, 0, 2000, 100, 0, '2025-01-01 00:00:00', '2025-12-31 23:59:59', TRUE, '[1,2,3]'),
('coupon-2', 'SAVE1000', 'Takarékossági kupon', 'fixed', 1000, 3000, NULL, 50, 0, '2025-01-01 00:00:00', '2025-12-31 23:59:59', TRUE, '[2,3]'),
('coupon-3', 'FREESTART', 'Ingyenes START csomag', 'free', 0, 0, NULL, 20, 0, '2025-01-01 00:00:00', '2025-12-31 23:59:59', TRUE, '[1]'),
('coupon-4', 'TESTCOUPON', 'Teszt kupon', 'percentage', 50, 0, 5000, 10, 0, '2025-01-01 00:00:00', '2025-12-31 23:59:59', TRUE, '[1,2,3]')
ON DUPLICATE KEY UPDATE `id` = `id`;

-- ✅ INDEXEK LÉTREHOZÁSA (teljesítmény)
CREATE INDEX IF NOT EXISTS `idx_users_email` ON `users` (`email`(255));
CREATE INDEX IF NOT EXISTS `idx_users_status` ON `users` (`status`);
CREATE INDEX IF NOT EXISTS `idx_coupons_code` ON `coupons` (`code`);
CREATE INDEX IF NOT EXISTS `idx_coupons_active` ON `coupons` (`is_active`);
CREATE INDEX IF NOT EXISTS `idx_coupon_usages_coupon_id` ON `coupon_usages` (`coupon_id`);
CREATE INDEX IF NOT EXISTS `idx_coupon_usages_user_id` ON `coupon_usages` (`user_id`);

-- 🎯 KÉSZ!
-- Az adatbázis felkészült a Hostinger deployment-re
-- Következő lépés: Environment változók beállítása cPanel-ben 