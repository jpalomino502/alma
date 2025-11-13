import { useEffect, useState, useMemo } from "react"
import { Link } from "react-router-dom"
import { useCart } from "@/context/CartContext"
import { toast } from "sonner"
import type { FilterState } from "./ProductFilters"

type AdminProduct = {
  id: number
  sku?: string
  name: string
  category: string
  price_label?: string
  description?: string
  specifications?: string[]
  image?: string | null
  images?: string[]
}

type Props = {
  limit?: number
  showViewAll?: boolean
  filters?: FilterState
}

const ProductList = ({ limit, showViewAll = false, filters }: Props) => {
  const { addToCart } = useCart()
  const [products, setProducts] = useState<AdminProduct[]>([])
  const [loading, setLoading] = useState(false)
  const API_BASE = (import.meta as any).env?.VITE_API_BASE || "http://localhost:8000"

  const resolveImageUrl = (img?: string | null) => {
    if (!img) return "/placeholder.svg"
    if (/^https?:\/\//i.test(img)) return img
    return `${API_BASE}/storage/${img}`
  }

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${API_BASE}/api/products`, { headers: { Accept: "application/json" } })
        if (!res.ok) throw new Error("Error al cargar productos")
        const data = await res.json()
        setProducts(Array.isArray(data) ? data : [])
      } catch {
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const getPriceNumber = (p: AdminProduct) => {
    const n = (p as any).price_number
    if (typeof n === "number" && !Number.isNaN(n)) return n
    const label = p.price_label ?? ""
    return Number(String(label).replace(/[^\d]/g, ""))
  }

  const filtered = useMemo(() => {
    let arr = [...products]
    if (filters) {
      const cats = filters.categories
      if (Array.isArray(cats) && cats.length > 0 && !cats.includes("Todos")) {
        arr = arr.filter((p) => cats.includes(p.category))
      }
      const range = filters.priceRange
      if (range && range !== "all") {
        arr = arr.filter((p) => {
          const price = getPriceNumber(p)
          if (range === "0-500") return price < 500
          if (range === "500-1000") return price >= 500 && price <= 1000
          if (range === "1000-2000") return price >= 1000 && price <= 2000
          if (range === "2000+") return price > 2000
          return true
        })
      }
      const sort = filters.sortBy
      if (sort === "price-asc") arr.sort((a, b) => getPriceNumber(a) - getPriceNumber(b))
      else if (sort === "price-desc") arr.sort((a, b) => getPriceNumber(b) - getPriceNumber(a))
      else if (sort === "name-asc") arr.sort((a, b) => a.name.localeCompare(b.name))
      else arr.sort((a, b) => (b.id ?? 0) - (a.id ?? 0))
    }
    return arr
  }, [products, filters])

  const items = limit ? filtered.slice(0, limit) : filtered

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {!loading && items.map((p) => {
          const img = (Array.isArray(p.images) && p.images.length ? p.images[0] : p.image) || null
          return (
            <div key={p.id} className="group">
              <Link to={`/products/${p.sku ?? p.id}`} className="no-underline text-inherit">
                <div className="aspect-square overflow-hidden bg-zinc-50 mb-4">
                  <img src={resolveImageUrl(img)} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <p className="text-xs font-normal tracking-wide mb-1.5 text-black/60 uppercase">{p.category}</p>
                <h3 className="text-sm font-light tracking-wide mb-1.5 text-black">{p.name}</h3>
                <p className="text-sm font-normal tracking-wide text-[#314737]">{p.price_label ?? ""}</p>
              </Link>
              <div className="mt-4">
                <button
                  onClick={() => {
                    addToCart({
                      id: p.id,
                      name: p.name,
                      collection: p.category,
                      price: p.price_label ?? "",
                      priceNumber: getPriceNumber(p),
                      image: resolveImageUrl(img),
                      description: p.description ?? "",
                      specifications: Array.isArray(p.specifications) ? p.specifications : [],
                    })
                    toast.success("Producto agregado al carrito")
                  }}
                  className="border border-[#314737] text-[#314737] px-4 py-2 text-sm tracking-wide uppercase font-light hover:bg-[#314737] hover:text-white transition-colors"
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          )
        })}
      </div>
      {showViewAll && (
        <div className="text-center mt-16">
          <Link to="/products">
            <button className="bg-[#314737] text-white border-0 px-10 py-3 text-sm tracking-wide cursor-pointer transition-all font-light hover:bg-[#314737] hover:opacity-90 hover:-translate-y-0.5">
              VER TODOS LOS PRODUCTOS
            </button>
          </Link>
        </div>
      )}
    </section>
  )
}

export default ProductList