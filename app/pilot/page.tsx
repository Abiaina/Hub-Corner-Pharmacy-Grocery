export default function PilotPage() {
  return (
    <div className="space-y-6">
      <section className="card">
        <h1 className="text-2xl font-semibold mb-4">Hub-and-Spoke Model: Grocery & Pharmacy Hubs</h1>
        <p className="text-gray-700 mb-6">
          A comprehensive approach to improving food and pharmacy access across Seattle through a network of processing hubs and public-facing hybrid corner stores. 
          <strong>Hubs can operate as separate grocery and pharmacy facilities or as combined operations</strong>, providing flexibility to adapt to local needs and existing infrastructure. 
          This model addresses the urgent need created by recent pharmacy and grocery store closures while creating sustainable community access points.
        </p>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <h3 className="font-semibold text-blue-800 mb-2">Flexible Hub Configuration</h3>
          <p className="text-blue-700 text-sm">
            <strong>Separate Hubs:</strong> Dedicated grocery processing facilities and pharmacy processing facilities can operate independently, 
            allowing for specialized equipment, staffing, and regulatory compliance. <br/>
            <strong>Combined Hubs:</strong> Integrated facilities handling both grocery and pharmacy operations under one roof, 
            maximizing efficiency and reducing overhead costs while maintaining separate processing areas for safety and regulatory compliance.
          </p>
        </div>
        
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <h3 className="font-semibold text-red-800 mb-2">Seattle's Access Crisis</h3>
          <p className="text-red-700 text-sm">
            Recent closures of Bartell Drugs (acquired by Rite Aid), Kroger stores, and other retail chains have created significant 
            pharmacy and grocery deserts across Seattle neighborhoods. This pilot directly addresses these gaps by repurposing 
            recently closed facilities and creating new community access points.
          </p>
        </div>
      </section>

      <section className="card">
        <h2 className="text-xl font-semibold mb-4">Processing Hubs - Closed Facility Repurposing</h2>
        <p className="text-gray-600 mb-4">
          <strong>Not public-facing facilities.</strong> Strategic conversion of recently closed pharmacy and grocery locations into 
          processing and distribution hubs that supply the public-facing corner store network. These facilities handle inventory, 
          preparation, and logistics for the entire network.
        </p>
        <div className="space-y-4">
          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="font-semibold">Central Processing Hub - Capitol Hill</h3>
            <p className="text-gray-600">Former large pharmacy converted to processing and distribution facility.</p>
            <ul className="mt-2 text-sm text-gray-600">
              <li>• Prescription processing and fulfillment</li>
              <li>• Fresh produce preparation and packaging</li>
              <li>• Inventory management and restocking</li>
              <li>• Quality control and testing</li>
              <li>• Delivery coordination to corner stores</li>
            </ul>
          </div>
          
          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="font-semibold">North Processing Hub - Greenwood</h3>
            <p className="text-gray-600">Repurposed large pharmacy serving as processing facility for North Seattle network.</p>
            <ul className="mt-2 text-sm text-gray-600">
              <li>• Prescription processing and quality control</li>
              <li>• Fresh produce preparation and cold storage</li>
              <li>• Inventory tracking and automated restocking</li>
              <li>• Telepharmacy consultation coordination</li>
              <li>• Supply chain management for corner stores</li>
            </ul>
          </div>
          
          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="font-semibold">South Processing Hub - Rainier Valley</h3>
            <p className="text-gray-600">Repurposed facility serving as processing center for South Seattle network.</p>
            <ul className="mt-2 text-sm text-gray-600">
              <li>• Multilingual prescription processing</li>
              <li>• Cultural food preparation and packaging</li>
              <li>• Community health program coordination</li>
              <li>• Transportation and delivery logistics</li>
              <li>• Corner store support and training</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="card">
        <h2 className="text-xl font-semibold mb-4">Public-Facing Corner Store Network</h2>
        <p className="text-gray-600 mb-4">
          <strong>Public-facing retail locations.</strong> Hybrid grocery-pharmacy corner stores that serve as the community's 
          primary access points. These locations receive inventory from processing hubs and provide both grocery and pharmacy 
          services directly to customers.
        </p>
        <div className="space-y-4">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h3 className="font-semibold">Beacon Hill Grocery-Pharmacy</h3>
            <p className="text-gray-600">Public-facing hybrid store serving Beacon Hill community with both grocery and pharmacy services.</p>
            <ul className="mt-2 text-sm text-gray-600">
              <li>• Prescription pickup and consultation</li>
              <li>• Fresh produce and grocery essentials</li>
              <li>• Over-the-counter medications</li>
              <li>• Telepharmacy consultation booth</li>
              <li>• Community health information</li>
            </ul>
          </div>
          
          <div className="border-l-4 border-cyan-500 pl-4">
            <h3 className="font-semibold">Ballard Grocery-Pharmacy</h3>
            <p className="text-gray-600">Public-facing hybrid store serving Ballard community with comprehensive services.</p>
            <ul className="mt-2 text-sm text-gray-600">
              <li>• Prescription pickup and consultation</li>
              <li>• Curated grocery essentials and fresh produce</li>
              <li>• Health and wellness products</li>
              <li>• Local community health programs</li>
              <li>• Order pickup for hub-prepared items</li>
            </ul>
          </div>
          
          <div className="border-l-4 border-cyan-500 pl-4">
            <h3 className="font-semibold">Central District Grocery-Pharmacy</h3>
            <p className="text-gray-600">Public-facing hybrid store serving Central District with both grocery and pharmacy services.</p>
            <ul className="mt-2 text-sm text-gray-600">
              <li>• Prescription pickup and consultation</li>
              <li>• Fresh produce and grocery essentials</li>
              <li>• Community health resources</li>
              <li>• Order preparation and pickup</li>
            </ul>
          </div>
          
          <div className="border-l-4 border-cyan-500 pl-4">
            <h3 className="font-semibold">West Seattle Grocery-Pharmacy</h3>
            <p className="text-gray-600">Public-facing hybrid store serving West Seattle communities with comprehensive services.</p>
            <ul className="mt-2 text-sm text-gray-600">
              <li>• Prescription pickup and consultation</li>
              <li>• Fresh produce and grocery essentials</li>
              <li>• Telepharmacy consultation services</li>
              <li>• Community health education</li>
            </ul>
          </div>
          
          <div className="border-l-4 border-cyan-500 pl-4">
            <h3 className="font-semibold">Rainier Beach Grocery-Pharmacy</h3>
            <p className="text-gray-600">Public-facing hybrid store serving Rainier Beach with culturally appropriate services.</p>
            <ul className="mt-2 text-sm text-gray-600">
              <li>• Multilingual prescription services</li>
              <li>• Culturally diverse grocery options</li>
              <li>• Community health programs</li>
              <li>• Order preparation and delivery coordination</li>
            </ul>
          </div>
          
          <div className="border-l-4 border-cyan-500 pl-4">
            <h3 className="font-semibold">Fremont Grocery-Pharmacy</h3>
            <p className="text-gray-600">Public-facing hybrid store serving Fremont with modern health and wellness focus.</p>
            <ul className="mt-2 text-sm text-gray-600">
              <li>• Prescription pickup and consultation</li>
              <li>• Organic and specialty grocery items</li>
              <li>• Health and wellness products</li>
              <li>• Digital health integration</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="card">
        <h2 className="text-xl font-semibold mb-4">Operational Model</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Processing Hubs (Not Public-Facing)</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Repurpose recently closed pharmacy and grocery facilities</li>
              <li>• Handle prescription processing and fulfillment</li>
              <li>• Prepare and package fresh produce and grocery items</li>
              <li>• Manage inventory and automated restocking</li>
              <li>• Coordinate delivery to corner store network</li>
              <li>• Provide telepharmacy consultation support</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Corner Stores (Public-Facing)</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Serve as primary community access points</li>
              <li>• Provide prescription pickup and consultation</li>
              <li>• Offer fresh produce and grocery essentials</li>
              <li>• Host telepharmacy consultation booths</li>
              <li>• Receive prepared orders from processing hubs</li>
              <li>• Provide community health education and resources</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="card">
        <h2 className="text-xl font-semibold mb-4">Implementation Strategy</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Phase 1: Foundation (Months 1-6)</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Identify and acquire recently closed pharmacy/grocery facilities</li>
              <li>• Establish processing hub infrastructure and equipment</li>
              <li>• Recruit and train processing hub staff</li>
              <li>• Develop corner store partnership agreements</li>
              <li>• Create supply chain and logistics systems</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Phase 2: Launch (Months 7-12)</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Open processing hubs (not public-facing)</li>
              <li>• Launch corner store network (public-facing)</li>
              <li>• Implement telepharmacy consultation services</li>
              <li>• Begin community outreach and education</li>
              <li>• Optimize hub-to-corner store logistics</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="card">
        <h2 className="text-xl font-semibold mb-4">Expected Outcomes</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">85%</div>
            <div className="text-sm text-gray-600">Population within 1 mile of corner stores</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">40%</div>
            <div className="text-sm text-gray-600">Reduction in pharmacy/grocery deserts</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">200+</div>
            <div className="text-sm text-gray-600">Jobs created across network</div>
          </div>
        </div>
        
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Processing Hub Benefits</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Efficient prescription processing and fulfillment</li>
              <li>• Centralized inventory management</li>
              <li>• Quality control and testing facilities</li>
              <li>• Cost-effective supply chain operations</li>
              <li>• Telepharmacy consultation coordination</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Corner Store Benefits</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Convenient community access points</li>
              <li>• Combined grocery and pharmacy services</li>
              <li>• Personalized customer service</li>
              <li>• Community health education and resources</li>
              <li>• Order pickup and preparation services</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="card">
        <h2 className="text-xl font-semibold mb-4">Model Benefits & Advantages</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3 text-green-700">Financial Benefits</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li><strong>• Distributed Financial Risk:</strong> Multiple smaller corner stores reduce individual location failure risk compared to large single-location investments</li>
              <li><strong>• Bulk Purchasing Power:</strong> Centralized hubs enable volume discounts on pharmaceuticals, produce, and grocery staples</li>
              <li><strong>• Operational Efficiency:</strong> Shared processing, storage, and distribution infrastructure reduces per-unit costs</li>
              <li><strong>• Reduced Real Estate Costs:</strong> Repurposing existing closed facilities eliminates new construction expenses</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 text-blue-700">Safety & Quality Benefits</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li><strong>• Tracking & Recalls:</strong> Centralized inventory management enables rapid identification and removal of recalled products across all locations</li>
              <li><strong>• Quality Control:</strong> Hub-based testing and inspection ensures consistent product quality before distribution to corner stores</li>
              <li><strong>• Prescription Safety:</strong> Centralized pharmacy processing reduces medication errors and enables better drug interaction monitoring</li>
              <li><strong>• Cold Chain Management:</strong> Professional refrigeration and storage at hubs maintains fresh produce and medication integrity</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="font-semibold mb-3 text-purple-700">Community Benefits</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Walking-distance access to essential services</li>
              <li>• Combined grocery-pharmacy convenience</li>
              <li>• Local job creation and community investment</li>
            </ul>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Telepharmacy consultations for underserved areas</li>
              <li>• Cultural food options tailored to neighborhoods</li>
              <li>• Community health education and resources</li>
            </ul>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Reduced transportation barriers for seniors and disabled</li>
              <li>• Emergency medication and food access</li>
              <li>• Social connection points in neighborhoods</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="card">
        <h2 className="text-xl font-semibold mb-4">Program Requirements & Implementation Needs</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3 text-orange-700">Forecasting & Planning Systems</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li><strong>• Neighborhood Demand Forecasting:</strong> Data analytics to predict grocery and pharmacy needs by location, season, and demographics</li>
              <li><strong>• Inventory Optimization:</strong> AI-driven systems to determine optimal stock levels for each corner store based on local consumption patterns</li>
              <li><strong>• Prescription Demand Modeling:</strong> Predictive analytics for medication needs based on patient populations and chronic condition prevalence</li>
              <li><strong>• Seasonal Adjustment:</strong> Dynamic inventory management for holiday periods, flu seasons, and weather-related demand spikes</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 text-red-700">Frontloading & Distribution</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li><strong>• Pre-positioning Strategy:</strong> Advanced delivery of anticipated needs to corner stores before peak demand periods</li>
              <li><strong>• Hub-to-Store Logistics:</strong> Efficient routing and scheduling for daily/weekly restocking of corner stores</li>
              <li><strong>• Fresh Produce Pipeline:</strong> Cold chain logistics to deliver fresh produce from hubs to stores within optimal freshness windows</li>
              <li><strong>• Emergency Restocking:</strong> Rapid response system for unexpected demand surges or supply shortages</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="font-semibold mb-3 text-teal-700">Transportation & Distribution Infrastructure</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Hub-to-Corner Store Transport</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Refrigerated delivery vehicles for fresh produce and medications</li>
                <li>• Scheduled route optimization for efficient multi-store deliveries</li>
                <li>• Inventory tracking systems with real-time updates</li>
                <li>• Secure transport for controlled substances and high-value items</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Community Outreach Transport</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Perishable excess distribution to food banks and community kitchens</li>
                <li>• Mobile pharmacy services for homebound patients</li>
                <li>• Free clinic supply coordination for expired-but-safe medications</li>
                <li>• Emergency food distribution during community crises</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-green-50 border-l-4 border-green-500 p-4">
          <h4 className="font-semibold text-green-800 mb-2">Surplus & Waste Reduction Strategy</h4>
          <p className="text-green-700 text-sm mb-2">
            The hub model enables sophisticated management of perishable excess and near-expiration products:
          </p>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Automated systems to identify products approaching expiration across all locations</li>
            <li>• Coordinated redistribution to food banks, free clinics, and community programs</li>
            <li>• Dynamic pricing to move products before expiration while maintaining food safety</li>
            <li>• Partnership networks with local nonprofits for efficient surplus distribution</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
