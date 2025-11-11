import { Save } from "lucide-react"

export const Settings = () => {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extralight tracking-[0.3em] mb-2 text-luxury-text uppercase">Configuración</h1>
        <p className="text-muted-foreground tracking-wider mb-12">Configura tu sitio web</p>

        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-extralight tracking-[0.2em] mb-6 text-luxury-text uppercase">
              Información General
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs tracking-[0.15em] text-luxury-text uppercase mb-2 font-light">
                  Nombre de la Tienda
                </label>
                <input
                  type="text"
                  defaultValue="Alma"
                  className="w-full px-4 py-3 border border-gray-200 bg-white text-sm tracking-wide focus:outline-none focus:ring-1 focus:ring-luxury-burgundy transition-colors rounded-md"
                />
              </div>
              <div>
                <label className="block text-xs tracking-[0.15em] text-luxury-text uppercase mb-2 font-light">
                  Eslogan
                </label>
                <input
                  type="text"
                  defaultValue="Excelencia Suiza desde 1848"
                  className="w-full px-4 py-3 border border-gray-200 bg-white text-sm tracking-wide focus:outline-none focus:ring-1 focus:ring-luxury-burgundy transition-colors rounded-md"
                />
              </div>
              <div>
                <label className="block text-xs tracking-[0.15em] text-luxury-text uppercase mb-2 font-light">
                  Descripción del Sitio
                </label>
                <textarea
                  rows={4}
                  defaultValue="Relojes suizos de lujo que combinan artesanía tradicional con innovación tecnológica."
                  className="w-full px-4 py-3 border border-gray-200 bg-white text-sm tracking-wide focus:outline-none focus:ring-1 focus:ring-luxury-burgundy transition-colors resize-none rounded-md"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-extralight tracking-[0.2em] mb-6 text-luxury-text uppercase">
              Información de Contacto
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs tracking-[0.15em] text-luxury-text uppercase mb-2 font-light">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue="contacto@alma.ch"
                    className="w-full px-4 py-3 border border-gray-200 bg-white text-sm tracking-wide focus:outline-none focus:ring-1 focus:ring-luxury-burgundy transition-colors rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.15em] text-luxury-text uppercase mb-2 font-light">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    defaultValue="+41 22 123 4567"
                    className="w-full px-4 py-3 border border-gray-200 bg-white text-sm tracking-wide focus:outline-none focus:ring-1 focus:ring-luxury-burgundy transition-colors rounded-md"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs tracking-[0.15em] text-luxury-text uppercase mb-2 font-light">
                  Dirección
                </label>
                <input
                  type="text"
                  defaultValue="Rue du Rhône 75, 1204 Genève, Suiza"
                  className="w-full px-4 py-3 border border-gray-200 bg-white text-sm tracking-wide focus:outline-none focus:ring-1 focus:ring-luxury-burgundy transition-colors rounded-md"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-extralight tracking-[0.2em] mb-6 text-luxury-text uppercase">
              Redes Sociales
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs tracking-[0.15em] text-luxury-text uppercase mb-2 font-light">
                  Instagram
                </label>
                <input
                  type="text"
                  placeholder="https://instagram.com/alma"
                  className="w-full px-4 py-3 border border-gray-200 bg-white text-sm tracking-wide focus:outline-none focus:ring-1 focus:ring-luxury-burgundy transition-colors rounded-md"
                />
              </div>
              <div>
                <label className="block text-xs tracking-[0.15em] text-luxury-text uppercase mb-2 font-light">
                  Facebook
                </label>
                <input
                  type="text"
                  placeholder="https://facebook.com/alma"
                  className="w-full px-4 py-3 border border-gray-200 bg-white text-sm tracking-wide focus:outline-none focus:ring-1 focus:ring-luxury-burgundy transition-colors rounded-md"
                />
              </div>
              <div>
                <label className="block text-xs tracking-[0.15em] text-luxury-text uppercase mb-2 font-light">
                  YouTube
                </label>
                <input
                  type="text"
                  placeholder="https://youtube.com/alma"
                  className="w-full px-4 py-3 border border-gray-200 bg-white text-sm tracking-wide focus:outline-none focus:ring-1 focus:ring-luxury-burgundy transition-colors rounded-md"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-extralight tracking-[0.2em] mb-6 text-luxury-text uppercase">
              Contenido de Inicio
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs tracking-[0.15em] text-luxury-text uppercase mb-2 font-light">
                  Título Hero
                </label>
                <input
                  type="text"
                  defaultValue="Excelencia Suiza"
                  className="w-full px-4 py-3 border border-gray-200 bg-white text-sm tracking-wide focus:outline-none focus:ring-1 focus:ring-luxury-burgundy transition-colors rounded-md"
                />
              </div>
              <div>
                <label className="block text-xs tracking-[0.15em] text-luxury-text uppercase mb-2 font-light">
                  Subtítulo Hero
                </label>
                <input
                  type="text"
                  defaultValue="Precisión en cada momento"
                  className="w-full px-4 py-3 border border-gray-200 bg-white text-sm tracking-wide focus:outline-none focus:ring-1 focus:ring-luxury-burgundy transition-colors rounded-md"
                />
              </div>
              <div>
                <label className="block text-xs tracking-[0.15em] text-luxury-text uppercase mb-2 font-light">
                  Imagen Hero
                </label>
                <input
                  type="file"
                  className="w-full px-4 py-3 border border-gray-200 bg-white text-sm tracking-wide focus:outline-none focus:ring-1 focus:ring-luxury-burgundy transition-colors rounded-md"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-extralight tracking-[0.2em] mb-6 text-luxury-text uppercase">Envío y Pago</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs tracking-[0.15em] text-luxury-text uppercase mb-2 font-light">
                  Costo de Envío
                </label>
                <input
                  type="text"
                  defaultValue="Gratis en pedidos superiores a €1,000"
                  className="w-full px-4 py-3 border border-gray-200 bg-white text-sm tracking-wide focus:outline-none focus:ring-1 focus:ring-luxury-burgundy transition-colors rounded-md"
                />
              </div>
              <div>
                <label className="block text-xs tracking-[0.15em] text-luxury-text uppercase mb-2 font-light">
                  Tiempo de Entrega
                </label>
                <input
                  type="text"
                  defaultValue="2-5 días hábiles"
                  className="w-full px-4 py-3 border border-gray-200 bg-white text-sm tracking-wide focus:outline-none focus:ring-1 focus:ring-luxury-burgundy transition-colors rounded-md"
                />
              </div>
              <div>
                <label className="block text-xs tracking-[0.15em] text-luxury-text uppercase mb-2 font-light">
                  Métodos de Pago Aceptados
                </label>
                <textarea
                  rows={3}
                  defaultValue="Tarjetas de crédito, PayPal, Transferencia bancaria"
                  className="w-full px-4 py-3 border border-gray-200 bg-white text-sm tracking-wide focus:outline-none focus:ring-1 focus:ring-luxury-burgundy transition-colors resize-none rounded-md"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="bg-luxury-green text-white px-12 py-4 text-sm tracking-[0.12em] uppercase font-light hover:opacity-90 transition-opacity flex items-center gap-2 rounded-md">
              <Save size={18} />
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
