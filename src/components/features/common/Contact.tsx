import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";

export const ContactView = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Mensaje enviado. Nos pondremos en contacto pronto.");
  };

  return (
    <div className="min-h-screen bg-white pt-24 md:pt-32">
      <div className="max-w-[1400px] mx-auto px-8 py-16">
        <div className="justify-center">
          <h1 className="text-4xl font-light mb-4 text-center text-luxury-text">CONTACTO</h1>
          <p className="text-center pb-16 text-muted-foreground tracking-wide">Estamos aquí para ayudarte</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <div className="mb-6">
              <h2 className="text-2xl font-light tracking-wider mb-2">Envíanos un mensaje</h2>
              <p className="text-sm text-muted-foreground">
                Responderemos a tu consulta en menos de 24 horas
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium">Nombre</label>
                  <input 
                    id="firstName" 
                    required 
                    className="w-full px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-luxury-burgundy focus:border-luxury-burgundy"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium">Apellido</label>
                  <input 
                    id="lastName" 
                    required 
                    className="w-full px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-luxury-burgundy focus:border-luxury-burgundy"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <input 
                  id="email" 
                  type="email" 
                  required 
                  className="w-full px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-luxury-burgundy focus:border-luxury-burgundy"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">Teléfono (opcional)</label>
                <input 
                  id="phone" 
                  type="tel" 
                  className="w-full px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-luxury-burgundy focus:border-luxury-burgundy"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">Asunto</label>
                <input 
                  id="subject" 
                  required 
                  className="w-full px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-luxury-burgundy focus:border-luxury-burgundy"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Mensaje</label>
                <textarea
                  id="message"
                  rows={6}
                  required
                  className="w-full px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-luxury-burgundy focus:border-luxury-burgundy resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-luxury-burgundy hover:bg-luxury-burgundyHover text-white py-3 px-6 tracking-wider transition-colors"
              >
                ENVIAR MENSAJE
              </button>
            </form>
          </div>

          {/* Información de contacto */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h2 className="text-2xl font-light tracking-wider mb-6">Información de contacto</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 bg-luxury-burgundy/10 rounded-full flex items-center justify-center">
                    <Mail className="text-luxury-text" size={20} />
                  </div>
                  <div>
                    <h3 className="font-light mb-1">Email</h3>
                    <p className="text-muted-foreground">info@alma-watches.com</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 bg-luxury-burgundy/10 rounded-full flex items-center justify-center">
                    <Phone className="text-luxury-text" size={20} />
                  </div>
                  <div>
                    <h3 className="font-light mb-1">Teléfono</h3>
                    <p className="text-muted-foreground">+41 22 123 4567</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 bg-luxury-burgundy/10 rounded-full flex items-center justify-center">
                    <MapPin className="text-luxury-text" size={20} />
                  </div>
                  <div>
                    <h3 className="font-light mb-1">Boutique Principal</h3>
                    <p className="text-muted-foreground">
                      Rue du Rhône 123<br />
                      1204 Ginebra, Suiza
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h2 className="text-2xl font-light tracking-wider mb-6">Horario de atención</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Lunes - Viernes</span>
                  <span>9:00 - 19:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sábado</span>
                  <span>10:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Domingo</span>
                  <span>Cerrado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
