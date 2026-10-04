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
