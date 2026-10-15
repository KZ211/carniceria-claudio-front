export type Unidad = 'kg' | 'u';

export interface Corte {
  id: string;
  nombre: string;
  nota?: string;
  unidad: Unidad;
}

export interface Categoria {
  id: string;
  nombre: string;
  cortes: Corte[];
}

// Lista de ejemplo armada con los carteles del local: confirmar cortes con Claudio.
export const categorias: Categoria[] = [
  {
    id: 'vaca',
    nombre: 'Vaca y novillito',
    cortes: [
      { id: 'asado', nombre: 'Asado de tira', unidad: 'kg' },
      { id: 'vacio', nombre: 'Vacío', unidad: 'kg' },
      { id: 'matambre', nombre: 'Matambre', unidad: 'kg' },
      { id: 'entrana', nombre: 'Entraña', unidad: 'kg' },
      { id: 'bife', nombre: 'Bife de chorizo', unidad: 'kg' },
      { id: 'colita', nombre: 'Colita de cuadril', unidad: 'kg' },
      { id: 'tapa', nombre: 'Tapa de asado', unidad: 'kg' },
      { id: 'americano', nombre: 'Asado americano', unidad: 'kg' },
      { id: 'nalga', nombre: 'Nalga para milanesas', unidad: 'kg' },
      { id: 'picada', nombre: 'Carne picada especial', unidad: 'kg' },
    ],
  },
  {
    id: 'ternera',
    nombre: 'Ternera',
    cortes: [
      { id: 'paleta', nombre: 'Paleta', unidad: 'kg' },
      { id: 'tortuguita', nombre: 'Tortuguita', unidad: 'kg' },
      { id: 'bola', nombre: 'Bola de lomo', unidad: 'kg' },
      { id: 'roast', nombre: 'Roast beef', unidad: 'kg' },
      { id: 'osobuco', nombre: 'Osobuco', unidad: 'kg' },
    ],
  },
  {
    id: 'cerdo',
    nombre: 'Cerdo',
    cortes: [
      { id: 'bondiola', nombre: 'Bondiola', unidad: 'kg' },
      { id: 'pechito', nombre: 'Pechito de cerdo', unidad: 'kg' },
      { id: 'matambrito', nombre: 'Matambrito', unidad: 'kg' },
      { id: 'carre', nombre: 'Carré', unidad: 'kg' },
      { id: 'picada-cerdo', nombre: 'Picada de cerdo', unidad: 'kg' },
    ],
  },
  {
    id: 'pollo',
    nombre: 'Pollo',
    cortes: [
      { id: 'pollo-entero', nombre: 'Pollo entero', unidad: 'u' },
      { id: 'pata-muslo', nombre: 'Pata muslo', unidad: 'kg' },
      { id: 'pechuga', nombre: 'Pechuga', unidad: 'kg' },
      { id: 'alitas', nombre: 'Alitas', unidad: 'kg' },
      { id: 'mila-pollo', nombre: 'Milanesas de pollo', unidad: 'kg' },
    ],
  },
  {
    id: 'embutidos',
    nombre: 'Embutidos caseros',
    cortes: [
      { id: 'chorizo', nombre: 'Chorizo casero', unidad: 'u' },
      { id: 'morcilla', nombre: 'Morcilla', unidad: 'u' },
      { id: 'salchicha', nombre: 'Salchicha parrillera', unidad: 'kg' },
      { id: 'bombon', nombre: 'Chorizo bombón', unidad: 'kg' },
    ],
  },
  {
    id: 'achuras',
    nombre: 'Achuras',
    cortes: [
      { id: 'molleja', nombre: 'Molleja', unidad: 'kg' },
      { id: 'chinchulines', nombre: 'Chinchulines', unidad: 'kg' },
      { id: 'rinon', nombre: 'Riñón', unidad: 'kg' },
      { id: 'higado', nombre: 'Hígado', unidad: 'kg' },
      { id: 'mondongo', nombre: 'Mondongo', unidad: 'kg' },
    ],
  },
];

export const todosLosCortes = categorias.flatMap((c) => c.cortes);
