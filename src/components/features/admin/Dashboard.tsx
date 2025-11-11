"use client"

import { useMemo } from "react"
import { Package, ShoppingCart, Users, AlertTriangle, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react"

export const Dashboard = () => {
  const products: { id: number; name: string; collection: string; price: string; stock: number; image: string }[] =
    (() => {
      const raw = localStorage.getItem("alma_admin_products")
      if (!raw) return []
      try {
        return JSON.parse(raw)
      } catch {
        return []
      }
    })()

  const lowStockProducts = useMemo(() => products.filter((p) => p.stock < 10), [products])
  const categories = useMemo(() => {
    const raw = localStorage.getItem("alma_admin_categories")
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as string[]
        return parsed.length ? parsed : ["Seamaster", "Constellation", "Speedmaster", "De Ville"]
      } catch {}
    }
    return ["Seamaster", "Constellation", "Speedmaster", "De Ville"]
  }, [])

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    products.forEach((p) => {
      counts[p.collection] = (counts[p.collection] || 0) + 1
    })
    categories.forEach((c) => {
      if (counts[c] === undefined) counts[c] = 0
    })
    return counts
  }, [products, categories])

  const stats = [
    {
      label: "Total Productos",
      value: products.length.toString(),
      icon: Package,
      growth: "+12%",
      isPositive: true,
      color: "text-blue-600",
    },
    {
      label: "Pedidos Pendientes",
      value: "12",
      icon: ShoppingCart,
      growth: "+8%",
      isPositive: true,
      color: "text-green-600",
    },
    {
      label: "Clientes Registrados",
      value: "156",
      icon: Users,
      growth: "+23%",
      isPositive: true,
      color: "text-purple-600",
    },
    {
      label: "Ingresos del Mes",
      value: "€45,200",
      icon: DollarSign,
      growth: "-3%",
      isPositive: false,
      color: "text-orange-600",
    },
  ]

  const recentOrders = [
    {
      id: "#ORD-001",
      customer: "María García",
      product: "Seamaster Professional",
      status: "Pendiente",
      amount: "€5,900",
      time: "Hace 2h",
    },
    {
      id: "#ORD-002",
      customer: "Carlos Ruiz",
      product: "Speedmaster Moonwatch",
      status: "Enviado",
      amount: "€6,500",
      time: "Hace 5h",
    },
    {
      id: "#ORD-003",
      customer: "Ana López",
      product: "Constellation Co-Axial",
      status: "Entregado",
      amount: "€7,200",
      time: "Hace 1d",
    },
    {
      id: "#ORD-004",
      customer: "Pedro Martínez",
      product: "De Ville Prestige",
      status: "Pendiente",
      amount: "€4,800",
      time: "Hace 2d",
    },
  ]

  const salesData = {
    week: [12, 19, 15, 25, 22, 30, 28],
    month: [
      45, 52, 48, 65, 58, 72, 68, 75, 70, 82, 78, 85, 90, 88, 95, 92, 98, 94, 100, 96, 105, 102, 108, 110, 115, 112,
      118, 120, 125, 122,
    ],
    year: [450, 520, 480, 650, 580, 720, 680, 750, 700, 820, 780, 850],
  }

  const maxValue = Math.max(...salesData.month)

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extralight tracking-[0.3em] mb-2 text-luxury-text uppercase">Dashboard</h1>
        <p className="text-muted-foreground tracking-wider mb-12">Resumen general de la tienda</p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-light ${stat.isPositive ? "text-green-600" : "text-red-600"}`}
                >
                  {stat.isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  {stat.growth}
                </div>
              </div>
              <p className="text-xs tracking-wider text-muted-foreground mb-1 uppercase">{stat.label}</p>
              <p className="text-3xl font-extralight tracking-wider text-luxury-text">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Sales Chart */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-extralight tracking-[0.2em] text-luxury-text uppercase">Ventas</h2>
                <p className="text-sm text-muted-foreground tracking-wide">Evolución de ventas</p>
              </div>
              <div className="flex gap-2">
                {(["week", "month", "year"] as const).map((period) => (
                  <button
                    key={period}
                    onClick={() => {}}
                    className={`px-3 py-1 text-xs tracking-wider uppercase transition-colors rounded-md ${
                      period === "month" ? "bg-luxury-green text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {period === "week" ? "Semana" : period === "month" ? "Mes" : "Año"}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-end gap-1 h-48">
              {salesData.month.map((value, idx) => (
                <div key={idx} className="flex-1 flex flex-col justify-end">
                  <div
                    className="bg-luxury-green/20 hover:bg-luxury-green/40 transition-colors rounded-t"
                    style={{ height: `${(value / maxValue) * 100}%` }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Low Stock Alert */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="text-yellow-600" size={20} />
              <h2 className="text-lg font-extralight tracking-[0.2em] text-luxury-text uppercase">Stock Bajo</h2>
            </div>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {lowStockProducts.length > 0 ? (
                lowStockProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded transition-colors"
                  >
                    <div className="w-12 h-12 rounded overflow-hidden bg-gray-100">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-light tracking-wide truncate">{product.name}</p>
                      <p className="text-xs text-muted-foreground tracking-wide">Stock: {product.stock}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground tracking-wide">No hay productos con stock bajo</p>
              )}
            </div>
          </div>
        </div>

        {/* Categories Overview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-12">
          <h2 className="text-xl font-extralight tracking-[0.2em] mb-6 text-luxury-text uppercase">Categorías</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category) => {
              const count = categoryCounts[category] || 0
              const percentage = products.length > 0 ? (count / products.length) * 100 : 0
              return (
                <div key={category} className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm tracking-wider font-light">{category}</p>
                    <p className="text-lg font-extralight tracking-wide text-luxury-text">{count}</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-luxury-green h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  {count < 5 && count > 0 && <p className="text-xs text-yellow-600 mt-1">Pocos productos</p>}
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-8 py-6 border-b border-gray-200">
            <h2 className="text-2xl font-extralight tracking-[0.2em] text-luxury-text uppercase">Pedidos Recientes</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-luxury-gray">
                <tr>
                  <th className="px-8 py-4 text-left text-xs tracking-[0.15em] text-luxury-text uppercase font-light">
                    ID Pedido
                  </th>
                  <th className="px-8 py-4 text-left text-xs tracking-[0.15em] text-luxury-text uppercase font-light">
                    Cliente
                  </th>
                  <th className="px-8 py-4 text-left text-xs tracking-[0.15em] text-luxury-text uppercase font-light">
                    Producto
                  </th>
                  <th className="px-8 py-4 text-left text-xs tracking-[0.15em] text-luxury-text uppercase font-light">
                    Estado
                  </th>
                  <th className="px-8 py-4 text-left text-xs tracking-[0.15em] text-luxury-text uppercase font-light">
                    Monto
                  </th>
                  <th className="px-8 py-4 text-left text-xs tracking-[0.15em] text-luxury-text uppercase font-light">
                    Tiempo
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentOrders.map((order, index) => (
                  <tr key={index} className="hover:bg-luxury-gray/30 transition-colors">
                    <td className="px-8 py-5 text-sm tracking-wide font-light">{order.id}</td>
                    <td className="px-8 py-5 text-sm tracking-wide font-light">{order.customer}</td>
                    <td className="px-8 py-5 text-sm tracking-wide font-light">{order.product}</td>
                    <td className="px-8 py-5">
                      <span
                        className={`inline-block px-3 py-1 text-xs tracking-wider uppercase ${
                          order.status === "Entregado"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Enviado"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-sm tracking-wide font-light">{order.amount}</td>
                    <td className="px-8 py-5 text-sm tracking-wide font-light text-muted-foreground">{order.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
