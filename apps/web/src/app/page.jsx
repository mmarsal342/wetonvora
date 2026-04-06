"use client";

import { Home } from "lucide-react";
import WetonCalculator from "@/components/WetonCalculator";
import WetonToday from "@/components/WetonToday";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-900 to-orange-800 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
              <Home size={32} className="text-amber-100" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-serif">
                WetonVora
              </h1>
              <p className="text-amber-100 text-sm mt-1">
                Kalkulator Weton Jawa - Gratis
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Intro Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
            Temukan Weton Anda
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Masukkan tanggal lahir untuk mengetahui weton Jawa Anda beserta
            karakteristik, jodoh yang cocok, dan tips hidup berdasarkan primbon
            tradisional.
          </p>
        </div>

        {/* Weton Hari Ini - Featured */}
        <div className="mb-8">
          <WetonToday />
        </div>

        {/* Main Calculator - No tabs needed anymore */}
        <WetonCalculator />

        {/* Info Section */}
        <div className="mt-12 sm:mt-16 bg-white rounded-xl shadow-md p-6 sm:p-8 border border-amber-100">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">ℹ️</span>
            Tentang Weton
          </h3>
          <div className="space-y-4 text-gray-600 text-sm sm:text-base">
            <p>
              <strong className="text-gray-800">Weton</strong> adalah kombinasi
              antara hari dalam kalender Jawa (Senin-Minggu) dan pasaran (Legi,
              Pahing, Pon, Wage, Kliwon). Dalam budaya Jawa, weton dipercaya
              bisa menggambarkan karakter seseorang dan kecocokan jodoh.
            </p>
            <p>
              <strong className="text-gray-800">Neptu</strong> adalah nilai
              numerik dari weton yang didapat dari penjumlahan nilai hari dan
              pasaran. Setiap weton memiliki karakteristik unik berdasarkan
              nilai neptu-nya.
            </p>
            <p>
              <strong className="text-gray-800">Aturan Maghrib:</strong> Dalam
              kalender Jawa, pergantian hari terjadi setelah adzan Maghrib
              (bukan tengah malam). Jika Anda lahir setelah Maghrib, weton Anda
              mengikuti hari berikutnya.
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-amber-50 border-l-4 border-amber-500 rounded-lg p-6 shadow-sm">
          <div className="flex gap-3">
            <span className="text-2xl flex-shrink-0">⚠️</span>
            <div className="text-sm text-gray-700 space-y-2">
              <p className="font-semibold text-amber-900">
                Disclaimer Penting:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>
                  WetonVora dibuat{" "}
                  <strong>untuk hiburan dan refleksi budaya</strong>, bukan
                  sebagai ramalan atau pedoman mutlak dalam hidup.
                </li>
                <li>
                  Informasi yang disajikan{" "}
                  <strong>
                    tidak dimaksudkan untuk mengarah ke praktik syirik
                  </strong>{" "}
                  atau kepercayaan yang bertentangan dengan ajaran Islam.
                </li>
                <li>
                  Keputusan hidup penting (jodoh, karir, dll) tetap harus
                  didasarkan pada{" "}
                  <strong>pertimbangan matang, doa, dan ikhtiar</strong>, bukan
                  semata-mata pada perhitungan weton.
                </li>
                <li>
                  Data karakteristik berdasarkan{" "}
                  <strong>primbon Jawa tradisional</strong> yang bisa berbeda
                  antar sumber.
                </li>
                <li>
                  WetonVora <strong>bukan pengganti konsultasi</strong> dengan
                  ahli primbon atau ulama.
                </li>
              </ul>
              <p className="italic text-amber-800 mt-3">
                Gunakan dengan bijak sebagai sarana mengenal budaya Jawa dan
                refleksi diri. Segala keputusan tetap kembali kepada Anda dan
                Yang Maha Kuasa.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm">
              &copy; 2026 WetonVora. Dibuat dengan ❤️ untuk pelestarian budaya
              Jawa.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Kalender Jawa terdefinisi dari 8 Juli 1633 - 25 Agustus 2052
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
