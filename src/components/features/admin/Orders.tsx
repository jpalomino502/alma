"use client"

import { useState, useEffect, useMemo } from "react"
import { Eye, Download, Plus, Tag, Trash2, Edit2 } from "lucide-react"
import { Link } from "react-router-dom"
import CreateProduct from "./CreateProduct"

export const Orders = () => {
  const defaultCategories = ["Seamaster", "Constellation", "Speedmaster", "De Ville"]
  const [showProductModal, setShowProductModal] = useState(false)

  const [categories, setCategories] = useState<string[]>(() => {
    const raw = localStorage.getItem("alma_admin_categories")
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as string[]
        return parsed.length ? parsed : defaultCategories
      } catch {
        return defaultCategories
      }
    }
    return defaultCategories
  })

  const [newCategory, setNewCategory] = useState("")

  const orders = [
    {
      id: "#ORD-001",
      date: "15 Dic 2024",
      customer: "María García",
      email: "maria.garcia@email.com",
      product: "Seamaster Professional",
      quantity: 1,
      status: "Pendiente",
      amount: "€5,900",
      shipping: "Calle Mayor 123, Madrid",
    },
    {
      id: "#ORD-002",
      date: "14 Dic 2024",
      customer: "Carlos Ruiz",
      email: "carlos.ruiz@email.com",
      product: "Speedmaster Moonwatch",
      quantity: 1,
      status: "Enviado",
      amount: "€6,500",
      shipping: "Av. Diagonal 456, Barcelona",
    },
    {
      id: "#ORD-003",
      date: "13 Dic 2024",
      customer: "Ana López",
      email: "ana.lopez@email.com",
      product: "Constellation Co-Axial",
      quantity: 1,
      status: "Entregado",
      amount: "€7,200",
      shipping: "Gran Vía 789, Valencia",
    },
    {
      id: "#ORD-004",
      date: "12 Dic 2024",
      customer: "Pedro Martínez",
      email: "pedro.martinez@email.com",
      product: "De Ville Prestige",
      quantity: 1,
      status: "Pendiente",
      amount: "€4,800",
      shipping: "Paseo de Gracia 321, Barcelona",
    },
  ]

  const statusColors = {
    Pendiente: "bg-yellow-100 text-yellow-800",
    Enviado: "bg-blue-100 text-blue-800",
    Entregado: "bg-green-100 text-green-800",
    Cancelado: "bg-red-100 text-red-800",
  }

  const products: { id: number; name: string; collection: string }[] = (() => {
    const raw = localStorage.getItem("alma_admin_products")
    if (!raw) return []
    try {
      return JSON.parse(raw)
    } catch {
      return []
    }
  })()

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

  const [editingCategory, setEditingCategory] = useState<string | null>(null)
  const [editingValue, setEditingValue] = useState("")

  const startEditCategory = (name: string) => {
    setEditingCategory(name)
    setEditingValue(name)
  }

  const saveEditCategory = () => {
    const oldName = editingCategory
    const newName = editingValue.trim()
    if (!oldName || !newName) {
      setEditingCategory(null)
      setEditingValue("")
      return
    }
    if (oldName === newName) {
      setEditingCategory(null)
      setEditingValue("")
      return
    }
    setCategories((prev) => prev.map((c) => (c === oldName ? newName : c)))
    const raw = localStorage.getItem("alma_admin_products")
    const existing = raw ? (JSON.parse(raw) as any[]) : []
    const updatedProducts = existing.map((p) => (p.collection === oldName ? { ...p, collection: newName } : p))
    localStorage.setItem("alma_admin_products", JSON.stringify(updatedProducts))
    setEditingCategory(null)
    setEditingValue("")
  }

  const deleteCategory = (name: string) => {
    setCategories((prev) => prev.filter((c) => c !== name))
  }

  const stats = useMemo(() => {
    const total = orders.length
    const pendiente = orders.filter((o) => o.status === "Pendiente").length
    const enviado = orders.filter((o) => o.status === "Enviado").length
    const entregado = orders.filter((o) => o.status === "Entregado").length
    return { total, pendiente, enviado, entregado }
  }, [orders])

  useEffect(() => {
    localStorage.setItem("alma_admin_categories", JSON.stringify(categories))
  }, [categories])

  const addCategory = () => {
    const name = newCategory.trim()
    if (!name) return
    if (categories.includes(name)) return
    setCategories((prev) => [name, ...prev])
    setNewCategory("")
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-4xl font-extralight tracking-[0.3em] mb-2 text-luxury-text uppercase">Pedidos</h1>
            <p className="text-muted-foreground tracking-wider">Gestiona todos los pedidos de la tienda</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="border border-gray-200 px-6 py-3 text-sm tracking-[0.12em] uppercase font-light hover:bg-luxury-gray/60 transition-colors flex items-center gap-2 rounded-md">
              <Download size={18} />
              Exportar
            </button>
            <button
              onClick={() => setShowProductModal(true)}
              className="bg-luxury-green text-white px-6 py-3 text-sm tracking-[0.12em] uppercase font-light hover:opacity-90 transition-opacity flex items-center gap-2 rounded-md"
            >
              <Plus size={18} />
              Nuevo Producto
            </button>
            <Link
              to="/admin/products"
              className="border border-gray-200 px-6 py-3 text-sm tracking-[0.12em] uppercase font-light hover:bg-luxury-gray/60 transition-colors flex items-center gap-2 rounded-md"
            >
              Gestionar Productos
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-[11px] tracking-[0.15em] text-muted-foreground uppercase">Total</p>
            <p className="text-2xl font-extralight tracking-[0.2em] text-luxury-text">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-[11px] tracking-[0.15em] text-muted-foreground uppercase">Pendiente</p>
            <p className="text-2xl font-extralight tracking-[0.2em] text-yellow-700">{stats.pendiente}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-[11px] tracking-[0.15em] text-muted-foreground uppercase">Enviado</p>
            <p className="text-2xl font-extralight tracking-[0.2em] text-blue-700">{stats.enviado}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-[11px] tracking-[0.15em] text-muted-foreground uppercase">Entregado</p>
            <p className="text-2xl font-extralight tracking-[0.2em] text-green-700">{stats.entregado}</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <select className="px-4 py-2 border border-gray-200 bg-white text-sm tracking-wide focus:outline-none focus:ring-1 focus:ring-luxury-burgundy transition-colors rounded-md">
              <option>Todos los estados</option>
              <option>Pendiente</option>
              <option>Enviado</option>
              <option>Entregado</option>
              <option>Cancelado</option>
            </select>
            <input
              type="date"
              className="px-4 py-2 border border-gray-200 bg-white text-sm tracking-wide focus:outline-none focus:ring-1 focus:ring-luxury-burgundy transition-colors rounded-md"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowProductModal(true)}
              className="bg-luxury-green text-white px-4 py-2 text-xs tracking-[0.12em] uppercase font-light hover:opacity-90 transition-opacity flex items-center gap-2 rounded-md"
            >
              <Plus size={16} />
              Nuevo Producto
            </button>
            <Link
              to="/admin/products"
              className="border border-gray-200 px-4 py-2 text-xs tracking-[0.12em] uppercase font-light hover:bg-luxury-gray/60 transition-colors flex items-center gap-2 rounded-md"
            >
              Gestionar Productos
            </Link>
          </div>
        </div>

        {showProductModal && (
          <CreateProduct
            asModal
            mode="create"
            onCancel={() => setShowProductModal(false)}
            onSaved={() => setShowProductModal(false)}
          />
        )}

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-luxury-gray">
                <tr>
                  <th className="px-6 py-4 text-left text-xs tracking-[0.15em] text-luxury-text uppercase font-light">
                    ID Pedido
                  </th>
                  <th className="px-6 py-4 text-left text-xs tracking-[0.15em] text-luxury-text uppercase font-light">
                    Fecha
                  </th>
                  <th className="px-6 py-4 text-left text-xs tracking-[0.15em] text-luxury-text uppercase font-light">
                    Cliente
                  </th>
                  <th className="px-6 py-4 text-left text-xs tracking-[0.15em] text-luxury-text uppercase font-light">
                    Producto
                  </th>
                  <th className="px-6 py-4 text-left text-xs tracking-[0.15em] text-luxury-text uppercase font-light">
                    Estado
                  </th>
                  <th className="px-6 py-4 text-left text-xs tracking-[0.15em] text-luxury-text uppercase font-light">
                    Monto
                  </th>
                  <th className="px-6 py-4 text-left text-xs tracking-[0.15em] text-luxury-text uppercase font-light">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order, index) => (
                  <tr key={index} className="hover:bg-luxury-gray/30 transition-colors">
                    <td className="px-6 py-5 text-sm tracking-wide font-light">{order.id}</td>
                    <td className="px-6 py-5 text-sm tracking-wide font-light">{order.date}</td>
                    <td className="px-6 py-5">
                      <div>
                        <p className="text-sm tracking-wide font-light">{order.customer}</p>
                        <p className="text-xs tracking-wide text-muted-foreground">{order.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm tracking-wide font-light">{order.product}</td>
                    <td className="px-6 py-5">
                      <span
                        className={`inline-block px-3 py-1 text-xs tracking-wider uppercase ${
                          statusColors[order.status as keyof typeof statusColors]
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm tracking-wide font-light">{order.amount}</td>
                    <td className="px-6 py-5">
                      <button className="border border-gray-200 px-3 py-1 text-xs tracking-wider uppercase hover:bg-luxury-gray/60 transition-colors flex items-center gap-2 rounded-md">
                        <Eye size={14} />
                        Ver
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-extralight tracking-[0.2em] text-luxury-text uppercase flex items-center gap-2">
              <Tag size={16} /> Categorías
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <div
                    key={c}
                    className="flex items-center gap-2 px-3 py-1 text-xs tracking-wider border border-gray-200 rounded-md bg-white"
                  >
                    {editingCategory === c ? (
                      <input
                        value={editingValue}
                        onChange={(e) => setEditingValue(e.target.value)}
                        className="px-2 py-1 border border-gray-200 rounded"
                      />
                    ) : (
                      <span>{c}</span>
                    )}
                    <span className="text-muted-foreground">({categoryCounts[c] ?? 0})</span>
                    {editingCategory === c ? (
                      <button onClick={saveEditCategory} className="px-2 py-1 bg-luxury-green text-white rounded">
                        Guardar
                      </button>
                    ) : (
                      <button
                        onClick={() => startEditCategory(c)}
                        className="text-muted-foreground hover:text-luxury-text"
                      >
                        <Edit2 size={14} />
                      </button>
                    )}
                    <button onClick={() => deleteCategory(c)} className="text-destructive hover:text-destructive/80">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Nueva categoría"
                className="flex-1 px-3 py-2 border border-gray-200 bg-white text-xs tracking-wide focus:outline-none focus:ring-1 focus:ring-luxury-burgundy transition-colors rounded-md"
              />
              <button
                onClick={addCategory}
                className="bg-luxury-burgundy text-white px-4 py-2 text-xs tracking-[0.12em] uppercase font-light hover:opacity-90 transition-opacity rounded-md"
              >
                Añadir
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-extralight tracking-[0.2em] mb-6 text-luxury-text uppercase">
            Detalle del Pedido
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xs tracking-[0.15em] text-luxury-text uppercase mb-4 font-light">
                Información del Cliente
              </h3>
              <div className="space-y-2 text-sm tracking-wide">
                <p>
                  <span className="text-muted-foreground">Nombre:</span> María García
                </p>
                <p>
                  <span className="text-muted-foreground">Email:</span> maria.garcia@email.com
                </p>
                <p>
                  <span className="text-muted-foreground">Teléfono:</span> +34 612 345 678
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-xs tracking-[0.15em] text-luxury-text uppercase mb-4 font-light">
                Dirección de Envío
              </h3>
              <p className="text-sm tracking-wide leading-relaxed">
                Calle Mayor 123, 4°A
                <br />
                28013 Madrid
                <br />
                España
              </p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-xs tracking-[0.15em] text-luxury-text uppercase mb-4 font-light">Actualizar Estado</h3>
            <div className="flex gap-4">
              <select className="px-4 py-2 border border-gray-200 bg-white text-sm tracking-wide focus:outline-none focus:ring-1 focus:ring-luxury-burgundy transition-colors rounded-md">
                <option>Pendiente</option>
                <option>Procesando</option>
                <option>Enviado</option>
                <option>Entregado</option>
                <option>Cancelado</option>
              </select>
              <button className="bg-luxury-green text-white px-6 py-2 text-sm tracking-[0.12em] uppercase font-light hover:opacity-90 transition-opacity rounded-md">
                Actualizar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
