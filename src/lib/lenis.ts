import Lenis from "@studio-freight/lenis"

const lenis = new Lenis({
  lerp: 0.07,
  wheelMultiplier: 1,
})

// 🚀 Loop de render
function raf(time: number) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// 🧠 Observa si hay un modal abierto
const observer = new MutationObserver(() => {
  const modalOpen = document.querySelector<HTMLElement>("[role='dialog'][aria-modal='true']")

  if (modalOpen) {
    // ✅ Pausa scroll suave del body
    lenis.stop()
    document.body.style.overflow = "hidden"
    document.body.style.touchAction = "none" // evita scroll del fondo en móviles

    // ✅ Busca un contenedor desplazable dentro del modal
    const scrollableEl =
      modalOpen.querySelector<HTMLElement>("[data-scrollable='true']") ||
      modalOpen.querySelector<HTMLElement>("[class*='overflow-y']") ||
      modalOpen

    if (scrollableEl) {
      scrollableEl.style.overflowY = "auto"
      scrollableEl.style.maxHeight = "90vh"
      scrollableEl.style.touchAction = "pan-y"
      ;(scrollableEl.style as any).webkitOverflowScrolling = "touch"
    }

    // ✅ Permitir scroll con mouse y touch solo dentro del modal
    const stopScrollPropagation = (e: Event) => e.stopPropagation()
    modalOpen.addEventListener("wheel", stopScrollPropagation, { passive: false })
    modalOpen.addEventListener("touchmove", stopScrollPropagation, { passive: false })
  } else {
    // ✅ Restaura scroll normal al cerrar el modal
    lenis.start()
    document.body.style.overflow = ""
    document.body.style.touchAction = "auto"
  }
})

observer.observe(document.body, { childList: true, subtree: true })

export default lenis
