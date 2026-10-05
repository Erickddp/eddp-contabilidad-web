# Diseño: "La balanza" (V2) con la identidad de erickddp.com

> Desde 2026-10-05 la paleta y la tipografía siguen a erickddp.com: negro puro, zinc, cielo #38BDF8 con brillo, Plus Jakarta Sans + JetBrains Mono. La tabla de tokens de abajo es la vigente en `src/app/globals.css`; ver el detalle en `DECISIONES.md`.

Fuentes: `CAMBIO-V2.md` (manda) y las secciones vigentes de `PROMPT-MAESTRO.md` (paleta, tipografía, forma, retícula, prohibidos).

## Tokens (`src/app/globals.css`, `@theme`)

| Token | Valor | Rol |
|---|---|---|
| `negro` | #000000 | Fondo de página y del canvas |
| `grafito` | #09090B | Superficies (footer, franja) |
| `grafito-2` | #18181B | Tarjetas |
| `blanco` | #FFFFFF | Texto (100 / 80 / 70 / 45 %) |
| `cielo` | #38BDF8 | Acento: botones, foco, borde vivo, doble raya, partículas |
| `cielo-300` / `cielo-500` / `cielo-700` | #7DD3FC / #0EA5E9 / #0369A1 | Variantes del acento |
| `ambar` | #F2A541 | "Peso de más" en la balanza y la columna sin estrategia |

Radios: tarjetas 18 px, elementos chicos 12 px, botones píldora.

## Tipografía (mobile-first)

- h1: `clamp(2.45rem, 5vw, 4.75rem)`, Plus Jakarta Sans 800, tracking −0.045em; la segunda línea con brillo metálico.
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
