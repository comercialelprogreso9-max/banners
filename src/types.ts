export interface DeliveryItem {
  id: string;
  codigo: string;
  cantidad: number;
  concepto: string;
}

export interface DeliveryNote {
  numero: string;
  fecha: string;
  cliente: string;
  items: DeliveryItem[];
}

export interface InvoiceItem {
  id: string;
  codigo: string;
  cantidad: number;
  descripcion: string;
  precioUnitario: number;
  total: number;
}

export interface Invoice {
  numero: string;
  fecha: string;
  cliente: string;
  direccion: string;
  metodoPago: 'Efectivo' | 'Transferencia';
  moneda: 'Córdobas' | 'Dólares';
  observacion: string;
  items: InvoiceItem[];
  totalGeneral: number;
}

export interface FlyerData {
  titleLine1: string;
  titleLine2: string;
  titleLine3: string;
  spec1: string;
  spec2: string;
  spec3: string;
  specExtra: string[];
  precio: number | string;
  precioAnterior?: number | string;
  esOferta?: boolean;
  etiquetaOferta?: string; // e.g. "¡SUPER OFERTA!", "20% OFF", "LIQUIDACIÓN"
  porcentajeDescuento?: number | string;
  moneda: string; // 'Dolares' | 'Córdobas'
  garantiaMeses: number | string; // e.g. 3
  mostrarGarantia?: boolean; // toggle badge visibility
  categoria?: 'laptop' | 'accesorio';
  condicion: string; // 'SEMI NUEVO', 'NUEVO', 'REACONDICIONADO', 'NUEVO EN CAJA', etc.
  direccion: string;
  telefono: string;
  email: string;
  imagenUrl: string;
  imagenEscala?: number; // scale percentage e.g. 100 = 100%, 120 = 120%, 80 = 80%
  imagenModoMezcla?: 'normal' | 'multiply' | 'screen' | 'lighten'; // blend mode for images with solid white/black backgrounds
  tituloEscala?: number; // percentage font scale for main title (default 100)
  tituloPosY?: number; // Y offset in pixels for main title (default 0)
  specsEscala?: number; // percentage font scale for specifications (default 100)
  specsPosY?: number; // Y offset in pixels for specifications (default 0)
  direccionEscala?: number; // percentage scale for address box (default 100)
  direccionPosY?: number; // Y offset for address box (default 0)
  precioEscala?: number; // percentage scale for price box (default 100)
  precioPosY?: number; // Y offset for price box (default 0)
  garantiaEscala?: number; // percentage scale for guarantee seal (default 100)
  garantiaPosY?: number; // Y offset for guarantee seal (default 0)
  condicionEscala?: number; // percentage scale for condition text (default 100)
  condicionPosY?: number; // Y offset for condition text (default 0)
  logoSubtitulo: string;
  esRegalia?: boolean; // toggle for regalía / combo mode (shows 2 images with + sign)
  imagenRegaliaUrl?: string; // image for 2nd product (regalía)
  etiquetaRegalia?: string; // label e.g. "¡TE REGALAMOS ESTE PRODUCTO!"
  tituloRegalia?: string; // e.g. "Audífonos Gamer 7.1" or "Mouse Inalámbrico"
  imagenRegaliaEscala?: number; // scale percentage for 2nd image (default 100)
  formatoForma?: 'poster' | 'instagram' | 'tiktok_story' | 'facebook_banner';
  estiloColor?: 'neon_blue' | 'gold_black' | 'cyber_purple' | 'emerald_pro' | 'ruby_red' | 'royal_blue';
}
