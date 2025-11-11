import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import Logo from "@/assets/logo.png";
import { useCart } from "@/context/CartContext";
import { LoginSidebar } from "./LoginSidebar";

type ThemeType = "default" | "transparent" | "negative";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { totalItems } = useCart();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [theme, setTheme] = useState<ThemeType>("default");

  const location = useLocation();
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const detectTheme = () => {
      if (!navRef.current) return;
      const navRect = navRef.current.getBoundingClientRect();
      let detected: ThemeType = "default";

      const elements = document.querySelectorAll<HTMLElement>(".transparent, .negative");
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom > navRect.top && rect.top < navRect.bottom) {
          if (el.classList.contains("transparent")) detected = "transparent";
          else if (el.classList.contains("negative")) detected = "negative";
        }
      });

      setTheme(detected);
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY <= 20 || currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
      detectTheme();
    };

    window.addEventListener("scroll", handleScroll);
    detectTheme();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navStyles: Record<ThemeType, string> = {
    default: "bg-white text-luxury-text",
    transparent: "bg-transparent text-white",
    negative: "bg-black text-white",
  };

  const hoverColors: Record<ThemeType, string> = {
    default: "hover:text-luxury-burgundy",
    transparent: "hover:text-luxury-burgundy",
    negative: "hover:text-luxury-burgundy",
  };

  const activeColors: Record<ThemeType, string> = {
    default: "text-luxury-burgundy after:w-full after:bg-luxury-burgundy",
    transparent: "text-luxury-burgundy after:w-full after:bg-luxury-burgundy",
    negative: "text-luxury-burgundy after:w-full after:bg-luxury-burgundy",
  };

  const logoStyles = theme === "default" ? "invert-0" : "invert";

  const navLinks = [
    { to: "/", label: "INICIO" },
    { to: "/products", label: "PRODUCTOS" },
    { to: "/about", label: "NOSOTROS" },
    { to: "/contact", label: "CONTACTO" },
  ];

  return (
    <>
    <nav
      ref={navRef}
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-700 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-[200%]"
      } ${navStyles[theme]}`}
    >
      <div className="max-w-[1400px] mx-auto px-6 flex flex-col items-center">
        <div className="relative w-full flex items-center justify-center h-24">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`absolute left-0 md:hidden bg-transparent border-0 cursor-pointer text-2xl`}
            aria-label="Abrir menú"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex justify-center items-center pointer-events-none">
            <img
              src={Logo}
              alt="logo Alma"
              className={`h-24 object-contain mx-auto pointer-events-auto transition-all ${logoStyles}`}
            />
          </Link>

          {/* Icons */}
          <div className="absolute right-0 flex items-center gap-6">
            <Link
              to="/cart"
              className={`no-underline transition-colors relative ${hoverColors[theme]}`}
            >
              <ShoppingBag size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-luxury-burgundy bg-[#314737] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsLoginOpen(true)}
              className="bg-[#314737] text-white border-0 px-2 py-2 text-sm tracking-[0.12em] cursor-pointer transition-all font-light hover:bg-[#314737/90] hover:-translate-y-0.5"            >
              <span>Inicia Sesión</span>
            </button>
          </div>
        </div>

        {/* Navigation links */}
        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row gap-4 md:gap-12 justify-center items-center text-sm tracking-[0.06em] pb-4 w-full md:w-auto`}
        >
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`no-underline relative transition-all after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full ${
                  isActive ? activeColors[theme] : ""
                } ${hoverColors[theme]}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>

    </nav>
    <LoginSidebar isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

export default Navbar;
