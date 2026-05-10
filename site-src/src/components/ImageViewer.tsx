import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, ArrowLeft, ArrowRight,
  MagnifyingGlassMinus, MagnifyingGlassPlus, ArrowsIn,
  FilmStrip, ArrowSquareOut,
} from '@phosphor-icons/react'
import { useImageViewer } from '../hooks/useImageViewer'
import { FilmstripDrawer } from './FilmstripDrawer'

const MIN_SCALE = 0.5
const MAX_SCALE = 10
const SWIPE_THRESHOLD = 60

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v))
}

// Layout constants (keep in sync with the bar heights in className)
const TOP_BAR_H = 48   // h-12
const BOT_BAR_H = 56   // h-14
const FILMSTRIP_W = 208 // w-52

const slideVariants = {
  enter: (dir: number) => ({
    x: dir * 32,
    filter: 'blur(20px)',
    opacity: 0,
  }),
  visible: {
    x: 0,
    filter: 'blur(0px)',
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir * -32,
    filter: 'blur(20px)',
    opacity: 0,
  }),
}

export function ImageViewer() {
  const { isOpen, currentIndex, allImages, closeViewer, goNext, goPrev, setIndex, navigateToPost } = useImageViewer()
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const [filmstripOpen, setFilmstripOpen] = useState(false)
  const [direction, setDirection] = useState<1 | -1>(1)

  const current = allImages[currentIndex]

  // Refs to avoid stale closures in pointer handlers
  const scaleRef = useRef(scale)
  const offsetRef = useRef(offset)
  useEffect(() => { scaleRef.current = scale }, [scale])
  useEffect(() => { offsetRef.current = offset }, [offset])

  const activePointers = useRef<Map<number, { x: number; y: number }>>(new Map())
  const pinchRef = useRef<{ initialDist: number; initialScale: number } | null>(null)
  const dragRef = useRef<{ startX: number; startY: number; startOX: number; startOY: number } | null>(null)
  const swipeRef = useRef<{ startX: number; startY: number } | null>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const zoomTimeoutRef = useRef<ReturnType<typeof setTimeout>>()

  // Reset state on image change
  useEffect(() => {
    setScale(1)
    setOffset({ x: 0, y: 0 })
    activePointers.current.clear()
    pinchRef.current = null
    dragRef.current = null
    swipeRef.current = null
    setDragging(false)
  }, [currentIndex])

  // Directional navigation handlers
  const handleGoNext = useCallback(() => {
    setDirection(1)
    goNext()
  }, [goNext])

  const handleGoPrev = useCallback(() => {
    setDirection(-1)
    goPrev()
  }, [goPrev])

  const handleSelectImage = useCallback((idx: number) => {
    setDirection(idx >= currentIndex ? 1 : -1)
    setIndex(idx)
  }, [currentIndex, setIndex])

  // Keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeViewer()
      if (e.key === 'ArrowRight') handleGoNext()
      if (e.key === 'ArrowLeft') handleGoPrev()
      if (e.key === '+' || e.key === '=') setScale(s => clamp(s * 1.5, MIN_SCALE, MAX_SCALE))
      if (e.key === '-') setScale(s => clamp(s / 1.5, MIN_SCALE, MAX_SCALE))
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, closeViewer, handleGoNext, handleGoPrev])

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Wheel zoom — must be non-passive to call preventDefault.
  // Animate for physical mouse wheels (large discrete deltas), not trackpads.
  useEffect(() => {
    const img = imgRef.current
    if (!img || !isOpen) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      // Heuristic: trackpad sends many small pixel-mode events; mouse wheels
      // send large deltas (≥40px) or use line/page deltaMode.
      const isMouse = Math.abs(e.deltaY) >= 40 || e.deltaMode !== 0
      if (isMouse) {
        img.style.transition = 'transform 0.14s ease-out'
        clearTimeout(zoomTimeoutRef.current)
        zoomTimeoutRef.current = setTimeout(() => {
          if (imgRef.current) imgRef.current.style.transition = ''
        }, 250)
      }
      const factor = e.deltaY < 0 ? 1.08 : 1 / 1.08
      setScale(s => clamp(s * factor, MIN_SCALE, MAX_SCALE))
    }
    img.addEventListener('wheel', onWheel, { passive: false })
    return () => img.removeEventListener('wheel', onWheel)
  }, [isOpen, current])

  // Trigger a smooth CSS transition on the img for button-initiated zoom
  const triggerZoomAnim = useCallback(() => {
    const img = imgRef.current
    if (!img) return
    img.style.transition = 'transform 0.28s cubic-bezier(0.34, 1.4, 0.64, 1)'
    clearTimeout(zoomTimeoutRef.current)
    zoomTimeoutRef.current = setTimeout(() => {
      if (imgRef.current) imgRef.current.style.transition = ''
    }, 350)
  }, [])

  const zoomIn  = useCallback(() => { triggerZoomAnim(); setScale(s => clamp(s * 1.2, MIN_SCALE, MAX_SCALE)) }, [triggerZoomAnim])
  const zoomOut = useCallback(() => { triggerZoomAnim(); setScale(s => clamp(s / 1.2, MIN_SCALE, MAX_SCALE)) }, [triggerZoomAnim])
  const resetZoom = useCallback(() => { triggerZoomAnim(); setScale(1); setOffset({ x: 0, y: 0 }) }, [triggerZoomAnim])

  const handleDoubleClick = useCallback(() => {
    if (scaleRef.current > 1.1) { setScale(1); setOffset({ x: 0, y: 0 }) }
    else setScale(2.5)
  }, [])

  // ── Pointer handling: drag + pinch-to-zoom + swipe nav ────────────────────

  const getPinchDist = () => {
    const pts = [...activePointers.current.values()]
    if (pts.length < 2) return null
    const [a, b] = pts
    return Math.hypot(b.x - a.x, b.y - a.y)
  }

  const handlePointerDown = (e: React.PointerEvent<HTMLImageElement>) => {
    // Cancel any zoom animation so pan feels instant
    clearTimeout(zoomTimeoutRef.current)
    if (imgRef.current) imgRef.current.style.transition = ''
    e.currentTarget.setPointerCapture(e.pointerId)
    activePointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })

    if (activePointers.current.size === 1) {
      dragRef.current = { startX: e.clientX, startY: e.clientY, startOX: offsetRef.current.x, startOY: offsetRef.current.y }
      swipeRef.current = { startX: e.clientX, startY: e.clientY }
      setDragging(true)
    } else if (activePointers.current.size === 2) {
      const dist = getPinchDist()
      if (dist !== null) pinchRef.current = { initialDist: dist, initialScale: scaleRef.current }
      dragRef.current = null
      swipeRef.current = null
    }
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLImageElement>) => {
    activePointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    const count = activePointers.current.size

    if (count >= 2 && pinchRef.current) {
      const dist = getPinchDist()
      if (dist !== null) {
        setScale(clamp(pinchRef.current.initialScale * (dist / pinchRef.current.initialDist), MIN_SCALE, MAX_SCALE))
      }
    } else if (count === 1 && dragRef.current && scaleRef.current > 1.05) {
      setOffset({
        x: dragRef.current.startOX + (e.clientX - dragRef.current.startX),
        y: dragRef.current.startOY + (e.clientY - dragRef.current.startY),
      })
    }
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLImageElement>) => {
    const prevCount = activePointers.current.size
    activePointers.current.delete(e.pointerId)
    const count = activePointers.current.size

    if (prevCount === 1 && count === 0) {
      if (swipeRef.current && scaleRef.current <= 1.05) {
        const dx = e.clientX - swipeRef.current.startX
        const dy = e.clientY - swipeRef.current.startY
        if (Math.abs(dx) >= SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy) * 1.2) {
          if (dx < 0) handleGoNext(); else handleGoPrev()
        }
      }
      dragRef.current = null; swipeRef.current = null; pinchRef.current = null
      setDragging(false)
    }
    if (prevCount >= 2 && count < 2) {
      pinchRef.current = null
      if (count === 1) {
        const [pos] = activePointers.current.values()
        dragRef.current = { startX: pos.x, startY: pos.y, startOX: offsetRef.current.x, startOY: offsetRef.current.y }
      }
    }
  }

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) closeViewer()
  }, [closeViewer])

  const handleJumpToPost = useCallback(() => {
    if (current && navigateToPost) navigateToPost(current.postNum)
    closeViewer()
  }, [current, navigateToPost, closeViewer])

  const scalePercent = Math.round(scale * 100)
  const atStart = currentIndex === 0
  const atEnd = currentIndex >= allImages.length - 1
  const postLabel = current ? `#${String(current.postNum).padStart(4, '0')}` : ''
  const isDefaultView = scale === 1 && offset.x === 0 && offset.y === 0

  return (
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          key="image-viewer-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[9999] bg-te-black/[0.97] backdrop-blur-lg flex items-center justify-center"
          style={{
            paddingTop: TOP_BAR_H,
            paddingBottom: BOT_BAR_H,
            paddingRight: filmstripOpen ? FILMSTRIP_W : 0,
            transition: 'padding-right 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onClick={handleBackdropClick}
        >
          {/* ── Top bar ─────────────────────────────────────────────────────── */}
          <div className="fixed top-0 left-0 right-0 z-[10002] h-12 flex items-center justify-between px-1 bg-te-black/80 backdrop-blur-md border-b border-white/[0.06]">
            {/* Left: close + filmstrip toggle */}
            <div className="flex items-center">
              <button
                onClick={closeViewer}
                className="p-3 text-te-muted hover:text-te-text active:text-te-text transition-colors"
                aria-label="Close image viewer"
              >
                <X size={19} weight="bold" />
              </button>
              <button
                onClick={() => setFilmstripOpen(v => !v)}
                className={`p-3 transition-colors ${filmstripOpen ? 'text-te-orange' : 'text-te-muted hover:text-te-text'}`}
                aria-label={filmstripOpen ? 'Close filmstrip' : 'Open filmstrip'}
              >
                <FilmStrip size={17} weight={filmstripOpen ? 'fill' : 'regular'} />
              </button>
            </div>

            {/* Center: counter */}
            <span className="font-mono text-[0.62rem] text-te-muted/80 tracking-widest select-none">
              {currentIndex + 1} / {allImages.length}
            </span>

            {/* Right: jump to source post */}
            <button
              onClick={handleJumpToPost}
              className="flex items-center gap-1.5 px-3 py-3 font-mono text-[0.6rem] text-te-muted hover:text-te-text active:text-te-text transition-colors tracking-widest"
              aria-label={`Go to post ${postLabel}`}
            >
              <span>{postLabel}</span>
              <ArrowSquareOut size={12} weight="bold" />
            </button>
          </div>

          {/* ── Image area: sized wrapper + directional slide transition ────── */}
          <div
            className="relative"
            style={{
              width: '95%',
              height: `calc((100dvh - ${TOP_BAR_H + BOT_BAR_H}px) * 0.95)`,
            }}
            onClick={handleBackdropClick}
          >
            <AnimatePresence mode="sync" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex items-center justify-center"
                onClick={(e) => { if (e.target === e.currentTarget) closeViewer() }}
              >
                <img
                  ref={imgRef}
                  src={current.src}
                  alt={current.alt}
                  onDoubleClick={handleDoubleClick}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                  draggable={false}
                  className="w-full h-full object-contain rounded select-none"
                  style={{
                    transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                    transformOrigin: 'center',
                    cursor: dragging ? 'grabbing' : scale > 1 ? 'grab' : 'zoom-in',
                    touchAction: 'none',
                    willChange: 'transform',
                    filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.7))',
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Bottom bar ──────────────────────────────────────────────────── */}
          <div className="fixed bottom-0 left-0 right-0 z-[10002] h-14 flex items-center justify-between px-1 bg-te-black/80 backdrop-blur-md border-t border-white/[0.06]">
            {/* Prev */}
            <button
              onClick={handleGoPrev}
              disabled={atStart}
              className="p-4 text-te-muted hover:text-te-text active:text-te-text transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
              aria-label="Previous image"
            >
              <ArrowLeft size={20} weight="bold" />
            </button>

            {/* Zoom controls */}
            <div className="flex items-center gap-0.5">
              <button
                onClick={zoomOut}
                className="p-3 text-te-muted hover:text-te-text active:text-te-text transition-colors"
                aria-label="Zoom out"
              >
                <MagnifyingGlassMinus size={16} />
              </button>
              <span className="font-mono text-[0.58rem] text-te-muted/70 w-10 text-center tabular-nums select-none">
                {scalePercent}%
              </span>
              <button
                onClick={zoomIn}
                className="p-3 text-te-muted hover:text-te-text active:text-te-text transition-colors"
                aria-label="Zoom in"
              >
                <MagnifyingGlassPlus size={16} />
              </button>
              <div className="w-px h-3.5 bg-white/10 mx-1" />
              <button
                onClick={resetZoom}
                disabled={isDefaultView}
                className={`p-3 transition-colors ${isDefaultView ? 'text-te-muted/20 cursor-default' : 'text-te-muted hover:text-te-text active:text-te-text'}`}
                aria-label="Reset zoom"
                title="Reset zoom and position"
              >
                <ArrowsIn size={16} />
              </button>
            </div>

            {/* Next */}
            <button
              onClick={handleGoNext}
              disabled={atEnd}
              className="p-4 text-te-muted hover:text-te-text active:text-te-text transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
              aria-label="Next image"
            >
              <ArrowRight size={20} weight="bold" />
            </button>
          </div>

          {/* ── Filmstrip drawer (slides in from right, z below bars) ─────── */}
          <FilmstripDrawer isOpen={filmstripOpen} onSelectImage={handleSelectImage} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
