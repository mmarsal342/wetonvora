import sql from "./sql";

/**
 * Auto-seed database with COMPLETE weton data if empty
 * Calls the existing /api/weton/seed endpoint which has ALL characteristics
 * Returns true if seeding was successful or data already exists
 */
export async function ensureWetonData() {
  try {
    // Check if database already has data
    const count = await sql`SELECT COUNT(*) as count FROM weton_karakteristik`;
    const dataCount = parseInt(count[0].count);

    if (dataCount >= 35) {
      // Database already populated - all good!
      console.log(`✅ Database already has ${dataCount} weton records`);
      return true;
    }

    console.log("🌱 Auto-seeding database with COMPLETE 35 weton data...");

    // Call the existing seed endpoint which has COMPLETE characteristics data
    const { POST: seedPOST } = await import("@/app/api/weton/seed/route");
    const mockRequest = new Request("http://localhost/api/weton/seed", {
      method: "POST",
    });

    const seedResponse = await seedPOST(mockRequest);
    const seedResult = await seedResponse.json();

    if (seedResponse.ok) {
      console.log(
        "✅ Auto-seed berhasil! Database terisi LENGKAP:",
        seedResult.message,
      );
      return true;
    } else {
      console.error("❌ Auto-seed failed:", seedResult);
      return false;
    }
  } catch (error) {
    console.error("❌ Auto-seed error:", error);
    return false;
  }
}
