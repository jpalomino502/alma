import { useState, useEffect } from "react";
import { toast } from "sonner";

interface LoginSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginSidebar = ({ isOpen, onClose }: LoginSidebarProps) => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Inicio de sesión exitoso");
    onClose();
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Cuenta creada exitosamente");
    onClose();
  };

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-1000 transition-opacity"
        onClick={onClose}
      />

      <div
        className="fixed inset-y-0 right-0 w-full sm:max-w-md bg-white z-1001 shadow-2xl flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex-1 overflow-y-auto">
          <div className="relative p-6 min-h-full flex flex-col justify-between">
            <div>
              <div className="mb-8">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-luxury-text hover:text-black text-2xl"
                >
                  ×
                </button>
                <h2 className="text-2xl font-light tracking-wider mb-2 text-luxury-text">
                  MI CUENTA
                </h2>
                <p className="text-sm text-muted-foreground">
                  Accede a tu cuenta o crea una nueva
                </p>
              </div>

              <div className="mt-8">
                <div className="grid grid-cols-2 gap-2 mb-6 bg-muted p-1 rounded">
                  <button
                    type="button"
                    onClick={() => setActiveTab("login")}
                    className={`w-full text-center py-2 px-4 rounded transition-colors duration-200 ease-in-out focus:outline-none ${
                      activeTab === "login"
                        ? "bg-[#314737] text-white shadow-sm"
                        : "bg-transparent text-muted-foreground hover:bg-[#314737]/70 hover:text-white"
                    }`}
                  >
                    Iniciar Sesión
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("signup")}
                    className={`w-full text-center py-2 px-4 rounded transition-colors duration-200 ease-in-out focus:outline-none ${
                      activeTab === "signup"
                        ? "bg-[#314737] text-white shadow-sm"
                        : "bg-transparent text-muted-foreground hover:bg-[#314737]/70 hover:text-white"
                    }`}
                  >
                    Registrarse
                  </button>
                </div>

                {/* Login Form */}
                {activeTab === "login" && (
                  <div className="space-y-4">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="login-email"
                          className="text-sm font-medium"
                        >
                          Email
                        </label>
                        <input
                          id="login-email"
                          type="email"
                          placeholder="correo@ejemplo.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full px-3 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-luxury-burgundy"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="login-password"
                          className="text-sm font-medium"
                        >
                          Contraseña
                        </label>
                        <input
                          id="login-password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="w-full px-3 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-luxury-burgundy"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-luxury-burgundy hover:bg-luxury-burgundyHover text-white py-2 px-4 rounded transition-colors tracking-wider"
                      >
                        INICIAR SESIÓN
                      </button>
                    </form>

                    <div className="text-center">
                      <a
                        href="#"
                        className="text-sm text-muted-foreground hover:text-black transition-colors"
                      >
                        ¿Olvidaste tu contraseña?
                      </a>
                    </div>
                  </div>
                )}

                {/* Signup Form */}
                {activeTab === "signup" && (
                  <div className="space-y-4">
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="signup-name"
                          className="text-sm font-medium"
                        >
                          Nombre completo
                        </label>
                        <input
                          id="signup-name"
                          type="text"
                          placeholder="Juan Pérez"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="w-full px-3 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-luxury-burgundy"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="signup-email"
                          className="text-sm font-medium"
                        >
                          Email
                        </label>
                        <input
                          id="signup-email"
                          type="email"
                          placeholder="correo@ejemplo.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full px-3 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-luxury-burgundy"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="signup-password"
                          className="text-sm font-medium"
                        >
                          Contraseña
                        </label>
                        <input
                          id="signup-password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="w-full px-3 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-luxury-burgundy"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-luxury-burgundy hover:bg-luxury-burgundyHover text-white py-2 px-4 rounded transition-colors tracking-wider"
                      >
                        CREAR CUENTA
                      </button>
                    </form>

                    <p className="text-xs text-center text-muted-foreground">
                      Al registrarte, aceptas nuestros términos y condiciones
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Beneficios */}
            <div className="mt-8 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground text-center mb-4">
                Beneficios de tener una cuenta
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-black">✓</span>
                  <span>Seguimiento de pedidos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black">✓</span>
                  <span>Acceso a ofertas exclusivas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black">✓</span>
                  <span>Lista de deseos personalizada</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black">✓</span>
                  <span>Historial de compras</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
