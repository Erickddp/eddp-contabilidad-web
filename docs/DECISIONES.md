# Decisiones

Registro de decisiones de diseño y técnicas que no estaban especificadas en `PROMPT-MAESTRO.md`. Una línea por decisión, con el porqué.

- Hero: el h1 ocupa todo el ancho y subtítulo/CTAs/tarjeta van debajo en 7+5 columnas, porque la línea "Contabilidad que cuadra," no cabe en 7 columnas al tamaño del h1.
- Curvas de nivel del fondo: se dibujan con tinta-2 aclarado (rgba 37,58,112) porque tinta-2 puro casi no se ve sobre tinta.
- Chip "Cuadra": texto en claro sobre fondo rojo al 15% con ícono; `#D23A2C` como texto sobre tinta no pasa contraste AA.
- Total a pagar en color claro, no rojo, por contraste; el rojo queda en la doble raya.
- FAB de WhatsApp en verde oscuro sobrio (#1d4d3b) con ícono oficial, para no romper la paleta.
- Los links de la nav apuntan a anclas (/#servicios, etc.) que existirán en la fase 2; los del footer a landings de la fase 4 (404 hasta entonces).
- Playwright levanta `npm run build && npm run start`; las capturas van a `tests/capturas/` (ignorado en git).
- Lenis con `anchors: true` y apagado en táctil y reduced motion; se sincronizará con ScrollTrigger en la fase 2.

## Cambio de dirección V2 (la balanza)

- Hero y tarjeta del pago provisional de la fase 1 eliminados (HeroBackground, LedgerCard); las decisiones de arriba sobre ellos quedan sin efecto.
- La balanza "nivelada" del hero y la del CTA final usan la misma muestra de partículas que la desequilibrada, solo cambia la inclinación: así el primer scroll la equilibra sin que las partículas crucen de platillo.
- El equilibrio del hero ocurre en el primer 35% del alto del hero (el documento dice 0–40%) para que no se encime con el inicio de la disolución de la siguiente sección.
- Encuadre por "parada" (forma + capa: hero, centro, derecha, cta) en fracciones del área visible, para que la figura se adapte a cualquier proporción de pantalla.
- Todas las formas comparten una permutación fija: cualquier prefijo es una muestra al azar, así el recorte a la mitad por fps bajos usa `drawRange` sin perder piezas.
- Sin bloom ni `@react-three/postprocessing`: el brillo se simula en el fragment shader con caída radial y blending aditivo también en desktop; ahorra un pase completo de render y peso de bundle.
- h1 del hero en desktop a `clamp(2.75rem, 6vw, 6rem)` y sin corte de renglón en ≥640 px, para que "Tus impuestos," quepa en 6 columnas.
- Playwright usa su propio servidor de producción en el puerto 3100 para no chocar con `npm run dev`.
- Con el canvas fijo detrás de todo, las secciones de papel (Precios, Casos) pasan a ser tarjetas de papel sobre el fondo oscuro, no bandas opacas de ancho completo; si no, la nube de partículas nunca se vería.
- Orden de armado por partícula (`aOrder`): el progreso escalonado mezcla `aRandom.x` (25%) con el orden de la forma destino (75%), así el libro se arma de izquierda a derecha, las columnas crecen de abajo hacia arriba y la balanza desde la base.
- Camino del proceso (forma 4): en móvil se gira 90° y se pega al borde derecho (capa "borde") para no tapar los pasos; en desktop va a la derecha.
- La altura de la columna "con estrategia" sale de `con / sin` del primer escenario visible de `estrategia.ts`, con un mínimo visible de 0.28 unidades.
- Textos sobre partículas llevan un halo del color del fondo (`.legible`); tablas y tarjetas que se leen con detalle van sobre paneles opacos.
- `.vidrio` vive en `@layer components` para que las utilidades de Tailwind lo puedan ajustar.
- Precios del home: toggle mensual/anual con el 10% de descuento aplicado al precio mensual; el link "Ver precios completos" apunta a `/precios`, que se construye en la fase 3.
- Servicios: la tarjeta muestra "desde" tomado de `pricing.ts` (planes, extras o servicios únicos), para no duplicar precios.
- JSON-LD `FAQPage` se adelantó al home porque es una línea de código y ya existe `faq.ts`.
