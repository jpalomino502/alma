import { useParams, Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import watch1 from "@/assets/watch-1.jpg";
import watch2 from "@/assets/watch-2.jpg";
import watch3 from "@/assets/watch-3.jpg";
import watch4 from "@/assets/watch-4.jpg";

const productsData = [
  {
    id: 1,
    name: "Seamaster Professional",
    collection: "Seamaster",
    price: "€5,900",
    image: watch1,
    description:
      "El Seamaster Professional es un reloj de buceo icónico que combina funcionalidad excepcional con un diseño elegante. Con resistencia al agua de 300 metros, movimiento automático Co-Axial Master Chronometer y bisel unidireccional giratorio.",
    specifications: [
      "Caja de acero inoxidable de 42mm",
      "Cristal de zafiro con tratamiento anti-reflectante",
      "Resistencia al agua: 300m",
      "Movimiento Co-Axial Master Chronometer",
      "Reserva de marcha: 60 horas",
    ],
  },
  {
    id: 2,
    name: "Constellation Co-Axial",
    collection: "Constellation",
    price: "€7,200",
    image: watch2,
    description:
      "La colección Constellation representa la elegancia clásica de Omega. Con su distintivo diseño 'Griffes' y esfera de oro, este reloj es un símbolo de precisión y refinamiento.",
    specifications: [
      "Caja de oro amarillo de 18 quilates",
      "Esfera con acabado sunray",
      "Cristal de zafiro resistente a rayones",
      "Movimiento Co-Axial certificado COSC",
      "Brazalete integrado de oro",
    ],
  },
  {
    id: 3,
    name: "Speedmaster Moonwatch",
    collection: "Speedmaster",
    price: "€6,500",
    image: watch3,
    description:
      "El legendario Moonwatch, el único reloj certificado por la NASA para misiones espaciales. Con su icónico cristal hesalita y movimiento cronógrafo manual, es una pieza de historia horológica.",
    specifications: [
      "Caja de acero de 42mm",
      "Cristal hesalita abombado",
      "Movimiento cronógrafo manual calibre 1861",
      "Esfera negra con índices luminiscentes",
      "Taquímetro en el bisel",
    ],
  },
  {
    id: 4,
    name: "De Ville Prestige",
    collection: "De Ville",
    price: "€4,800",
    image: watch4,
    description:
      "El De Ville Prestige encarna la elegancia clásica con su diseño minimalista y acabados excepcionales. Perfecto para cualquier ocasión formal.",
    specifications: [
      "Caja de oro rosa de 18 quilates",
      "Esfera lacada blanca",
      "Correa de cuero de becerro negro",
      "Movimiento de cuarzo de precisión",
      "Resistencia al agua: 30m",
    ],
  },
];

export const ProductDetailView = () => {
  const { id } = useParams();
  const product = productsData.find((p) => p.id === Number(id));
  const { addToCart } = useCart();

  const parsePriceNumber = (price: string) => {
    const numeric = price.replace(/[^\d]/g, "");
    return Number(numeric);
  };

  const handleAddToCart = () => {
    if (!product) return;
    const item = {
      id: product.id,
      name: product.name,
      collection: product.collection,
      price: product.price,
      priceNumber: parsePriceNumber(product.price),
      image: product.image,
      description: product.description,
      specifications: product.specifications,
    };
    addToCart(item);
    toast.success("Producto agregado al carrito");
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 bg-[hsl(var(--luxury-gray-light))]">
        <div className="text-center p-8">
          <h2 className="text-2xl font-light tracking-[0.12em] mb-8">Producto no encontrado</h2>
          <Link to="/products">
            <button className="bg-black text-white border-0 px-8 py-4 text-sm tracking-[0.12em] cursor-pointer transition-colors hover:bg-[hsl(355,76%,30%)]">
              VOLVER A LA COLECCIÓN
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <section className="max-w-[1200px] max-x-5xl mx-auto px-8 py-16">
        <div className="flex gap-4 items-center mb-12 text-sm font-light tracking-[0.06em] text-[hsl(var(--luxury-text-light))]">
          <Link to="/" className="no-underline text-inherit">Inicio</Link>
          <span>/</span>
          <Link to="/products" className="no-underline text-inherit">Productos</Link>
          <span>/</span>
          <span className="text-black">{product.name}</span>
        </div>

        {/* Product Content */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-16 items-start">
          {/* Image */}
          <div className="aspect-square bg-[hsl(var(--luxury-gray-light))] overflow-hidden sticky top-24">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Details */}
          <div>
            <p className="text-sm font-normal tracking-[0.12em] mb-4 text-black uppercase">
              {product.collection}
            </p>
            <h1 className="text-[clamp(2rem,4vw,3rem)] font-extralight tracking-[0.25em] mb-8 text-black">
              {product.name}
            </h1>
            <p className="text-[1.8rem] font-light tracking-[0.06em] mb-12 text-black">
              {product.price}
            </p>
            <p className="text-[1.05rem] font-light tracking-[0.03em] leading-8 mb-12 text-[hsl(0,0%,35%)]">
              {product.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-16">
              <button
                onClick={handleAddToCart}
                className="bg-[#314737] text-white border-0 px-12 py-5 text-sm tracking-[0.12em] cursor-pointer transition-colors w-full font-light hover:bg-[#314737]/70"
              >
                AGREGAR AL CARRITO
              </button>
              <button className="bg-black text-white border-0 px-12 py-5 text-sm tracking-[0.12em] cursor-pointer transition-colors w-full font-light hover:bg-[hsl(0,0%,20%)]">
                CONTACTAR
              </button>
            </div>

            {/* Specifications */}
            <div className="border-t border-[hsl(0,0%,90%)] pt-12">
              <h3 className="text-[1.3rem] font-light tracking-[0.19em] mb-8 text-black">
                ESPECIFICACIONES
              </h3>
              <ul className="list-none p-0">
                {product.specifications.map((spec, index) => (
                  <li key={index} className="text-base font-light tracking-[0.03em] mb-4 text-[hsl(0,0%,35%)] pl-6 relative">
                    <span className="absolute left-0 top-2 w-2 h-2 bg-black rounded-full" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};