import React, { useState, useRef } from 'react';
import { FlyerData } from '../types';
import { DEFAULT_FLYER_DATA, PRESET_LAPTOPS, PRESET_ACCESORIOS, PRESET_OFERTAS } from '../data/presets';
import { FlyerCanvas } from './FlyerCanvas';
import { downloadFlyerAsPng, downloadFlyerAsPdf } from '../utils/flyerExport';
import { 
  Download, FileDown, Upload, Sparkles, RefreshCw, CheckCircle2, 
  Plus, Trash2, Image as ImageIcon, ShieldCheck, Laptop, Headphones, 
  Flame, LayoutGrid, Palette, Tag, Percent, ZoomIn, ZoomOut, RotateCcw, Minus, Type, MoveVertical, ArrowUp, ArrowDown, Gift
} from 'lucide-react';

export const GeneradorFlyer: React.FC = () => {
  const [flyerData, setFlyerData] = useState<FlyerData>(DEFAULT_FLYER_DATA);
  const [activeCategory, setActiveCategory] = useState<'laptop' | 'accesorio' | 'oferta'>('laptop');
  const [extraSpecInput, setExtraSpecInput] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const canvasRef = useRef<HTMLDivElement>(null);
  const exportCanvasRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleInputChange = (field: keyof FlyerData, value: any) => {
    setFlyerData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          handleInputChange('imagenUrl', event.target.result as string);
          showToast('✅ Imagen de producto cargada con éxito');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegaliaImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          handleInputChange('imagenRegaliaUrl', event.target.result as string);
          showToast('🎁 Imagen de regalía cargada con éxito');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addExtraSpec = () => {
    if (!extraSpecInput.trim()) return;
    setFlyerData((prev) => ({
      ...prev,
      specExtra: [...(prev.specExtra || []), extraSpecInput.trim()],
    }));
    setExtraSpecInput('');
  };

  const removeExtraSpec = (index: number) => {
    setFlyerData((prev) => ({
      ...prev,
      specExtra: (prev.specExtra || []).filter((_, i) => i !== index),
    }));
  };

  const loadPreset = (presetData: Partial<FlyerData>, category: 'laptop' | 'accesorio' | 'oferta') => {
    setActiveCategory(category);
    setFlyerData((prev) => ({
      ...prev,
      ...presetData,
      mostrarGarantia: presetData.mostrarGarantia ?? (category === 'laptop'),
    }));
    showToast(`✨ Plantilla cargada para ${category === 'laptop' ? 'Laptop' : category === 'accesorio' ? 'Accesorio' : 'Oferta Especial'}`);
  };

  const resetToDefault = () => {
    setFlyerData(DEFAULT_FLYER_DATA);
    setActiveCategory('laptop');
    showToast('🔄 Restablecido al diseño oficial inicial');
  };

  const handleDownloadPng = async () => {
    const targetEl = exportCanvasRef.current || canvasRef.current;
    if (!targetEl) return;
    setIsExporting(true);
    try {
      await downloadFlyerAsPng(targetEl, `Flyer_${flyerData.titleLine1}_${flyerData.titleLine2}.png`);
      showToast('🎉 Imagen PNG descargada en alta resolución');
    } catch (err) {
      console.error(err);
      showToast('⚠️ Error al generar la imagen PNG');
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadPdf = async () => {
    const targetEl = exportCanvasRef.current || canvasRef.current;
    if (!targetEl) return;
    setIsExporting(true);
    try {
      await downloadFlyerAsPdf(targetEl, `Flyer_${flyerData.titleLine1}_${flyerData.titleLine2}.pdf`);
      showToast('🎉 PDF descargado con éxito');
    } catch (err) {
      console.error(err);
      showToast('⚠️ Error al generar el PDF');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white border border-indigo-800/50 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="bg-cyan-500/20 text-cyan-300 font-bold text-xs uppercase px-3 py-1 rounded-full border border-cyan-400/30">
            Estudio de Diseño Marketing & Redes Sociales
          </span>
          <h2 className="text-2xl font-black mt-2 tracking-tight">Generador Profesional de Flyers</h2>
          <p className="text-sm text-slate-300 mt-1">
            Diseña publicaciones distribuidas perfectamente para Laptops, Accesorios y Ofertas Especiales para Instagram, TikTok y Facebook.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={resetToDefault}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl flex items-center gap-2 transition"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Restablecer Muestra</span>
          </button>
        </div>
      </div>

      {/* QUICK CATEGORY TABS & FORMAT SELECTION */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg">
        
        {/* Category Tabs: Laptop, Accesorio, Oferta */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-extrabold uppercase text-slate-300">Categoría del Flyer:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setActiveCategory('laptop');
                handleInputChange('mostrarGarantia', true);
                handleInputChange('esOferta', false);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition ${
                activeCategory === 'laptop'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Laptop className="w-4 h-4" />
              <span>💻 Laptops (Con Garantía)</span>
            </button>

            <button
              onClick={() => {
                setActiveCategory('accesorio');
                handleInputChange('mostrarGarantia', false);
                handleInputChange('esOferta', false);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition ${
                activeCategory === 'accesorio'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Headphones className="w-4 h-4" />
              <span>🎧 Accesorios (Sin Garantía)</span>
            </button>

            <button
              onClick={() => {
                setActiveCategory('oferta');
                handleInputChange('esOferta', true);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition ${
                activeCategory === 'oferta'
                  ? 'bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-md shadow-red-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Flame className="w-4 h-4 fill-amber-300 text-amber-300" />
              <span>🔥 Ofertas & Descuentos</span>
            </button>
          </div>
        </div>

        {/* Format & Style Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {/* Formato de Redes Sociales */}
          <div>
            <label className="block text-[11px] font-extrabold uppercase text-slate-400 mb-1.5 flex items-center gap-1.5">
              <LayoutGrid className="w-3.5 h-3.5 text-cyan-400" />
              <span>Formato para Redes Sociales:</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'poster', label: '📄 Poster (4:5)' },
                { id: 'instagram', label: '📸 Instagram (1:1)' },
                { id: 'tiktok_story', label: '📱 Story / TikTok (9:16)' },
                { id: 'facebook_banner', label: '🖥️ Facebook (16:9)' },
              ].map((fmt) => (
                <button
                  key={fmt.id}
                  onClick={() => handleInputChange('formatoForma', fmt.id)}
                  className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition border ${
                    (flyerData.formatoForma || 'poster') === fmt.id
                      ? 'bg-indigo-600 text-white border-cyan-400 shadow'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  {fmt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Color Style Theme */}
          <div>
            <label className="block text-[11px] font-extrabold uppercase text-slate-400 mb-1.5 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-amber-400" />
              <span>Estilo Visual de Color:</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'royal_blue', label: '👑 Azul Real & Oro' },
                { id: 'gold_black', label: '🟡 Oro Luxury' },
                { id: 'neon_blue', label: '🔵 Neón Cyber' },
                { id: 'cyber_purple', label: '🟣 Neón Púrpura' },
                { id: 'emerald_pro', label: '🟢 Verde Esmeralda' },
                { id: 'ruby_red', label: '🔴 Rojo Rubí / Oferta' },
              ].map((thm) => (
                <button
                  key={thm.id}
                  onClick={() => handleInputChange('estiloColor', thm.id)}
                  className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition border ${
                    (flyerData.estiloColor || 'royal_blue') === thm.id
                      ? 'bg-indigo-600 text-white border-amber-400 shadow'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  {thm.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preset Chips */}
        <div className="pt-2 border-t border-slate-800">
          <p className="text-[11px] font-extrabold text-slate-400 mb-2 uppercase">
            Plantillas Rápidas {activeCategory === 'laptop' ? 'Laptops:' : activeCategory === 'accesorio' ? 'Accesorios:' : 'Ofertas:'}
          </p>
          <div className="flex flex-wrap gap-2">
            {(activeCategory === 'laptop'
              ? PRESET_LAPTOPS
              : activeCategory === 'accesorio'
              ? PRESET_ACCESORIOS
              : PRESET_OFERTAS
            ).map((preset, idx) => (
              <button
                key={idx}
                onClick={() => loadPreset(preset.data, activeCategory)}
                className="bg-indigo-950/80 hover:bg-indigo-900 text-cyan-300 border border-indigo-800/80 hover:border-cyan-400 px-3 py-1.5 rounded-xl text-xs font-semibold transition"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN TWO-COLUMN WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: FORM CONTROLS */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 shadow-xl border border-slate-200 space-y-6">
          <h3 className="text-lg font-black text-slate-900 border-b border-slate-200 pb-3 flex items-center justify-between">
            <span>⚙️ Configuración del Contenido</span>
            <span className="text-xs font-bold px-2.5 py-1 bg-cyan-100 text-cyan-800 rounded-lg uppercase">
              {flyerData.esOferta ? 'Modo Oferta' : flyerData.mostrarGarantia ? 'Modo Laptop' : 'Modo Accesorio'}
            </span>
          </h3>

          {/* Offer & Warranty Controls Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Offer Toggle */}
            <div className="bg-red-50 border border-red-200 p-3 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-red-600 fill-red-600" />
                <div>
                  <p className="text-xs font-bold text-slate-900">Modo Oferta</p>
                  <p className="text-[10px] text-slate-500">Muestra rebajas y descuento</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={flyerData.esOferta ?? false}
                  onChange={(e) => handleInputChange('esOferta', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>

            {/* Warranty Badge Toggle */}
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className={`w-4 h-4 ${flyerData.mostrarGarantia ? 'text-emerald-600' : 'text-slate-400'}`} />
                <div>
                  <p className="text-xs font-bold text-slate-900">Garantía</p>
                  <p className="text-[10px] text-slate-500">{flyerData.mostrarGarantia ? 'Sello visible' : 'Oculto'}</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={flyerData.mostrarGarantia ?? true}
                  onChange={(e) => handleInputChange('mostrarGarantia', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
          </div>

          {/* Offer Details (Shown if Offer Mode Enabled) */}
          {flyerData.esOferta && (
            <div className="bg-gradient-to-r from-red-50 to-amber-50 border-2 border-red-300 p-4 rounded-xl space-y-3">
              <div className="flex items-center gap-1.5 text-red-700 font-extrabold text-xs uppercase">
                <Tag className="w-4 h-4" />
                <span>Configurar Descuento & Precio Anterior</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Precio Anterior ($)
                  </label>
                  <input
                    type="number"
                    value={flyerData.precioAnterior || ''}
                    onChange={(e) => handleInputChange('precioAnterior', e.target.value)}
                    placeholder="ej: 650"
                    className="w-full px-3 py-1.5 border border-red-300 rounded-lg text-xs font-bold text-slate-800 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Etiqueta de Oferta
                  </label>
                  <input
                    type="text"
                    value={flyerData.etiquetaOferta || ''}
                    onChange={(e) => handleInputChange('etiquetaOferta', e.target.value)}
                    placeholder="ej: 🔥 ¡OFERTA ESPECIAL!"
                    className="w-full px-3 py-1.5 border border-red-300 rounded-lg text-xs font-bold text-slate-800 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Regalía / Combo (2 Products) Toggle & Config Box */}
          <div className="bg-amber-50/90 border-2 border-amber-300 p-3.5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-amber-600 fill-amber-200 shrink-0" />
                <div>
                  <p className="text-xs font-black text-slate-900">🎁 Plantilla Regalía / Combo (2 Productos)</p>
                  <p className="text-[10px] text-slate-600 font-semibold">Muestra 2 imágenes con el signo + de regalo</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-2">
                <input
                  type="checkbox"
                  checked={flyerData.esRegalia ?? false}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    handleInputChange('esRegalia', checked);
                    if (checked && !flyerData.imagenRegaliaUrl) {
                      handleInputChange('imagenRegaliaUrl', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80');
                      handleInputChange('etiquetaRegalia', '🎁 ¡DE REGALÍA INCLUIDA!');
                      handleInputChange('tituloRegalia', 'Audífonos Gamer 7.1');
                    }
                  }}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
              </label>
            </div>

            {flyerData.esRegalia && (
              <div className="pt-2 border-t border-amber-200 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-800 mb-1">
                      Etiqueta del Centro (+)
                    </label>
                    <input
                      type="text"
                      value={flyerData.etiquetaRegalia || ''}
                      onChange={(e) => handleInputChange('etiquetaRegalia', e.target.value)}
                      placeholder="ej: 🎁 ¡DE REGALÍA INCLUIDA!"
                      className="w-full px-3 py-1.5 border border-amber-300 bg-white rounded-xl text-xs font-bold text-slate-800 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-800 mb-1">
                      Nombre del Producto Regalía
                    </label>
                    <input
                      type="text"
                      value={flyerData.tituloRegalia || ''}
                      onChange={(e) => handleInputChange('tituloRegalia', e.target.value)}
                      placeholder="ej: Audífonos Gamer 7.1"
                      className="w-full px-3 py-1.5 border border-amber-300 bg-white rounded-xl text-xs font-bold text-slate-800 outline-none"
                    />
                  </div>
                </div>

                {/* 2nd Image Upload & URL */}
                <div className="space-y-2 pt-1">
                  <label className="block text-[11px] font-extrabold uppercase text-amber-900">
                    Imagen del Segundo Producto (Regalía)
                  </label>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center justify-center gap-2 px-3 py-2 bg-amber-100/90 border border-amber-300 hover:border-amber-500 rounded-xl cursor-pointer text-amber-900 font-bold text-xs transition">
                      <Upload className="w-3.5 h-3.5 text-amber-700" />
                      <span>Subir Imagen Regalía (Archivo)</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleRegaliaImageUpload}
                        className="hidden"
                      />
                    </label>
                    <input
                      type="text"
                      value={flyerData.imagenRegaliaUrl || ''}
                      onChange={(e) => handleInputChange('imagenRegaliaUrl', e.target.value)}
                      placeholder="O URL de la regalía (https://...)"
                      className="w-full px-3 py-1.5 border border-amber-300 bg-white rounded-xl text-xs font-medium text-slate-800 outline-none"
                    />
                  </div>

                  {/* Regalía Quick Image Presets */}
                  <div className="flex items-center gap-1.5 pt-1 overflow-x-auto pb-1">
                    <span className="text-[10px] font-extrabold text-amber-900 shrink-0">Opción rápida:</span>
                    {[
                      { label: '🎧 Audífonos', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80', title: 'Audífonos Gamer 7.1' },
                      { label: '🖱️ Mouse', url: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1000&q=80', title: 'Mouse Logitech Inalámbrico' },
                      { label: '🎒 Mochila', url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80', title: 'Mochila Antirrobo Waterproof' },
                      { label: '⌨️ Teclado', url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80', title: 'Teclado Mecánico RGB' },
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          handleInputChange('imagenRegaliaUrl', item.url);
                          handleInputChange('tituloRegalia', item.title);
                        }}
                        className="px-2 py-1 bg-white border border-amber-300 hover:bg-amber-100 rounded-lg text-[10px] font-bold text-amber-900 shrink-0 transition"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  {/* 2nd Image Scale Slider */}
                  <div className="flex items-center justify-between text-[11px] font-bold text-amber-900 pt-1">
                    <span>Escala de Imagen Regalía:</span>
                    <span className="font-black text-amber-950">{flyerData.imagenRegaliaEscala || 100}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="50"
                      max="180"
                      step="5"
                      value={flyerData.imagenRegaliaEscala || 100}
                      onChange={(e) => handleInputChange('imagenRegaliaEscala', Number(e.target.value))}
                      className="w-full accent-amber-600 cursor-pointer h-2 bg-amber-200 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleInputChange('imagenRegaliaEscala', 100)}
                      className="p-1.5 bg-white border border-amber-300 rounded-lg text-amber-900 text-[10px] font-bold hover:bg-amber-100 transition"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Product Name Lines & Font Scale */}
          <div className="space-y-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase text-slate-800">
                Título del Producto (Líneas 1, 2, 3)
              </label>
              <span className="text-xs font-black px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-md">
                Tamaño: {flyerData.tituloEscala || 100}%
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <input
                type="text"
                value={flyerData.titleLine1}
                onChange={(e) => handleInputChange('titleLine1', e.target.value)}
                placeholder="Línea 1 (ej: MACBOOK / AUDÍFONOS)"
                className="w-full px-3.5 py-2 border-2 border-slate-200 bg-white rounded-xl font-bold text-sm text-slate-800 focus:border-indigo-600 outline-none"
              />
              <input
                type="text"
                value={flyerData.titleLine2}
                onChange={(e) => handleInputChange('titleLine2', e.target.value)}
                placeholder="Línea 2 (ej: PRO 15 / GAMER HYPERX)"
                className="w-full px-3.5 py-2 border-2 border-slate-200 bg-white rounded-xl font-bold text-sm text-slate-800 focus:border-indigo-600 outline-none"
              />
              <input
                type="text"
                value={flyerData.titleLine3}
                onChange={(e) => handleInputChange('titleLine3', e.target.value)}
                placeholder="Línea 3 (ej: i7 Core / Cloud II 7.1)"
                className="w-full px-3.5 py-2 border-2 border-slate-200 bg-white rounded-xl font-bold text-sm text-slate-800 focus:border-indigo-600 outline-none"
              />
            </div>

            {/* Title Font Size Control Slider */}
            <div className="pt-2 border-t border-slate-200 space-y-1.5">
              <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                <Type className="w-3.5 h-3.5 text-indigo-600" />
                <span>Aumentar / Reducir Tamaño del Título:</span>
              </label>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleInputChange('tituloEscala', Math.max(60, (flyerData.tituloEscala || 100) - 5))}
                  className="p-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-700 transition"
                  title="Achicar título"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>

                <input
                  type="range"
                  min="60"
                  max="160"
                  step="5"
                  value={flyerData.tituloEscala || 100}
                  onChange={(e) => handleInputChange('tituloEscala', Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />

                <button
                  onClick={() => handleInputChange('tituloEscala', Math.min(160, (flyerData.tituloEscala || 100) + 5))}
                  className="p-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-700 transition"
                  title="Agrandar título"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleInputChange('tituloEscala', 100)}
                  className="p-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-indigo-600 transition"
                  title="Tamaño normal"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-semibold text-slate-500">Ajuste rápido:</span>
                {[
                  { label: '80%', val: 80 },
                  { label: '100% (Normal)', val: 100 },
                  { label: '120% (Grande)', val: 120 },
                  { label: '140% (Gigante)', val: 140 },
                ].map((p) => (
                  <button
                    key={p.val}
                    onClick={() => handleInputChange('tituloEscala', p.val)}
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-md transition ${
                      (flyerData.tituloEscala || 100) === p.val
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Title Vertical Position Control (Mover Título Arriba / Abajo) */}
            <div className="pt-2 border-t border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <MoveVertical className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Mover Título (Arriba / Abajo):</span>
                </span>
                <span className="text-indigo-700 font-extrabold">
                  {flyerData.tituloPosY ? `${flyerData.tituloPosY > 0 ? '+' : ''}${flyerData.tituloPosY}px` : 'Centro (0px)'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleInputChange('tituloPosY', (flyerData.tituloPosY || 0) - 10)}
                  className="p-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-700 transition flex items-center gap-1 text-[11px] font-bold"
                  title="Mover hacia arriba"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                  <span>Arriba</span>
                </button>

                <input
                  type="range"
                  min="-120"
                  max="120"
                  step="5"
                  value={flyerData.tituloPosY || 0}
                  onChange={(e) => handleInputChange('tituloPosY', Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />

                <button
                  onClick={() => handleInputChange('tituloPosY', (flyerData.tituloPosY || 0) + 10)}
                  className="p-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-700 transition flex items-center gap-1 text-[11px] font-bold"
                  title="Mover hacia abajo"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                  <span>Abajo</span>
                </button>

                <button
                  onClick={() => handleInputChange('tituloPosY', 0)}
                  className="p-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-indigo-600 transition"
                  title="Restablecer posición"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Specifications & Font Scale */}
          <div className="space-y-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase text-slate-800">
                Lista de Especificaciones
              </label>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-md">
                  Letras: {flyerData.specsEscala || 100}%
                </span>
                <span className="text-[11px] text-slate-500 font-semibold">
                  Total: {3 + (flyerData.specExtra?.length || 0)}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <input
                type="text"
                value={flyerData.spec1}
                onChange={(e) => handleInputChange('spec1', e.target.value)}
                placeholder="Especificación 1 (ej: 32 RAM DDR4)"
                className="w-full px-3.5 py-2 border-2 border-slate-200 bg-white rounded-xl font-semibold text-xs text-slate-800 focus:border-indigo-600 outline-none"
              />
              <input
                type="text"
                value={flyerData.spec2}
                onChange={(e) => handleInputChange('spec2', e.target.value)}
                placeholder="Especificación 2 (ej: 500 SSD NVMe)"
                className="w-full px-3.5 py-2 border-2 border-slate-200 bg-white rounded-xl font-semibold text-xs text-slate-800 focus:border-indigo-600 outline-none"
              />
              <input
                type="text"
                value={flyerData.spec3}
                onChange={(e) => handleInputChange('spec3', e.target.value)}
                placeholder="Especificación 3 (ej: macOS Sequoia)"
                className="w-full px-3.5 py-2 border-2 border-slate-200 bg-white rounded-xl font-semibold text-xs text-slate-800 focus:border-indigo-600 outline-none"
              />

              {/* Extra specs list */}
              {flyerData.specExtra && flyerData.specExtra.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  {flyerData.specExtra.map((extra, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700">
                        ⭐ {extra}
                      </span>
                      <button
                        onClick={() => removeExtraSpec(idx)}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Extra Spec */}
              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  value={extraSpecInput}
                  onChange={(e) => setExtraSpecInput(e.target.value)}
                  placeholder="Agregar otra característica más..."
                  onKeyDown={(e) => e.key === 'Enter' && addExtraSpec()}
                  className="flex-1 px-3.5 py-2 border border-slate-300 bg-white rounded-xl text-xs font-medium text-slate-800 outline-none"
                />
                <button
                  onClick={addExtraSpec}
                  className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl flex items-center gap-1 transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>Agregar</span>
                </button>
              </div>

              {/* Specifications Font Size Control Slider */}
              <div className="pt-3 border-t border-slate-200 space-y-1.5 mt-2">
                <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                  <Type className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Aumentar / Reducir Tamaño de Especificaciones:</span>
                </label>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleInputChange('specsEscala', Math.max(60, (flyerData.specsEscala || 100) - 5))}
                    className="p-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-700 transition"
                    title="Achicar letras"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>

                  <input
                    type="range"
                    min="60"
                    max="160"
                    step="5"
                    value={flyerData.specsEscala || 100}
                    onChange={(e) => handleInputChange('specsEscala', Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />

                  <button
                    onClick={() => handleInputChange('specsEscala', Math.min(160, (flyerData.specsEscala || 100) + 5))}
                    className="p-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-700 transition"
                    title="Agrandar letras"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleInputChange('specsEscala', 100)}
                    className="p-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-indigo-600 transition"
                    title="Tamaño normal"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold text-slate-500">Ajuste rápido:</span>
                  {[
                    { label: '80%', val: 80 },
                    { label: '100% (Normal)', val: 100 },
                    { label: '120% (Grande)', val: 120 },
                    { label: '140% (Gigante)', val: 140 },
                  ].map((p) => (
                    <button
                      key={p.val}
                      onClick={() => handleInputChange('specsEscala', p.val)}
                      className={`px-2 py-0.5 text-[10px] font-bold rounded-md transition ${
                        (flyerData.specsEscala || 100) === p.val
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Specifications Vertical Position Control (Mover Especificaciones Arriba / Abajo) */}
              <div className="pt-2 border-t border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <MoveVertical className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Mover Especificaciones (Arriba / Abajo):</span>
                  </span>
                  <span className="text-indigo-700 font-extrabold">
                    {flyerData.specsPosY ? `${flyerData.specsPosY > 0 ? '+' : ''}${flyerData.specsPosY}px` : 'Centro (0px)'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleInputChange('specsPosY', (flyerData.specsPosY || 0) - 10)}
                    className="p-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-700 transition flex items-center gap-1 text-[11px] font-bold"
                    title="Mover hacia arriba"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                    <span>Arriba</span>
                  </button>

                  <input
                    type="range"
                    min="-120"
                    max="120"
                    step="5"
                    value={flyerData.specsPosY || 0}
                    onChange={(e) => handleInputChange('specsPosY', Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />

                  <button
                    onClick={() => handleInputChange('specsPosY', (flyerData.specsPosY || 0) + 10)}
                    className="p-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-700 transition flex items-center gap-1 text-[11px] font-bold"
                    title="Mover hacia abajo"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                    <span>Abajo</span>
                  </button>

                  <button
                    onClick={() => handleInputChange('specsPosY', 0)}
                    className="p-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-indigo-600 transition"
                    title="Restablecer posición"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Price & Guarantee Card */}
          <div className="space-y-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-800 mb-1">
                  Precio Actual ($)
                </label>
                <input
                  type="number"
                  value={flyerData.precio}
                  onChange={(e) => handleInputChange('precio', e.target.value)}
                  placeholder="500"
                  className="w-full px-3.5 py-2 border-2 border-slate-200 bg-white rounded-xl font-black text-slate-900 focus:border-indigo-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-800 mb-1">
                  Meses de Garantía
                </label>
                <input
                  type="text"
                  disabled={!flyerData.mostrarGarantia}
                  value={flyerData.garantiaMeses}
                  onChange={(e) => handleInputChange('garantiaMeses', e.target.value)}
                  placeholder="3"
                  className="w-full px-3.5 py-2 border-2 border-slate-200 bg-white rounded-xl font-black text-slate-900 focus:border-indigo-600 outline-none disabled:bg-slate-100 disabled:text-slate-400"
                />
              </div>
            </div>

            {/* Price Box Size & Position Y Controls */}
            <div className="pt-2 border-t border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-800">
                <span className="flex items-center gap-1.5">
                  <Type className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Bloque de Precio (Tamaño / Posición Y):</span>
                </span>
                <span className="text-indigo-800 font-extrabold">
                  {flyerData.precioEscala || 100}% | {flyerData.precioPosY ? `${flyerData.precioPosY > 0 ? '+' : ''}${flyerData.precioPosY}px` : '0px'}
                </span>
              </div>

              {/* Price Scale Slider */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleInputChange('precioEscala', Math.max(60, (flyerData.precioEscala || 100) - 5))}
                  className="p-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-700 transition"
                  title="Achicar precio"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <input
                  type="range"
                  min="60"
                  max="160"
                  step="5"
                  value={flyerData.precioEscala || 100}
                  onChange={(e) => handleInputChange('precioEscala', Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
                <button
                  onClick={() => handleInputChange('precioEscala', Math.min(160, (flyerData.precioEscala || 100) + 5))}
                  className="p-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-700 transition"
                  title="Agrandar precio"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleInputChange('precioEscala', 100)}
                  className="p-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-indigo-600 transition"
                  title="Restablecer tamaño"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Price Position Y Buttons + Slider */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => handleInputChange('precioPosY', (flyerData.precioPosY || 0) - 10)}
                  className="p-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-700 transition flex items-center gap-1 text-[11px] font-bold"
                  title="Mover precio hacia arriba"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                  <span>Arriba</span>
                </button>

                <input
                  type="range"
                  min="-120"
                  max="120"
                  step="5"
                  value={flyerData.precioPosY || 0}
                  onChange={(e) => handleInputChange('precioPosY', Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />

                <button
                  onClick={() => handleInputChange('precioPosY', (flyerData.precioPosY || 0) + 10)}
                  className="p-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-700 transition flex items-center gap-1 text-[11px] font-bold"
                  title="Mover precio hacia abajo"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                  <span>Abajo</span>
                </button>

                <button
                  onClick={() => handleInputChange('precioPosY', 0)}
                  className="p-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-indigo-600 transition"
                  title="Restablecer posición"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Guarantee Seal Size & Position Y Controls (if warranty visible) */}
            {flyerData.mostrarGarantia && (
              <div className="pt-2 border-t border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-800">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Sello de Garantía (Tamaño / Posición Y):</span>
                  </span>
                  <span className="text-emerald-800 font-extrabold">
                    {flyerData.garantiaEscala || 100}% | {flyerData.garantiaPosY ? `${flyerData.garantiaPosY > 0 ? '+' : ''}${flyerData.garantiaPosY}px` : '0px'}
                  </span>
                </div>

                {/* Guarantee Scale Slider */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleInputChange('garantiaEscala', Math.max(60, (flyerData.garantiaEscala || 100) - 5))}
                    className="p-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-700 transition"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <input
                    type="range"
                    min="60"
                    max="160"
                    step="5"
                    value={flyerData.garantiaEscala || 100}
                    onChange={(e) => handleInputChange('garantiaEscala', Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                  <button
                    onClick={() => handleInputChange('garantiaEscala', Math.min(160, (flyerData.garantiaEscala || 100) + 5))}
                    className="p-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-700 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleInputChange('garantiaEscala', 100)}
                    className="p-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-600 transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Guarantee Position Y Slider */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => handleInputChange('garantiaPosY', (flyerData.garantiaPosY || 0) - 10)}
                    className="p-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-700 transition flex items-center gap-1 text-[11px] font-bold"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                    <span>Arriba</span>
                  </button>
                  <input
                    type="range"
                    min="-120"
                    max="120"
                    step="5"
                    value={flyerData.garantiaPosY || 0}
                    onChange={(e) => handleInputChange('garantiaPosY', Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                  <button
                    onClick={() => handleInputChange('garantiaPosY', (flyerData.garantiaPosY || 0) + 10)}
                    className="p-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-700 transition flex items-center gap-1 text-[11px] font-bold"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                    <span>Abajo</span>
                  </button>
                  <button
                    onClick={() => handleInputChange('garantiaPosY', 0)}
                    className="p-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-600 transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Condition Tag / Semi Nuevo */}
          <div className="space-y-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
            <label className="block text-xs font-bold uppercase text-slate-800">
              Etiqueta de Estado / Condición
            </label>
            <input
              type="text"
              value={flyerData.condicion}
              onChange={(e) => handleInputChange('condicion', e.target.value)}
              placeholder="SEMI NUEVO / NUEVO EN CAJA / EXCELENTE ESTADO"
              className="w-full px-3.5 py-2 border-2 border-slate-200 bg-white rounded-xl font-bold text-slate-800 focus:border-indigo-600 outline-none"
            />

            {/* Condition Size & Position Y Controls */}
            <div className="pt-2 border-t border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-800">
                <span className="flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Bloque Condición / Semi Nuevo (Tamaño / Posición Y):</span>
                </span>
                <span className="text-cyan-800 font-extrabold">
                  {flyerData.condicionEscala || 100}% | {flyerData.condicionPosY ? `${flyerData.condicionPosY > 0 ? '+' : ''}${flyerData.condicionPosY}px` : '0px'}
                </span>
              </div>

              {/* Condition Scale Slider */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleInputChange('condicionEscala', Math.max(60, (flyerData.condicionEscala || 100) - 5))}
                  className="p-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-700 transition"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <input
                  type="range"
                  min="60"
                  max="160"
                  step="5"
                  value={flyerData.condicionEscala || 100}
                  onChange={(e) => handleInputChange('condicionEscala', Number(e.target.value))}
                  className="w-full accent-cyan-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
                <button
                  onClick={() => handleInputChange('condicionEscala', Math.min(160, (flyerData.condicionEscala || 100) + 5))}
                  className="p-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-700 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleInputChange('condicionEscala', 100)}
                  className="p-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-600 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Condition Position Y Slider */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => handleInputChange('condicionPosY', (flyerData.condicionPosY || 0) - 10)}
                  className="p-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-700 transition flex items-center gap-1 text-[11px] font-bold"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                  <span>Arriba</span>
                </button>
                <input
                  type="range"
                  min="-120"
                  max="120"
                  step="5"
                  value={flyerData.condicionPosY || 0}
                  onChange={(e) => handleInputChange('condicionPosY', Number(e.target.value))}
                  className="w-full accent-cyan-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
                <button
                  onClick={() => handleInputChange('condicionPosY', (flyerData.condicionPosY || 0) + 10)}
                  className="p-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-700 transition flex items-center gap-1 text-[11px] font-bold"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                  <span>Abajo</span>
                </button>
                <button
                  onClick={() => handleInputChange('condicionPosY', 0)}
                  className="p-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-600 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Image Upload / URL & Scaling Controls */}
          <div className="space-y-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
            <label className="block text-xs font-bold uppercase text-slate-800">
              Imagen del Producto y Tamaño
            </label>

            <div className="flex flex-col gap-2">
              <label className="flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-50 border-2 border-dashed border-indigo-300 hover:border-indigo-500 rounded-xl cursor-pointer text-indigo-700 font-bold text-xs transition">
                <Upload className="w-4 h-4" />
                <span>Subir Imagen desde Archivo Local</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              <input
                type="text"
                value={flyerData.imagenUrl}
                onChange={(e) => handleInputChange('imagenUrl', e.target.value)}
                placeholder="O pega URL de la imagen (https://...)"
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs text-slate-700 outline-none"
              />
            </div>

            {/* Scale Control Slider & Quick Buttons */}
            <div className="pt-2 border-t border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <ZoomIn className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Tamaño / Escala de la Imagen:</span>
                </label>
                <span className="text-xs font-black px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-md">
                  {flyerData.imagenEscala || 100}%
                </span>
              </div>

              {/* Slider + Plus/Minus controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleInputChange('imagenEscala', Math.max(40, (flyerData.imagenEscala || 100) - 10))}
                  className="p-2 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-700 transition"
                  title="Reducir tamaño"
                >
                  <Minus className="w-4 h-4" />
                </button>

                <input
                  type="range"
                  min="40"
                  max="220"
                  step="5"
                  value={flyerData.imagenEscala || 100}
                  onChange={(e) => handleInputChange('imagenEscala', Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />

                <button
                  onClick={() => handleInputChange('imagenEscala', Math.min(220, (flyerData.imagenEscala || 100) + 10))}
                  className="p-2 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-700 transition"
                  title="Aumentar tamaño"
                >
                  <Plus className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleInputChange('imagenEscala', 100)}
                  className="p-2 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-indigo-600 transition"
                  title="Restablecer al 100%"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Size Preset Pills */}
              <div className="flex items-center gap-1.5 pt-1">
                <span className="text-[11px] font-semibold text-slate-500 mr-1">Rápido:</span>
                {[
                  { label: 'Chica (75%)', val: 75 },
                  { label: 'Normal (100%)', val: 100 },
                  { label: 'Grande (125%)', val: 125 },
                  { label: 'Max (150%)', val: 150 },
                ].map((preset) => (
                  <button
                    key={preset.val}
                    onClick={() => handleInputChange('imagenEscala', preset.val)}
                    className={`px-2 py-1 text-[11px] font-bold rounded-lg transition ${
                      (flyerData.imagenEscala || 100) === preset.val
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              {/* Background Blend Mode Selector */}
              <div className="pt-2 border-t border-slate-200 space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 block">
                  Mezcla / Fondo de Imagen:
                </label>
                <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                  {[
                    { id: 'normal', label: 'Sin Filtro (PNG)' },
                    { id: 'multiply', label: 'Quitar Fondo Blanco' },
                    { id: 'screen', label: 'Quitar Fondo Negro' },
                  ].map((bMode) => (
                    <button
                      key={bMode.id}
                      type="button"
                      onClick={() => handleInputChange('imagenModoMezcla', bMode.id)}
                      className={`px-2 py-1.5 font-bold rounded-lg transition border text-center ${
                        (flyerData.imagenModoMezcla || 'normal') === bMode.id
                          ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {bMode.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Address & Contact */}
          <div className="space-y-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-800 mb-1">
                Dirección Comercial (Caja de Texto Abajo)
              </label>
              <input
                type="text"
                value={flyerData.direccion}
                onChange={(e) => handleInputChange('direccion', e.target.value)}
                className="w-full px-3.5 py-2 border-2 border-slate-200 bg-white rounded-xl text-xs font-semibold text-slate-800 outline-none"
              />
            </div>

            {/* Address Box Size & Position Y Controls */}
            <div className="pt-2 border-t border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-800">
                <span className="flex items-center gap-1.5">
                  <Type className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Caja de Dirección (Tamaño / Posición Y):</span>
                </span>
                <span className="text-indigo-800 font-extrabold">
                  {flyerData.direccionEscala || 100}% | {flyerData.direccionPosY ? `${flyerData.direccionPosY > 0 ? '+' : ''}${flyerData.direccionPosY}px` : '0px'}
                </span>
              </div>

              {/* Address Scale Slider */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleInputChange('direccionEscala', Math.max(60, (flyerData.direccionEscala || 100) - 5))}
                  className="p-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-700 transition"
                  title="Achicar dirección"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <input
                  type="range"
                  min="60"
                  max="160"
                  step="5"
                  value={flyerData.direccionEscala || 100}
                  onChange={(e) => handleInputChange('direccionEscala', Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
                <button
                  onClick={() => handleInputChange('direccionEscala', Math.min(160, (flyerData.direccionEscala || 100) + 5))}
                  className="p-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-700 transition"
                  title="Agrandar dirección"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleInputChange('direccionEscala', 100)}
                  className="p-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-indigo-600 transition"
                  title="Restablecer tamaño"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Address Position Y Slider */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => handleInputChange('direccionPosY', (flyerData.direccionPosY || 0) - 10)}
                  className="p-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-700 transition flex items-center gap-1 text-[11px] font-bold"
                  title="Mover dirección hacia arriba"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                  <span>Arriba</span>
                </button>
                <input
                  type="range"
                  min="-120"
                  max="120"
                  step="5"
                  value={flyerData.direccionPosY || 0}
                  onChange={(e) => handleInputChange('direccionPosY', Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
                <button
                  onClick={() => handleInputChange('direccionPosY', (flyerData.direccionPosY || 0) + 10)}
                  className="p-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-700 transition flex items-center gap-1 text-[11px] font-bold"
                  title="Mover dirección hacia abajo"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                  <span>Abajo</span>
                </button>
                <button
                  onClick={() => handleInputChange('direccionPosY', 0)}
                  className="p-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-indigo-600 transition"
                  title="Restablecer posición"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Teléfono (Pie de Página)
                </label>
                <input
                  type="text"
                  value={flyerData.telefono}
                  onChange={(e) => handleInputChange('telefono', e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-300 bg-white rounded-xl text-xs font-semibold text-slate-800 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Correo (Pie de Página)
                </label>
                <input
                  type="text"
                  value={flyerData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-300 bg-white rounded-xl text-xs font-semibold text-slate-800 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Export Action Buttons */}
          <div className="pt-4 space-y-2">
            <button
              onClick={handleDownloadPng}
              disabled={isExporting}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition disabled:opacity-50"
            >
              <Download className="w-5 h-5" />
              <span>{isExporting ? 'Procesando Flyer...' : 'Descargar Imagen PNG High Quality'}</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={isExporting}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-50"
            >
              <FileDown className="w-4 h-4" />
              <span>Descargar PDF para Impresión</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: LIVE CANVAS PREVIEW */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-800 min-h-[600px]">
          <div className="w-full flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
            <span className="text-xs font-bold uppercase text-cyan-400 flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              <span>Vista Previa del Flyer ({flyerData.formatoForma || 'poster'})</span>
            </span>
            <span className="text-xs text-slate-400">Diseño Optimizado para Redes</span>
          </div>

          {/* Scaled Canvas Preview Wrapper */}
          <div className="w-full overflow-auto flex justify-center py-2">
            <div className="transform scale-[0.62] sm:scale-[0.72] md:scale-[0.8] lg:scale-[0.65] xl:scale-[0.78] origin-top my-0">
              <FlyerCanvas data={flyerData} canvasRef={canvasRef} />
            </div>
          </div>
        </div>
      </div>

      {/* HIDDEN OFF-SCREEN UNLEASHED CANVAS FOR HIGH-RESOLUTION 1:1 EXPORT (ZERO SCALING ARTIFACTS) */}
      <div className="fixed -left-[9999px] -top-[9999px] pointer-events-none z-[-100] opacity-100 overflow-hidden" aria-hidden="true">
        <FlyerCanvas data={flyerData} canvasRef={exportCanvasRef} />
      </div>
    </div>
  );
};
