"use client"

import { useEffect, useState } from "react"
import { Plus, Edit2, Trash2, Search } from "lucide-react"
import CreateProduct from "./CreateProduct"

export const Products = () => {
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState<"create" | "edit">("create")
  const [currentProduct, setCurrentProduct] = useState<any | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  type AdminProduct = {
    id: number
    name: string
    collection: string
    price: string
    stock: number
    image: string
    images?: string[]
  }

  const seedProducts: AdminProduct[] = [
    {
      id: 1,
      name: "Seamaster Professional",
      collection: "Seamaster",
      price: "€5,900",
      stock: 12,
      image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400",
    },
    {
      id: 2,
      name: "Constellation Co-Axial",
      collection: "Constellation",
      price: "€7,200",
      stock: 8,
      image: "https://images.unsplash.com/photo-1587836374616-91235bd79e3c?w=400",
    },
    {
      id: 3,
      name: "Speedmaster Moonwatch",
      collection: "Speedmaster",
      price: "€6,500",
      stock: 15,
      image: "https://images.unsplash.com/photo-1609587312208-cea54be969e7?w=400",
    },
  ]

  const [products, setProducts] = useState<AdminProduct[]>(() => {
    const raw = localStorage.getItem("alma_admin_products")
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as AdminProduct[]
        return parsed.length ? parsed : seedProducts
      } catch {
        return seedProducts
      }
    }
    return seedProducts
  })

  useEffect(() => {
    localStorage.setItem("alma_admin_products", JSON.stringify(products))
  }, [products])

  useEffect(() => {
    if (!showModal) {
      const raw = localStorage.getItem("alma_admin_products")
      if (raw) {
        try {
          const parsed = JSON.parse(raw) as AdminProduct[]
          setProducts(parsed.length ? parsed : seedProducts)
        } catch {}
      }
    }
  }, [showModal])

  const handleDelete = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-4xl font-extralight tracking-[0.3em] mb-2 text-luxury-text uppercase">Productos</h1>
            <p className="text-muted-foreground tracking-wider">Gestiona tu catálogo de productos</p>
          </div>
          <button
            onClick={() => {
              setModalMode("create")
              setCurrentProduct(null)
              setShowModal(true)
            }}
              className="border border-gray-200 px-6 py-3 text-sm tracking-[0.12em] uppercase font-light hover:bg-luxury-gray/60 transition-colors flex items-center gap-2 rounded-md"
          >
            <Plus size={18} />
            Nuevo Producto
          </button>
        </div>

        {showModal && (
          <CreateProduct
            asModal
            mode={modalMode}
            initialProduct={currentProduct}
            onCancel={() => setShowModal(false)}
            onSaved={(saved) => {
              setProducts((prev) => {
                const exists = prev.some((p) => p.id === saved.id)
                return exists ? prev.map((p) => (p.id === saved.id ? saved : p)) : [saved, ...prev]
              })
            }}
          />
        )}

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full pl-12 pr-4 py-3 border border-gray-200 bg-white text-sm tracking-wide focus:outline-none focus:ring-1 focus:ring-luxury-burgundy transition-colors rounded-md"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products
            .filter((p) =>
              [p.name, p.collection, p.price].some((field) => field.toLowerCase().includes(searchTerm.toLowerCase())),
            )
            .map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 group hover:shadow-md transition-shadow"
              >
                <div className="aspect-square overflow-hidden bg-luxury-gray">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs tracking-[0.15em] text-muted-foreground uppercase mb-2">{product.collection}</p>
                  <h3 className="text-lg font-light tracking-wider mb-2 text-luxury-text">{product.name}</h3>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-xl font-light tracking-wide text-luxury-text">{product.price}</p>
                    <p
                      className={`text-sm tracking-wide ${product.stock < 10 ? "text-yellow-600 font-medium" : "text-muted-foreground"}`}
                    >
                      Stock: {product.stock}
                    </p>
                  </div>
                  {product.images && product.images.length > 1 && (
                    <div className="flex gap-2 mb-4">
                      {product.images.slice(1, 5).map((img, idx) => (
                        <div key={idx} className="w-10 h-10 rounded overflow-hidden border border-gray-200">
                          <img
                            src={img || "/placeholder.svg"}
                            alt={`miniatura-${idx}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setModalMode("edit")
                        setCurrentProduct(product)
                        setShowModal(true)
                      }}
                      className="flex-1 border border-gray-200 px-4 py-2 text-sm tracking-wider uppercase hover:bg-luxury-gray/60 transition-colors flex items-center justify-center gap-2 rounded-md"
                    >
                      <Edit2 size={14} />
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="border border-destructive text-destructive px-4 py-2 text-sm tracking-wider uppercase hover:bg-destructive hover:text-white transition-colors flex items-center justify-center gap-2 rounded-md"
                    >
                      <Trash2 size={14} />
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
