'use client'

import { useState, useEffect } from 'react'

interface InventoryItem {
  id: string
  name: string
  category: 'grocery' | 'pharmacy'
  currentStock: number
  maxStock: number
  price: number
  location: string
  lastRestocked: string
}

interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
  location: string
  status: 'pending' | 'preparing' | 'ready' | 'completed'
}

export default function DashboardPage() {
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [orders, setOrders] = useState<OrderItem[]>([])
  const [cart, setCart] = useState<OrderItem[]>([])

  // Mock data
  useEffect(() => {
    const mockInventory: InventoryItem[] = [
      // Grocery items
      { id: '1', name: 'Fresh Apples', category: 'grocery', currentStock: 45, maxStock: 100, price: 2.99, location: 'Beacon Hill Grocery-Pharmacy', lastRestocked: '2024-01-15' },
      { id: '2', name: 'Whole Milk', category: 'grocery', currentStock: 12, maxStock: 50, price: 3.49, location: 'Ballard Grocery-Pharmacy', lastRestocked: '2024-01-14' },
      { id: '3', name: 'Ground Beef', category: 'grocery', currentStock: 8, maxStock: 30, price: 5.99, location: 'Central District Grocery-Pharmacy', lastRestocked: '2024-01-15' },
      { id: '4', name: 'Whole Wheat Bread', category: 'grocery', currentStock: 15, maxStock: 40, price: 2.49, location: 'West Seattle Grocery-Pharmacy', lastRestocked: '2024-01-14' },
      { id: '5', name: 'Organic Spinach', category: 'grocery', currentStock: 3, maxStock: 25, price: 3.99, location: 'Rainier Beach Grocery-Pharmacy', lastRestocked: '2024-01-13' },
      
      // Pharmacy items
      { id: '6', name: 'Acetaminophen 500mg', category: 'pharmacy', currentStock: 25, maxStock: 100, price: 8.99, location: 'Beacon Hill Grocery-Pharmacy', lastRestocked: '2024-01-15' },
      { id: '7', name: 'Vitamin D3 1000 IU', category: 'pharmacy', currentStock: 18, maxStock: 50, price: 12.99, location: 'Ballard Grocery-Pharmacy', lastRestocked: '2024-01-14' },
      { id: '8', name: 'Blood Pressure Monitor', category: 'pharmacy', currentStock: 2, maxStock: 10, price: 45.99, location: 'Central District Grocery-Pharmacy', lastRestocked: '2024-01-12' },
      { id: '9', name: 'First Aid Kit', category: 'pharmacy', currentStock: 5, maxStock: 15, price: 24.99, location: 'West Seattle Grocery-Pharmacy', lastRestocked: '2024-01-13' },
      { id: '10', name: 'Thermometer', category: 'pharmacy', currentStock: 7, maxStock: 20, price: 15.99, location: 'Rainier Beach Grocery-Pharmacy', lastRestocked: '2024-01-14' },
    ]

    const mockOrders: OrderItem[] = [
      { id: '1', name: 'Fresh Apples', quantity: 2, price: 2.99, location: 'Beacon Hill Grocery-Pharmacy', status: 'ready' },
      { id: '2', name: 'Whole Milk', quantity: 1, price: 3.49, location: 'Ballard Grocery-Pharmacy', status: 'preparing' },
      { id: '3', name: 'Acetaminophen 500mg', quantity: 1, price: 8.99, location: 'Central District Grocery-Pharmacy', status: 'pending' },
    ]

    setInventory(mockInventory)
    setOrders(mockOrders)
  }, [])

  const filteredInventory = inventory.filter(item => {
    const locationMatch = selectedLocation === 'all' || item.location === selectedLocation
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory
    return locationMatch && categoryMatch
  })

  const lowStockItems = inventory.filter(item => item.currentStock < item.maxStock * 0.3)
  const outOfStockItems = inventory.filter(item => item.currentStock === 0)

  const addToCart = (item: InventoryItem) => {
    if (item.currentStock > 0) {
      const existingItem = cart.find(cartItem => cartItem.id === item.id)
      if (existingItem) {
        setCart(cart.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        ))
      } else {
        setCart([...cart, {
          id: item.id,
          name: item.name,
          quantity: 1,
          price: item.price,
          location: item.location,
          status: 'pending'
        }])
      }
    }
  }

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter(item => item.id !== itemId))
  }

  const placeOrder = () => {
    const newOrders = cart.map(item => ({ ...item, id: Date.now().toString() + Math.random() }))
    setOrders([...orders, ...newOrders])
    setCart([])
  }

  const getStockPercentage = (current: number, max: number) => {
    return (current / max) * 100
  }

  const getStockColor = (percentage: number) => {
    if (percentage === 0) return 'bg-red-500'
    if (percentage < 30) return 'bg-yellow-500'
    if (percentage < 70) return 'bg-blue-500'
    return 'bg-green-500'
  }

  return (
    <div className="space-y-6">
      <section className="card">
        <h1 className="text-2xl font-semibold mb-4">Hub-and-Spoke Network Dashboard</h1>
        <p className="text-gray-700 mb-6">
          Real-time inventory tracking, pricing management, and order processing across the Seattle grocery-pharmacy network.
        </p>
      </section>

      {/* Overview Cards */}
      <section className="grid md:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-blue-600">{inventory.length}</div>
          <div className="text-sm text-gray-600">Total Items</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-yellow-600">{lowStockItems.length}</div>
          <div className="text-sm text-gray-600">Low Stock</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-red-600">{outOfStockItems.length}</div>
          <div className="text-sm text-gray-600">Out of Stock</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600">{orders.filter(o => o.status === 'ready').length}</div>
          <div className="text-sm text-gray-600">Orders Ready</div>
        </div>
      </section>

      {/* Filters */}
      <section className="card">
        <h2 className="text-xl font-semibold mb-4">Inventory Management</h2>
        <div className="flex gap-4 mb-4">
          <select 
            value={selectedLocation} 
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="all">All Locations</option>
            <option value="Beacon Hill Grocery-Pharmacy">Beacon Hill</option>
            <option value="Ballard Grocery-Pharmacy">Ballard</option>
            <option value="Central District Grocery-Pharmacy">Central District</option>
            <option value="West Seattle Grocery-Pharmacy">West Seattle</option>
            <option value="Rainier Beach Grocery-Pharmacy">Rainier Beach</option>
          </select>
          
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="all">All Categories</option>
            <option value="grocery">Grocery Items</option>
            <option value="pharmacy">Pharmacy Items</option>
          </select>
        </div>

        {/* Inventory Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Item</th>
                <th className="text-left py-2">Category</th>
                <th className="text-left py-2">Location</th>
                <th className="text-left py-2">Stock</th>
                <th className="text-left py-2">Price</th>
                <th className="text-left py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map(item => (
                <tr key={item.id} className="border-b">
                  <td className="py-2 font-medium">{item.name}</td>
                  <td className="py-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      item.category === 'grocery' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {item.category}
                    </span>
                  </td>
                  <td className="py-2">{item.location}</td>
                  <td className="py-2">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getStockColor(getStockPercentage(item.currentStock, item.maxStock))}`}
                          style={{ width: `${getStockPercentage(item.currentStock, item.maxStock)}%` }}
                        ></div>
                      </div>
                      <span className="text-xs">{item.currentStock}/{item.maxStock}</span>
                    </div>
                  </td>
                  <td className="py-2">${item.price.toFixed(2)}</td>
                  <td className="py-2">
                    <button 
                      onClick={() => addToCart(item)}
                      disabled={item.currentStock === 0}
                      className="px-3 py-1 bg-blue-500 text-white rounded text-xs disabled:bg-gray-300"
                    >
                      Add to Cart
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Shopping Cart */}
      <section className="card">
        <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          <div className="space-y-3">
            {cart.map(item => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-600">{item.location}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm">Qty: {item.quantity}</span>
                  <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded text-xs"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center pt-3 border-t">
              <div className="font-semibold">
                Total: ${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
              </div>
              <button 
                onClick={placeOrder}
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Order Tracking */}
      <section className="card">
        <h2 className="text-xl font-semibold mb-4">Order Tracking</h2>
        <div className="space-y-3">
          {orders.map(order => (
            <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">{order.name}</div>
                <div className="text-sm text-gray-600">{order.location}</div>
                <div className="text-sm text-gray-600">Qty: {order.quantity}</div>
              </div>
              <div className="text-right">
                <div className="font-medium">${(order.price * order.quantity).toFixed(2)}</div>
                <span className={`px-2 py-1 rounded text-xs ${
                  order.status === 'ready' ? 'bg-green-100 text-green-800' :
                  order.status === 'preparing' ? 'bg-yellow-100 text-yellow-800' :
                  order.status === 'pending' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Visual Analytics */}
      <section className="card">
        <h2 className="text-xl font-semibold mb-4">Visual Analytics</h2>
        
        {/* Stock Level Chart */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Inventory Levels by Location</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {['Beacon Hill Grocery-Pharmacy', 'Ballard Grocery-Pharmacy', 'Central District Grocery-Pharmacy', 'West Seattle Grocery-Pharmacy', 'Rainier Beach Grocery-Pharmacy'].map(location => {
              const locationItems = inventory.filter(item => item.location === location)
              const avgStock = locationItems.reduce((sum, item) => sum + (item.currentStock / item.maxStock), 0) / locationItems.length
              const stockColor = avgStock > 0.7 ? 'bg-green-500' : avgStock > 0.3 ? 'bg-yellow-500' : 'bg-red-500'
              
              return (
                <div key={location} className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">{location.split(' ')[0]} {location.split(' ')[1]}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Avg Stock Level</span>
                      <span>{(avgStock * 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${stockColor}`}
                        style={{ width: `${avgStock * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-600">
                      {locationItems.length} items • {locationItems.filter(item => item.currentStock < item.maxStock * 0.3).length} low stock
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Price Comparison Chart */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Predictable Pricing Across Network</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Item</th>
                  <th className="text-left py-2">Category</th>
                  <th className="text-center py-2">Beacon Hill</th>
                  <th className="text-center py-2">Ballard</th>
                  <th className="text-center py-2">Central District</th>
                  <th className="text-center py-2">West Seattle</th>
                  <th className="text-center py-2">Rainier Beach</th>
                  <th className="text-center py-2">Avg Price</th>
                </tr>
              </thead>
              <tbody>
                {['Fresh Apples', 'Whole Milk', 'Acetaminophen 500mg', 'Vitamin D3 1000 IU'].map(itemName => {
                  const itemPrices = inventory.filter(item => item.name === itemName)
                  const avgPrice = itemPrices.reduce((sum, item) => sum + item.price, 0) / itemPrices.length
                  
                  return (
                    <tr key={itemName} className="border-b">
                      <td className="py-2 font-medium">{itemName}</td>
                      <td className="py-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          itemPrices[0]?.category === 'grocery' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {itemPrices[0]?.category}
                        </span>
                      </td>
                      {['Beacon Hill Grocery-Pharmacy', 'Ballard Grocery-Pharmacy', 'Central District Grocery-Pharmacy', 'West Seattle Grocery-Pharmacy', 'Rainier Beach Grocery-Pharmacy'].map(location => {
                        const item = itemPrices.find(i => i.location === location)
                        const price = item?.price || 0
                        const isConsistent = Math.abs(price - avgPrice) < 0.1
                        
                        return (
                          <td key={location} className="py-2 text-center">
                            <span className={`px-2 py-1 rounded text-xs ${
                              isConsistent ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              ${price.toFixed(2)}
                            </span>
                          </td>
                        )
                      })}
                      <td className="py-2 text-center font-medium">${avgPrice.toFixed(2)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Flow Visualization */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Order Processing Flow</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{orders.filter(o => o.status === 'pending').length}</div>
              <div className="text-sm text-gray-600">Pending Orders</div>
              <div className="text-xs text-gray-500 mt-1">Awaiting processing</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{orders.filter(o => o.status === 'preparing').length}</div>
              <div className="text-sm text-gray-600">Preparing</div>
              <div className="text-xs text-gray-500 mt-1">Hub processing</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{orders.filter(o => o.status === 'ready').length}</div>
              <div className="text-sm text-gray-600">Ready for Pickup</div>
              <div className="text-xs text-gray-500 mt-1">At corner store</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-600">{orders.filter(o => o.status === 'completed').length}</div>
              <div className="text-sm text-gray-600">Completed</div>
              <div className="text-xs text-gray-500 mt-1">Customer picked up</div>
            </div>
          </div>
        </div>

        {/* Access Coverage Heatmap */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Access Coverage Analysis</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">85%</div>
              <div className="text-sm text-gray-600">Population within 1 mile of services</div>
              <div className="text-xs text-gray-500 mt-1">Target: 90%</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">92%</div>
              <div className="text-sm text-gray-600">Population within ½ mile of corner stores</div>
              <div className="text-xs text-gray-500 mt-1">Target: 95%</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">78%</div>
              <div className="text-sm text-gray-600">Population within ¼ mile of hubs</div>
              <div className="text-xs text-gray-500 mt-1">Target: 80%</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
