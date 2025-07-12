// app/subscription/layout.tsx
import React from "react";

export default function SubscriptionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Modern Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 pt-20 pb-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main Title */}
            <div className="mb-6">
              <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-sm font-semibold tracking-wide uppercase mb-4">
                ⭐ PRÉMIUM ELŐFIZETÉS
              </span>
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent leading-tight">
                Válaszd ki a
                <span className="block mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Tökéletes Csomagod
                </span>
              </h1>
            </div>
            
            {/* Subtitle */}
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Fedezd fel prémium tipp csomagjainkat és kezdj el nyerni még ma! 
              Minden csomag tartalmaz <span className="font-semibold text-blue-600">kupon kedvezményeket</span> és 
              <span className="font-semibold text-purple-600"> garanciát a minőségre</span>.
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500 mb-12">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>💳 Biztonságos fizetés</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-300"></div>
                <span>🎫 Kupon kedvezmények</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-700"></div>
                <span>📊 Szakértői elemzések</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse delay-1000"></div>
                <span>⚡ Azonnali hozzáférés</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 pb-20">
        {children}
      </main>

      {/* Modern Footer */}
      <footer className="relative z-10 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <div className="flex justify-center items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">K</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Kaszadella
              </span>
            </div>
            
            <p className="text-gray-300 mb-6 max-w-md mx-auto">
              A megbízható sportfogadási tippek otthona. Csatlakozz több ezer elégedett ügyfélhez!
            </p>
            
            <div className="flex justify-center items-center gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">98%</div>
                <div className="text-xs text-gray-400">Elégedettség</div>
              </div>
              <div className="w-px h-8 bg-gray-600"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-xs text-gray-400">Támogatás</div>
              </div>
              <div className="w-px h-8 bg-gray-600"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">5000+</div>
                <div className="text-xs text-gray-400">Ügyfél</div>
              </div>
            </div>
            
            <div className="border-t border-gray-700 pt-6">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Kaszadella. Minden jog fenntartva. 
                <span className="text-blue-400 ml-2">🔒 SSL Biztonság</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
