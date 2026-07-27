import React from 'react';
import { Phone, MapPin, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <header className="bg-[#0b1836] text-white border-b border-indigo-900/60 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-600 to-indigo-800 border-2 border-cyan-400 flex items-center justify-center font-black text-xl shadow-md text-white">
            EP
          </div>
          <div>
            <h1 className="font-black text-xl tracking-tight text-white flex items-center gap-2">
              COMERCIAL <span className="text-cyan-400">"EL PROGRESO"</span>
            </h1>
            <p className="text-xs text-slate-300 font-medium">
              Venta de Computadoras, Accesorios y Servicio Técnico
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-400/40 px-4 py-2 rounded-full text-cyan-300 font-bold shadow-sm">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Generador de Flyer Publicitario</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 bg-indigo-950/70 border border-indigo-800/60 px-3.5 py-2 rounded-full text-slate-300">
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>+505 81295540</span>
          </div>
        </div>
      </div>
    </header>
  );
};
