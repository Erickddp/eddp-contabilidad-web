// Sección "Mismo ingreso. Otra estrategia." (CAMBIO-V2, 9.16). Todo editable aquí.
// Un escenario sin cifras (null) no se muestra.

export type Escenario = {
  id: string;
  /** Texto del chip/tab. */
  nombre: string;
  /** Supuesto en una línea, bajo el selector. */
  supuesto: string;
  sin: { etiqueta: string; isrAnual: number | null };
  con: { etiqueta: string; isrAnual: number | null };
};

export const escenarios: Escenario[] = [
  {
    // TODO(Rick): validar con la tarifa vigente del ejercicio y ajustar
    id: "profesionista",
    nombre: "Profesionista que factura sus servicios",
    supuesto: "Ingresos de $1,800,000 al año.",
    sin: {
      etiqueta: "Actividad profesional casi sin deducciones (10%, base de $1,620,000)",
      isrAnual: 431800,
    },
    con: {
      etiqueta: "Régimen correcto para su nivel de ingreso (RESICO PF, 2% sobre $1,800,000)",
      isrAnual: 36000,
    },
  },
  {
    // TODO(Rick): validar con la tarifa vigente del ejercicio y ajustar
    id: "gastos",
    nombre: "Persona física con gastos de su negocio",
    supuesto: "", // TODO(Rick): ingresos y gastos del ejemplo
    sin: {
      etiqueta: "Deducciones mal soportadas o sin CFDI",
      isrAnual: null, // TODO(Rick)
    },
    con: {
      etiqueta:
        "Deducciones autorizadas bien comprobadas y deducciones personales aplicadas en la anual",
      isrAnual: null, // TODO(Rick)
    },
  },
  {
    // TODO(Rick): validar con la tarifa vigente del ejercicio y ajustar
    id: "negocio",
    nombre: "Negocio que ya creció",
    supuesto: "", // TODO(Rick): ingresos, nómina del dueño y utilidades del ejemplo
    sin: {
      etiqueta: "Persona física con actividad empresarial",
      isrAnual: null, // TODO(Rick)
    },
    con: {
      etiqueta: "SAS con nómina para el dueño, gastos deducibles y reparto de utilidades",
      isrAnual: null, // TODO(Rick)
    },
  },
];

export const escenariosVisibles = escenarios.filter(
  (e) => e.sin.isrAnual !== null && e.con.isrAnual !== null,
);

export const estrategiaCopy = {
  titulo: "Mismo ingreso. Otra estrategia.",
  bajada:
    "La diferencia entre pagar de más y pagar lo justo casi nunca es el ingreso: es el régimen, las deducciones y el orden.",
  pie: "Ejemplos ilustrativos con supuestos simplificados. No son una promesa de ahorro: cada caso depende de tus ingresos, gastos, requisitos del régimen y la ley vigente. En tu diagnóstico gratis lo calculamos con tus números.",
  cta: "Calcula mi caso",
};
