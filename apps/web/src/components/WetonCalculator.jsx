"use client";

import { useState } from "react";
import { Calendar, Loader2, Sun, Moon } from "lucide-react";
import WetonResult from "./WetonResult";
import { calculateWeton, parseDate, getDateRangeInfo } from "../app/api/utils/wetonCalculator";
import { wetonData } from "../utils/wetonData";

export default function WetonCalculator() {
  const [dateInput, setDateInput] = useState("");
  const [afterMaghrib, setAfterMaghrib] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      if (!dateInput) {
        throw new Error("Mohon masukkan tanggal lahir Anda");
      }

      const date = parseDate(dateInput);
      if (!date || isNaN(date.getTime())) {
        throw new Error("Format yang didukung: DD/MM/YYYY atau YYYY-MM-DD. Contoh: 10/01/1989 atau 1989-01-10");
      }

      const rangeInfo = getDateRangeInfo(date);
      const wetonResult = calculateWeton(date, afterMaghrib === true);
      
      const resultData = {
        weton: wetonResult.weton,
        hari: wetonResult.hari,
        hariNeptu: wetonResult.hariNeptu,
        pasaran: wetonResult.pasaran,
        pasaranNeptu: wetonResult.pasaranNeptu,
        totalNeptu: wetonResult.totalNeptu,
        dateInfo: {
          inputDate: dateInput,
          adjustedDate: wetonResult.tanggal,
          afterMaghrib,
          isValidJavaneseDate: rangeInfo.isValid,
          rangeInfo,
        },
      };

      const char = wetonData.find((w) => w.hari === wetonResult.hari && w.pasaran === wetonResult.pasaran);
      
      if (char) {
        resultData.characteristics = {
          dewiLindung: char.dewiLindung,
          rakam: char.rakam,
          karakterUtama: char.karakterUtama,
          sifatPositif: char.sifatPositif || [],
          sifatNegatif: char.sifatNegatif || [],
          pekerjaanCocok: char.pekerjaanCocok || [],
          rezekiKarir: char.rezekiKarir,
          cintaJodoh: char.cintaJodoh,
          jodohCocok: char.jodohCocok || [],
          tipsDo: char.tipsDo || [],
          tipsDont: char.tipsDont || [],
          kataKunci: char.kataKunci,
        };
      } else {
        resultData.characteristics = null;
        resultData.note = "Data karakteristik untuk weton ini sedang dalam proses pengisian";
      }

      if (!rangeInfo.isValid) {
        if (rangeInfo.isBefore) {
          resultData.warning = `Tanggal di luar jangkauan kalender Jawa. Kalender Jawa dimulai dari ${rangeInfo.minDate}. Perhitungan weton tetap bisa dilakukan, namun data kalender Jawa lengkap tidak tersedia.`;
        } else if (rangeInfo.isAfter) {
          resultData.warning = `Tanggal di luar jangkauan kalender Jawa. Kalender Jawa saat ini terdefinisi hingga ${rangeInfo.maxDate}. Perhitungan weton tetap bisa dilakukan, namun data kalender Jawa lengkap tidak tersedia.`;
        }
      }

      await new Promise(r => setTimeout(r, 400));
      setResult(resultData);
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "Terjadi kesalahan saat menghitung weton");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setDateInput("");
    setAfterMaghrib(false);
    setResult(null);
    setError(null);
  };



  return (
    <div className="w-full">
      {/* Calculator Form */}
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-amber-100">
        <form onSubmit={handleCalculate} className="space-y-6">
          {/* Date Input */}
          <div>
            <label
              htmlFor="dateInput"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Tanggal Lahir
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                id="dateInput"
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900"
                placeholder="DD/MM/YYYY"
                required
              />
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Format: Pilih tanggal dari kalender atau ketik manual
            </p>
          </div>

          {/* Maghrib Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Waktu Kelahiran
            </label>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-3">
              <p className="text-xs text-amber-900 mb-2">
                <strong>Penting:</strong> Dalam kalender Jawa, pergantian hari
                terjadi setelah Maghrib (bukan tengah malam).
              </p>
              <p className="text-xs text-amber-800">
                Jika Anda lahir <strong>setelah adzan Maghrib</strong>, weton
                Anda mengikuti hari berikutnya.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAfterMaghrib(false)}
                className={`flex items-center justify-center gap-3 p-4 rounded-lg border-2 transition-all ${
                  !afterMaghrib
                    ? "border-amber-500 bg-amber-50 text-amber-900"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                }`}
              >
                <Sun className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-semibold text-sm">Sebelum Maghrib</div>
                  <div className="text-xs opacity-75">Pagi - Sore</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setAfterMaghrib(true)}
                className={`flex items-center justify-center gap-3 p-4 rounded-lg border-2 transition-all ${
                  afterMaghrib
                    ? "border-amber-500 bg-amber-50 text-amber-900"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                }`}
              >
                <Moon className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-semibold text-sm">Setelah Maghrib</div>
                  <div className="text-xs opacity-75">Malam</div>
                </div>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading || !dateInput}
              className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 focus:ring-4 focus:ring-amber-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Menghitung...
                </span>
              ) : (
                "Hitung Weton"
              )}
            </button>

            {(result || error) && (
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
              >
                Reset
              </button>
            )}
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <div className="mt-6 bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
            <div className="flex gap-3">
              <span className="text-xl">❌</span>
              <div>
                <p className="font-semibold text-red-900 text-sm">
                  Terjadi Kesalahan
                </p>
                <p className="text-red-700 text-sm mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}


      </div>

      {/* Result */}
      {result && (
        <div className="mt-8">
          <WetonResult data={result} />
        </div>
      )}
    </div>
  );
}
