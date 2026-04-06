/**
 * WetonVora - Weton Calculator Utility
 * Pure mathematical calculation for Javanese Weton
 * No external dependencies needed
 */

// Neptu values for days (Hari)
const HARI_NEPTU = {
  Minggu: 5,
  Senin: 4,
  Selasa: 3,
  Rabu: 7,
  Kamis: 8,
  Jumat: 6,
  Sabtu: 9,
};

// Neptu values for Pasaran
const PASARAN_NEPTU = {
  Legi: 5,
  Pahing: 9,
  Pon: 7,
  Wage: 4,
  Kliwon: 8,
};

// Day names in order (0 = Sunday)
const HARI_NAMES = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

// Pasaran names in order (5-day cycle)
const PASARAN_NAMES = ["Legi", "Pahing", "Pon", "Wage", "Kliwon"];

// Reference date for Pasaran calculation
// 1 January 2000 was a Saturday Kliwon
const REFERENCE_DATE = new Date(2000, 0, 1); // January 1, 2000
const REFERENCE_PASARAN_INDEX = 4; // Kliwon (index 4 in PASARAN_NAMES)

/**
 * Calculate day of week (0-6, 0 = Sunday)
 */
function getDayOfWeek(date) {
  return date.getDay();
}

/**
 * Calculate Pasaran using day difference from reference date
 */
function getPasaranIndex(date) {
  // Calculate days difference from reference date
  const diffTime = date - REFERENCE_DATE;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // Calculate pasaran index (5-day cycle)
  const pasaranIndex = (REFERENCE_PASARAN_INDEX + diffDays) % 5;

  // Handle negative modulo
  return pasaranIndex < 0 ? pasaranIndex + 5 : pasaranIndex;
}

/**
 * Main function to calculate Weton from a date
 * @param {Date} date - JavaScript Date object
 * @param {boolean} afterMaghrib - true if birth was after Maghrib
 * @returns {Object} Weton data
 */
export function calculateWeton(date, afterMaghrib = false) {
  // If after maghrib, add 1 day (Javanese calendar shifts after sunset)
  const adjustedDate = new Date(date);
  if (afterMaghrib) {
    adjustedDate.setDate(adjustedDate.getDate() + 1);
  }

  // Get day of week and pasaran
  const dayIndex = getDayOfWeek(adjustedDate);
  const pasaranIndex = getPasaranIndex(adjustedDate);

  const hari = HARI_NAMES[dayIndex];
  const pasaran = PASARAN_NAMES[pasaranIndex];

  const hariNeptu = HARI_NEPTU[hari];
  const pasaranNeptu = PASARAN_NEPTU[pasaran];
  const totalNeptu = hariNeptu + pasaranNeptu;

  return {
    hari,
    hariNeptu,
    pasaran,
    pasaranNeptu,
    totalNeptu,
    weton: `${hari} ${pasaran}`,
    tanggal: adjustedDate.toISOString().split("T")[0],
  };
}

/**
 * Validate if date is within Javanese calendar range
 * Javanese calendar: 8 July 1633 - 25 August 2052
 */
export function isValidJavaneseDate(date) {
  const minDate = new Date(1633, 6, 8); // July 8, 1633
  const maxDate = new Date(2052, 7, 25); // August 25, 2052

  return date >= minDate && date <= maxDate;
}

/**
 * Get date range info
 */
export function getDateRangeInfo(date) {
  const minDate = new Date(1633, 6, 8);
  const maxDate = new Date(2052, 7, 25);

  const isValid = isValidJavaneseDate(date);
  const isBefore = date < minDate;
  const isAfter = date > maxDate;

  return {
    isValid,
    isBefore,
    isAfter,
    minDate: minDate.toISOString().split("T")[0],
    maxDate: maxDate.toISOString().split("T")[0],
  };
}

/**
 * Parse date string (DD/MM/YYYY or YYYY-MM-DD)
 */
export function parseDate(dateString) {
  // Try DD/MM/YYYY format first
  if (dateString.includes("/")) {
    const [day, month, year] = dateString.split("/").map(Number);
    return new Date(year, month - 1, day);
  }

  // Try YYYY-MM-DD format
  if (dateString.includes("-")) {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  return null;
}

/**
 * Format date to Indonesian locale
 */
export function formatDateID(date) {
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}
