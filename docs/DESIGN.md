# Diseño: concepto "Doble raya"

Fuente: sección 7 y 8 de `PROMPT-MAESTRO.md`. Este documento resume los tokens reales y los wireframes.

## Tokens (`src/app/globals.css`, `@theme`)

| Token | Valor | Rol |
|---|---|---|
| `tinta` | #0B1733 | Fondo base oscuro |
| `tinta-2` | #13224A | Superficies elevadas |
| `papel` | #EEF3EA | Secciones claras, botón principal |
| `renglon` | #C9D8C3 | Líneas y columnas sobre papel |
| `pluma` | #3157E0 | Foco, links, estados activos |
| `cuadre` | #D23A2C | Solo doble raya, totales y estado "Cuadra" |
| `ambar` | #F2A541 | Frontera: puntos del mapa y brillo del hero |
| `claro` | #F3F5F1 | Texto sobre tinta (100% y 72%) |

Radios: libro 4 px, vidrio 22 px, botón 12 px, FAB circular. Sombras: solo el panel del cotizador.
Retícula: contenedor 1320 px, gutter 20 / 32 / 64 px (`--gutter`).

## Tipografía

Display: Bricolage Grotesque 500/600. Texto: IBM Plex Sans 400/500. Cifras con `tabular-nums lining-nums`.
Cuerpo 16 px móvil, 17.5 px desktop, interlineado 1.55. H1: `clamp(2.5rem, 6.2vw, 5.75rem)`, interlineado 0.95.
Escala modular 1.25 desde 1 rem: h6 1 rem · h5 1.25 · h4 1.563 · h3 1.953 · h2 2.441 rem.

## Wireframes

```
Nav (fija)
[logo EDDP Servicios Contables]   ( Servicios Frontera Precios Casos Sobre mí Preguntas )   [Escríbeme]
 móvil: [logo EDDP]                                                       [☰ 44x44]

Hero (fondo tinta + curvas de nivel)
 Contabilidad que cuadra,
 de la frontera
 a la Ciudad de México.
 subtítulo ......................      ┌ Pago provisional de septiembre ┐
 [Escríbeme por WhatsApp] [Agenda…]    │ filas tipo libro               │
 microcopy                             │ Total a pagar   $5,025.10      │
 [⏸ pausa]                             │ ═══════════ doble raya         │
                                       │ [Cuadra…]      Ejemplo         │
                                       └────────────────────────────────┘
 móvil: todo en una columna, tarjeta debajo.

Footer
 logo + datos │ Servicios │ Legal │ Contacto
 ═══════════════════ doble raya ancho completo
 © año EDDP Servicios Contables

Móvil: barra inferior fija  [WhatsApp] [Agendar]    Desktop: FAB WhatsApp tras el hero.
```

Las secciones del home (fase 2 en adelante) se wireframean cuando se construyan.

## Revisión contra 7.6 (qué se corrigió)

- Eyebrows en mayúsculas sobre títulos: no se usan; el título de la tarjeta va solo.
- Chip del hero: el prompt trae "Cuadra ✓ Presentada…" con signo pegado; se usa ícono de palomita y coma.
- Flechas "→" en links y botones: ninguna.
- Rojo `cuadre` en botones o decoración: ninguno; solo la doble raya y el chip de estado.
- Fade-up genérico: el movimiento está limitado a la secuencia del hero; el resto de la página no anima.
- Palabra del h1 en otro color o cursiva: no; el titular es de un solo color.
