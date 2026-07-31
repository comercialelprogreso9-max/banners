import React from 'react';
import { FlyerData } from '../types';
import { 
  Search, Phone, Mail, MapPin, Star, Flame, Monitor, Laptop as LaptopIcon, 
  Mouse, ShieldCheck, Gift, Plus, Crown, Tag
} from 'lucide-react';

interface FlyerCanvasProps {
  data: FlyerData;
  canvasRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

export const FlyerCanvas: React.FC<FlyerCanvasProps> = ({ data, canvasRef, className = '' }) => {
  const allSpecs = [data.spec1, data.spec2, data.spec3, ...(data.specExtra || [])].filter(Boolean);
  
  const format = data.formatoForma || 'poster';
  const colorTheme = data.estiloColor || 'royal_blue';
  
  const imgScale = (data.imagenEscala || 100) / 100;
  const blendMode = data.imagenModoMezcla || 'normal';
  
  const titleScale = (data.tituloEscala || 100) / 100;
  const titlePosY = data.tituloPosY || 0;
  
  const specsScale = (data.specsEscala || 100) / 100;
  const specsPosY = data.specsPosY || 0;
  
  const addressScale = (data.direccionEscala || 100) / 100;
  const addressPosY = data.direccionPosY || 0;
  
  const priceScale = (data.precioEscala || 100) / 100;
  const pricePosY = data.precioPosY || 0;
  
  const guaranteeScale = (data.garantiaEscala || 100) / 100;
  const guaranteePosY = data.garantiaPosY || 0;
  
  const conditionScale = (data.condicionEscala || 100) / 100;
  const conditionPosY = data.condicionPosY || 0;

  // Format dimensions
  let dimensions = 'w-[800px] h-[1060px]'; // poster 4:5
  if (format === 'instagram') dimensions = 'w-[800px] h-[800px]';
  if (format === 'tiktok_story') dimensions = 'w-[675px] h-[1200px]';
  if (format === 'facebook_banner') dimensions = 'w-[1000px] h-[562px]';

  // Color Theme Engine
  let bgStyle = 'radial-gradient(circle at 50% 30%, #0d224d 0%, #061129 60%, #020612 100%)';
  let accentText = 'text-[#fce798]';
  let accentGlow = 'drop-shadow-[0_0_12px_rgba(252,231,152,0.6)]';
  let borderGlow = 'border-[#dfa033]/70';
  let priceBg = 'from-[#dfa033] via-[#fce798] to-[#c48f2c] text-slate-950';
  let footerBg = 'bg-[#071536] border-[#dfa033]/60';
  let cardBg = 'bg-[#07132a] border-[#dfa033]/60';
  let primaryGlowHex = '#fce798';
  let secondaryGlowHex = '#dfa033';

  if (colorTheme === 'gold_black') {
    bgStyle = 'radial-gradient(circle at 50% 30%, #2e230b 0%, #120e05 60%, #050401 100%)';
    accentText = 'text-amber-300';
    accentGlow = 'drop-shadow-[0_0_12px_rgba(245,158,11,0.6)]';
    borderGlow = 'border-amber-400/60';
    priceBg = 'from-amber-400 via-yellow-200 to-amber-500 text-slate-950';
    footerBg = 'bg-[#1a1407] border-amber-400/50';
    cardBg = 'bg-[#140f05] border-amber-400/50';
    primaryGlowHex = '#fbbf24';
    secondaryGlowHex = '#d97706';
  } else if (colorTheme === 'neon_blue') {
    bgStyle = 'radial-gradient(circle at 50% 30%, #0c234b 0%, #070e20 60%, #030610 100%)';
    accentText = 'text-[#00e5ff]';
    accentGlow = 'drop-shadow-[0_0_12px_rgba(0,229,255,0.6)]';
    borderGlow = 'border-[#00e5ff]/60';
    priceBg = 'from-cyan-400 via-blue-200 to-cyan-500 text-slate-950';
    footerBg = 'bg-[#0a1e38] border-[#00e5ff]/40';
    cardBg = 'bg-[#08172c] border-[#00e5ff]/50';
    primaryGlowHex = '#00e5ff';
    secondaryGlowHex = '#2563eb';
  } else if (colorTheme === 'cyber_purple') {
    bgStyle = 'radial-gradient(circle at 50% 30%, #320d45 0%, #15051e 60%, #07010a 100%)';
    accentText = 'text-fuchsia-300';
    accentGlow = 'drop-shadow-[0_0_12px_rgba(217,70,239,0.6)]';
    borderGlow = 'border-fuchsia-400/60';
    priceBg = 'from-fuchsia-400 via-pink-200 to-purple-500 text-slate-950';
    footerBg = 'bg-[#1b0728] border-fuchsia-400/50';
    cardBg = 'bg-[#150520] border-fuchsia-400/50';
    primaryGlowHex = '#e087ff';
    secondaryGlowHex = '#a855f7';
  } else if (colorTheme === 'emerald_pro') {
    bgStyle = 'radial-gradient(circle at 50% 30%, #083327 0%, #031711 60%, #010a07 100%)';
    accentText = 'text-emerald-300';
    accentGlow = 'drop-shadow-[0_0_12px_rgba(16,185,129,0.6)]';
    borderGlow = 'border-emerald-400/60';
    priceBg = 'from-emerald-400 via-teal-200 to-emerald-500 text-slate-950';
    footerBg = 'bg-[#041d16] border-emerald-400/50';
    cardBg = 'bg-[#031812] border-emerald-400/50';
    primaryGlowHex = '#34d399';
    secondaryGlowHex = '#059669';
  } else if (colorTheme === 'ruby_red') {
    bgStyle = 'radial-gradient(circle at 50% 30%, #450c18 0%, #1a0409 60%, #080103 100%)';
    accentText = 'text-rose-300';
    accentGlow = 'drop-shadow-[0_0_12px_rgba(244,63,94,0.6)]';
    borderGlow = 'border-rose-400/60';
    priceBg = 'from-rose-400 via-amber-200 to-red-500 text-slate-950';
    footerBg = 'bg-[#21050c] border-rose-400/50';
    cardBg = 'bg-[#19040a] border-rose-400/50';
    primaryGlowHex = '#f43f5e';
    secondaryGlowHex = '#e11d48';
  }

  const hasOffer = Boolean(data.esOferta);

  return (
    <div
      ref={canvasRef}
      id="flyer-poster-canvas"
      className={`relative ${dimensions} text-white overflow-hidden font-sans select-none flex flex-col justify-between p-6 shrink-0 ${className}`}
      style={{ background: bgStyle }}
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-[5%] left-[20%] w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-30" style={{ backgroundColor: primaryGlowHex }} />
      <div className="absolute bottom-[10%] right-[10%] w-[450px] h-[450px] rounded-full blur-[110px] pointer-events-none opacity-25" style={{ backgroundColor: secondaryGlowHex }} />

      {/* SVG DECORATIVE HIGH-LUXURY FRAME WINGS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1060" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`wing-grad-${colorTheme}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={primaryGlowHex} stopOpacity="0.8" />
              <stop offset="50%" stopColor={secondaryGlowHex} stopOpacity="0.3" />
              <stop offset="100%" stopColor="#020712" stopOpacity="0.95" />
            </linearGradient>

            <filter id={`neonGlow-${colorTheme}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Diagonal Corner Wing Strokes */}
          <polygon points="-20,-20 340,-20 -20,380" fill={`url(#wing-grad-${colorTheme})`} opacity="0.8" />
          <line x1="-20" y1="380" x2="340" y2="-20" stroke={primaryGlowHex} strokeWidth="3" filter={`url(#neonGlow-${colorTheme})`} />

          <polygon points="460,-20 820,-20 820,380" fill={`url(#wing-grad-${colorTheme})`} opacity="0.8" />
          <line x1="460" y1="-20" x2="820" y2="380" stroke={primaryGlowHex} strokeWidth="3" filter={`url(#neonGlow-${colorTheme})`} />

          <polygon points="-20,800 -20,1100 280,1100" fill={`url(#wing-grad-${colorTheme})`} opacity="0.75" />
          <line x1="-20" y1="800" x2="280" y2="1100" stroke={primaryGlowHex} strokeWidth="2.5" filter={`url(#neonGlow-${colorTheme})`} />

          <polygon points="820,800 820,1100 520,1100" fill={`url(#wing-grad-${colorTheme})`} opacity="0.75" />
          <line x1="820" y1="800" x2="520" y2="1100" stroke={primaryGlowHex} strokeWidth="2.5" filter={`url(#neonGlow-${colorTheme})`} />
        </svg>
      </div>

      {/* 1. TOP HEADER BAR */}
      <div className="relative z-10 flex items-start justify-between w-full shrink-0">
        
        {/* Left Search Pill */}
        <div className={`flex items-center justify-between border-2 ${borderGlow} rounded-full px-5 py-2 min-w-[280px] sm:min-w-[340px] ${footerBg} shadow-xl`}>
          <span className="font-extrabold text-base sm:text-lg tracking-wider text-white uppercase truncate">
            COMERCIAL EL PROGRESO
          </span>
          <Search className={`w-5 h-5 sm:w-6 sm:h-6 ${accentText} shrink-0 ml-2`} />
        </div>

        {/* Right Logo Box Badge */}
        {format === 'facebook_banner' ? (
          /* Sleek Horizontal Logo Bar for Landscape Facebook Banner */
          <div className={`border-2 ${borderGlow} rounded-2xl px-4 py-2 bg-slate-950/95 shadow-2xl flex items-center gap-3 shrink-0 h-[68px]`}>
            <div className="flex items-center gap-1">
              <Monitor className={`w-5 h-5 ${accentText}`} />
              <LaptopIcon className={`w-5 h-5 ${accentText}`} />
              <Mouse className={`w-5 h-5 ${accentText}`} />
            </div>
            <div className="text-left border-l border-white/20 pl-3">
              <h2 className={`font-black text-sm tracking-tight uppercase leading-none ${accentText} ${accentGlow}`}>
                COMERCIAL EL PROGRESO
              </h2>
              <p className="text-[9px] text-slate-200 font-extrabold leading-tight mt-0.5">
                Venta de Computadoras y Servicio Técnico
              </p>
            </div>
          </div>
        ) : (
          /* Perfect Square Logo Box Badge for Poster / Instagram / TikTok Story */
          <div className={`w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] border-2 ${borderGlow} rounded-2xl p-3 bg-slate-950/95 shadow-2xl flex flex-col items-center justify-between text-center shrink-0`}>
            {/* Hardware Icons */}
            <div className="flex items-center gap-2 pt-1">
              <Monitor className={`w-5 h-5 sm:w-6 sm:h-6 ${accentText}`} />
              <LaptopIcon className={`w-5 h-5 sm:w-6 sm:h-6 ${accentText}`} />
              <Mouse className={`w-5 h-5 sm:w-6 sm:h-6 ${accentText}`} />
            </div>

            {/* Main Brand Title - Clean, bold, no quotes */}
            <div className="my-auto px-1">
              <h2 className={`font-black text-xs sm:text-base tracking-tight uppercase leading-tight ${accentText} ${accentGlow}`}>
                COMERCIAL EL PROGRESO
              </h2>
              <p className="text-[9px] sm:text-[10px] text-slate-200 font-extrabold leading-tight mt-1">
                Venta de Computadoras, Accesorios y Servicio Técnico
              </p>
            </div>

            {/* Subtitle & Phone Badge */}
            <div className="w-full pt-1.5 border-t border-white/20 flex flex-col items-center gap-1">
              <span className={`text-[8px] sm:text-[9px] font-black uppercase ${accentText} tracking-wider leading-none truncate w-full`}>
                {data.logoSubtitulo || 'ESPECIALIZADO EN TECNOLOGÍA'}
              </span>
              <div className={`flex items-center justify-center gap-1 text-slate-950 font-black text-[11px] sm:text-xs px-2 py-0.5 rounded-full bg-gradient-to-r ${priceBg} w-full shadow-md`}>
                <Phone className="w-3 h-3 stroke-none fill-current shrink-0" />
                <span>{data.telefono || '8129-5540'}</span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* 2. MAIN MIDDLE BODY (ADAPTIVE FORMAT DISTRIBUTION) */}
      {format === 'facebook_banner' ? (
        /* HORIZONTAL 3-COLUMN LAYOUT FOR FACEBOOK BANNER */
        <div className="relative z-10 grid grid-cols-12 gap-4 items-center my-auto pt-2 pb-1">
          {/* Column 1: Title, Price & Address */}
          <div className="col-span-4 flex flex-col justify-between space-y-2">
            <div 
              className="transition-transform duration-150 origin-top-left"
              style={{ transform: `translateY(${titlePosY}px) scale(${titleScale})` }}
            >
              <h1 className="text-white font-black text-xl tracking-tight leading-none uppercase drop-shadow-md">
                {data.titleLine1 || 'COMPRA TU LAPTOP'}
              </h1>
              <h1 className={`font-black text-2xl tracking-tight leading-tight uppercase ${accentText} ${accentGlow}`}>
                {data.titleLine2 || 'CON REGALÍA ESPECIAL'}
              </h1>
            </div>

            <div 
              className="transition-transform duration-150 origin-left"
              style={{ transform: `translateY(${pricePosY}px) scale(${priceScale})` }}
            >
              <div className={`inline-block bg-gradient-to-r ${priceBg} rounded-xl px-4 py-2 shadow-xl border border-white/30`}>
                <div className="text-[9px] font-black uppercase tracking-wider text-slate-900">
                  PRECIO EN {data.moneda?.toUpperCase() || 'DÓLARES'}
                </div>
                <div className="text-2xl font-black text-slate-950 leading-none mt-0.5">
                  ${data.precio}
                </div>
              </div>
            </div>

            <div
              className={`w-full border-2 ${borderGlow} rounded-xl p-2 bg-slate-950 shadow-xl transition-transform duration-150`}
              style={{ transform: `translateY(${addressPosY}px) scale(${addressScale})` }}
            >
              <div className="flex items-center gap-2">
                <MapPin className={`w-4 h-4 ${accentText} shrink-0`} />
                <p className="text-[10px] font-bold text-white leading-tight truncate">
                  {data.direccion}
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Product Showcase Center */}
          <div className="col-span-4 flex items-center justify-center">
            <div className={`relative w-full h-[260px] flex items-center justify-center ${cardBg} rounded-2xl border-2 p-3 shadow-2xl overflow-hidden`}>
              <img
                src={data.imagenUrl}
                alt="Producto"
                crossOrigin="anonymous"
                className="max-h-[240px] max-w-full object-contain drop-shadow-2xl transition-transform duration-150"
                style={{ transform: `scale(${imgScale})`, mixBlendMode: blendMode !== 'normal' ? blendMode : undefined }}
              />
            </div>
          </div>

          {/* Column 3: Specs, Guarantee & Condition */}
          <div className="col-span-4 flex flex-col justify-between space-y-2">
            {data.mostrarGarantia && (
              <div 
                className="transition-transform duration-150 origin-right"
                style={{ transform: `translateY(${guaranteePosY}px) scale(${guaranteeScale})` }}
              >
                <div className={`border-2 ${borderGlow} rounded-xl p-2 bg-slate-950/90 shadow-xl flex items-center gap-2`}>
                  <ShieldCheck className={`w-5 h-5 ${accentText}`} />
                  <span className="text-[10px] font-black text-white uppercase leading-tight">
                    {data.garantiaMeses || 3} MESES DE GARANTÍA
                  </span>
                </div>
              </div>
            )}

            <div 
              className="space-y-1.5 transition-transform duration-150 origin-left"
              style={{ transform: `translateY(${specsPosY}px) scale(${specsScale})` }}
            >
              {allSpecs.slice(0, 3).map((spec, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-slate-950/80 border border-white/10 rounded-lg px-2.5 py-1 shadow-sm">
                  <Star className={`w-3 h-3 ${accentText} fill-current shrink-0`} />
                  <span className="text-[10px] font-bold text-white uppercase truncate">
                    {spec}
                  </span>
                </div>
              ))}
            </div>

            {data.condicion && (
              <div 
                className="transition-transform duration-150 origin-center"
                style={{ transform: `translateY(${conditionPosY}px) scale(${conditionScale})` }}
              >
                <div className={`bg-gradient-to-r ${priceBg} px-3 py-1 rounded-lg font-black text-[10px] uppercase text-slate-950 shadow-md text-center`}>
                  {data.condicion}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : format === 'tiktok_story' ? (
        /* TALL VERTICAL LAYOUT FOR TIKTOK STORY (675x1200) */
        <div className="relative z-10 flex flex-col justify-between flex-1 py-4 space-y-4">
          {/* Main Title Section */}
          <div 
            className="text-center transition-transform duration-150 origin-top"
            style={{ transform: `translateY(${titlePosY}px) scale(${titleScale})` }}
          >
            <h1 className="text-white font-black text-3xl tracking-tight uppercase drop-shadow-md">
              {data.titleLine1 || 'COMPRA TU LAPTOP'}
            </h1>
            <h1 className={`font-black text-4xl tracking-tight uppercase ${accentText} ${accentGlow}`}>
              {data.titleLine2 || 'CON REGALÍA ESPECIAL'}
            </h1>
          </div>

          {/* Product Showcase */}
          <div className="relative w-full h-[360px] flex items-center justify-center my-auto">
            {data.esRegalia && data.imagenRegaliaUrl ? (
              <div className="relative w-full flex flex-col items-center gap-2">
                <div className={`relative w-full h-[180px] flex items-center justify-center ${cardBg} rounded-2xl border-2 p-2 shadow-2xl`}>
                  <img
                    src={data.imagenUrl}
                    alt="Producto 1"
                    className="max-h-[160px] object-contain drop-shadow-xl"
                    style={{ transform: `scale(${imgScale})`, mixBlendMode: blendMode !== 'normal' ? blendMode : undefined }}
                  />
                </div>
                <div className={`z-20 bg-gradient-to-r ${priceBg} text-slate-950 font-black p-1.5 rounded-full shadow-xl border border-white`}>
                  <Plus className="w-4 h-4 stroke-[3]" />
                </div>
                <div className={`relative w-full h-[180px] flex items-center justify-center ${cardBg} rounded-2xl border-2 p-2 shadow-2xl`}>
                  <img
                    src={data.imagenRegaliaUrl}
                    alt="Regalía"
                    className="max-h-[160px] object-contain drop-shadow-xl"
                    style={{ transform: `scale(${((data.imagenRegaliaEscala || 100) / 100)})` }}
                  />
                </div>
              </div>
            ) : (
              <div className={`relative w-full h-[360px] flex items-center justify-center ${cardBg} rounded-2xl border-2 p-4 shadow-2xl overflow-hidden`}>
                <img
                  src={data.imagenUrl}
                  alt="Producto"
                  crossOrigin="anonymous"
                  className="max-h-[330px] max-w-full object-contain drop-shadow-2xl transition-transform duration-150"
                  style={{ transform: `scale(${imgScale})`, mixBlendMode: blendMode !== 'normal' ? blendMode : undefined }}
                />
              </div>
            )}
          </div>

          {/* Row with Price & Guarantee */}
          <div className="flex items-center justify-between gap-3">
            <div 
              className="transition-transform duration-150 origin-left"
              style={{ transform: `translateY(${pricePosY}px) scale(${priceScale})` }}
            >
              <div className={`inline-block bg-gradient-to-r ${priceBg} rounded-2xl px-5 py-2.5 shadow-2xl border-2 border-white/30`}>
                <div className="text-[10px] font-black uppercase text-slate-900">
                  PRECIO EN {data.moneda?.toUpperCase() || 'DÓLARES'}
                </div>
                <div className="text-3xl font-black text-slate-950 leading-none">
                  ${data.precio}
                </div>
              </div>
            </div>

            {data.mostrarGarantia && (
              <div 
                className="transition-transform duration-150 origin-right"
                style={{ transform: `translateY(${guaranteePosY}px) scale(${guaranteeScale})` }}
              >
                <div className={`border-2 ${borderGlow} rounded-2xl p-2.5 bg-slate-950/90 shadow-2xl flex items-center gap-2`}>
                  <ShieldCheck className={`w-6 h-6 ${accentText}`} />
                  <div>
                    <p className="text-xs font-black text-white uppercase leading-tight">
                      {data.garantiaMeses || 3} MESES GARANTÍA
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Specs Grid */}
          <div 
            className="grid grid-cols-2 gap-2 transition-transform duration-150 origin-center"
            style={{ transform: `translateY(${specsPosY}px) scale(${specsScale})` }}
          >
            {allSpecs.map((spec, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2 shadow-md">
                <Star className={`w-3.5 h-3.5 ${accentText} fill-current shrink-0`} />
                <span className="text-xs font-bold text-white uppercase truncate">
                  {spec}
                </span>
              </div>
            ))}
          </div>

          {/* Address Box */}
          <div
            className={`w-full border-2 ${borderGlow} rounded-2xl p-3 bg-slate-950 shadow-2xl transition-transform duration-150`}
            style={{ transform: `translateY(${addressPosY}px) scale(${addressScale})` }}
          >
            <div className="flex items-start gap-2">
              <MapPin className={`w-4 h-4 ${accentText} shrink-0 mt-0.5`} />
              <div>
                <p className={`text-[9px] font-black uppercase ${accentText} tracking-wider`}>
                  VISÍTANOS EN NUESTRA TIENDA:
                </p>
                <p className="text-xs font-bold text-white leading-snug">
                  {data.direccion}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* STANDARD 2-COLUMN LAYOUT FOR POSTER (4:5) AND INSTAGRAM (1:1) */
        <div className="relative z-10 flex items-stretch justify-between gap-6 my-auto pt-2">
          
          {/* LEFT COLUMN: TITLE + SPECS + PRICE + ADDRESS */}
          <div className="flex-1 flex flex-col justify-between max-w-[420px] z-10 space-y-2">
            
            {/* Main Title Section */}
            <div 
              className="transition-transform duration-150 origin-top-left"
              style={{ transform: `translateY(${titlePosY}px) scale(${titleScale})` }}
            >
              <h1 className="text-white font-black text-2xl sm:text-3xl tracking-tight leading-none uppercase drop-shadow-md">
                {data.titleLine1 || 'COMPRA TU LAPTOP'}
              </h1>
              <h1 className={`font-black text-3xl sm:text-4xl tracking-tight leading-tight uppercase ${accentText} ${accentGlow}`}>
                {data.titleLine2 || 'CON REGALÍA ESPECIAL'}
              </h1>
              {data.titleLine3 && (
                <p className="text-xs text-slate-200 mt-1 font-semibold leading-snug">
                  {data.titleLine3}
                </p>
              )}
            </div>

            {/* Specifications List with ⭐ Stars */}
            <div 
              className="my-2 space-y-2 transition-transform duration-150 origin-left"
              style={{ transform: `translateY(${specsPosY}px) scale(${specsScale})` }}
            >
              {allSpecs.map((spec, idx) => (
                <div key={idx} className="flex items-center gap-2.5 bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-1.5 sm:py-2 shadow-md">
                  <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br ${priceBg} flex items-center justify-center shrink-0`}>
                    <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-slate-950 text-slate-950" />
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold text-white tracking-wide uppercase">
                    {spec}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Box */}
            <div 
              className="transition-transform duration-150 origin-left my-1"
              style={{
                transform: `translateY(${pricePosY}px) scale(${priceScale})`,
                transformOrigin: 'left center'
              }}
            >
              {hasOffer ? (
                /* Special Offer Tag */
                <div className="relative inline-block bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 rounded-2xl p-3.5 shadow-2xl border-2 border-amber-300">
                  <div className="flex items-center gap-2 text-yellow-200 font-black text-xs uppercase tracking-widest mb-1">
                    <Flame className="w-4 h-4 text-yellow-300 fill-current" />
                    <span>¡OFERTA ESPECIAL!</span>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl font-black text-white drop-shadow">
                      ${data.precioOferta || data.precio}
                    </span>
                    <span className="text-base font-bold text-slate-200 line-through opacity-80">
                      ${data.precioAntes || data.precio}
                    </span>
                  </div>
                  <span className="text-[10px] font-extrabold text-slate-900 uppercase bg-amber-300 px-2.5 py-0.5 rounded-full mt-1 inline-block">
                    PRECIO EN {data.moneda?.toUpperCase() || 'DÓLARES'}
                  </span>
                </div>
              ) : (
                /* Regular Price Tag */
                <div className={`inline-block bg-gradient-to-r ${priceBg} rounded-2xl px-5 sm:px-6 py-2.5 sm:py-3 shadow-2xl border-2 border-white/30`}>
                  <div className="text-[10px] font-black uppercase tracking-wider text-slate-900">
                    PRECIO EN {data.moneda?.toUpperCase() || 'DÓLARES'}
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-slate-950 leading-none mt-0.5">
                    ${data.precio}
                  </div>
                </div>
              )}
            </div>

            {/* Address Box */}
            <div
              className={`w-full border-2 ${borderGlow} rounded-2xl p-3 bg-slate-950 shadow-2xl transition-transform duration-150`}
              style={{
                transform: `translateY(${addressPosY}px) scale(${addressScale})`,
                transformOrigin: 'left center'
              }}
            >
              <div className="flex items-start gap-2.5">
                <MapPin className={`w-5 h-5 ${accentText} shrink-0 mt-0.5`} />
                <div>
                  <p className={`text-[10px] font-black uppercase ${accentText} tracking-wider`}>
                    VISÍTANOS EN NUESTRA TIENDA:
                  </p>
                  <p className="text-xs font-bold text-white leading-snug mt-0.5">
                    {data.direccion}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: PRODUCT SHOWCASE + GUARANTEE BADGE + CONDITION */}
          <div className="flex-1 flex flex-col items-center justify-between min-w-[320px] max-w-[400px] z-10 relative">
            
            {/* Product Showcase Container */}
            <div className={`relative w-full flex-1 flex flex-col items-center justify-center my-auto ${format === 'instagram' ? 'min-h-[280px]' : 'min-h-[340px]'}`}>
              
              {data.esRegalia && data.imagenRegaliaUrl ? (
                /* DUAL PRODUCT REGALÍA STACK */
                <div className="relative w-full flex flex-col items-center justify-center gap-2 z-10 py-1">
                  <div className={`relative w-full ${format === 'instagram' ? 'h-[155px]' : 'h-[190px]'} flex items-center justify-center ${cardBg} rounded-2xl border-2 p-2 shadow-2xl overflow-hidden`}>
                    <span className={`absolute top-2 left-2.5 z-20 bg-gradient-to-r ${priceBg} font-black text-[9px] uppercase px-2.5 py-0.5 rounded-full shadow-md tracking-wider`}>
                      💻 PRODUCTO PRINCIPAL
                    </span>
                    <img
                      src={data.imagenUrl}
                      alt="Producto Principal"
                      crossOrigin="anonymous"
                      className={`${format === 'instagram' ? 'max-h-[135px]' : 'max-h-[170px]'} max-w-full object-contain drop-shadow-xl transition-transform duration-150`}
                      style={{ transform: `scale(${imgScale})`, mixBlendMode: blendMode !== 'normal' ? blendMode : undefined }}
                    />
                  </div>

                  <div className={`z-30 -my-3 bg-gradient-to-r ${priceBg} text-slate-950 font-black p-1.5 rounded-full shadow-2xl border-2 border-white flex items-center justify-center`}>
                    <Plus className="w-4 h-4 stroke-[3]" />
                  </div>

                  <div className={`relative w-full ${format === 'instagram' ? 'h-[155px]' : 'h-[190px]'} flex items-center justify-center ${cardBg} rounded-2xl border-2 p-2 shadow-2xl overflow-hidden`}>
                    <span className="absolute top-2 left-2.5 z-20 bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-black text-[9px] uppercase px-2.5 py-0.5 rounded-full shadow-md tracking-wider flex items-center gap-1">
                      <Gift className="w-3 h-3 fill-slate-950" />
                      <span>REGALÍA GRATIS</span>
                    </span>
                    <img
                      src={data.imagenRegaliaUrl}
                      alt="Regalía"
                      crossOrigin="anonymous"
                      className={`${format === 'instagram' ? 'max-h-[135px]' : 'max-h-[170px]'} max-w-full object-contain drop-shadow-2xl transition-transform duration-150`}
                      style={{
                        transform: `scale(${((data.imagenRegaliaEscala || 100) / 100)})`,
                        mixBlendMode: blendMode !== 'normal' ? blendMode : undefined
                      }}
                    />
                  </div>
                </div>
              ) : (
                /* SINGLE PRODUCT CONTAINER WITH OVERLAPPING STARBURST GUARANTEE BADGE BELOW */
                <div className="relative w-full flex flex-col items-center">
                  <div className={`relative w-full ${format === 'instagram' ? 'h-[280px]' : 'h-[330px]'} flex items-center justify-center ${cardBg} rounded-2xl border-2 p-4 shadow-2xl overflow-hidden`}>
                    <img
                      src={data.imagenUrl}
                      alt="Producto Comercial El Progreso"
                      crossOrigin="anonymous"
                      className={`${format === 'instagram' ? 'max-h-[250px]' : 'max-h-[300px]'} max-w-full object-contain drop-shadow-2xl transition-transform duration-150`}
                      style={{ transform: `scale(${imgScale})`, mixBlendMode: blendMode !== 'normal' ? blendMode : undefined }}
                    />
                  </div>
                </div>
              )}

            </div>

            {/* Guarantee Box positioned below the laptop image */}
            {data.mostrarGarantia && (
              <div 
                className="w-full my-2 z-20 transition-transform duration-150"
                style={{
                  transform: `translateY(${guaranteePosY}px) scale(${guaranteeScale})`,
                  transformOrigin: 'center center'
                }}
              >
                <div className={`relative w-full border-2 ${borderGlow} rounded-2xl p-3 bg-slate-950/95 shadow-2xl flex items-center justify-between gap-3`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br ${priceBg} flex items-center justify-center shrink-0 shadow-lg border border-white/40`}>
                      <ShieldCheck className="w-6 h-6 text-slate-950 stroke-[2.5]" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-black text-white uppercase leading-tight tracking-wide">
                        {data.garantiaMeses || 3} MESES DE GARANTÍA
                      </p>
                      <p className={`text-[10px] font-extrabold ${accentText} uppercase tracking-wider mt-0.5`}>
                        EQUIPOS 100% GARANTIZADOS
                      </p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 bg-gradient-to-r ${priceBg} px-2.5 py-1 rounded-lg text-slate-950 font-black text-[10px] uppercase shadow-md shrink-0`}>
                    <Star className="w-3 h-3 fill-slate-950" />
                    <span>OFICIAL</span>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Condition Label */}
            {data.condicion && (
              <div 
                className="w-full flex justify-center z-20 mt-1 transition-transform duration-150"
                style={{
                  transform: `translateY(${conditionPosY}px) scale(${conditionScale})`,
                  transformOrigin: 'center bottom'
                }}
              >
                <div className={`bg-gradient-to-r ${priceBg} px-5 py-1.5 rounded-xl font-black text-xs uppercase tracking-widest text-slate-950 shadow-xl border-2 border-white/40 flex items-center gap-2`}>
                  <Tag className="w-4 h-4 fill-slate-950" />
                  <span>{data.condicion}</span>
                </div>
              </div>
            )}

          </div>

        </div>
      )}

      {/* 3. FOOTER CONTACT BANNER */}
      <div className="relative z-10 w-full pt-2 shrink-0">
        <div className={`w-full ${footerBg} rounded-full py-3 sm:py-3.5 px-6 sm:px-9 flex items-center justify-around shadow-2xl border-2 ${borderGlow}`}>
          
          {/* Phone Cotiza */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r ${priceBg} flex items-center justify-center shrink-0 shadow-lg`}>
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 fill-slate-950 stroke-none" />
            </div>
            <div>
              <p className={`text-[9px] sm:text-[10px] font-black uppercase ${accentText} tracking-wider`}>
                COTIZA AL:
              </p>
              <p className="text-base sm:text-xl font-black text-white tracking-wider leading-none mt-0.5">
                {data.telefono}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className={`h-6 sm:h-8 w-[2px] ${borderGlow}`} />

          {/* Email Cotiza */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r ${priceBg} flex items-center justify-center shrink-0 shadow-lg`}>
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950" />
            </div>
            <div>
              <p className={`text-[9px] sm:text-[10px] font-black uppercase ${accentText} tracking-wider`}>
                COTIZA EN:
              </p>
              <p className="text-xs sm:text-sm font-black text-white tracking-tight leading-none mt-0.5">
                {data.email}
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
