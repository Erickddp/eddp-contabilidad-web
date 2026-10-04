# Diseño: "La balanza" (V2)

Fuentes: `CAMBIO-V2.md` (manda) y las secciones vigentes de `PROMPT-MAESTRO.md` (paleta, tipografía, forma, retícula, prohibidos).

## Tokens (`src/app/globals.css`, `@theme`)

| Token | Valor | Rol |
|---|---|---|
| `noche` | #070F24 | Fondo del canvas de la balanza (más profundo que tinta) |
| `tinta` | #0B1733 | Superficies oscuras y footer |
| `tinta-2` | #13224A | Tarjetas elevadas y halo central del fondo |
| `papel` | #EEF3EA | Tarjetas de precios y fichas de casos; botón principal |
| `renglon` | #C9D8C3 | Líneas sobre papel |
| `pluma` | #3157E0 | Foco, estados activos, columna "con estrategia", brillo de partículas |
| `cuadre` | #D23A2C | Solo la doble raya (comparativo y footer) |
| `ambar` | #F2A541 | "Peso, impuestos de más" en las partículas |
| `claro` | #F3F5F1 | Texto sobre fondo oscuro y partículas base |

Radios: libro 4 px (precios, casos), vidrio 22 px (tarjetas de servicio, panel del comparativo), botón 12 px.

## Tipografía (mobile-first)

- h1: `clamp(2.75rem, 6vw, 6rem)` → 44 px en 375, hasta 96 px. Interlineado 0.95, tracking −0.035em.
- h2 (`.h2`): `clamp(2rem, 1.6rem + 1.6vw, 3.05rem)` → 32–36 px en móvil.
- Cuerpo: 16 px en móvil, 17.5 px en desktop, interlineado 1.55. Cifras tabulares siempre.

## La balanza (canvas fijo)

Un solo `THREE.Points` con `ShaderMaterial`; formas en `src/components/particles/shapes.ts`, encuadres en `config.ts`.

| Sección | Forma | Encuadre móvil | Encuadre desktop |
|---|---|---|---|
| Hero | 0 → 6 (se equilibra) | 40% superior | mitad derecha |
| ¿Te pasa esto? | 1 papeles | pantalla completa | pantalla completa |
| Servicios | 2 libro | centro | centro |
| Estrategia | 3 columnas | arriba al centro | derecha |
| Cómo trabajamos | 4 camino (vertical) | borde derecho | derecha |
| Precios → Preguntas | 5 nube 25% | todo | todo |
| CTA final | 6 equilibrio | arriba del título | arriba del título |
| Footer | 5 nube | — | — |

## Wireframes (375 px primero)

```
Hero                         Estrategia                   CTA final
┌──────────────┐             ┌──────────────┐             ┌──────────────┐
│ EDDP     [☰] │             │ Mismo ingreso│             │   balanza    │
│   balanza    │ 40%         │ Otra estrat. │             │  equilibrio  │
│  ⚖ (canvas)  │             │ [chips]      │             │ Tu primera   │
│ Tus impuestos│             │┌────────────┐│             │ revisión es  │
│ en equilibrio│             ││ $431,800   ││             │ gratis.      │
│ subtítulo    │             ││ $36,000    ││             │ [WhatsApp]   │
│ [WhatsApp  ] │ 52 px       ││ $395,800   ││             │ [Agendar]    │
│ [Agendar   ] │             ││ ══════     ││             └──────────────┘
│ microcopy    │             │└────────────┘│
├──────────────┤             │ [Calcula...] │
│[WhatsApp][Ag]│ barra fija  └──────────────┘
└──────────────┘
Desktop: hero en 6 columnas a la izquierda y la balanza a la derecha; Servicios pineado con track horizontal.
```

## Revisión contra 7.6

- Sin eyebrows, sin flechas pegadas, sin palabra del titular en otro color.
- Números solo en "Cómo trabajamos" (es secuencia); los servicios no se numeran.
- Rojo solo en la doble raya. Nada de gradientes decorativos: el halo del fondo es el único degradado y sirve para que las partículas brillen.
- Cada sección tiene su propio gesto (CAMBIO-V2, 7); no hay fade-up genérico.
- Tarjetas no idénticas: servicios (vidrio oscuro), precios (papel, una destacada), casos (fichas que alternan ancho completo y dos columnas).
