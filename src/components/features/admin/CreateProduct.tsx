"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Save, ArrowLeft, X, Upload, ImageIcon, Trash2, GripVertical } from "lucide-react"
import { toast } from "sonner"

type CreateProductProps = {
  mode?: "create" | "edit"
  initialProduct?: {
    id?: number
    name?: string
    collection?: string
    price?: string
    stock?: number | ""
    image?: string
    images?: string[]
    sku?: string
    description?: string
    specs?: string
  } | null
  asModal?: boolean
  onCancel?: () => void
  onSaved?: (product: any) => void
}

export const CreateProduct = ({
  mode = "create",
  initialProduct = null,
  asModal = false,
  onCancel,
  onSaved,
}: CreateProductProps) => {
  const navigate = useNavigate()
  const defaultCategories = ["Seamaster", "Constellation", "Speedmaster", "De Ville"]
  const [name, setName] = useState("")
  const [categories] = useState<string[]>(() => {
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
  const [collection, setCollection] = useState<string>(() => {
    const raw = localStorage.getItem("alma_admin_categories")
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as string[]
        if (parsed.length) return parsed[0]
      } catch {}
    }
    return defaultCategories[0]
  })
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState<number | "">("")
  const [sku, setSku] = useState("")
  const [description, setDescription] = useState("")
  const [specs, setSpecs] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [newImageUrl, setNewImageUrl] = useState("")
  const [uploadMethod, setUploadMethod] = useState<"url" | "file">("url")

  useEffect(() => {
    if (initialProduct) {
      setName(initialProduct.name ?? "")
      setCollection(initialProduct.collection ?? categories[0])
      setPrice(initialProduct.price ?? "")
      setStock(initialProduct.stock ?? "")
      setSku(initialProduct.sku ?? "")
      setDescription(initialProduct.description ?? "")
      setSpecs(initialProduct.specs ?? "")
      setImages(initialProduct.images ?? [])
    }
  }, [initialProduct, categories])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    Array.from(files).forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setImages((prev) => [...prev, result])
      }
      reader.readAsDataURL(file)
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !price || stock === "" || images.length === 0) {
      toast.error("Completa nombre, precio, stock y al menos una imagen")
      return
    }

    const raw = localStorage.getItem("alma_admin_products")
    const existing = raw ? (JSON.parse(raw) as any[]) : []
    const id = mode === "edit" && initialProduct?.id ? initialProduct.id : Date.now()

    const product = {
      id,
      name,
      collection,
      price,
      stock: typeof stock === "number" ? stock : Number.parseInt(String(stock) || "0", 10),
      image: images[0],
      images,
      sku,
      description,
      specs,
    }

    let updated: any[] = []
    if (mode === "edit" && initialProduct?.id) {
      updated = existing.map((p) => (p.id === initialProduct.id ? product : p))
      toast.success("Producto actualizado")
    } else {
      updated = [product, ...existing]
      toast.success("Producto creado")
    }
    localStorage.setItem("alma_admin_products", JSON.stringify(updated))

    if (asModal) {
      onSaved?.(product)
      onCancel?.()
    } else {
      navigate("/admin/products")
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const moveImage = (fromIndex: number, toIndex: number) => {
    setImages((prev) => {
      const newImages = [...prev]
      const [removed] = newImages.splice(fromIndex, 1)
      newImages.splice(toIndex, 0, removed)
      return newImages
    })
  }

  const form = (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 w-full max-w-4xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs tracking-[0.15em] text-luxury-text uppercase mb-2 font-light">
              Nombre del Producto
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 bg-white text-sm tracking-wide focus:outline-none focus:ring-1 focus:ring-luxury-burgundy transition-colors rounded-md"
              placeholder="Ej: Seamaster Professional"
            />
          </div>
          <div>
            <label className="block text-xs tracking-[0.15em] text-luxury-text uppercase mb-2 font-light">
              Colección
            </label>
            <select
              value={collection}
              onChange={(e) => setCollection(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 bg-white text-sm tracking-wide focus:outline-none focus:ring-1 focus:ring-luxury-burgundy transition-colors rounded-md"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs tracking-[0.15em] text-luxury-text uppercase mb-2 font-light">Precio</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 bg-white text-sm tracking-wide focus:outline-none focus:ring-1 focus:ring-luxury-burgundy transition-colors rounded-md"
              placeholder="€5,900"
            />
          </div>
          <div>
            <label className="block text-xs tracking-[0.15em] text-luxury-text uppercase mb-2 font-light">Stock</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-200 bg-white text-sm tracking-wide focus:outline-none focus:ring-1 focus:ring-luxury-burgundy transition-colors rounded-md"
              placeholder="12"
            />
          </div>
          <div>
            <label className="block text-xs tracking-[0.15em] text-luxury-text uppercase mb-2 font-light">SKU</label>
            <input
              type="text"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 bg-white text-sm tracking-wide focus:outline-none focus:ring-1 focus:ring-luxury-burgundy transition-colors rounded-md"
              placeholder="WSM-001"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs tracking-[0.15em] text-luxury-text uppercase mb-2 font-light">
            Descripción
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 bg-white text-sm tracking-wide focus:outline-none focus:ring-1 focus:ring-luxury-burgundy transition-colors resize-none rounded-md"
            placeholder="Descripción detallada del producto..."
          />
        </div>

        <div>
          <label className="block text-xs tracking-[0.15em] text-luxury-text uppercase mb-2 font-light">
            Especificaciones
          </label>
          <textarea
            rows={4}
            value={specs}
            onChange={(e) => setSpecs(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 bg-white text-sm tracking-wide focus:outline-none focus:ring-1 focus:ring-luxury-burgundy transition-colors resize-none rounded-md"
            placeholder="Una especificación por línea..."
          />
        </div>

        <div>
          <label className="block text-xs tracking-[0.15em] text-luxury-text uppercase mb-3 font-light">
            Galería de Imágenes {images.length > 0 && `(${images.length})`}
          </label>

          <div className="flex gap-2 mb-4">
            <button
              type="button"
              onClick={() => setUploadMethod("url")}
              className={`px-4 py-2 text-xs tracking-wider uppercase rounded-md transition-colors ${
                uploadMethod === "url" ? "bg-luxury-green text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Por URL
            </button>
            <button
              type="button"
              onClick={() => setUploadMethod("file")}
              className={`px-4 py-2 text-xs tracking-wider uppercase rounded-md transition-colors ${
                uploadMethod === "file" ? "bg-luxury-green text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Subir Archivo
            </button>
          </div>

          {uploadMethod === "url" ? (
            <div className="flex gap-2 mb-4">
              <input
                type="url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-200 bg-white text-sm tracking-wide focus:outline-none focus:ring-1 focus:ring-luxury-burgundy transition-colors rounded-md"
                placeholder="https://ejemplo.com/imagen.jpg"
              />
              <button
                type="button"
                onClick={() => {
                  const url = newImageUrl.trim()
                  if (!url) return
                  setImages((prev) => [...prev, url])
                  setNewImageUrl("")
                  toast.success("Imagen agregada")
                }}
                className="bg-luxury-green text-white px-6 py-3 text-sm tracking-[0.12em] uppercase font-light hover:opacity-90 transition-opacity rounded-md flex items-center gap-2"
              >
                <ImageIcon size={16} />
                Agregar
              </button>
            </div>
          ) : (
            <div className="mb-4">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-luxury-green transition-colors bg-gray-50">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600 tracking-wide">
                    <span className="font-light">Click para subir</span> o arrastra y suelta
                  </p>
                  <p className="text-xs text-gray-500 tracking-wide">PNG, JPG, WebP (MAX. 5MB)</p>
                </div>
                <input type="file" className="hidden" accept="image/*" multiple onChange={handleFileUpload} />
              </label>
            </div>
          )}

          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative group aspect-square rounded-lg overflow-hidden border-2 border-gray-200 hover:border-luxury-green transition-colors"
                >
                  {idx === 0 && (
                    <div className="absolute top-2 left-2 z-10 bg-luxury-green text-white px-2 py-1 text-xs tracking-wider uppercase rounded">
                      Principal
                    </div>
                  )}
                  <img
                    src={img || "/placeholder.svg"}
                    alt={`Producto ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    {idx > 0 && (
                      <button
                        type="button"
                        onClick={() => moveImage(idx, idx - 1)}
                        className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                        title="Mover izquierda"
                      >
                        <GripVertical size={16} />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 size={16} />
                    </button>
                    {idx < images.length - 1 && (
                      <button
                        type="button"
                        onClick={() => moveImage(idx, idx + 1)}
                        className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                        title="Mover derecha"
                      >
                        <GripVertical size={16} className="rotate-180" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="bg-luxury-green text-white px-8 py-3 text-sm tracking-[0.12em] uppercase font-light hover:opacity-90 transition-opacity flex items-center gap-2 rounded-md"
          >
            <Save size={18} />
            {mode === "edit" ? "Actualizar" : "Guardar Producto"}
          </button>
          <button
            type="button"
            onClick={() => {
              if (asModal) onCancel?.()
              else navigate("/admin/products")
            }}
            className="border border-gray-200 px-8 py-3 text-sm tracking-[0.12em] uppercase font-light hover:bg-luxury-gray/60 transition-colors rounded-md"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )

  if (asModal) {
    return (
      <div className="fixed inset-0 z-1000 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50" onClick={onCancel} />
        <div className="relative z-1001 w-[95vw] max-w-4xl">
          <div className="bg-white rounded-lg shadow-xl border border-gray-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div>
                <h1 className="text-xl sm:text-2xl font-extralight tracking-[0.2em] text-luxury-text uppercase">
                  {mode === "edit" ? "Editar Producto" : "Nuevo Producto"}
                </h1>
                <p className="text-muted-foreground tracking-wider text-xs sm:text-sm">
                  Completa la información para el catálogo
                </p>
              </div>
              <button
                onClick={onCancel}
                className="border border-gray-200 px-3 py-2 text-xs sm:text-sm tracking-[0.12em] uppercase font-light hover:bg-luxury-gray/60 transition-colors rounded-md flex items-center gap-2"
              >
                <X size={16} />
                Cerrar
              </button>
            </div>
            <div className="max-h-[75vh] overflow-y-auto p-6">{form}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extralight tracking-[0.2em] mb-2 text-luxury-text uppercase">
              Nuevo Producto
            </h1>
            <p className="text-muted-foreground tracking-wider">Completa la información para añadir al catálogo</p>
          </div>
          <button
            onClick={() => navigate("/admin/products")}
            className="border border-gray-200 px-6 py-3 text-sm tracking-[0.12em] uppercase font-light hover:bg-luxury-gray/60 transition-colors flex items-center gap-2 rounded-md"
          >
            <ArrowLeft size={18} />
            Volver
          </button>
        </div>
        {form}
      </div>
    </div>
  )
}

export default CreateProduct
