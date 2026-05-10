'use client'
import { useState, useRef, useCallback, useEffect } from 'react'

// ── constants ──────────────────────────────────────────────────────────────────
const FACE_TY   = -19.39839
const TRACK_TOP = 452.63367
const TRACK_H   = 306.80798
const KNOB_R    = 19.421074

// Travel range is exactly knob1-default (top) to knob4-default (bottom)
const KNOB_MIN  = 484.06409
const KNOB_MAX  = 726.06409

const INIT_CY  = [484.06409, 644.06409, 564.06409, 726.06409] as const
const KNOB_CX  = [156.29474, 336.29474, 516.29474, 696.29474] as const
const TRACK_X  = [124.80391, 304.80389, 484.80389, 664.80389] as const
const LIGHT_CY = 870.06409

// CSS transitions: instant-to-pressed, spring-back on release
const SPRING = 'transform 0.38s cubic-bezier(0.34, 1.56, 0.64, 1)'

// Helper: returns style object for a snappy button press.
// `offset` is the resting translate (default 0); press adds `amt` on top.
const pressStyle = (
  pressed: boolean,
  axis: 'X' | 'Y',
  amt: number,
  offset = 0,
  extra?: React.CSSProperties,
): React.CSSProperties => ({
  transform: pressed
    ? `translate${axis}(${offset + amt}px)`
    : `translate${axis}(${offset}px)`,
  transition: pressed ? 'none' : SPRING,
  ...extra,
})

// ── per-stem random-walk state ─────────────────────────────────────────────────
type StemState = { current: number; target: number; nextAt: number }

type KnobDrag   = { type: 'knob';   idx: number; offsetY: number }
type RockerDrag = { type: 'rocker'; startY: number }
type Drag = KnobDrag | RockerDrag

export function SP1Device() {
  const svgRef     = useRef<SVGSVGElement>(null)
  const dragRef    = useRef<Drag | null>(null)
  const lightRefs  = useRef<(SVGCircleElement | null)[]>([null, null, null, null])
  const playingRef = useRef(false)
  const facePRef   = useRef([false, false, false, false])
  const rafRef     = useRef<number>(0)
  const stems      = useRef<StemState[]>(
    [0, 1, 2, 3].map(() => ({ current: 0, target: 0.6, nextAt: 0 }))
  )

  const [playing,      setPlaying]      = useState(true)
  const [pressPlay,    setPressPlay]    = useState(false)
  const [pressMod,     setPressMod]     = useState(false)
  const [pressVolUp,   setPressVolUp]   = useState(false)
  const [pressVolDown, setPressVolDown] = useState(false)
  const [pressedFace,  setPressedFace]  = useState([false, false, false, false])
  const [rockerOffset, setRockerOffset] = useState(0)
  const [rockerDrag,   setRockerDrag]   = useState(false)
  const [knobCY,       setKnobCY]       = useState<number[]>([...INIT_CY])

  // keep refs current for RAF reads without re-renders
  useEffect(() => { playingRef.current = playing }, [playing])
  useEffect(() => { facePRef.current = pressedFace }, [pressedFace])

  // ── light animation — random walk, direct DOM, no re-renders ────────────────
  useEffect(() => {
    const ss = stems.current

    const tick = (t: number) => {
      const pf      = facePRef.current
      const anyHeld = pf.some(Boolean)
      const isPlay  = playingRef.current

      for (let i = 0; i < 4; i++) {
        const el = lightRefs.current[i]
        if (!el) continue
        const s = ss[i]

        // Not playing: fade to black, reset state
        if (!isPlay) {
          s.current = 0
          el.setAttribute('opacity', '0')
          continue
        }

        // Face button held: fade this stem out if it's not the solo stem
        if (anyHeld && !pf[i]) {
          s.current += (0 - s.current) * 0.14
          el.setAttribute('opacity', s.current.toFixed(3))
          continue
        }

        // Random walk: pick a new random target at irregular intervals per stem
        if (t >= s.nextAt) {
          s.target = 0.1 + Math.random() * 0.9
          // stagger intervals so stems don't sync — erratic, 80–430ms range
          s.nextAt = t + 80 + Math.random() * 350 + i * 25
        }

        // Lerp — 0.12 gives ~320ms to 90% of target (quicker, more active)
        s.current += (s.target - s.current) * 0.12
        el.setAttribute('opacity', s.current.toFixed(3))
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  // ── SVG coordinate helper ───────────────────────────────────────────────────
  const svgRootY = useCallback((e: React.PointerEvent) => {
    const svg = svgRef.current
    if (!svg) return 0
    const pt  = svg.createSVGPoint()
    pt.x = e.clientX; pt.y = e.clientY
    return pt.matrixTransform(svg.getScreenCTM()!.inverse()).y
  }, [])

  // ── SVG-level pointer routing ───────────────────────────────────────────────
  const onSVGMove = useCallback((e: React.PointerEvent) => {
    const drag = dragRef.current
    if (!drag) return

    if (drag.type === 'knob') {
      const localY = svgRootY(e) - FACE_TY
      const newCY  = Math.max(KNOB_MIN, Math.min(KNOB_MAX, localY - drag.offsetY))
      setKnobCY(prev => { const n = [...prev]; n[drag.idx] = newCY; return n })
    } else {
      // Rocker: slide Y in CSS pixels, capped at ±16px
      const dy = e.clientY - drag.startY
      setRockerOffset(Math.max(-16, Math.min(16, dy)))
    }
  }, [svgRootY])

  const onSVGUp = useCallback(() => {
    if (dragRef.current?.type === 'rocker') {
      setRockerOffset(0)
      setRockerDrag(false)
    }
    dragRef.current = null
  }, [])

  const onKnobDown = useCallback((e: React.PointerEvent, idx: number) => {
    e.preventDefault(); e.stopPropagation()
    ;(e.target as Element).setPointerCapture(e.pointerId)
    const localY = svgRootY(e) - FACE_TY
    dragRef.current = { type: 'knob', idx, offsetY: localY - knobCY[idx] }
  }, [svgRootY, knobCY])

  const onRockerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault()
    ;(e.target as Element).setPointerCapture(e.pointerId)
    setRockerDrag(true)
    dragRef.current = { type: 'rocker', startY: e.clientY }
  }, [])

  const setFacePress = (i: number, v: boolean) =>
    setPressedFace(p => { const n = [...p]; n[i] = v; return n })

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1048.0149 1350.7324"
      xmlns="http://www.w3.org/2000/svg"
      onPointerMove={onSVGMove}
      onPointerUp={onSVGUp}
      style={{ touchAction: 'none', userSelect: 'none' }}
    >
      {/* ── leftside — rocker slides up/down ─────────────────────────────────── */}
      <g transform="translate(-7.5691112,-19.39839)">
        <rect
          fill="#fef7e9"
          width="61.585041" height="124.54628"
          x="7.5691113" y="227.41739" ry="18.807964"
          style={{
            cursor: 'ns-resize',
            transform: `translateY(${rockerOffset}px)`,
            transition: rockerDrag ? 'none' : SPRING,
          }}
          onPointerDown={onRockerDown}
        />
      </g>

      {/* ── topbuttons — volume presses down ─────────────────────────────────── */}
      <g transform="translate(-7.5691112,-19.39839)">
        <g transform="matrix(1,0,0,0.48120907,0,16.45141)">
          <rect
            fill="#dfdfe1"
            width="89.035217" height="55.588123"
            x="127.40979" y="6.1241155" ry="17.237392" rx="9.1439428"
            style={pressStyle(pressVolDown, 'Y', 8, 0, { cursor: 'pointer' })}
            onPointerDown={() => setPressVolDown(true)}
            onPointerUp={() => setPressVolDown(false)}
            onPointerLeave={() => setPressVolDown(false)}
          />
          <rect
            fill="#dfdfe1"
            width="89.035217" height="55.588123"
            x="287.42871" y="6.1241155" ry="17.237392" rx="9.1439428"
            style={pressStyle(pressVolUp, 'Y', 8, 0, { cursor: 'pointer' })}
            onPointerDown={() => setPressVolUp(true)}
            onPointerUp={() => setPressVolUp(false)}
            onPointerLeave={() => setPressVolUp(false)}
          />
        </g>
      </g>

      {/* ── body ─────────────────────────────────────────────────────────────── */}
      <g transform="translate(-7.5691112,-19.39839)">
        <path
          fill="#fef7e9"
          d="m 265.67578,35.570312 c -26.01113,0 -46.95117,20.940041 -46.95117,46.951172 V 1323.1777 c 0,26.0112 20.94004,46.9532 46.95117,46.9532 h 688.62109 c 26.01114,0 46.95113,-20.942 46.95113,-46.9532 v -172.5371 h 0.01 V 943.27148 h -0.01 V 417.82812 h 0.01 V 169.27148 h -0.01 V 82.521484 c 0,-26.011131 -20.93998,-46.951171 -46.95113,-46.951172 z"
        />
        <rect fill="#dfdfe1" width="782.52496" height="1334.5608" x="32.723774" y="35.569317" ry="46.9515" />
      </g>

      {/* ── rightbuttons — mod + play slide left when pressed ─────────────────── */}
      {/* default offset -5px nudges buttons flush with body; spring overshoot
          stays negative so there's never a gap on release */}
      <g transform="translate(-7.5691112,0.60160987)">
        <path
          fill="#fef7e9"
          d="M 1001.2578,1150.6406 V 902.08396 h 31.7832 c 12.4891,0 22.543,10.05586 22.543,22.54492 v 203.46872 c 0,12.4891 -10.0539,22.543 -22.543,22.543 z"
          style={pressStyle(pressMod, 'X', -9, -5, { cursor: 'pointer' })}
          onPointerDown={(e) => { ;(e.target as Element).setPointerCapture(e.pointerId); setPressMod(true) }}
          onPointerUp={() => setPressMod(false)}
          onPointerLeave={() => setPressMod(false)}
        />
        <path
          fill="#fef7e9"
          d="M 1001.2578,376.6406 V 169.27148 h 35.5176 c 10.4196,0 18.8086,8.387 18.8086,18.8066 v 169.75588 c 0,10.41961 -8.389,18.80664 -18.8086,18.80664 z"
          style={pressStyle(pressPlay, 'X', -9, -5, { cursor: 'pointer' })}
          onPointerDown={(e) => { ;(e.target as Element).setPointerCapture(e.pointerId); setPressPlay(true) }}
          onPointerUp={() => { setPressPlay(false); setPlaying(p => !p) }}
        />
      </g>

      {/* ── face ─────────────────────────────────────────────────────────────── */}
      <g transform="translate(-7.5691112,-19.39839)">

        {/* pwr glyph */}
        <path
          fill="#fd4816"
          transform="matrix(1.0503656,0,0,1.0822006,-42.035495,-25.541781)"
          d="m 899.19232,246.12045 22.80324,39.49635 22.80323,39.49636 -45.60647,0 -45.60647,0 22.80324,-39.49636 z"
        />

        {/* mod dots */}
        <circle fill="#242423" cx="908.38074" cy="1012.1696" r="25.502172" />
        <circle fill="#242423" cx="908.38074" cy="1082.5458" r="25.502172" />

        {/* slider tracks */}
        {TRACK_X.map((x, i) => (
          <rect key={i} fill="#242423" width="62.981659" height={TRACK_H}
            x={x} y={TRACK_TOP} ry="31.336679" />
        ))}

        {/* draggable knobs */}
        {KNOB_CX.map((cx, i) => (
          <circle
            key={i}
            fill="#dfdfe1"
            cx={cx} cy={knobCY[i]} r={KNOB_R}
            style={{ cursor: 'ns-resize' }}
            onPointerDown={e => onKnobDown(e, i)}
          />
        ))}

        {/* lights — off state always visible underneath */}
        {KNOB_CX.map((cx, i) => (
          <circle key={i} fill="#c9c4c9" cx={cx} cy={LIGHT_CY} r={KNOB_R} />
        ))}

        {/* lights — on state, opacity driven by RAF */}
        {KNOB_CX.map((cx, i) => (
          <circle
            key={i}
            ref={el => { lightRefs.current[i] = el }}
            fill="#ffffff"
            cx={cx} cy={LIGHT_CY} r={KNOB_R}
            opacity={0}
          />
        ))}

        {/* face buttons */}
        {([123.51012, 303.51013, 483.51013, 663.51013] as const).map((x, i) => (
          <rect
            key={i}
            fill={pressedFace[i] ? '#7a747a' : '#9b939b'}
            width="65.569252" height="141.96533"
            x={x} y="982.01831" ry="11.25932"
            style={pressStyle(pressedFace[i], 'Y', 4, 0, { cursor: 'pointer' })}
            onPointerDown={() => setFacePress(i, true)}
            onPointerUp={() => setFacePress(i, false)}
            onPointerLeave={() => setFacePress(i, false)}
          />
        ))}
      </g>
    </svg>
  )
}
