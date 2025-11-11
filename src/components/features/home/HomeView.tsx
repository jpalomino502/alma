import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import heroWatch from "@/assets/hero-watch.jpg";
import craftsmanship from "@/assets/craftsmanship.jpg";
import watch1 from "@/assets/watch-1.jpg";
import watch2 from "@/assets/watch-2.jpg";
import watch3 from "@/assets/watch-3.jpg";

export const HomeView = () => {
  const { addToCart } = useCart();

  const parsePriceNumber = (price: string) => {
    const numeric = price.replace(/[^\d]/g, "");
    return Number(numeric);
  };

  return (
    <div className="bg-white">
      <section
        className="transparent h-screen relative overflow-hidden flex items-center justify-center bg-fixed bg-center bg-cover"
        style={{ backgroundImage: `url(${heroWatch})` }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white px-8">
          <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-extralight tracking-[0.5em] mb-8 uppercase">
            Excelencia Suiza
          </h1>
          <p className="text-[clamp(1rem,2vw,1.3rem)] font-light tracking-[0.12em] mb-12 opacity-95">
            Precisión en cada momento
          </p>
          <Link to="/products">
            <button className="bg-[#314737] text-white border-0 px-12 py-4 text-sm tracking-[0.12em] cursor-pointer transition-all font-light hover:bg-[#314737/90] hover:-translate-y-0.5">
              EXPLORAR COLECCIÓN
            </button>
          </Link>
        </div>
      </section>

      <section
        className="transparent relative min-h-[80vh] overflow-hidden flex items-center bg-fixed bg-center bg-cover"
        style={{ backgroundImage: `url(${craftsmanship})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-8 py-16 text-white">
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-extralight tracking-[0.38em] mb-8">
            ARTESANÍA
          </h2>
          <p className="text-[clamp(1rem,2vw,1.2rem)] font-light tracking-[0.06em] leading-8 max-w-[600px] opacity-95">
            Cada reloj es una obra maestra de ingeniería suiza, elaborado con
            precisión milenaria y dedicación absoluta a la perfección.
          </p>
        </div>
      </section>

      <section className="py-32 px-8 max-w-[1400px] mx-auto">
        <h2 className="text-[clamp(2rem,4vw,3rem)] font-extralight tracking-[0.38em] text-center mb-20 text-black">
          COLECCIONES DESTACADAS
        </h2>

        <div className="max-w-3xl mx-auto grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-12">
          {[
            { id: 1, img: watch1, name: "Seamaster Professional", price: "€5,900" },
            { id: 2, img: watch2, name: "Constellation", price: "€7,200" },
            { id: 3, img: watch3, name: "Speedmaster", price: "€6,500" },
          ].map((watch) => (
            <div key={watch.id} className="cursor-default">
              <Link to={`/products/${watch.id}`} className="no-underline text-inherit">
                <div className="cursor-pointer transition-transform hover:-translate-y-2">
                  <div className="aspect-square overflow-hidden mb-6 bg-zinc-50">
                    <img src={watch.img} alt={watch.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-[1.1rem] font-light tracking-[0.12em] mb-2">
                    {watch.name}
                  </h3>
                  <p className="text-base font-normal tracking-[0.06em] text-[#314737]">
                    {watch.price}
                  </p>
                </div>
              </Link>
              <div className="mt-3">
                <button
                  onClick={() => {
                    addToCart({
                      id: watch.id,
                      name: watch.name,
                      collection: "Destacado",
                      price: watch.price,
                      priceNumber: parsePriceNumber(watch.price),
                      image: watch.img,
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

        <div className="text-center mt-16">
          <Link to="/products">
            <button className="bg-[#314737] text-white border-0 px-12 py-4 text-sm tracking-[0.12em] cursor-pointer transition-all font-light hover:bg-[#314737/90] hover:-translate-y-0.5">
              VER TODA LA COLECCIÓN
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};
