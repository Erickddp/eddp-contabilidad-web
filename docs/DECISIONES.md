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
- Prueba de rendimiento móvil (`tests/fps.spec.ts`, 375 px, `isMobile`, 4,000 partículas, CPU 4× con `Emulation.setCPUThrottlingRate`), 2026-10-03:
  - GPU real de la PC de desarrollo (Intel UHD 620, `GPU=1 npx playwright test tests/fps.spec.ts`): **42 → 52 fps** (promedios de 2 s). El primer promedio incluye el armado de formas y la entrada; luego se estabiliza arriba de 50. No llegó a activar el recorte a la mitad.
  - SwiftShader (render por software, lo que usa Playwright por defecto): 17 → 29–33 fps; el recorte a la mitad se activa solo, como se diseñó. No es representativo de un teléfono con GPU.
  - Pendiente: confirmar en un Android de gama media real (Chrome remoto) antes de lanzar.
- Animaciones por sección en un solo componente (`HomeMotion`) dentro de `gsap.matchMedia`: con reduced motion no se registra ningún ScrollTrigger (sin pin, sin scrub, sin conteo) y todo queda visible.
- El conteo del comparativo usa el panel como disparador (top 85% → +55%) y no la sección, para que el usuario vea los números mientras corren; las columnas de partículas crecen en el mismo tramo de scroll.
- Dígitos que ruedan: cada posición (contada desde la derecha) es una columna 0–9; solo se mueven las que cambian. El ancho lo da un "0" invisible, así respeta las cifras tabulares de la fuente.
- Fallback sin WebGL o con reduced motion: SVG de puntos generado con las mismas formas (`npm run build:balanza` → `public/media/balanza.svg`, 139 KB, `loading="lazy"`), mostrado en el hero y en el CTA final.
- El footer es un tramo más (`data-forma="5"`, arranca en `top bottom`): la balanza del CTA se disuelve al salir y no queda encima del título.
- La barra de progreso de Servicios usa transform de GSAP; se quitó `scale-x-0` de Tailwind v4 porque usa la propiedad CSS `scale`, que se suma al transform y la dejaba en cero.
- Video de scroll: Playwright graba `tests/capturas/scroll-375.webm`; para revisarlo se extraen cuadros reproduciéndolo en Chromium (el ffmpeg de Playwright solo codifica).

## Ajustes pedidos por Rick (2026-10-04): menos texto, sin fondos blancos, móvil más compacto

- Fuera las tarjetas de papel (blancas) en Precios y Casos: ahora son oscuras (`tinta-2`), igual que Servicios. El plan destacado se marca con borde pluma.
- Detalle encapsulado en desplegables (`Desplegable`): entregables de cada servicio, lo que incluye cada plan después de los 3 primeros puntos, "qué se hizo" en casos, supuestos del comparativo, herramientas en desarrollo, extras y la trayectoria en "Sobre mí".
- Móvil: Servicios, Precios y Casos pasan a carrusel deslizable con snap, barra de avance y "2 / 4". Reemplaza el deck sticky de CAMBIO-V2 porque Rick pidió acortar; la tarjeta enfocada crece con una animación CSS ligada al scroll horizontal (con reduced motion o sin soporte se ve normal).
- Tipografía más chica (anula CAMBIO-V2, 10): h1 de 38 px en 375 (antes 44), h2 de 26 px (antes 32), cuerpo de 15 px en móvil y 17 px en desktop. Botones de 48 px en móvil (52 en desktop) y de 44 px dentro de tarjetas.
- "¿Te pasa esto?": cada frase ocupa ~38% de la pantalla en móvil (antes una por pantalla completa).
- "Sobre mí" en móvil: foto chica junto al título; texto corto visible y el resto en un desplegable.
- Resultado: el home en 375 px bajó de más de 20,000 px a ~9,750 px de alto.

## Rediseño con la identidad de erickddp.com (2026-10-05, pedido de Rick)

Rick pidió el mismo diseño que su web (repo `Erickddp/EDDP-MAIN`) aplicado a la balanza, con más efectos y enfoque móvil. Esto **anula la paleta y varias prohibiciones de 7.2, 7.3 y 7.6 del maestro**:
- Paleta: negro puro, grises zinc (#09090B, #18181B), acento cielo #38BDF8 con brillo; ámbar solo para el "peso de más" en las partículas. Tokens renombrados: `negro`, `grafito`, `grafito-2`, `blanco`, `cielo`. La doble raya pasa a cielo con brillo (ya no rojo).
- Tipografía: Plus Jakarta Sans (300–800) y JetBrains Mono para etiquetas; titular en extrabold.
- Se permiten (son firma de su web): etiqueta mono sobre cada título con efecto scramble, una parte del titular con brillo metálico animado, botones píldora con brillo y pulso, chevrones de scroll.
- Tarjetas: grafito casi opaco con borde de 1 px; "borde vivo" (luz cónica que gira) en la tarjeta activa, la enfocada del carrusel y al pasar el mouse; foco de luz que sigue al cursor e inclinación 3D en desktop.
- Fotos de Rick tomadas de su repo: `portada.png` en "Sobre mí" (con parallax y apertura con clip-path).
- Balanza: red de líneas entre partículas vecinas (como la "network" de su web), pulso de datos que recorre la forma, dispersión según la velocidad del scroll, onda expansiva al tocar o hacer clic, entrada en remolino, parallax de cámara, halo de brillo (solo desktop, sobre el 30% de las partículas).

Rendimiento (lo que se aprendió midiendo):
- Animar un `@property` en un pseudo-elemento con máscara (el borde cónico de su web) repinta en cada cuadro y le quitaba ~40% de fps al canvas en móvil. Se rehízo con un cuadrado cónico que gira con `transform` detrás del fondo de la tarjeta: lo resuelve el compositor.
- Sin `backdrop-filter` en tarjetas: sobre un canvas que cambia en cada cuadro, el desenfoque se recalcula siempre. Solo la nav en desktop lo usa.
- `.borde-vivo` y `.brillo-metal` solo animan con `data-vista` (en pantalla). En táctil el brillo del titular da 2 pasadas y se detiene. El pulso del botón es un anillo con transform/opacity. El grano de película solo en desktop.
- La posición de scroll se lee en un listener pasivo, no dentro del cuadro (evita layout forzado tras los cambios de estilo de GSAP).
- Formas y redes se precalculan en tiempo ocioso después de la entrada.
- `tests/fps.spec.ts` ahora mide en régimen estable (espera al canvas y deja pasar el arranque). Comparación justa, 10 lecturas cada una, móvil 375 px, CPU 4×, GPU real (Intel UHD 620): **versión anterior ≈ 49 fps, rediseño ≈ 44 fps** (rango 35–55). Desktop 1440 px: 54–60 fps. Si cae de 40, se reduce a la mitad de partículas y se apaga el halo.

## Dominio y metadatos (2026-10-05)

- El sitio se publica en `clientes.erickddp.com` (antes estaba planeado `contabilidad.erickddp.com`). La URL vive en `src/lib/seo.ts` con respaldo a esa dirección; en Vercel se fija `NEXT_PUBLIC_SITE_URL=https://clientes.erickddp.com`.
- Metadatos con el posicionamiento V2 (todo México, sin poner la frontera en el título): title con plantilla, description, keywords, canonical, Open Graph `es_MX`, Twitter `summary_large_image`, robots y googleBot.
- Imagen para compartir generada con `opengraph-image.tsx` (negro, cielo y la doble raya) y JSON-LD `AccountingService` + `ProfessionalService` en el layout, sin calle.
- Íconos propios (`icon.png` 512 y `apple-icon.png` 180: logo sobre negro con borde cielo); se quitó el favicon por defecto de Next.
- `sitemap.xml` solo lista `/` por ahora; agregar `/precios` y las landings cuando existan.
