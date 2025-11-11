import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import watch1 from "@/assets/watch-1.jpg";
import watch2 from "@/assets/watch-2.jpg";
import watch3 from "@/assets/watch-3.jpg";
import watch4 from "@/assets/watch-4.jpg";

const productsData = [
  { id: 1, name: "Seamaster Professional", collection: "Seamaster", price: "€5,900", image: watch1 },
  { id: 2, name: "Constellation Co-Axial", collection: "Constellation", price: "€7,200", image: watch2 },
  { id: 3, name: "Speedmaster Moonwatch", collection: "Speedmaster", price: "€6,500", image: watch3 },
  { id: 4, name: "De Ville Prestige", collection: "De Ville", price: "€4,800", image: watch4 },
];

export const ProductsView = () => {
  const { addToCart } = useCart();

  const parsePriceNumber = (price: string) => Number(price.replace(/[^\d]/g, ""));

  return (
    <div className="min-h-screen pt-20 bg-white">
      <section className="max-w-[1400px] mx-auto px-8 py-16">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-extralight tracking-[0.3em] text-black uppercase">Colección</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {productsData.map((p) => (
            <div key={p.id} className="group">
              <Link to={`/products/${p.id}`} className="no-underline text-inherit">
                <div className="aspect-square overflow-hidden bg-zinc-50 mb-6">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <p className="text-xs font-normal tracking-[0.12em] mb-2 text-black/60 uppercase">{p.collection}</p>
                <h3 className="text-[1.1rem] font-light tracking-[0.12em] mb-2 text-black">{p.name}</h3>
                <p className="text-base font-normal tracking-[0.06em] text-[#314737]">{p.price}</p>
              </Link>
              <div className="mt-4">
                <button
                  onClick={() => {
                    addToCart({
                      id: p.id,
                      name: p.name,
                      collection: p.collection,
                      price: p.price,
                      priceNumber: parsePriceNumber(p.price),
                      image: p.image,
                      description: "",
                      specifications: [],
                    });
                    toast.success("Producto agregado al carrito");
                  }}
                  className="border border-[#314737] text-[#314737] px-6 py-2 text-sm tracking-[0.12em] uppercase font-light hover:bg-[#314737] hover:text-white transition-colors"
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};