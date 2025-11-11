import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import lenis from "@/lib/lenis"

export const useScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (lenis) lenis.scrollTo(0, { immediate: true })
      else window.scrollTo(0, 0)
    }, 50)

    return () => clearTimeout(timeout)
  }, [pathname])
}
