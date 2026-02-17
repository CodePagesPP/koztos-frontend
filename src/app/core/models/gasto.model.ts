export interface TipoGasto {
  id?: number;
  nombre: string;
  grupo: string;
  tipo: string;
}

export interface Gasto {
  id?: number;
  local: string;
  fechaEmision: string;
  tipoGasto: TipoGasto;
  personaAfectada: string;
  condicion: string;
  gravable: string;
  documentoSerie: string;
  documentoNumero: string;
  moneda: string;
  medioPago: string;
  cuenta: string;
  descripcion: string;
  subtotal: number;
  impuesto: number;
  total: number;
  usuario?: string;
  fechaRegistro?: string;
  estado?: string;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
}