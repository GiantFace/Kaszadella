# 🏠 HOSTINGER POSTGRESQL BEÁLLÍTÁSI ÚTMUTATÓ

## 🎯 **ELŐKÉSZÜLETEK**

✅ **Exportált adatok**: `kaszadella_neon_backup.sql` (202KB)  
✅ **Projekt kész**: Teljes Next.js alkalmazás  
✅ **Konfiguráció**: Készen áll a frissítésre

---

## 📋 **HOSTINGER CPANEL BEÁLLÍTÁS**

### **1. Jelentkezz be Hostinger cPanel-be**
- URL: `https://cpanel.hostinger.com` 
- Vagy a hosting dashboard-ról

### **2. PostgreSQL adatbázis létrehozása**

#### **🗄️ Databases → PostgreSQL Databases**
```
1. Database Name: kaszadella_prod
2. Create Database ✓
```

#### **👤 Felhasználó létrehozása**
```
1. Username: kaszadella_user  
2. Password: [Erős jelszó generálás]
3. Create User ✓
```

#### **🔑 Jogosultságok beállítása**
```
1. Select User: kaszadella_user
2. Select Database: kaszadella_prod
3. Grant All Privileges ✓
```

### **3. Kapcsolódási adatok mentése**
```bash
# Ezeket kell majd használni:
HOSTINGER_DB_HOST="localhost"  # vagy konkrét server IP
HOSTINGER_DB_PORT="5432"       # PostgreSQL alapértelmezett
HOSTINGER_DB_NAME="kaszadella_prod"
HOSTINGER_DB_USER="kaszadella_user"  
HOSTINGER_DB_PASS="[Generált jelszó]"

# Teljes CONNECTION STRING:
"postgresql://kaszadella_user:[PASSWORD]@localhost:5432/kaszadella_prod"
```

---

## 📥 **ADATOK IMPORTÁLÁSA**

### **Opció 1: cPanel File Manager**
```
1. File Manager megnyitása
2. kaszadella_neon_backup.sql feltöltése
3. Terminal megnyitása (ha van)
4. psql parancs futtatása
```

### **Opció 2: SSH (ha elérhető)**
```bash
# SSH kapcsolat
ssh username@your-domain.com

# Import parancs
psql -U kaszadella_user -d kaszadella_prod < kaszadella_neon_backup.sql
```

### **Opció 3: phpPgAdmin (ha telepített)**
```
1. cPanel → phpPgAdmin
2. Import funkció
3. SQL fájl feltöltése
```

---

## 🔧 **ALKALMAZÁS KONFIGURÁCIÓ**

### **1. Environment változók frissítése**

#### **Hozz létre új `.env.hostinger` fájlt:**
```env
# HOSTINGER PRODUCTION DATABASE
DATABASE_URL="postgresql://kaszadella_user:[PASSWORD]@localhost:5432/kaszadella_prod"

# NEXTAUTH
AUTH_SECRET="[ÚJ ERŐS SECRET]"
NEXTAUTH_URL="https://yourdomain.com"
NEXT_PUBLIC_BASE_URL="https://yourdomain.com"

# STRIPE (production kulcsok)
STRIPE_SECRET_KEY="sk_live_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# EMAIL (Hostinger SMTP)
SMTP_HOST="smtp.hostinger.com"
SMTP_PORT="587"
SMTP_USER="noreply@yourdomain.com"
SMTP_PASSWORD="[EMAIL PASSWORD]"
```

### **2. Adatbázis kapcsolat tesztelése**

#### **Docker-rel teszt:**
```bash
# Kapcsolat tesztelése (helyettesítsd a valós adatokkal)
docker run --rm postgres:17 psql "postgresql://kaszadella_user:[PASSWORD]@YOUR_HOSTINGER_IP:5432/kaszadella_prod" -c "\\dt"
```

---

## 🚀 **HOSTINGER DEPLOYMENT**

### **1. Projekt felkészítése**
```bash
# Build készítése
npm run build

# Fájlok optimalizálása
# - .next/ folder
# - package.json
# - node_modules (vagy install szerveren)
```

### **2. Fájlok feltöltése**

#### **File Manager-rel:**
```
1. cPanel → File Manager
2. public_html/[domain] mappába
3. ZIP feltöltés és kicsomagolás
```

#### **FTP-vel (ajánlott):**
```bash
# FTP kliens használata
# Vagy SCP/SFTP ha van SSH
```

### **3. Node.js App beállítása**

#### **Ha van Node.js támogatás:**
```
1. cPanel → Node.js
2. Create Application
   - App Root: /public_html/yourdomain
   - Startup File: server.js vagy package.json
   - Node.js Version: 18+ LTS
```

#### **Package telepítés:**
```bash
# Hostinger terminálban (ha van)
npm install --production
```

### **4. Environment változók beállítása**

#### **cPanel-ben:**
```
1. Node.js App Manager
2. Environment Variables
3. Bemásolni a .env.hostinger tartalmat
```

---

## 🌐 **DOMAIN ÉS SSL BEÁLLÍTÁS**

### **1. Domain hozzáadása**
```
1. cPanel → Subdomains/Addon Domains
2. Domain: kaszadella.yourdomain.com
3. Document Root: /public_html/kaszadella
```

### **2. SSL tanúsítvány**
```
1. cPanel → SSL/TLS
2. Let's Encrypt Free SSL
3. Domain kiválasztása és aktiválás
```

### **3. HTTPS átirányítás**
```apache
# .htaccess fájlban
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

---

## ✅ **ELLENŐRZÉSI LISTA**

### **🗄️ Adatbázis**
- [ ] PostgreSQL adatbázis létrehozva
- [ ] Felhasználó és jogosultságok beállítva  
- [ ] Backup sikeresen importálva
- [ ] Kapcsolat tesztelve

### **🔧 Alkalmazás**
- [ ] Fájlok feltöltve Hostingerre
- [ ] Node.js app konfigurálva
- [ ] Environment változók beállítva
- [ ] Build sikeresen lefutott

### **🌐 Domain & SSL**
- [ ] Domain/subdomain beállítva
- [ ] SSL tanúsítvány aktív
- [ ] HTTPS átirányítás működik
- [ ] DNS rekordok rendben

### **🧪 Funkciók**
- [ ] Főoldal betölt
- [ ] Adatbázis kapcsolat működik
- [ ] Bejelentkezés működik  
- [ ] Admin panel elérhető
- [ ] Email küldés működik
- [ ] Stripe fizetés működik

---

## 🚨 **HIBAELHÁRÍTÁS**

### **Adatbázis kapcsolat hiba:**
```bash
# Ellenőrizd a kapcsolati adatokat
# Host: localhost vagy server IP
# Port: 5432 (alapértelmezett)
# SSL: lehet hogy disable kell
```

### **Permission hibák:**
```bash
# File jogosultságok
chmod 755 public_html/
chmod 644 *.js *.json
```

### **Node.js hibák:**
```bash
# Ellenőrizd a Node.js verziót
# Újratelepítés: npm install --production
```

---

## 🎯 **KÖVETKEZŐ LÉPÉSEK**

1. **✅ Most**: Hostinger beállítás végrehajtása
2. **✅ Utána**: Adatok importálása  
3. **✅ Végül**: Alkalmazás deployment
4. **✅ Teszt**: Minden funkció ellenőrzése
5. **✅ DNS**: Domain átállítása
6. **✅ Monitoring**: Teljesítmény figyelés

**🏁 EREDMÉNY: 100% saját kontroll Hostinger szerveren!** 