import {
  calculateWeton,
  isValidJavaneseDate,
  getDateRangeInfo,
  parseDate,
} from "@/app/api/utils/wetonCalculator";
import sql from "@/app/api/utils/sql";
import { ensureWetonData } from "@/app/api/utils/autoSeed";

/**
 * POST /api/weton/calculate
 * Calculate weton from date and get full characteristics
 * Auto-seeds database on first use
 */
export async function POST(request) {
  try {
    // Auto-seed database if needed (runs only once on first call)
    await ensureWetonData();

    const body = await request.json();
    const { dateString, afterMaghrib } = body;

    // Validate input
    if (!dateString) {
      return Response.json(
        {
          error: "Tanggal lahir wajib diisi",
          message: "Mohon masukkan tanggal lahir Anda",
        },
        { status: 400 },
      );
    }

    // Parse date
    const date = parseDate(dateString);
    if (!date || isNaN(date.getTime())) {
      return Response.json(
        {
          error: "Format tanggal tidak valid",
          message:
            "Format yang didukung: DD/MM/YYYY atau YYYY-MM-DD. Contoh: 10/01/1989 atau 1989-01-10",
        },
        { status: 400 },
      );
    }

    // Check date range
    const rangeInfo = getDateRangeInfo(date);

    // Calculate weton
    const wetonData = calculateWeton(date, afterMaghrib === true);

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
      weton: wetonData.weton,
      hari: wetonData.hari,
      hariNeptu: wetonData.hariNeptu,
      pasaran: wetonData.pasaran,
      pasaranNeptu: wetonData.pasaranNeptu,
      totalNeptu: wetonData.totalNeptu,
      dateInfo: {
        inputDate: dateString,
        adjustedDate: wetonData.tanggal,
        afterMaghrib,
        isValidJavaneseDate: rangeInfo.isValid,
        rangeInfo,
      },
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
    } else {
      // Characteristics not yet in database
      result.characteristics = null;
      result.note =
        "Data karakteristik untuk weton ini sedang dalam proses pengisian";
    }

    // Add warning if date is outside Javanese calendar range
    if (!rangeInfo.isValid) {
      if (rangeInfo.isBefore) {
        result.warning = `Tanggal di luar jangkauan kalender Jawa. Kalender Jawa dimulai dari ${rangeInfo.minDate}. Perhitungan weton tetap bisa dilakukan, namun data kalender Jawa lengkap tidak tersedia.`;
      } else if (rangeInfo.isAfter) {
        result.warning = `Tanggal di luar jangkauan kalender Jawa. Kalender Jawa saat ini terdefinisi hingga ${rangeInfo.maxDate}. Perhitungan weton tetap bisa dilakukan, namun data kalender Jawa lengkap tidak tersedia.`;
      }
    }

    return Response.json(result);
  } catch (error) {
    console.error("Error calculating weton:", error);
    return Response.json(
      {
        error: "Terjadi kesalahan server",
        message:
          "Mohon maaf, terjadi kesalahan saat menghitung weton. Silakan coba lagi.",
        details: error.message,
      },
      { status: 500 },
    );
  }
}
