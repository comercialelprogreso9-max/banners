import React from 'react';
import { FlyerData } from '../types';
import { Search, Phone, Mail, MapPin, Star, Flame, Monitor, Laptop as LaptopIcon, Mouse, ShieldCheck, Gift, Plus } from 'lucide-react';

interface FlyerCanvasProps {
  data: FlyerData;
  canvasRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

export const FlyerCanvas: React.FC<FlyerCanvasProps> = ({ data, canvasRef, className = '' }) => {
  const allSpecs = [data.spec1, data.spec2, data.spec3, ...(data.specExtra || [])].filter(Boolean);
  
  const format = data.formatoForma || 'poster';
  const colorTheme = data.estiloColor || 'neon_blue';
  const imgScale = (data.imagenEscala || 100) / 100;
  const blendMode = data.imagenModoMezcla || 'normal';
  const titleScale = (data.tituloEscala || 100) / 100;
  const specsScale = (data.specsEscala || 100) / 100;
  const addressScale = (data.direccionEscala || 100) / 100;
  const addressPosY = data.direccionPosY || 0;
  const priceScale = (data.precioEscala || 100) / 100;
  const pricePosY = data.precioPosY || 0;
  const guaranteeScale = (data.garantiaEscala || 100) / 100;
  const guaranteePosY = data.garantiaPosY || 0;
  const conditionScale = (data.condicionEscala || 100) / 100;
  const conditionPosY = data.condicionPosY || 0;

  // Format dimensions & base layout configuration
  let dimensions = 'w-[800px] h-[1060px]'; // poster 4:5
  if (format === 'instagram') dimensions = 'w-[800px] h-[800px]';
  if (format === 'tiktok_story') dimensions = 'w-[675px] h-[1200px]';
  if (format === 'facebook_banner') dimensions = 'w-[1000px] h-[562px]';

  // Color Theme Configuration
  let bgStyle = 'radial-gradient(ellipse at 75% 20%, #0c234b 0%, #070e20 60%, #030610 100%)';
  let titleColor = 'text-white';
  let accentText = 'text-[#00e5ff]';
  let accentGlow = 'drop-shadow-[0_0_12px_rgba(0,229,255,0.6)]';
  let borderGlow = 'border-[#00e5ff]/60';
  let priceBg = 'from-[#172b5c] via-[#1a326b] to-[#12234d]';
  let footerBg = 'bg-[#0a1e38]/95 border-[#00e5ff]/40';
  let primaryGlowHex = '#00e5ff';
  let secondaryGlowHex = '#2563eb';
  let strokeGlowHex = 'rgba(0, 229, 255, 0.4)';

  if (colorTheme === 'gold_black') {
    bgStyle = 'radial-gradient(ellipse at 75% 20%, #2e230b 0%, #120e05 60%, #050401 100%)';
    accentText = 'text-amber-300';
    accentGlow = 'drop-shadow-[0_0_12px_rgba(245,158,11,0.6)]';
    borderGlow = 'border-amber-400/60';
    priceBg = 'from-[#3b2d0d] via-[#47360e] to-[#241c08]';
    footerBg = 'bg-[#1a1407]/95 border-amber-400/50';
    primaryGlowHex = '#fbbf24';
    secondaryGlowHex = '#d97706';
    strokeGlowHex = 'rgba(251, 191, 36, 0.4)';
  } else if (colorTheme === 'cyber_purple') {
    bgStyle = 'radial-gradient(ellipse at 75% 20%, #320d45 0%, #15051e 60%, #07010a 100%)';
    accentText = 'text-fuchsia-300';
    accentGlow = 'drop-shadow-[0_0_12px_rgba(217,70,239,0.6)]';
    borderGlow = 'border-fuchsia-400/60';
    priceBg = 'from-[#42125b] via-[#4d166a] to-[#2c0c3e]';
    footerBg = 'bg-[#1b0728]/95 border-fuchsia-400/50';
    primaryGlowHex = '#e087ff';
    secondaryGlowHex = '#a855f7';
    strokeGlowHex = 'rgba(224, 135, 255, 0.4)';
  } else if (colorTheme === 'emerald_pro') {
    bgStyle = 'radial-gradient(ellipse at 75% 20%, #083327 0%, #031711 60%, #010a07 100%)';
    accentText = 'text-emerald-300';
    accentGlow = 'drop-shadow-[0_0_12px_rgba(16,185,129,0.6)]';
    borderGlow = 'border-emerald-400/60';
    priceBg = 'from-[#0b4233] via-[#0d4f3d] to-[#072c22]';
    footerBg = 'bg-[#041d16]/95 border-emerald-400/50';
    primaryGlowHex = '#34d399';
    secondaryGlowHex = '#059669';
    strokeGlowHex = 'rgba(52, 211, 153, 0.4)';
  } else if (colorTheme === 'ruby_red') {
    bgStyle = 'radial-gradient(ellipse at 75% 20%, #450c18 0%, #1a0409 60%, #080103 100%)';
    accentText = 'text-rose-300';
    accentGlow = 'drop-shadow-[0_0_12px_rgba(244,63,94,0.6)]';
    borderGlow = 'border-rose-400/60';
    priceBg = 'from-[#571020] via-[#631325] to-[#390a15]';
    footerBg = 'bg-[#21050c]/95 border-rose-400/50';
    primaryGlowHex = '#f43f5e';
    secondaryGlowHex = '#e11d48';
    strokeGlowHex = 'rgba(244, 63, 94, 0.4)';
  } else if (colorTheme === 'royal_blue') {
    bgStyle = 'radial-gradient(ellipse at 75% 20%, #102a6b 0%, #081538 60%, #030818 100%)';
    accentText = 'text-blue-300';
    accentGlow = 'drop-shadow-[0_0_12px_rgba(96,165,250,0.6)]';
    borderGlow = 'border-blue-400/60';
    priceBg = 'from-[#143587] via-[#173e9e] to-[#0e245c]';
    footerBg = 'bg-[#0a1c47]/95 border-blue-400/50';
    primaryGlowHex = '#60a5fa';
    secondaryGlowHex = '#1d4ed8';
    strokeGlowHex = 'rgba(96, 165, 250, 0.4)';
  }

  // Calculate discount string if applicable
  // Calculate offer mode only when user explicitly toggled/selected esOferta === true
  const hasOffer = Boolean(data.esOferta);
  let calcDiscount = '';
  if (data.porcentajeDescuento) {
    calcDiscount = String(data.porcentajeDescuento);
  } else if (data.precioAnterior && data.precio && Number(data.precioAnterior) > Number(data.precio)) {
    const diff = Number(data.precioAnterior) - Number(data.precio);
    const pct = Math.round((diff / Number(data.precioAnterior)) * 100);
    calcDiscount = `${pct}% OFF`;
  }

  // Helper for 24-point Starburst Seal SVG
  const renderStarburstSeal = () => {
    // Exact 24-point serrated star matching reference image
    const points: string[] = [];
    const numPoints = 28;
    const outerRadius = 50;
    const innerRadius = 43;
    for (let i = 0; i < numPoints * 2; i++) {
      const r = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i * Math.PI) / numPoints;
      const x = 50 + r * Math.sin(angle);
      const y = 50 - r * Math.cos(angle);
      points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }

    return (
      <div className="relative flex items-center justify-center shrink-0">
        <div className="w-[135px] h-[135px] relative flex items-center justify-center filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.7)]">
          {/* Jagged Starburst Background Shape */}
          <svg viewBox="0 0 100 100" className="w-full h-full text-amber-400 fill-current">
            <polygon points={points.join(' ')} />
          </svg>
          
          {/* Inner Circular Badge Container */}
          <div className="absolute inset-3 rounded-full bg-gradient-to-b from-amber-100 via-amber-200 to-amber-300 border-2 border-dashed border-amber-700 flex flex-col items-center justify-center text-center p-1 shadow-inner">
            <span className="text-[38px] font-black text-slate-950 leading-none tracking-tight">
              {data.garantiaMeses}
            </span>
            <span className="text-[9px] font-black text-slate-950 tracking-wider uppercase leading-tight mt-0.5">
              MESES DE <br /> GARANTIA
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      ref={canvasRef}
      id="flyer-poster-canvas"
      className={`relative ${dimensions} bg-[#070e20] text-white overflow-hidden font-sans select-none flex flex-col justify-between p-7 shrink-0 ${className}`}
      style={{ background: bgStyle }}
    >
      {/* Background Ambient Lighting Glows & Radial Spotlight */}
      <div className="absolute top-[10%] right-[10%] w-[480px] h-[480px] rounded-full blur-[100px] pointer-events-none opacity-40" style={{ backgroundColor: primaryGlowHex }} />
      <div className="absolute bottom-[5%] left-[5%] w-[420px] h-[420px] rounded-full blur-[90px] pointer-events-none opacity-30" style={{ backgroundColor: secondaryGlowHex }} />
      <div className="absolute top-[35%] left-[30%] w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-20" style={{ backgroundColor: primaryGlowHex }} />

      {/* RICH HIGH-TECH ABSTRACT BACKGROUND OVERLAY (IMAGE 1: Laser Beams & Facets + IMAGE 2: Circuit Grid & Hex Nodes + IMAGE 3: Energy Flares) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Laser Light Rays Gradient (Image 1 replica) */}
            <linearGradient id={`laser-ray-${colorTheme}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={primaryGlowHex} stopOpacity="0.8" />
              <stop offset="35%" stopColor={primaryGlowHex} stopOpacity="0.2" />
              <stop offset="100%" stopColor={secondaryGlowHex} stopOpacity="0" />
            </linearGradient>

            <linearGradient id={`vertical-beam-${colorTheme}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={primaryGlowHex} stopOpacity="0" />
              <stop offset="50%" stopColor={primaryGlowHex} stopOpacity="0.6" />
              <stop offset="100%" stopColor={primaryGlowHex} stopOpacity="0" />
            </linearGradient>

            {/* Hexagon Pattern for 3D Perspective Honeycomb Mesh Floor (Image 2) */}
            <pattern id={`hex-pattern-${colorTheme}`} width="32" height="55.4" patternUnits="userSpaceOnUse">
              <path
                d="M16 0 L32 9.24 L32 27.7 16 36.94 L0 27.7 L0 9.24 Z M16 55.4 L32 46.16 L32 27.7 16 36.94 L0 27.7 L0 46.16 Z"
                fill="none"
                stroke={primaryGlowHex}
                strokeWidth="0.8"
                strokeOpacity="0.35"
              />
              <circle cx="16" cy="18.47" r="1.5" fill={primaryGlowHex} fillOpacity="0.5" />
            </pattern>

            {/* Cyber Wave Grid Pattern (Image 2) */}
            <pattern id={`grid-pattern-${colorTheme}`} width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M 36 0 L 0 0 0 36" fill="none" stroke={strokeGlowHex} strokeWidth="0.6" strokeOpacity="0.28" />
              <circle cx="0" cy="0" r="1.2" fill={primaryGlowHex} fillOpacity="0.4" />
            </pattern>

            {/* Linear Gradient for Floor Fade */}
            <linearGradient id={`floor-fade-${colorTheme}`} x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor={primaryGlowHex} stopOpacity="0.45" />
              <stop offset="35%" stopColor={primaryGlowHex} stopOpacity="0.2" />
              <stop offset="100%" stopColor={primaryGlowHex} stopOpacity="0" />
            </linearGradient>

            {/* Glow Filter */}
            <filter id={`neonGlow-${colorTheme}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. ANGLED LASER BEAMS & GLASS LIGHT FACETS (IMAGE 1 REPLICA) */}
          <g opacity={hasOffer || data.esRegalia ? "0.6" : "0.45"}>
            {/* Far Right Angled Light Facet Beam */}
            <polygon
              points="520,-50 820,-50 680,1100 480,1100"
              fill={`url(#laser-ray-${colorTheme})`}
              opacity="0.35"
            />
            <line
              x1="520" y1="-50" x2="480" y2="1100"
              stroke={primaryGlowHex}
              strokeWidth="2.5"
              strokeOpacity="0.85"
              filter={`url(#neonGlow-${colorTheme})`}
            />
            <line
              x1="820" y1="-50" x2="680" y2="1100"
              stroke={secondaryGlowHex}
              strokeWidth="1.5"
              strokeOpacity="0.6"
            />

            {/* Center Vertical Laser Beams */}
            <rect
              x="240" y="-100" width="12" height="1300"
              fill={`url(#vertical-beam-${colorTheme})`}
              opacity="0.6"
              filter={`url(#neonGlow-${colorTheme})`}
            />
            <rect
              x="580" y="-100" width="8" height="1300"
              fill={`url(#vertical-beam-${colorTheme})`}
              opacity="0.5"
              filter={`url(#neonGlow-${colorTheme})`}
            />

            {/* Left Angled Light Facet */}
            <polygon
              points="-50,200 180,-50 80,1100 -100,1100"
              fill={`url(#laser-ray-${colorTheme})`}
              opacity="0.22"
            />
          </g>

          {/* 2. CIRCUIT BOARD NETWORK TRACES & HEX CHIPS (IMAGE 2 REPLICA) */}
          <g stroke={primaryGlowHex} fill="none" opacity="0.65" filter={`url(#neonGlow-${colorTheme})`}>
            {/* Top Left Circuit Bus */}
            <path d="M -20 180 H 120 L 170 230 H 280" strokeWidth="1.8" />
            <circle cx="120" cy="180" r="3.5" fill={primaryGlowHex} />
            <circle cx="280" cy="230" r="4" fill={primaryGlowHex} />
            <polygon points="280,226 292,230 280,234" fill={primaryGlowHex} />

            {/* Top Right Hex Circuit Nodes */}
            <polygon points="680,120 710,102 740,120 740,156 710,174 680,156" strokeWidth="1.5" fill="rgba(7,14,32,0.6)" />
            <circle cx="710" cy="138" r="4" fill={primaryGlowHex} />
            <path d="M 740 138 H 820" strokeWidth="1.8" />
            <path d="M 680 138 H 610 L 580 168 H 520" strokeWidth="1.5" strokeDasharray="6 3" />
            <circle cx="520" cy="168" r="3" fill={primaryGlowHex} />

            {/* Middle Right Circuit Bus & Hexagon */}
            <polygon points="710,480 735,465 760,480 760,510 735,525 710,510" strokeWidth="1.8" fill="rgba(7,14,32,0.7)" />
            <path d="M 760 495 H 820" strokeWidth="2" />
            <path d="M 710 495 H 630 L 600 465 H 510" strokeWidth="1.5" />
            <circle cx="510" cy="465" r="3.5" fill={primaryGlowHex} />

            {/* Bottom Left Circuit Grid Bus */}
            <path d="M -20 720 H 140 L 190 770 H 320" strokeWidth="2" />
            <circle cx="140" cy="720" r="3.5" fill={primaryGlowHex} />
            <polygon points="320,766 332,770 320,774" fill={primaryGlowHex} />

            <polygon points="40,820 65,805 90,820 90,850 65,865 40,850" strokeWidth="1.5" fill="rgba(7,14,32,0.6)" />
            <path d="M 90 835 H 180 L 210 865 H 280" strokeWidth="1.5" strokeDasharray="8 4" />
            <circle cx="280" cy="865" r="3" fill={secondaryGlowHex} />
          </g>

          {/* 3. 3D HONEYCOMB MESH FLOOR AT THE BOTTOM */}
          <g transform="translate(0, 580)">
            <rect
              x="-50"
              y="0"
              width="900"
              height="500"
              fill={`url(#hex-pattern-${colorTheme})`}
              opacity="0.85"
            />
            <rect
              x="-50"
              y="0"
              width="900"
              height="500"
              fill={`url(#floor-fade-${colorTheme})`}
            />
            {/* Horizontal Horizon Glowing Light Beam */}
            <line
              x1="0"
              y1="10"
              x2="800"
              y2="10"
              stroke={primaryGlowHex}
              strokeWidth="3.5"
              strokeOpacity="0.85"
              filter={`url(#neonGlow-${colorTheme})`}
            />
            <line
              x1="80"
              y1="18"
              x2="720"
              y2="18"
              stroke={secondaryGlowHex}
              strokeWidth="1.8"
              strokeOpacity="0.6"
            />
          </g>

          {/* 4. HIGH-ENERGY PROMO / REGALÍA LIGHTNING SLASHES (IMAGE 3 REPLICA FOR OFERTAS/REGALÍAS) */}
          {(hasOffer || data.esRegalia) && (
            <g filter={`url(#neonGlow-${colorTheme})`}>
              <polygon
                points="620,-20 690,-20 610,380 540,380"
                fill={primaryGlowHex}
                opacity="0.25"
              />
              <polygon
                points="680,-20 720,-20 640,380 600,380"
                fill="#fbbf24"
                opacity="0.32"
              />
              {/* Floating Lightning Bolt Top Right */}
              <path
                d="M 730 40 L 710 100 L 728 100 L 702 170 L 742 95 L 722 95 Z"
                fill="#fbbf24"
                opacity="0.85"
              />
              {/* Floating Lightning Bolt Bottom Left */}
              <path
                d="M 70 680 L 52 730 L 68 730 L 48 795 L 82 725 L 66 725 Z"
                fill={primaryGlowHex}
                opacity="0.75"
              />
            </g>
          )}

          {/* Floating Star Particles / Sparkles (✦) */}
          <g fill="#ffffff" opacity="0.85">
            <circle cx="120" cy="180" r="2" filter={`url(#neonGlow-${colorTheme})`} />
            <circle cx="280" cy="100" r="1.5" />
            <circle cx="680" cy="260" r="2.5" fill={primaryGlowHex} />
            <circle cx="740" cy="450" r="2" />
            <circle cx="80" cy="540" r="2.5" fill={primaryGlowHex} />
            <circle cx="660" cy="820" r="1.5" />
            <circle cx="200" cy="920" r="2" fill={secondaryGlowHex} />
          </g>
        </svg>
      </div>

      {/* 1. TOP HEADER BAR */}
      <div className="relative z-10 flex items-start justify-between w-full">
        {/* Left Search Pill (Exact match to reference) */}
        <div className="flex items-center justify-between border-2 border-white/90 rounded-full px-6 py-2.5 min-w-[350px] bg-[#070e20] shadow-lg">
          <span className="font-extrabold text-lg tracking-wider text-white uppercase">
            COMERCIAL EL PROGRESO
          </span>
          <Search className="w-6 h-6 text-white stroke-[2.5]" />
        </div>

        {/* Right Logo Stamp Badge (Exact match to reference) */}
        <div className="w-[230px] rounded-2xl bg-gradient-to-b from-[#0c2049] via-[#091536] to-[#040a1c] border border-cyan-400/40 p-3 text-center shadow-xl relative overflow-hidden">
          {/* Subtle Grid Dot Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#00e5ff_1px,transparent_1px)] [background-size:10px_10px] opacity-20 pointer-events-none" />

          <div className="relative z-10">
            {/* Header Tech Icons */}
            <div className="flex items-center justify-center gap-2 mb-1 text-cyan-300">
              <Monitor className="w-3.5 h-3.5" />
              <LaptopIcon className="w-3.5 h-3.5" />
              <Mouse className="w-3.5 h-3.5" />
            </div>

            <h2 className="text-white font-black text-sm tracking-wide uppercase leading-tight">
              COMERCIAL <br />
              <span className={accentText}>"EL PROGRESO"</span>
            </h2>
            <p className="text-[10px] text-slate-300 mt-1 font-medium leading-tight">
              Venta de Computadoras, Accesorios y Servicio Técnico
            </p>
            <p className="text-[9px] text-cyan-400 font-bold mt-1 tracking-wider uppercase">
              {data.logoSubtitulo || 'Especializado en Tecnología'}
            </p>

            {/* WhatsApp Green Pill */}
            <div className="mt-2 inline-flex items-center justify-center gap-1.5 bg-[#0a3120] border border-emerald-500/60 rounded-full px-3 py-1 text-[11px] font-bold text-emerald-300 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{data.telefono.replace('+505 ', '')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN LAYOUT (ADAPTS FOR POSTER, INSTAGRAM, STORY, FACEBOOK BANNER) */}
      {format === 'facebook_banner' ? (
        /* HORIZONTAL FACEBOOK BANNER LAYOUT (16:9) */
        <div className="relative z-10 grid grid-cols-12 gap-4 my-auto items-center">
          {/* LEFT: TITLE, SPECS & PRICE */}
          <div className="col-span-6 space-y-3">
            <div>
              <h1
                className="font-black uppercase text-white leading-tight"
                style={{ fontSize: `${Math.round(34 * titleScale)}px` }}
              >
                {data.titleLine1} {data.titleLine2}
              </h1>
              {data.titleLine3 && (
                <h2
                  className="font-bold text-slate-200"
                  style={{ fontSize: `${Math.round(18 * titleScale)}px` }}
                >
                  {data.titleLine3}
                </h2>
              )}
            </div>

            <div className="grid grid-cols-2 gap-1.5 text-xs font-bold">
              {allSpecs.slice(0, 6).map((spec, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-slate-100">
                  <Star
                    className="text-amber-400 fill-amber-400 shrink-0"
                    style={{ width: `${Math.round(14 * specsScale)}px`, height: `${Math.round(14 * specsScale)}px` }}
                  />
                  <span
                    className="truncate"
                    style={{ fontSize: `${Math.round(12 * specsScale)}px` }}
                  >
                    {spec}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Box */}
            <div className="inline-flex items-center bg-gradient-to-r from-slate-900 to-slate-950 border-2 border-cyan-400 rounded-xl px-4 py-2">
              <span className="text-xs font-bold text-cyan-300 mr-2">PRECIO {data.moneda || 'Dólares'}:</span>
              <span className="text-2xl font-black text-white">${data.precio}</span>
            </div>
          </div>

          {/* RIGHT: PRODUCT IMAGE, GUARANTEE & CONDITION */}
          <div className="col-span-6 flex items-center justify-between relative">
            {data.esRegalia && data.imagenRegaliaUrl ? (
              /* DUAL IMAGE REGALÍA SHOWCASE (HORIZONTAL) */
              <div className="flex items-center gap-2 relative z-10 my-auto">
                <div className="relative w-[130px] h-[170px] flex flex-col items-center justify-center bg-slate-900/60 rounded-xl border border-cyan-500/30 p-1">
                  <span className="text-[8px] font-black uppercase text-cyan-300 bg-slate-950/80 px-1.5 py-0.5 rounded mb-1">
                    PRODUCTO
                  </span>
                  <img
                    src={data.imagenUrl}
                    alt="Producto Principal"
                    crossOrigin="anonymous"
                    className="max-h-[130px] max-w-full object-contain"
                    style={{ transform: `scale(${imgScale})`, mixBlendMode: blendMode !== 'normal' ? blendMode : undefined }}
                  />
                </div>

                <div className="flex flex-col items-center justify-center shrink-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-600 via-amber-500 to-red-600 text-white font-black text-lg flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.8)] border border-yellow-300 animate-pulse">
                    +
                  </div>
                  <span className="text-[8px] font-black text-amber-300 uppercase tracking-tighter mt-1">
                    REGALÍA
                  </span>
                </div>

                <div className="relative w-[130px] h-[170px] flex flex-col items-center justify-center bg-amber-950/40 rounded-xl border-2 border-amber-400/60 p-1 shadow-[0_0_15px_rgba(251,191,36,0.2)]">
                  <span className="text-[8px] font-black uppercase text-amber-300 bg-amber-950 px-1.5 py-0.5 rounded mb-1 flex items-center gap-0.5">
                    <Gift className="w-2.5 h-2.5" />
                    <span>GRATIS</span>
                  </span>
                  <img
                    src={data.imagenRegaliaUrl}
                    alt="Regalía"
                    crossOrigin="anonymous"
                    className="max-h-[130px] max-w-full object-contain"
                    style={{
                      transform: `scale(${((data.imagenRegaliaEscala || 100) / 100)})`,
                      mixBlendMode: blendMode !== 'normal' ? blendMode : undefined
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="relative w-[280px] h-[220px] flex items-center justify-center">
                <img
                  src={data.imagenUrl}
                  alt="Producto"
                  crossOrigin="anonymous"
                  className="max-h-[200px] object-contain transition-transform duration-150"
                  style={{ transform: `scale(${imgScale})`, mixBlendMode: blendMode !== 'normal' ? blendMode : undefined }}
                />
              </div>
            )}

            <div className="flex flex-col items-center gap-2">
              {data.mostrarGarantia !== false && Boolean(data.garantiaMeses) && renderStarburstSeal()}
              {data.condicion && (
                <span className={`text-xl font-black ${accentText} tracking-wider uppercase`}>
                  {data.condicion}
                </span>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* STANDARD POSTER / INSTAGRAM / TIKTOK LAYOUT (MATCHING REFERENCE IMAGE) */
        <div className="relative z-10 grid grid-cols-12 gap-4 my-auto items-center">
          
          {/* LEFT COLUMN: PRODUCT TITLE, SPECS, PRICE, ADDRESS */}
          <div className="col-span-6 flex flex-col justify-between space-y-4 pl-1">
            
            {/* Main Product Title (Exact reference layout) */}
            <div
              className="space-y-0.5 transition-transform duration-150"
              style={{ transform: `translateY(${data.tituloPosY || 0}px)` }}
            >
              <h1
                className="font-black uppercase text-white tracking-tight leading-[1.02] drop-shadow-md"
                style={{ fontSize: `${Math.round(44 * titleScale)}px` }}
              >
                {data.titleLine1 || 'LAPTOP G2'}
              </h1>
              <h1
                className="font-black uppercase text-white tracking-tight leading-[1.02] drop-shadow-md"
                style={{ fontSize: `${Math.round(44 * titleScale)}px` }}
              >
                {data.titleLine2 || 'DRAGONFLY'}
              </h1>
              {data.titleLine3 && (
                <h2
                  className="font-bold text-slate-100 tracking-normal leading-tight mt-1"
                  style={{ fontSize: `${Math.round(28 * titleScale)}px` }}
                >
                  {data.titleLine3}
                </h2>
              )}
            </div>

            {/* Specifications List (Vertical Stack with ⭐ Stars matching reference) */}
            <div
              className="py-1 space-y-2 transition-transform duration-150"
              style={{ transform: `translateY(${data.specsPosY || 0}px)` }}
            >
              <div className="flex flex-col space-y-1.5 pl-2">
                {allSpecs.map((spec, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-white font-extrabold tracking-wide">
                    <Star
                      className="text-amber-400 fill-amber-400 shrink-0 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]"
                      style={{ width: `${Math.round(20 * specsScale)}px`, height: `${Math.round(20 * specsScale)}px` }}
                    />
                    <span
                      className="leading-tight drop-shadow-sm"
                      style={{ fontSize: `${Math.round(20 * specsScale)}px` }}
                    >
                      {spec}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* PRICE BOX (Exact Cut-Corner Parallelogram Shape from Reference) */}
            <div
              className="pt-1 transition-transform duration-150"
              style={{
                transform: `translateY(${pricePosY}px) scale(${priceScale})`,
                transformOrigin: 'left center'
              }}
            >
              {hasOffer ? (
                /* Offer Special Price Box (High-impact special offer price display without percentage badge) */
                <div className="inline-flex flex-col bg-gradient-to-r from-red-950 via-slate-900 to-slate-950 border-2 border-amber-400/90 rounded-2xl p-3.5 shadow-[0_0_30px_rgba(239,68,68,0.5)] relative overflow-hidden">
                  {/* Subtle Shimmer Angle Accent */}
                  <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-amber-400/20 to-transparent pointer-events-none" />
                  <div className="flex items-center justify-between gap-3 border-b border-amber-400/30 pb-2 mb-2">
                    <span className="bg-gradient-to-r from-red-600 to-amber-500 text-white text-[11px] font-black uppercase px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md">
                      <Flame className="w-4 h-4 fill-amber-200 animate-pulse" />
                      <span>{data.etiquetaOferta || '🔥 ¡OFERTA RELÁMPAGO!'}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-5">
                    {/* AHORA PRICE */}
                    <div className="flex flex-col">
                      <span className="text-amber-400 font-extrabold text-[11px] uppercase tracking-wider">
                        AHORA
                      </span>
                      <div className="flex items-baseline gap-1 text-[46px] font-black text-white leading-none tracking-tight">
                        <span className="text-2xl font-bold text-amber-400">$</span>
                        <span className="text-amber-300 drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]">{data.precio}</span>
                      </div>
                    </div>

                    {/* ANTES PRICE */}
                    {data.precioAnterior && (
                      <div className="flex flex-col border-l border-amber-400/30 pl-4 py-0.5">
                        <span className="text-slate-400 text-[11px] uppercase font-extrabold tracking-wider">
                          ANTES
                        </span>
                        <span className="text-slate-400 text-2xl font-bold line-through decoration-red-500 decoration-2">
                          ${data.precioAnterior}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* Regular Price Box (Exact Parallelogram Shape matching reference image) */
                <div className="inline-flex items-center bg-gradient-to-r from-[#172b5c] via-[#1a326b] to-[#12234d] border-2 border-cyan-400/80 rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(0,229,255,0.25)]">
                  <div className="px-4 py-3 bg-[#0a1636] text-cyan-300 text-xs font-black uppercase tracking-wider leading-tight border-r border-cyan-500/30 text-center">
                    Precio <br />
                    <span className="text-white text-[11px]">{data.moneda || 'Dólares'}</span>
                  </div>
                  <div className="px-5 py-2 text-[44px] font-black text-white tracking-tight flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-cyan-300">$</span>
                    <span className="drop-shadow-md">{data.precio}</span>
                  </div>
                </div>
              )}
            </div>

            {/* ADDRESS BOX (Exact match to reference box) */}
            <div
              className="w-[350px] border-2 border-white/90 rounded-2xl p-3.5 bg-slate-950 shadow-lg transition-transform duration-150"
              style={{
                transform: `translateY(${addressPosY}px) scale(${addressScale})`,
                transformOrigin: 'left center'
              }}
            >
              <p className="text-white font-extrabold text-[13px] leading-snug">
                Visítanos en {data.direccion}
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN: PRODUCT SHOWCASE IMAGE(S), GUARANTEE SEAL & CONDITION */}
          <div className="col-span-6 flex flex-col items-center justify-between relative min-h-[500px]">
            
            {data.esRegalia && data.imagenRegaliaUrl ? (
              /* DUAL IMAGE REGALÍA SHOWCASE (VERTICAL STACK WITH '+' SIGN IN BETWEEN) */
              <div className="relative w-full max-w-[440px] flex flex-col items-center justify-center gap-1.5 z-10 py-1 my-auto">
                
                {/* Product 1 Container (Main) */}
                <div className="relative w-full h-[195px] flex items-center justify-center bg-[#07132a] rounded-2xl border-2 border-cyan-400/50 p-2 shadow-[0_0_25px_rgba(0,229,255,0.25)] overflow-hidden">
                  <span className="absolute top-2 left-2.5 z-20 bg-cyan-500/90 text-slate-950 font-black text-[10px] uppercase px-3 py-0.5 rounded-full shadow-md tracking-wider border border-cyan-200">
                    💻 PRODUCTO PRINCIPAL
                  </span>
                  <img
                    src={data.imagenUrl}
                    alt="Producto Principal"
                    crossOrigin="anonymous"
                    className="max-h-[175px] max-w-full object-contain transition-transform duration-150 drop-shadow-lg"
                    style={{ transform: `scale(${imgScale})`, mixBlendMode: blendMode !== 'normal' ? blendMode : undefined }}
                  />
                </div>

                {/* Central Plus / Regalía Badge in Between */}
                <div className="relative z-30 -my-3 flex items-center justify-center">
                  <div className="bg-gradient-to-r from-red-600 via-amber-500 to-red-600 text-white font-black text-xs px-5 py-2 rounded-full shadow-[0_0_30px_rgba(239,68,68,0.9)] border-2 border-amber-300 flex items-center gap-2.5 animate-pulse">
                    <div className="w-7 h-7 rounded-full bg-amber-300 text-slate-950 font-black text-lg flex items-center justify-center leading-none shadow-md">
                      +
                    </div>
                    <span className="uppercase tracking-wide font-black text-[12px] drop-shadow-md">
                      {data.etiquetaRegalia || '🎁 ¡INCLUYE REGALÍA TOTALMENTE GRATIS!'}
                    </span>
                  </div>
                </div>

                {/* Product 2 (Regalía) Container */}
                <div className="relative w-full h-[195px] flex items-center justify-center bg-gradient-to-b from-[#2a1b06] to-[#0c162d] rounded-2xl border-2 border-amber-400/80 p-2 shadow-[0_0_30px_rgba(251,191,36,0.35)] overflow-hidden">
                  <span className="absolute top-2 left-2.5 z-20 bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-black text-[10px] uppercase px-3 py-0.5 rounded-full shadow-md tracking-wider flex items-center gap-1.5 border border-amber-100">
                    <Gift className="w-3.5 h-3.5 fill-slate-950" />
                    <span>REGALÍA GRATIS</span>
                    {data.tituloRegalia && <span className="bg-slate-950/90 text-amber-300 px-2 py-0.2 rounded-full ml-1 font-extrabold">{data.tituloRegalia}</span>}
                  </span>
                  <img
                    src={data.imagenRegaliaUrl}
                    alt="Regalía"
                    crossOrigin="anonymous"
                    className="max-h-[175px] max-w-full object-contain transition-transform duration-150 drop-shadow-xl"
                    style={{
                      transform: `scale(${((data.imagenRegaliaEscala || 100) / 100)})`,
                      mixBlendMode: blendMode !== 'normal' ? blendMode : undefined
                    }}
                  />
                </div>

              </div>
            ) : (
              /* SINGLE PRODUCT IMAGE CONTAINER */
              <div className="relative w-full max-w-[430px] h-[350px] flex items-center justify-center z-10">
                <img
                  src={data.imagenUrl}
                  alt="Producto Comercial El Progreso"
                  crossOrigin="anonymous"
                  className="max-h-[330px] max-w-full object-contain transition-transform duration-150"
                  style={{ transform: `scale(${imgScale})`, mixBlendMode: blendMode !== 'normal' ? blendMode : undefined }}
                />
              </div>
            )}

            {/* Guarantee Starburst Seal & Condition Label (Exact match to reference image bottom-right) */}
            <div className="w-full flex flex-col items-end gap-3 pr-2 z-10">
              
              {/* Starburst Guarantee Seal (Only shown if warranty is enabled) */}
              {data.mostrarGarantia !== false && Boolean(data.garantiaMeses && String(data.garantiaMeses).trim() !== '0') && (
                <div
                  className="transition-transform duration-150"
                  style={{
                    transform: `translateY(${guaranteePosY}px) scale(${guaranteeScale})`,
                    transformOrigin: 'right center'
                  }}
                >
                  {renderStarburstSeal()}
                </div>
              )}

              {/* Condition Label (Cyan text with cyan underline bar) */}
              {data.condicion && (
                <div
                  className="flex flex-col items-end justify-center pr-2 transition-transform duration-150"
                  style={{
                    transform: `translateY(${conditionPosY}px) scale(${conditionScale})`,
                    transformOrigin: 'right center'
                  }}
                >
                  <span className={`text-[28px] font-black ${accentText} tracking-wider uppercase ${accentGlow}`}>
                    {data.condicion}
                  </span>
                  <div className="w-[160px] h-1.5 bg-[#00e5ff] rounded-full shadow-[0_0_12px_rgba(0,229,255,0.9)]" />
                </div>
              )}

            </div>

          </div>

        </div>
      )}

      {/* 3. FOOTER CONTACT BANNER (EXACT MATCH TO REFERENCE IMAGE BOTTOM PILL - ENLARGED FIXED FONT) */}
      <div className="relative z-10 w-full pt-3">
        <div className={`w-full ${footerBg} rounded-full py-4 px-9 flex items-center justify-around shadow-[0_0_30px_rgba(0,229,255,0.25)] border`}>
          
          {/* Phone Cotiza */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-white text-[#0d233e] flex items-center justify-center shrink-0 shadow-md">
              <Phone className="w-5.5 h-5.5 fill-current stroke-none" />
            </div>
            <div>
              <p className="text-xs text-cyan-200 font-bold uppercase tracking-wide">Cotiza al</p>
              <p className="text-xl font-black text-white tracking-wider">{data.telefono}</p>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="h-10 w-[2px] bg-cyan-400/50" />

          {/* Email Cotiza */}
          <div className="flex items-center gap-3.5">
            <div className="text-right">
              <p className="text-xs text-cyan-200 font-bold uppercase tracking-wide">Cotiza en</p>
              <p className="text-lg font-extrabold text-white tracking-tight">{data.email}</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
