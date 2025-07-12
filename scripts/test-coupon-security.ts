// scripts/test-coupon-security.ts
import { secureValidateCoupon, generateSecurityReport } from "@/lib/coupon-security";

async function testCouponSecurity() {
  console.log("🔒 KUPON BIZTONSÁGI TESZT INDÍTÁSA\n");
  
  const testUserId = "test-user-123";
  const testCouponCode = "WELCOME20";
  const testPackageId = 1;
  
  // Test 1: Normál kupon validáció
  console.log("📋 Test 1: Normál kupon validáció");
  try {
    const result1 = await secureValidateCoupon(testUserId, testCouponCode, testPackageId);
    console.log("✅ Eredmény:", result1.success ? "Sikeres" : `Hiba: ${result1.error}`);
  } catch (error) {
    console.log("❌ Hiba:", error);
  }
  
  // Test 2: Érvénytelen kupon
  console.log("\n📋 Test 2: Érvénytelen kupon");
  try {
    const result2 = await secureValidateCoupon(testUserId, "INVALID123", testPackageId);
    console.log("✅ Eredmény:", result2.success ? "Sikeres" : `Hiba: ${result2.error}`);
  } catch (error) {
    console.log("❌ Hiba:", error);
  }
  
  // Test 3: Rate limiting teszt
  console.log("\n📋 Test 3: Rate limiting teszt (5 gyors kísérlet)");
  for (let i = 0; i < 7; i++) {
    try {
      const result = await secureValidateCoupon(testUserId, "INVALID" + i, testPackageId);
      console.log(`${i + 1}. kísérlet:`, result.success ? "Sikeres" : `Hiba: ${result.error}`);
    } catch (error) {
      console.log(`${i + 1}. kísérlet - Hiba:`, error);
    }
  }
  
  // Test 4: Biztonsági riport
  console.log("\n📋 Test 4: Biztonsági riport");
  const securityReport = generateSecurityReport(testUserId);
  console.log("🔍 Biztonsági riport:", {
    "Összes kísérlet": securityReport.totalAttempts,
    "Sikeres": securityReport.successfulAttempts,
    "Sikertelen": securityReport.failedAttempts,
    "Gyanús aktivitás": securityReport.suspiciousActivity ? "IGEN" : "NEM",
    "Utolsó események": securityReport.recentLogs.length
  });
  
  // Test 5: Lejárt kupon teszt
  console.log("\n📋 Test 5: Lejárt kupon teszt");
  try {
    const result5 = await secureValidateCoupon(testUserId, "EXPIRED", testPackageId);
    console.log("✅ Eredmény:", result5.success ? "Sikeres" : `Hiba: ${result5.error}`);
  } catch (error) {
    console.log("❌ Hiba:", error);
  }
  
  console.log("\n🎉 BIZTONSÁGI TESZT BEFEJEZVE!");
}

// Futtatás
testCouponSecurity().catch(console.error); 