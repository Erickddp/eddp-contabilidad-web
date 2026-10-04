export const origin = { name: "Cuajimalpa (CDMX)", lat: 19.357, lng: -99.299 };

export const borderCities = [
  // de oeste a este, orden del trazo
  { name: "Tijuana", state: "BC", lat: 32.514, lng: -117.038 },
  { name: "Ensenada", state: "BC", lat: 31.866, lng: -116.596 },
  { name: "Mexicali", state: "BC", lat: 32.624, lng: -115.452 },
  { name: "San Luis Río Colorado", state: "SON", lat: 32.456, lng: -114.772 },
  { name: "Nogales", state: "SON", lat: 31.308, lng: -110.942 },
  { name: "Agua Prieta", state: "SON", lat: 31.327, lng: -109.548 },
  { name: "Ciudad Juárez", state: "CHIH", lat: 31.69, lng: -106.424 },
  { name: "Ojinaga", state: "CHIH", lat: 29.564, lng: -104.416 },
  { name: "Ciudad Acuña", state: "COAH", lat: 29.324, lng: -100.932 },
  { name: "Piedras Negras", state: "COAH", lat: 28.7, lng: -100.523 },
  { name: "Nuevo Laredo", state: "TAMPS", lat: 27.476, lng: -99.516 },
  { name: "Reynosa", state: "TAMPS", lat: 26.092, lng: -98.277 },
  { name: "Matamoros", state: "TAMPS", lat: 25.869, lng: -97.502 },
];
// Ciudad Juárez es la primera parada del trazo desde CDMX (ahí hay clientes activos).
