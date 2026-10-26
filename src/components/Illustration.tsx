/**
 * Illustrations vectorielles locales servant d'emplacements photo.
 * Elles évitent toute dépendance réseau pendant une démonstration.
 * Remplaçables par de vraies photos via <ImageSlot src=… />.
 */
export type SceneName = 'landscape' | 'hens' | 'barn' | 'trees' | 'farmer' | 'pasture' | 'feed'

const C = {
  sky: '#e0f2cd',
  skyWarm: '#f7efd9',
  hill1: '#afd87e',
  hill2: '#729f3d',
  hill3: '#306618',
  grass: '#8fc163',
  brown: '#2f2023',
  hen: '#9a5530',
  henDark: '#6e3a1f',
  comb: '#c8442b',
  beak: '#e9a23b',
  sun: '#f2c14e',
  wood: '#b07a4f',
  roof: '#7c3b2a',
  wall: '#f3e6cc',
}

function Hen({ x, y, s = 1, flip = false, peck = false }: { x: number; y: number; s?: number; flip?: boolean; peck?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <line x1="-4" y1="12" x2="-6" y2="24" stroke={C.beak} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="6" y1="12" x2="6" y2="24" stroke={C.beak} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M14 -6 Q36 -26 32 4 Q26 10 16 8 Z" fill={C.henDark} />
      <ellipse cx="0" cy="0" rx="24" ry="16" fill={C.hen} />
      <path d="M-6 -2 Q6 -8 14 2 Q4 8 -6 -2Z" fill={C.henDark} opacity="0.5" />
      <g transform={peck ? 'translate(-6 14) rotate(-35)' : undefined}>
        <circle cx="-20" cy="-14" r="10" fill={C.hen} />
        <path d="M-27 -22 q2 -7 5 -2 q2 -6 5 -1 q3 -4 4 2 z" fill={C.comb} />
        <path d="M-29 -14 l-8 3 l8 2 z" fill={C.beak} />
        <path d="M-27 -9 q-1 6 3 5 q2 -3 -3 -5z" fill={C.comb} />
        <circle cx="-23" cy="-16" r="1.6" fill={C.brown} />
      </g>
    </g>
  )
}

function Tree({ x, y, s = 1, fill = C.hill2 }: { x: number; y: number; s?: number; fill?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-3" y="0" width="6" height="26" rx="2" fill={C.wood} />
      <circle cx="0" cy="-8" r="18" fill={fill} />
      <circle cx="-12" cy="2" r="12" fill={fill} />
      <circle cx="12" cy="2" r="12" fill={fill} />
    </g>
  )
}

function Fence({ y }: { y: number }) {
  return (
    <g stroke={C.wood} strokeWidth="3" strokeLinecap="round">
      <line x1="0" y1={y} x2="400" y2={y} />
      <line x1="0" y1={y + 10} x2="400" y2={y + 10} />
      {Array.from({ length: 11 }, (_, i) => (
        <line key={i} x1={i * 40 + 10} y1={y - 8} x2={i * 40 + 10} y2={y + 18} />
      ))}
    </g>
  )
}

function Hills({ warm = false }: { warm?: boolean }) {
  return (
    <>
      <rect width="400" height="240" fill={warm ? C.skyWarm : C.sky} />
      <circle cx="330" cy="58" r="26" fill={C.sun} opacity="0.9" />
      <path d="M0 130 Q90 80 200 120 T400 100 V240 H0Z" fill={C.hill1} />
      <path d="M0 160 Q120 120 240 150 T400 140 V240 H0Z" fill={C.hill2} />
    </>
  )
}

function Scene({ name }: { name: SceneName }) {
  switch (name) {
    case 'landscape':
      return (
        <>
          <Hills />
          <Tree x={60} y={128} s={0.9} fill={C.hill3} />
          <Tree x={96} y={134} s={0.7} fill={C.hill3} />
          <g transform="translate(270 104)">
            <rect x="0" y="20" width="80" height="40" fill={C.wall} />
            <path d="M-8 22 L40 -6 L88 22Z" fill={C.roof} />
            <rect x="32" y="34" width="16" height="26" fill={C.wood} />
          </g>
          <path d="M0 190 Q200 170 400 190 V240 H0Z" fill={C.grass} />
          <Hen x={150} y={198} s={0.75} />
          <Hen x={210} y={206} s={0.8} flip peck />
          <Hen x={320} y={212} s={0.7} />
        </>
      )
    case 'hens':
      return (
        <>
          <Hills />
          <Tree x={330} y={120} s={1.2} fill={C.hill3} />
          <path d="M0 175 Q200 150 400 178 V240 H0Z" fill={C.grass} />
          <Hen x={90} y={192} s={1.3} />
          <Hen x={200} y={205} s={1.4} flip peck />
          <Hen x={300} y={196} s={1.15} />
          <Hen x={40} y={215} s={1} flip />
        </>
      )
    case 'barn':
      return (
        <>
          <Hills warm />
          <g transform="translate(90 80)">
            <rect x="0" y="40" width="220" height="80" rx="4" fill={C.wall} />
            <path d="M-12 44 L110 0 L232 44Z" fill={C.roof} />
            {[20, 70, 120, 170].map((x) => (
              <rect key={x} x={x} y="62" width="30" height="16" rx="3" fill={C.brown} opacity="0.75" />
            ))}
            <rect x="96" y="90" width="28" height="30" fill={C.wood} />
          </g>
          <path d="M0 200 Q200 186 400 200 V240 H0Z" fill={C.grass} />
          <Hen x={60} y={214} s={0.8} />
          <Hen x={340} y={216} s={0.8} flip />
        </>
      )
    case 'trees':
      return (
        <>
          <Hills />
          {[40, 110, 180, 250, 320, 380].map((x, i) => (
            <Tree key={x} x={x} y={146 + (i % 2) * 6} s={0.8 + (i % 3) * 0.1} fill={i % 2 ? C.hill3 : C.hill2} />
          ))}
          <path d="M0 190 Q200 175 400 192 V240 H0Z" fill={C.grass} />
          <Fence y={196} />
        </>
      )
    case 'pasture':
      return (
        <>
          <Hills />
          <Tree x={70} y={120} s={1} fill={C.hill3} />
          <path d="M0 180 Q200 160 400 182 V240 H0Z" fill={C.grass} />
          {[
            [190, 176, 1],
            [300, 190, 0.85],
          ].map(([x, y, s]) => (
            <g key={x} transform={`translate(${x} ${y}) scale(${s})`}>
              <rect x="-34" y="-20" width="68" height="34" rx="14" fill="#8a5a3c" />
              <rect x="-28" y="10" width="7" height="22" fill="#6b4329" />
              <rect x="20" y="10" width="7" height="22" fill="#6b4329" />
              <ellipse cx="-42" cy="-14" rx="14" ry="11" fill="#8a5a3c" />
              <ellipse cx="-50" cy="-10" rx="7" ry="6" fill="#d9a77f" />
            </g>
          ))}
        </>
      )
    case 'feed':
      return (
        <>
          <rect width="400" height="240" fill={C.skyWarm} />
          <circle cx="70" cy="56" r="24" fill={C.sun} />
          {Array.from({ length: 14 }, (_, i) => (
            <g key={i} transform={`translate(${20 + i * 28} ${120 + (i % 3) * 8})`}>
              <line x1="0" y1="0" x2="0" y2="130" stroke="#c9a24a" strokeWidth="3" />
              {[0, 12, 24, 36].map((dy) => (
                <g key={dy}>
                  <ellipse cx="-5" cy={dy + 4} rx="4" ry="8" fill="#d8b45a" transform={`rotate(-25 -5 ${dy + 4})`} />
                  <ellipse cx="5" cy={dy + 4} rx="4" ry="8" fill="#d8b45a" transform={`rotate(25 5 ${dy + 4})`} />
                </g>
              ))}
            </g>
          ))}
        </>
      )
    case 'farmer':
      return (
        <>
          <Hills />
          <Tree x={340} y={118} s={1.1} fill={C.hill3} />
          <g transform="translate(180 92)">
            <path d="M-62 150 Q-60 70 0 66 Q60 70 62 150Z" fill="#3c6e8f" />
            <rect x="-26" y="70" width="52" height="40" rx="8" fill="#4d84a8" />
            <rect x="-8" y="48" width="16" height="22" fill="#e2b08a" />
            <circle cx="0" cy="26" r="30" fill="#e8bc96" />
            <path d="M-30 22 Q-28 -12 4 -8 Q32 -6 30 22 Q18 6 -30 22Z" fill="#6a4632" />
            <path d="M-30 20 Q-36 52 -22 60 Q-26 40 -24 24Z" fill="#6a4632" />
            <circle cx="-10" cy="28" r="2.4" fill={C.brown} />
            <circle cx="10" cy="28" r="2.4" fill={C.brown} />
            <path d="M-8 40 Q0 46 8 40" stroke={C.brown} strokeWidth="2.4" fill="none" strokeLinecap="round" />
          </g>
          <Hen x={70} y={212} s={0.9} />
          <Hen x={300} y={218} s={0.8} flip peck />
        </>
      )
  }
}

export function Illustration({ name, className = '', label }: { name: SceneName; className?: string; label?: string }) {
  return (
    <svg
      viewBox="0 0 400 240"
      preserveAspectRatio="xMidYMid slice"
      className={`block h-full w-full ${className}`}
      role="img"
      aria-label={label ?? 'Illustration'}
    >
      <Scene name={name} />
    </svg>
  )
}
