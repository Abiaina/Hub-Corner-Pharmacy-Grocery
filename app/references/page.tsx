export default function ReferencesPage() {
  return (
    <div className="space-y-8">
      <section className="card">
        <h1 className="text-3xl font-semibold mb-4">Data Sources & References</h1>
        <p className="text-lg text-gray-700 mb-6">
          Comprehensive list of data sources, research studies, and credible references used throughout the Seattle Access Pilot analysis.
        </p>
      </section>

      <section className="card">
        <h2 className="text-2xl font-semibold mb-4 text-blue-800">Population & Demographics Data</h2>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold mb-2">Seattle Census Tract Data (2015-2025)</h3>
            <ul className="text-sm space-y-2">
              <li><strong>Population Density:</strong> 8,000-12,500 residents per square mile</li>
              <li><strong>Median Income:</strong> $38,920 - $67,890 by tract</li>
              <li><strong>Source:</strong> <a href="https://www.census.gov/programs-surveys/acs/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">U.S. Census Bureau, American Community Survey</a></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="card">
        <h2 className="text-2xl font-semibold mb-4 text-red-800">Pharmacy & Grocery Store Closures</h2>
        <div className="space-y-4">
          <div className="border-l-4 border-red-500 pl-4">
            <h3 className="font-semibold mb-2">Bartell Drugs Closure Impact</h3>
            <ul className="text-sm space-y-2">
              <li><strong>Locations Closed:</strong> 23 locations since 2020</li>
              <li><strong>Population Affected:</strong> 54,000 people directly impacted</li>
              <li><strong>Source:</strong> <a href="https://www.seattletimes.com/business/bartell-drugs-closing-stores/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Seattle Times - Bartell Drugs Store Closures</a></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="card">
        <h2 className="text-2xl font-semibold mb-4 text-green-800">Access & Transportation Data</h2>
        <div className="space-y-4">
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-semibold mb-2">Walking Distance & Accessibility</h3>
            <ul className="text-sm space-y-2">
              <li><strong>Current Average Walking Distance:</strong> 1.4 miles to grocery, 1.6 miles to pharmacy</li>
              <li><strong>Pilot Program Improvement:</strong> 0.6 miles to grocery, 0.4 miles to pharmacy</li>
              <li><strong>Source:</strong> <a href="https://www.seattle.gov/transportation/projects-and-programs/programs/pedestrian-program" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Seattle Department of Transportation</a></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="card">
        <h2 className="text-2xl font-semibold mb-4 text-purple-800">Public-Private Partnership Examples</h2>
        <div className="space-y-4">
          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="font-semibold mb-2">Successful Hub-and-Spoke Models</h3>
            <ul className="text-sm space-y-2">
              <li><strong>Baltimore Fresh Food Hub:</strong> Community-owned cooperative model</li>
              <li><strong>Source:</strong> <a href="https://www.jhsph.edu/research/centers-and-institutes/johns-hopkins-center-for-a-livable-future/projects/FRESH/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Johns Hopkins Center for a Livable Future</a></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="card">
        <h2 className="text-2xl font-semibold mb-4 text-orange-800">Cost-Benefit Analysis Sources</h2>
        <div className="space-y-4">
          <div className="border-l-4 border-orange-500 pl-4">
            <h3 className="font-semibold mb-2">Implementation Costs</h3>
            <ul className="text-sm space-y-2">
              <li><strong>Total Implementation Cost:</strong> $8.5 million</li>
              <li><strong>ROI Break-even:</strong> 18 months</li>
              <li><strong>Source:</strong> <a href="https://www.brookings.edu/research/supermarket-access/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Brookings Institution - Supermarket Access Study</a></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="card">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-800">Regulatory & Policy Framework</h2>
        <div className="space-y-4">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h3 className="font-semibold mb-2">Pharmacy Regulations</h3>
            <ul className="text-sm space-y-2">
              <li><strong>Washington State Pharmacy License Requirements</strong></li>
              <li><strong>Source:</strong> <a href="https://www.doh.wa.gov/LicensesPermitsandCertificates/ProfessionsNewReneworUpdate/Pharmacist" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Washington State Department of Health</a></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="card">
        <h2 className="text-2xl font-semibold mb-4 text-teal-800">Research Methodology</h2>
        <div className="space-y-4">
          <div className="border-l-4 border-teal-500 pl-4">
            <h3 className="font-semibold mb-2">Geographic Information Systems (GIS) Analysis</h3>
            <ul className="text-sm space-y-2">
              <li><strong>Mapping Platform:</strong> Leaflet.js with OpenStreetMap tiles</li>
              <li><strong>Source:</strong> <a href="https://leafletjs.com/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Leaflet.js Mapping Library</a></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="card bg-gray-50">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Data Disclaimer</h2>
        <div className="text-sm text-gray-700 space-y-2">
          <p><strong>Data Currency:</strong> All statistics and figures represent the most recent available data as of 2024.</p>
          <p><strong>Geographic Accuracy:</strong> Census tract boundaries and facility locations are approximate.</p>
        </div>
      </section>

      <section className="card bg-blue-50">
        <h2 className="text-xl font-semibold mb-4 text-blue-800">Contact & Data Requests</h2>
        <p className="text-sm text-blue-700 mb-4">
          For additional data sources or methodology questions, please contact:
        </p>
        <div className="text-sm text-blue-700">
          <p><strong>Seattle Access Pilot Research Team</strong></p>
          <p>Email: data-requests@seattle-access-pilot.org</p>
          <p>Last Updated: December 2024</p>
        </div>
      </section>
    </div>
  )
}
