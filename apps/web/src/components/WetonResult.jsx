"use client";

import {
  Star,
  Heart,
  Briefcase,
  TrendingUp,
  ThumbsUp,
  ThumbsDown,
  Lightbulb,
  AlertTriangle,
} from "lucide-react";

export default function WetonResult({ data }) {
  const {
    weton,
    hari,
    hariNeptu,
    pasaran,
    pasaranNeptu,
    totalNeptu,
    dateInfo,
    characteristics,
    warning,
    note,
  } = data;

  return (
    <div className="space-y-6">
      {/* Warning if outside Javanese calendar range */}
      {warning && (
        <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-4 shadow-sm">
          <div className="flex gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-800">{warning}</p>
          </div>
        </div>
      )}

      {/* Main Weton Card */}
      <div className="bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl shadow-xl p-8 text-white">
        <div className="text-center">
          <p className="text-amber-100 text-sm uppercase tracking-wider mb-2">
            Weton Anda
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">{weton}</h2>

          <div className="flex justify-center gap-8 mt-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <p className="text-amber-100 text-xs mb-1">Hari</p>
              <p className="font-bold text-lg">{hari}</p>
              <p className="text-amber-100 text-sm">Neptu: {hariNeptu}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <p className="text-amber-100 text-xs mb-1">Pasaran</p>
              <p className="font-bold text-lg">{pasaran}</p>
              <p className="text-amber-100 text-sm">Neptu: {pasaranNeptu}</p>
            </div>
          </div>

          <div className="mt-6 bg-white/30 backdrop-blur-sm rounded-lg px-6 py-3 inline-block">
            <p className="text-amber-100 text-xs mb-1">Total Neptu</p>
            <p className="font-bold text-3xl">{totalNeptu}</p>
          </div>
        </div>
      </div>

      {/* Characteristics */}
      {characteristics ? (
        <div className="space-y-6">
          {/* Kata Kunci */}
          {characteristics.kataKunci && (
            <div className="bg-white rounded-xl shadow-md p-6 border border-amber-100">
              <div className="flex items-center gap-3 mb-3">
                <Star className="h-6 w-6 text-amber-600" />
                <h3 className="text-xl font-bold text-gray-800">Kata Kunci</h3>
              </div>
              <p className="text-2xl font-semibold text-amber-900 italic">
                "{characteristics.kataKunci}"
              </p>
            </div>
          )}

          {/* Karakter Utama */}
          {characteristics.karakterUtama && (
            <div className="bg-white rounded-xl shadow-md p-6 border border-amber-100">
              <div className="flex items-center gap-3 mb-3">
                <Lightbulb className="h-6 w-6 text-amber-600" />
                <h3 className="text-xl font-bold text-gray-800">
                  Karakter Utama
                </h3>
              </div>
              {characteristics.dewiLindung && (
                <p className="text-sm text-gray-600 mb-3">
                  🛡️ <strong>Lindungan:</strong> {characteristics.dewiLindung}
                </p>
              )}
              {characteristics.rakam && (
                <p className="text-sm text-gray-600 mb-3">
                  🔮 <strong>Rakam:</strong> {characteristics.rakam}
                </p>
              )}
              <p className="text-gray-700">{characteristics.karakterUtama}</p>
            </div>
          )}

          {/* Sifat Positif & Negatif */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sifat Positif */}
            {characteristics.sifatPositif?.length > 0 && (
              <div className="bg-green-50 rounded-xl shadow-md p-6 border border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <ThumbsUp className="h-6 w-6 text-green-600" />
                  <h3 className="text-lg font-bold text-gray-800">
                    Sifat Positif
                  </h3>
                </div>
                <ul className="space-y-2">
                  {characteristics.sifatPositif.map((sifat, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <span className="text-green-600 mt-1">✓</span>
                      <span>{sifat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Sifat Negatif */}
            {characteristics.sifatNegatif?.length > 0 && (
              <div className="bg-red-50 rounded-xl shadow-md p-6 border border-red-200">
                <div className="flex items-center gap-3 mb-4">
                  <ThumbsDown className="h-6 w-6 text-red-600" />
                  <h3 className="text-lg font-bold text-gray-800">
                    Sifat Negatif
                  </h3>
                </div>
                <ul className="space-y-2">
                  {characteristics.sifatNegatif.map((sifat, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <span className="text-red-600 mt-1">✗</span>
                      <span>{sifat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Pekerjaan & Rezeki */}
          {(characteristics.pekerjaanCocok?.length > 0 ||
            characteristics.rezekiKarir) && (
            <div className="bg-white rounded-xl shadow-md p-6 border border-amber-100">
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="h-6 w-6 text-amber-600" />
                <h3 className="text-xl font-bold text-gray-800">
                  Pekerjaan & Rezeki
                </h3>
              </div>

              {characteristics.pekerjaanCocok?.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    Pekerjaan yang Cocok:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {characteristics.pekerjaanCocok.map((pekerjaan, index) => (
                      <span
                        key={index}
                        className="bg-amber-100 text-amber-800 text-xs font-medium px-3 py-1 rounded-full"
                      >
                        {pekerjaan}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {characteristics.rezekiKarir && (
                <p className="text-gray-700 text-sm">
                  {characteristics.rezekiKarir}
                </p>
              )}
            </div>
          )}

          {/* Cinta & Jodoh */}
          {(characteristics.cintaJodoh ||
            characteristics.jodohCocok?.length > 0) && (
            <div className="bg-white rounded-xl shadow-md p-6 border border-pink-100">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="h-6 w-6 text-pink-600" />
                <h3 className="text-xl font-bold text-gray-800">
                  Cinta & Jodoh
                </h3>
              </div>

              {characteristics.cintaJodoh && (
                <p className="text-gray-700 text-sm mb-4">
                  {characteristics.cintaJodoh}
                </p>
              )}

              {characteristics.jodohCocok?.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    Jodoh yang Cocok:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {characteristics.jodohCocok.map((jodoh, index) => (
                      <span
                        key={index}
                        className="bg-pink-100 text-pink-800 text-xs font-medium px-3 py-1 rounded-full"
                      >
                        {jodoh}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tips */}
          {(characteristics.tipsDo?.length > 0 ||
            characteristics.tipsDont?.length > 0) && (
            <div className="bg-white rounded-xl shadow-md p-6 border border-amber-100">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="h-6 w-6 text-amber-600" />
                <h3 className="text-xl font-bold text-gray-800">Tips Hidup</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {characteristics.tipsDo?.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold text-green-700 mb-3">
                      ✅ Yang Harus Dilakukan:
                    </p>
                    <ul className="space-y-2">
                      {characteristics.tipsDo.map((tip, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-700 flex items-start gap-2"
                        >
                          <span className="text-green-600">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {characteristics.tipsDont?.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold text-red-700 mb-3">
                      ❌ Yang Harus Dihindari:
                    </p>
                    <ul className="space-y-2">
                      {characteristics.tipsDont.map((tip, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-700 flex items-start gap-2"
                        >
                          <span className="text-red-600">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* No characteristics available */
        note && (
          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
            <div className="flex gap-3">
              <span className="text-xl">ℹ️</span>
              <p className="text-sm text-blue-800">{note}</p>
            </div>
          </div>
        )
      )}
    </div>
  );
}
