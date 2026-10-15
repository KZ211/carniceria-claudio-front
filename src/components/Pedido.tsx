import { useEffect, useMemo, useRef, useState } from 'react';
import { categorias, todosLosCortes, type Corte } from '../data/cortes';
import { site, waLink } from '../data/site';
import { tornPath } from '../lib/torn';
import './pedido.css';

type Lineas = Record<string, number>;

const PASO_KG = 0.25;
const TORN = tornPath({ teeth: 22, depth: 9 });
const CUANDO = ['Hoy a la mañana', 'Hoy a la tarde', 'Mañana a la mañana', 'Mañana a la tarde'];

const kg = new Intl.NumberFormat('es-AR', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
const fmt = (c: Corte, q: number) => (c.unidad === 'kg' ? `${kg.format(q)} kg` : `${q} u.`);
const porId = Object.fromEntries(todosLosCortes.map((c) => [c.id, c]));

// Cuánto llevar por persona para un asado (se redondea al cuarto de kilo o a la unidad).
const ASADO_POR_PERSONA: [string, number][] = [
  ['asado', 0.25],
  ['vacio', 0.15],
  ['chorizo', 0.5],
  ['morcilla', 0.34],
  ['molleja', 0.05],
];

function armarAsado(personas: number): Lineas {
  const out: Lineas = {};
  for (const [id, x] of ASADO_POR_PERSONA) {
    const c = porId[id];
    const q = c.unidad === 'kg' ? Math.max(PASO_KG, Math.round((x * personas) / PASO_KG) * PASO_KG) : Math.max(1, Math.ceil(x * personas));
    out[id] = q;
  }
  return out;
}

export default function Pedido() {
  const [lineas, setLineas] = useState<Lineas>({});
  const [personas, setPersonas] = useState(6);
  const [nombre, setNombre] = useState('');
  const [cuando, setCuando] = useState(CUANDO[1]);
  const [ticketVisible, setTicketVisible] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);

  const ids = Object.keys(lineas);
  const totalKg = ids.reduce((s, id) => (porId[id].unidad === 'kg' ? s + lineas[id] : s), 0);

  useEffect(() => {
    const el = ticketRef.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => setTicketVisible(e.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cambiar = (c: Corte, dir: 1 | -1) =>
    setLineas((prev) => {
      const paso = c.unidad === 'kg' ? PASO_KG : 1;
      const actual = prev[c.id] ?? 0;
      const nuevo = actual === 0 && dir === 1 ? 1 : +(actual + dir * paso).toFixed(3);
      const next = { ...prev };
      if (nuevo <= 0) delete next[c.id];
      else next[c.id] = nuevo;
      return next;
    });

  const mensaje = useMemo(() => {
    const items = ids.map((id) => `• ${porId[id].nombre}: ${fmt(porId[id], lineas[id])}`).join('\n');
    return [
      '¡Hola Claudio! Quiero hacer un pedido para retirar:',
      items,
      totalKg > 0 ? `Total aproximado: ${kg.format(totalKg)} kg` : '',
      nombre.trim() ? `A nombre de: ${nombre.trim()}` : '',
      `Paso a retirar: ${cuando.toLowerCase()}`,
    ]
      .filter(Boolean)
      .join('\n');
  }, [lineas, nombre, cuando]);

  return (
    <div className="pedido">
      <div className="pedido__lista">
        <h2 className="pedido__palabra" id="cortes-title">Cortes</h2>
        <p className="pedido__intro">
          Tocá <span aria-hidden="true">+</span> para sumar un corte a tu ticket. Lo pesamos al gramo cuando llega tu mensaje: el precio es el del día, te lo pasamos por WhatsApp.
        </p>
        <div className="pedido__barras">
          {categorias.map((cat, i) => (
            <details key={cat.id} open={i === 0}>
              <summary>
                <span>{cat.nombre}</span>
                <span className="pedido__mas" aria-hidden="true" />
              </summary>
              <ul>
                {cat.cortes.map((c) => {
                  const q = lineas[c.id];
                  return (
                    <li key={c.id}>
                      <span>{c.nombre}</span>
                      <span className="pedido__ctrl nums">
                        {q ? (
                          <>
                            <button type="button" onClick={() => cambiar(c, -1)} aria-label={`Quitar ${c.nombre}`}>−</button>
                            <output aria-live="polite">{fmt(c, q)}</output>
                          </>
                        ) : null}
                        <button type="button" onClick={() => cambiar(c, 1)} aria-label={`Sumar ${c.nombre}`}>+</button>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </details>
          ))}
        </div>
      </div>

      <div className="pedido__col">
        <div className="pedido__ticket" ref={ticketRef} id="pedido" style={{ clipPath: TORN }}>
          <h3>Tu pedido</h3>

          <div className="pedido__asado">
            <p>¿Asado para cuántos?</p>
            <div className="pedido__personas nums">
              <button type="button" onClick={() => setPersonas((p) => Math.max(2, p - 1))} aria-label="Menos personas">−</button>
              <output aria-live="polite">{personas}</output>
              <button type="button" onClick={() => setPersonas((p) => Math.min(60, p + 1))} aria-label="Más personas">+</button>
            </div>
            <button type="button" className="btn btn--ink" onClick={() => setLineas((prev) => ({ ...prev, ...armarAsado(personas) }))}>
              Cargar asado
            </button>
          </div>

          {ids.length === 0 ? (
            <p className="pedido__vacio">Todavía no sumaste nada. Elegí cortes de la lista o cargá un asado y acá ves el peso de cada uno.</p>
          ) : (
            <ul className="pedido__lineas nums">
              {ids.map((id) => (
                <li key={id}>
                  <span>{porId[id].nombre}</span>
                  <span>{fmt(porId[id], lineas[id])}</span>
                </li>
              ))}
              <li className="pedido__total">
                <span>Total en kilos</span>
                <span>{kg.format(totalKg)} kg</span>
              </li>
            </ul>
          )}

          <label className="pedido__campo">
            <span>A nombre de</span>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} autoComplete="name" placeholder="Tu nombre" />
          </label>
          <label className="pedido__campo">
            <span>Paso a retirar</span>
            <select value={cuando} onChange={(e) => setCuando(e.target.value)}>
              {CUANDO.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>

          <a className="btn pedido__enviar" href={waLink(mensaje)} target="_blank" rel="noopener">
            Enviar pedido por WhatsApp
          </a>
          <p className="pedido__nota">Se abre WhatsApp con el pedido escrito para {site.phoneLabel}. Vos lo revisás y lo mandás.</p>
          {ids.length > 0 && (
            <button type="button" className="link pedido__limpiar" onClick={() => setLineas({})}>
              Vaciar ticket
            </button>
          )}
        </div>
      </div>

      {ids.length > 0 && !ticketVisible && (
        <a className="pedido__barra nums" href="#pedido">
          <span>
            {ids.length} {ids.length === 1 ? 'corte' : 'cortes'} · {kg.format(totalKg)} kg
          </span>
          <span>Ver pedido</span>
        </a>
      )}
    </div>
  );
}
