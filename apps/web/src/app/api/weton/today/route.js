import { calculateWeton } from "@/app/api/utils/wetonCalculator";
import sql from "@/app/api/utils/sql";
import { ensureWetonData } from "@/app/api/utils/autoSeed";

/**
 * GET /api/weton/today
 * Get weton for today's date
 */
export async function GET(request) {
  try {
    // Auto-seed database if needed (runs only once on first call)
    await ensureWetonData();

    // Get today's date
    const today = new Date();

    // Calculate weton for today
    const wetonData = calculateWeton(today, false);

    // Get characteristics from database
    const characteristics = await sql`
      SELECT 
        hari,
        hari_neptu,
        pasaran,
        pasaran_neptu,
        total_neptu,
        dewi_lindung,
        rakam,
        karakter_utama,
        sifat_positif,
        sifat_negatif,
        pekerjaan_cocok,
        rezeki_karir,
        cinta_jodoh,
        jodoh_cocok,
        tips_do,
        tips_dont,
        kata_kunci
      FROM weton_karakteristik
      WHERE hari = ${wetonData.hari}
      AND pasaran = ${wetonData.pasaran}
      LIMIT 1
    `;

    const result = {
      date: today.toISOString().split("T")[0],
      dateFormatted: today.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      weton: wetonData.weton,
      hari: wetonData.hari,
      hariNeptu: wetonData.hariNeptu,
      pasaran: wetonData.pasaran,
      pasaranNeptu: wetonData.pasaranNeptu,
      totalNeptu: wetonData.totalNeptu,
    };

    // Add characteristics if found
    if (characteristics.length > 0) {
      const char = characteristics[0];
      result.characteristics = {
        dewiLindung: char.dewi_lindung,
        rakam: char.rakam,
        karakterUtama: char.karakter_utama,
        sifatPositif: char.sifat_positif || [],
        sifatNegatif: char.sifat_negatif || [],
        pekerjaanCocok: char.pekerjaan_cocok || [],
        rezekiKarir: char.rezeki_karir,
        cintaJodoh: char.cinta_jodoh,
        jodohCocok: char.jodoh_cocok || [],
        tipsDo: char.tips_do || [],
        tipsDont: char.tips_dont || [],
        kataKunci: char.kata_kunci,
      };
    }

    return Response.json(result);
  } catch (error) {
    console.error("Error getting today weton:", error);
    return Response.json(
      {
        error: "Terjadi kesalahan server",
        message:
          "Mohon maaf, terjadi kesalahan saat mengambil weton hari ini. Silakan coba lagi.",
        details: error.message,
      },
      { status: 500 },
    );
  }
}
