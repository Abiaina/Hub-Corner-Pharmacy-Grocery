export default function Page() {
  return (
    <div className="space-y-6">
      <section className="card">
        <h1 className="text-3xl font-semibold mb-4">Hub-Spoke Model for Community Access</h1>
        <p className="text-lg text-gray-700 mb-6">
          A conceptual framework for improving food and pharmacy access through repurposed large pharmacies as community hubs 
          and corner store-pharmacy hybrids, creating a sustainable network that serves underserved communities.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6">
          <a href="/pilot" className="block p-6 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-3">🏥</div>
              <h3 className="font-semibold text-purple-800 text-lg mb-2">Hub-Spoke Framework</h3>
              <p className="text-sm text-purple-600">Core concept and implementation strategy for community access</p>
            </div>
          </a>
          
          <a href="/examples" className="block p-6 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-3">🌍</div>
              <h3 className="font-semibold text-green-800 text-lg mb-2">State Examples</h3>
              <p className="text-sm text-green-600">Successful models from other states and communities</p>
            </div>
          </a>
          
          <a href="/references" className="block p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-3">📚</div>
              <h3 className="font-semibold text-blue-800 text-lg mb-2">References</h3>
              <p className="text-sm text-blue-600">Research, case studies, and policy documentation</p>
            </div>
          </a>
        </div>
      </section>

      <section className="card">
        <h2 className="text-xl font-semibold mb-4">Hub-Spoke Model Components</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-2">🏥</div>
            <div className="font-semibold text-purple-800 mb-2">Community Hubs</div>
            <div className="text-sm text-gray-600">Repurposed large pharmacies serving as central distribution and service points</div>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-2">🏪</div>
            <div className="font-semibold text-green-800 mb-2">Corner Store Hybrids</div>
            <div className="text-sm text-gray-600">Existing corner stores enhanced with pharmacy services and fresh food</div>
          </div>
          
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-2">🚚</div>
            <div className="font-semibold text-blue-800 mb-2">Distribution Network</div>
            <div className="text-sm text-gray-600">Efficient supply chain connecting hubs to corner stores and communities</div>
          </div>
        </div>
      </section>

      <section className="card">
        <h2 className="text-xl font-semibold mb-4">About This Framework</h2>
        <p className="text-gray-700 mb-4">
          The hub-spoke model represents an innovative approach to addressing food and pharmacy access disparities 
          in underserved communities. By leveraging existing infrastructure and creating strategic partnerships, 
          this model can provide sustainable solutions that benefit both communities and businesses.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Key Principles:</strong>
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Repurpose existing large pharmacy spaces as community hubs</li>
          <li>Enhance corner stores with pharmacy services and fresh food options</li>
          <li>Create efficient distribution networks between hubs and spokes</li>
          <li>Develop sustainable public-private partnerships</li>
          <li>Focus on community-centered design and local ownership</li>
        </ul>
        <p className="text-gray-700 mt-4">
          This framework draws from successful models implemented in other states and communities, 
          adapted for local needs and regulatory environments.
        </p>
      </section>
    </div>
  )
}