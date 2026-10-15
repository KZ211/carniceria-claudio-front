export const site = {
  name: 'Carnicería Claudio',
  slogan: 'El peso exacto',
  address: 'Vieytes 1063',
  corner: 'esq. Alfaro',
  city: 'Presidente Derqui, Pilar',
  phoneLabel: '11 4989-4783',
  phoneHref: 'tel:+541149894783',
  whatsapp: '5491149894783',
  mapsHref: 'https://www.google.com/maps/search/?api=1&query=Vieytes+1063,+Presidente+Derqui,+Buenos+Aires',
  // Horarios de ejemplo: confirmar con Claudio antes de publicar.
  hours: [
    { days: 'Lunes a sábado', time: '8:00 – 13:00' },
    { days: 'Lunes a sábado', time: '17:00 – 21:00' },
    { days: 'Domingo', time: '8:00 – 13:00' },
  ],
};

export const waLink = (text: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
