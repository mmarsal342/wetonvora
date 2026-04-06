"use client";

import { useState } from "react";
import { Calendar, Loader2, Sun, Moon, Database } from "lucide-react";
import WetonResult from "./WetonResult";

export default function WetonCalculator() {
  const [dateInput, setDateInput] = useState("");
  const [afterMaghrib, setAfterMaghrib] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [seeding, setSeeding] = useState(false);
  const [seedSuccess, setSeedSuccess] = useState(null);

  const handleCalculate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/weton/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dateString: dateInput,
          afterMaghrib,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Terjadi kesalahan");
      }

      setResult(data);
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

  const handleSeedDatabase = async () => {
    if (!confirm("Isi database dengan 35 data weton lengkap?")) {
      return;
    }

    setSeeding(true);
    setSeedSuccess(null);

    try {
      const response = await fetch("/api/weton/seed", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal seed database");
      }

      setSeedSuccess(data.message);
      setTimeout(() => setSeedSuccess(null), 5000);
    } catch (err) {
      console.error("Seed error:", err);
      alert("Error: " + err.message);
    } finally {
      setSeeding(false);
    }
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

        {/* Admin: Seed Database Button */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">
              <span className="font-semibold">Admin:</span> Seed database dengan
              35 data weton lengkap
            </div>
            <button
              type="button"
              onClick={handleSeedDatabase}
              disabled={seeding}
              className="flex items-center gap-2 px-4 py-2 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all disabled:opacity-50"
            >
              {seeding ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Seeding...
                </>
              ) : (
                <>
                  <Database className="h-3.5 w-3.5" />
                  Seed Database
                </>
              )}
            </button>
          </div>
          {seedSuccess && (
            <div className="mt-3 text-xs text-green-600 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
              {seedSuccess}
            </div>
          )}
        </div>
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
