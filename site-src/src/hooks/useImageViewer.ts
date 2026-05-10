import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import type { ImageMeta } from '../types'

interface ImageViewerContextValue {
  isOpen: boolean
  currentIndex: number
  allImages: ImageMeta[]
  openViewer: (src: string) => void
  closeViewer: () => void
  goNext: () => void
  goPrev: () => void
  setIndex: (index: number) => void
  navigateToPost: ((postNum: number) => void) | null
}

const noop = () => {}

export const ImageViewerContext = createContext<ImageViewerContextValue>({
  isOpen: false,
  currentIndex: 0,
  allImages: [],
  openViewer: noop,
  closeViewer: noop,
  goNext: noop,
  goPrev: noop,
  setIndex: noop,
  navigateToPost: null,
})

export function useImageViewerState(
  allImages: ImageMeta[],
  onNavigateToPost?: (postNum: number) => void,
): ImageViewerContextValue {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openViewer = useCallback((src: string) => {
    // Match by pathname so local asset paths resolve correctly even
    // when the browser normalizes the src to an absolute URL.
    let idx = allImages.findIndex(img => img.src === src)
    if (idx === -1) {
      try {
        const pathname = new URL(src, window.location.href).pathname
        idx = allImages.findIndex(img => {
          try { return new URL(img.src, window.location.href).pathname === pathname }
          catch { return img.src === src }
        })
      } catch { /* keep idx = -1 */ }
    }
    if (idx === -1) return
    setCurrentIndex(idx)
    setIsOpen(true)
  }, [allImages])

  const closeViewer = useCallback(() => setIsOpen(false), [])

  const goNext = useCallback(() => {
    setCurrentIndex(i => Math.min(i + 1, allImages.length - 1))
  }, [allImages.length])

  const goPrev = useCallback(() => {
    setCurrentIndex(i => Math.max(i - 1, 0))
  }, [])

  const setIndex = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  return useMemo(() => ({
    isOpen, currentIndex, allImages,
    openViewer, closeViewer, goNext, goPrev, setIndex,
    navigateToPost: onNavigateToPost ?? null,
  }), [isOpen, currentIndex, allImages, openViewer, closeViewer, goNext, goPrev, setIndex, onNavigateToPost])
}

export function useImageViewer() {
  return useContext(ImageViewerContext)
}
