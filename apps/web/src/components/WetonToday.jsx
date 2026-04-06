"use client";

import { useState, useEffect } from "react";
import { Calendar, Loader2 } from "lucide-react";

export default function WetonToday() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodayWeton = async () => {
      try {
        const response = await fetch("/api/weton/today");
        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Gagal mengambil data weton hari ini",
          );
        }

        setData(result);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTodayWeton();
  }, []);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl shadow-lg p-8 text-white">
        <div className="flex items-center justify-center gap-3">
          <Loader2 className="h-6 w-6 animate-spin" />
          <p>Memuat weton hari ini...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <p className="text-red-800">❌ {error}</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl shadow-lg p-6 sm:p-8 text-white">
      <div className="flex items-center gap-3 mb-4">
        <Calendar className="h-8 w-8" />
        <div>
          <h3 className="text-xl font-bold">Weton Hari Ini</h3>
          <p className="text-sm opacity-90">{data.dateFormatted}</p>
        </div>
      </div>

      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 mb-4">
        <div className="text-center">
          <p className="text-sm opacity-90 mb-2">Weton</p>
          <h2 className="text-4xl font-bold mb-4">{data.weton}</h2>

          <div className="flex justify-center gap-6">
            <div>
              <p className="text-xs opacity-75">Hari</p>
              <p className="font-bold text-lg">{data.hari}</p>
            </div>
            <div>
              <p className="text-xs opacity-75">Pasaran</p>
              <p className="font-bold text-lg">{data.pasaran}</p>
            </div>
            <div>
              <p className="text-xs opacity-75">Neptu</p>
              <p className="font-bold text-lg">{data.totalNeptu}</p>
            </div>
          </div>
        </div>
      </div>

      {data.characteristics && (
        <div className="space-y-3">
          {data.characteristics.kataKunci && (
            <p className="text-center text-lg italic">
              "{data.characteristics.kataKunci}"
            </p>
          )}

          {data.characteristics.karakterUtama && (
            <p className="text-sm text-center opacity-90">
              {data.characteristics.karakterUtama}
            </p>
          )}

          {data.characteristics.tipsDo &&
            data.characteristics.tipsDo.length > 0 && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="font-semibold text-sm mb-2">✨ Tips Hari Ini:</p>
                <ul className="text-sm space-y-1">
                  {data.characteristics.tipsDo.slice(0, 3).map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span>•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </div>
      )}
    </div>
  );
}
