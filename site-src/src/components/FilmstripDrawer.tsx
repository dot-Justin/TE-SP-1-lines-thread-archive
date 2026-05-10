import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useImageViewer } from '../hooks/useImageViewer'

interface FilmstripDrawerProps {
  isOpen: boolean
  onSelectImage: (idx: number) => void
}

export function FilmstripDrawer({ isOpen, onSelectImage }: FilmstripDrawerProps) {
  const { allImages, currentIndex } = useImageViewer()
  const thumbListRef = useRef<HTMLDivElement>(null)
  const current = allImages[currentIndex]

  // Auto-scroll the filmstrip to keep the active thumbnail visible
  useEffect(() => {
    if (!isOpen || !thumbListRef.current) return
    const el = thumbListRef.current.querySelector<HTMLElement>('[data-active="true"]')
    el?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [currentIndex, isOpen])

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric',
      })
    } catch { return dateStr }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          // Inset between top bar (h-12 = 48px) and bottom bar (h-14 = 56px)
          // z-[10001] sits above the overlay (9999) but below bars (10002)
          className="fixed right-0 z-[10001] w-52 bg-te-black/90 backdrop-blur-md border-l border-white/[0.07] flex flex-col"
          style={{ top: 48, bottom: 56 }}
        >
          {/* Header */}
          <div className="px-3 py-2.5 border-b border-white/[0.06] flex-shrink-0">
            <p className="font-mono text-[0.57rem] text-te-muted/70 uppercase tracking-[0.18em]">
              {allImages.length} images
            </p>
          </div>

          {/* Filmstrip thumbnails */}
          <div
            ref={thumbListRef}
            className="flex-1 overflow-y-auto py-2 px-2 flex flex-col gap-1.5"
            style={{ scrollbarWidth: 'none' }}
          >
            {allImages.map((img, idx) => (
              <button
                key={img.src}
                data-active={idx === currentIndex ? 'true' : 'false'}
                onClick={() => onSelectImage(idx)}
                className={`relative w-full aspect-square rounded overflow-hidden border-2 transition-all flex-shrink-0 ${
                  idx === currentIndex
                    ? 'border-te-orange'
                    : 'border-transparent hover:border-te-muted/40'
                }`}
                title={img.alt || `Post #${img.postNum}`}
              >
                {/* Dominant color bg shown while image loads */}
                {img.dominantColor && (
                  <div
                    className="absolute inset-0"
                    style={{ backgroundColor: `#${img.dominantColor}` }}
                  />
                )}
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="relative w-full h-full object-cover"
                />
                {/* Post number badge */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-te-black/80 to-transparent px-1.5 py-1">
                  <span className="font-mono text-[0.48rem] text-te-muted/80 leading-none">
                    #{String(img.postNum).padStart(4, '0')}
                  </span>
                </div>
                {/* Active ring overlay */}
                {idx === currentIndex && (
                  <div className="absolute inset-0 ring-1 ring-inset ring-te-orange/40 rounded" />
                )}
              </button>
            ))}
          </div>

          {/* Metadata panel */}
          {current && (
            <div className="flex-shrink-0 border-t border-white/[0.06] px-3 py-3 space-y-2">
              {/* Filename + color swatch */}
              <div className="flex items-center gap-2 min-w-0">
                {current.dominantColor && (
                  <div
                    className="w-2.5 h-2.5 rounded-sm border border-white/10 flex-shrink-0"
                    style={{ backgroundColor: `#${current.dominantColor}` }}
                  />
                )}
                <p className="font-mono text-[0.58rem] text-te-text/80 truncate leading-tight" title={current.alt}>
                  {current.alt || '—'}
                </p>
              </div>

              <div className="space-y-1.5">
                {(current.width > 0 || current.height > 0) && (
                  <MetaRow label="px" value={`${current.width} × ${current.height}`} />
                )}
                {current.filesize && (
                  <MetaRow label="kb" value={current.filesize} />
                )}
                <MetaRow label="post" value={`#${String(current.postNum).padStart(4, '0')}`} />
                <MetaRow label="by" value={current.author} />
                <MetaRow label="date" value={formatDate(current.date)} />
              </div>
            </div>
          )}
        </motion.aside>
      )}
    </AnimatePresence>
  )
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2 items-baseline min-w-0">
      <span className="font-mono text-[0.5rem] text-te-muted/50 uppercase tracking-wider w-7 flex-shrink-0">
        {label}
      </span>
      <span className="font-mono text-[0.57rem] text-te-muted/80 truncate" title={value}>
        {value}
      </span>
    </div>
  )
}
