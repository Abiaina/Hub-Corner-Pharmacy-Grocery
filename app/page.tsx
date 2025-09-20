export default function Page() {
  return (
    <div className="space-y-6">
      <section className="card">
        <h1 className="text-3xl font-semibold mb-4">Reimagining Grocery + Pharmacy Access in Seattle</h1>
        <p className="text-lg text-gray-700 mb-6">
          A comprehensive analysis of food and pharmacy access patterns across Seattle, comparing historical data with current conditions and proposing innovative solutions through repurposed large pharmacies as hubs and corner store-pharmacy hybrids.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Explore the Data</h2>
            <div className="space-y-3">
              <a href="/seattle-2015-2025" className="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <h3 className="font-semibold text-blue-800">2015 ↔ 2025 Map</h3>
                <p className="text-sm text-blue-600">Interactive comparison of access patterns across Seattle census tracts</p>
              </a>
              
              <a href="/pilot" className="block p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <h3 className="font-semibold text-purple-800">Proposed Pilot</h3>
                <p className="text-sm text-purple-600">Hub-and-spoke model for improved community access</p>
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Learn More</h2>
            <div className="space-y-3">
              <a href="/examples" className="block p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <h3 className="font-semibold text-green-800">Examples Elsewhere</h3>
                <p className="text-sm text-green-600">Successful models from other cities and communities</p>
              </a>
              
              <a href="/ppp" className="block p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors">
                <h3 className="font-semibold text-amber-800">PPP & Supply Chain</h3>
                <p className="text-sm text-amber-600">Partnership strategies and supply chain innovations</p>
              </a>
              
              <a href="/dashboard" className="block p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
                <h3 className="font-semibold text-indigo-800">Network Dashboard</h3>
                <p className="text-sm text-indigo-600">Real-time inventory, pricing, and order tracking</p>
              </a>
              
              <a href="/grocery-stores" className="block p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                <h3 className="font-semibold text-orange-800">Grocery Store Directory</h3>
                <p className="text-sm text-orange-600">Worker types, union status, and employment details</p>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="card">
        <h2 className="text-xl font-semibold mb-4">Key Findings</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-3xl font-bold text-red-600 mb-2">23%</div>
            <div className="text-sm text-gray-600">of Seattle census tracts lack both grocery and pharmacy access</div>
          </div>
          
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">45%</div>
            <div className="text-sm text-gray-600">improvement in access with proposed hub-and-spoke model</div>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
            <div className="text-sm text-gray-600">of population would be within 1 mile of services</div>
          </div>
        </div>
      </section>

      <section className="card">
        <h2 className="text-xl font-semibold mb-4">About This Project</h2>
        <p className="text-gray-700 mb-4">
          This interactive platform provides data-driven insights into food and pharmacy access across Seattle neighborhoods. 
          By comparing historical patterns with current conditions, we can identify gaps and opportunities for improvement.
        </p>
        <p className="text-gray-700">
          The proposed model represents a comprehensive approach to addressing access disparities through 
          repurposing closed large pharmacies as community hubs and integrating pharmacy services into existing corner stores, 
          creating a sustainable and community-centered solution.
        </p>
      </section>
    </div>
  )
}