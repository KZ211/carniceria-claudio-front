// Polígono para `clip-path`: un rectángulo con el borde superior y/o inferior cortado en dientes,
// como el ticket que sale de la balanza.
export function tornPath({ teeth = 28, depth = 10, top = true, bottom = true } = {}) {
  const pts: string[] = [];
  const step = 100 / teeth;
  if (top) {
    for (let i = 0; i < teeth; i++) {
      pts.push(`${(i * step).toFixed(3)}% ${depth}px`, `${((i + 0.5) * step).toFixed(3)}% 0`);
    }
    pts.push(`100% ${depth}px`);
  } else {
    pts.push('0 0', '100% 0');
  }
  if (bottom) {
    for (let i = teeth; i > 0; i--) {
      pts.push(`${(i * step).toFixed(3)}% calc(100% - ${depth}px)`, `${((i - 0.5) * step).toFixed(3)}% 100%`);
    }
    pts.push(`0 calc(100% - ${depth}px)`);
  } else {
    pts.push('100% 100%', '0 100%');
  }
  return `polygon(${pts.join(', ')})`;
}
