'use client';

import { useState, useEffect } from 'react';

interface EmploymentModel {
  ownership: string;
  worker_type: string;
  unionized: boolean;
  union_affiliation?: string;
  employee_count: string;
  benefits: string;
}

interface GroceryStore {
  id: string;
  name: string;
  type: string;
  address: string;
  coordinates: { lat: number; lng: number };
  neighborhood: string;
  years_present: number[];
  status_2025: string;
  quality_tier?: string;
  quality_notes?: string;
  employment_model: EmploymentModel;
  tags: string[];
}

interface GroceryData {
  city: string;
  as_of: string;
  entities: GroceryStore[];
}

export default function GroceryStoresPage() {
  const [data, setData] = useState<GroceryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetch('/data/existing_sites_data.json')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading grocery store data...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-red-600">Error loading data</div>
      </div>
    );
  }

  const groceryStores = data.entities.filter(entity => 
    entity.type.includes('grocery') || entity.type.includes('pharmacy')
  );

  const filteredStores = filter === 'all' 
    ? groceryStores 
    : groceryStores.filter(store => store.employment_model.worker_type === filter);

  const getWorkerTypeColor = (workerType: string) => {
    switch (workerType) {
      case 'union': return 'bg-green-100 text-green-800 border-green-200';
      case 'co-op': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'non-unionized': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    if (status.includes('closing')) return 'bg-red-100 text-red-800';
    if (status.includes('shrinking')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  return (
    <div className="space-y-6">
      <section className="card">
        <h1 className="text-3xl font-semibold mb-4">Seattle Grocery Stores & Pharmacies</h1>
        <p className="text-lg text-gray-700 mb-6">
          Comprehensive data on grocery stores and pharmacies across Seattle, including worker type information 
          (union, co-op, non-unionized) and employment details.
        </p>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Filter by Worker Type</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg border ${
                filter === 'all' 
                  ? 'bg-blue-100 text-blue-800 border-blue-200' 
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              All ({groceryStores.length})
            </button>
            <button
              onClick={() => setFilter('union')}
              className={`px-4 py-2 rounded-lg border ${
                filter === 'union' 
                  ? 'bg-green-100 text-green-800 border-green-200' 
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              Union ({groceryStores.filter(s => s.employment_model.worker_type === 'union').length})
            </button>
            <button
              onClick={() => setFilter('co-op')}
              className={`px-4 py-2 rounded-lg border ${
                filter === 'co-op' 
                  ? 'bg-purple-100 text-purple-800 border-purple-200' 
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              Co-op ({groceryStores.filter(s => s.employment_model.worker_type === 'co-op').length})
            </button>
            <button
              onClick={() => setFilter('non-unionized')}
              className={`px-4 py-2 rounded-lg border ${
                filter === 'non-unionized' 
                  ? 'bg-gray-100 text-gray-800 border-gray-200' 
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              Non-Union ({groceryStores.filter(s => s.employment_model.worker_type === 'non-unionized').length})
            </button>
          </div>
        </div>
      </section>

      <section className="card">
        <h2 className="text-xl font-semibold mb-4">Store Directory</h2>
        <div className="grid gap-4">
          {filteredStores.map((store) => (
            <div key={store.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{store.name}</h3>
                <span className={`px-2 py-1 rounded text-sm ${getStatusColor(store.status_2025)}`}>
                  {store.status_2025.replace('_', ' ')}
                </span>
              </div>
              
              <div className="text-sm text-gray-600 mb-3">
                <p>{store.address}</p>
                <p>{store.neighborhood} • {store.type.replace('_', ' ')}</p>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                <span className={`px-2 py-1 rounded border text-sm ${getWorkerTypeColor(store.employment_model.worker_type)}`}>
                  {store.employment_model.worker_type}
                </span>
                {store.employment_model.union_affiliation && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                    {store.employment_model.union_affiliation}
                  </span>
                )}
                <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">
                  {store.employment_model.employee_count} employees
                </span>
                {store.quality_tier && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">
                    Quality: {store.quality_tier}
                  </span>
                )}
              </div>

              <div className="text-sm text-gray-700">
                <p><strong>Benefits:</strong> {store.employment_model.benefits}</p>
                {store.quality_notes && (
                  <p><strong>Notes:</strong> {store.quality_notes}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <h2 className="text-xl font-semibold mb-4">Summary Statistics</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {groceryStores.filter(s => s.employment_model.worker_type === 'union').length}
            </div>
            <div className="text-sm text-gray-600">Union Stores</div>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {groceryStores.filter(s => s.employment_model.worker_type === 'co-op').length}
            </div>
            <div className="text-sm text-gray-600">Co-op Stores</div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-600 mb-1">
              {groceryStores.filter(s => s.employment_model.worker_type === 'non-unionized').length}
            </div>
            <div className="text-sm text-gray-600">Non-Union Stores</div>
          </div>
          
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {groceryStores.length}
            </div>
            <div className="text-sm text-gray-600">Total Stores</div>
          </div>
        </div>
      </section>
    </div>
  );
}
