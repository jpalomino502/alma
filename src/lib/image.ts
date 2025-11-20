export const makeResolveImage = (API_BASE?: string | undefined) => {
  const isBase64 = (s?: string | null) => {
    if (!s || typeof s !== "string") return false
    const trimmed = s.replace(/\s+/g, "")
    if (trimmed.length < 100) return false
    if (trimmed.startsWith("data:")) return false
    if (/^https?:\/\//i.test(trimmed)) return false
    // heuristic: only base64 chars
    return /^[A-Za-z0-9+/=]+$/.test(trimmed)
  }

  return (img?: string | null) => {
    if (!img) return "/placeholder.svg"
    const s = String(img).trim()
    if (s.startsWith("data:")) return s
    if (/^https?:\/\//i.test(s)) return s
    if (/data:.*;base64,/.test(s)) return s
    if (isBase64(s)) {
      // assume jpeg by default when server stored raw base64
      return `data:image/jpeg;base64,${s}`
    }
    return `${API_BASE}/storage/${s}`
  }
}

export default makeResolveImage
