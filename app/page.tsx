export default function Page() {
  return (
    <div>
      {/* Header with Navigation */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 px-6 text-center shadow-lg">
        <h1 className="text-4xl font-light mb-3">Lake City Grocery & Pharmacy Desert & Solutions</h1>
        <p className="text-xl opacity-90 mb-6">
          Enhanced service area analysis for grocery and pharmacy access in Lake City, Seattle and solutions to address the gaps
        </p>
      </header>

      <div className="space-y-6 p-6">
        <section className="card">
          <h2 className="text-2xl font-semibold mb-4">Explore Our Analysis</h2>
          <p className="text-lg text-gray-700 mb-6">
            Interactive tools and comprehensive solutions for addressing grocery and pharmacy access gaps in Lake City.
          </p>
        
          <div className="grid md:grid-cols-2 gap-6">
            <a href="/enhanced-map.html" className="inline-block p-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg hover:from-green-100 hover:to-blue-100 transition-colors border-2 border-green-200 shadow-lg">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-4">Map</div>
                <h3 className="font-semibold text-green-800 text-xl mb-3">Enhanced Service Area Analysis</h3>
                <p className="text-green-600 mb-4 text-sm">Interactive map with scenario toggles</p>
                <div className="text-xs text-gray-600 space-y-1">
                  <p>• Distance-based deserts</p>
                  <p>• Service radius toggles</p>
                  <p>• Potential sites</p>
                </div>
              </div>
            </a>
            
            <a href="/solutions.html" className="inline-block p-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg hover:from-purple-100 hover:to-pink-100 transition-colors border-2 border-purple-200 shadow-lg">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-4">Solutions</div>
                <h3 className="font-semibold text-purple-800 text-xl mb-3">Implementation Options</h3>
                <p className="text-purple-600 mb-4 text-sm">Short-term and long-term solutions</p>
                <div className="text-xs text-gray-600 space-y-1">
                  <p>• Interim pharmacy services</p>
                  <p>• Hub-spoke model</p>
                  <p>• Co-op development</p>
                </div>
              </div>
            </a>
          </div>
      </section>

      <section className="card bg-slate-50 border-slate-300">
        <h2 className="text-xl font-semibold mb-4 text-slate-800">Executive Summary — Address Lake City Critical Service Loss (Grocery & Pharmacy))</h2>
        <div className="mb-4">
          <p className="text-lg font-semibold text-slate-800 mb-2">
            Lake City area lost 3 pharmacies (Walgreens, Bartell, Fred Meyer) and full-line grocery (Fred Meyer). These closures create large food & pharmacy deserts in the core of Lake City.
          </p>
        </div>
        
        <div className="mb-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-700 mb-2">Interim Pharmacy</h4>
              <p className="text-sm text-slate-600">
                Stand up a neighborhood pharmacy that accepts Medicare Part D and Apple Health (Medicaid) immediately, then add commercial plans.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h4 className="font-semibold text-green-700 mb-2">Planning Committee</h4>
              <p className="text-sm text-slate-600">
                Resident-Led Planning Committee: choose the permanent grocery + pharmacy model (co-op/PCC, hub-and-spoke, or conventional grocer) and prioritize re-use of existing shells.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-purple-500">
              <h4 className="font-semibold text-purple-700 mb-2">Policy Changes</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Ban restrictive covenants on former grocery/pharmacy sites; expedite permits for re-tenanting.</li>
                <li>• Adopt time-based pharmacy access standards (minutes, not just miles) to reflect Lake City's topography.</li>
                <li>• Create a pharmacy "Any Willing Provider" state law (plans/PBMs must offer standard terms); ensure QHP network adequacy explicitly includes pharmacies.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  )
}