# PROMPT MAESTRO — Sitio de ventas "EDDP Servicios Contables"

> **Para Claude Code.** Este archivo es la única fuente de verdad del proyecto.
> - Repo: `Erickddp/eddp-contabilidad-web` (privado)
> - Dominio destino: `contabilidad.erickddp.com`
> - `web.erickddp.com` (el sitio viejo) redirige 301 aquí al final.
> - Dueño: Erick Domínguez Del Prado ("Rick"), Contador Público.

---

## 0. CÓMO TRABAJAR CON ESTE ARCHIVO (léelo completo antes de tocar código)

1. **Trabaja por fases (sección 14).** Ejecuta SOLO la fase que se te pida. Al terminar cada fase haz commit con mensaje convencional (`feat:`, `fix:`, `chore:`). Luego haz push. Si estás en una sesión en la nube, abre un Pull Request con un resumen de lo hecho y de lo que falta.
2. **No inventes datos del dueño.** Esto incluye cifras, clientes, testimonios, cédula, dirección y precios distintos a los de aquí. Si falta un dato, usa el valor de `src/content/site.config.ts` marcado con `// TODO(Rick)` y sigue avanzando. No te detengas a preguntar.
3. **Privacidad de clientes.** Nunca escribas nombres reales de clientes, RFC, montos reales ni nada que identifique a alguien. Los casos de la sección 4 ya vienen anonimizados; respétalos así.
4. **Decisiones.** Si algo no está especificado, decide como diseñador senior. Anota la decisión en `docs/DECISIONES.md` con una línea de por qué.
5. **Idioma.** Todo el sitio va en español de México. Tutea al lector. El tono es profesional, claro y directo. Nada de relleno corporativo ("soluciones integrales de vanguardia").
6. **Autocrítica visual.** Después de cada fase visual, levanta el sitio, toma capturas con Playwright a 375 px, 768 px y 1440 px, y revísalas contra la sección 7. Corrige antes de cerrar la fase.
7. **Referencias de estilo.** El dueño vio sitios tipo "motionsites" (hero con video, paneles de vidrio, animación con scroll) y le gustan. Toma la *energía*, no el diseño. **Prohibido** usar sus videos, URLs de CloudFront, fuentes con licencia dudosa o copiar sus layouts. Este sitio tiene identidad propia (sección 7).

---

## 1. EL NEGOCIO

- **Marca pública:** EDDP Servicios Contables. El responsable es el C.P. Erick Domínguez Del Prado.
- **Qué vende:** contabilidad mensual, impuestos, estrategia fiscal, estados financieros, nómina, constitución de SAS, regularización ante el SAT y atención de requerimientos.
- **Diferenciador real:** contador público con experiencia corporativa que además construye sus propias herramientas (estudia la Licenciatura en Inteligencia Artificial). Lo repetitivo lo hace el sistema y el criterio lo pone él. Eso permite precios justos y respuesta rápida.
- **Base:** Cuajimalpa de Morelos, CDMX. No hay dirección pública. Trabaja 100% en línea y da citas presenciales en el poniente de la CDMX, solo con cita previa.
- **Mercado fuerte:** clientes de la **región fronteriza norte** (Ciudad Juárez y demás municipios). Domina el estímulo fiscal de IVA al 8% y ISR.
- **Atención:** WhatsApp, llamada, videollamada o cita presencial. Horario de lunes a viernes de 9:00 a 19:00 (hora CDMX). Responde en menos de 24 horas hábiles.
- **Primera revisión gratis** (20–30 min).

### Credenciales y experiencia (usar tal cual)

- Contador Público por CESCIJUC (2019–2022). Cédula profesional: `TODO(Rick)`. En sus sitios aparecen dos números distintos (13182616 y 13758780). **No publiques ninguno hasta que Rick confirme cuál es el correcto.** Deja el campo en config y muestra el bloque solo si tiene valor.
- Licenciatura en Inteligencia Artificial, UTEL (en curso, 2026).
- Más de 6 años de experiencia activa.
- **Experiencia corporativa:**
  - Contabilidad de un grupo de medios: 15 radiodifusoras y su controladora que cotiza en bolsa.
  - Migración contable a SAP Business One.
  - Conciliación de saldos multiempresa.
  - Atención de un requerimiento del SAT de un ejercicio anterior.
  - Formatos regulatorios.
  - Antes, en un grupo inmobiliario-comercial: 24 inmobiliarias y una comercializadora.
  - **No nombres a las empresas**, descríbelas así.
- Domina RESICO PF y PM, actividad empresarial y profesional (612), arrendamiento, plataformas digitales, ISR, IVA, DIOT, CFDI 4.0, contabilidad electrónica, nómina/IMSS/SUA/INFONAVIT y estímulos de región fronteriza.
- **Herramientas propias** (sección "Tecnología propia"):
  - **Analizador CFDI**: análisis fiscal masivo de XML. https://axml.erickddp.com · repo `Erickddp/analizador-cfdi-python`
  - **CFDI SQL Lab**: consultas tipo SQL y dashboards sobre CFDI. https://sql.erickddp.com · repo `Erickddp/cfdi-sql-lab`
  - **EVOAPP**: herramientas contables en un flujo guiado. https://app.evorix.com.mx
  - **myfiscal**: https://myfiscal.erickddp.com
  - **ContHabil** (próximamente): contabilidad RESICO automatizada.
  - **Nómina EDDP** (en desarrollo): motor de nómina propio.
  - **Descarga masiva de XML del SAT** (en desarrollo).
  - **Facturador propio CFDI 4.0** (en desarrollo, integración con PAC).
  - Los que están "en desarrollo" se muestran con su estado y sin enlace.
- Portafolio completo: https://proyectos.erickddp.com · Personal: https://erickddp.com
- Redes: LinkedIn https://www.linkedin.com/in/erick-dominguez-4296411a9/ · GitHub https://github.com/Erickddp · Facebook "EDDP Servicios" https://www.facebook.com/profile.php?id=61584844233250
- **Contacto:**
  - WhatsApp: `525534806184` (formato wa.me)
  - Correo: `cperickd@gmail.com` (`TODO(Rick)`: cambiar a `contacto@erickddp.com` cuando exista)
- **Activos existentes** (son de Rick; descárgalos a `/public`):
  - Logo: https://erickddp.com/images/logo.png → `/public/brand/logo.png`
  - Foto: https://web.erickddp.com/images/perfil.png → `/public/images/erick.png`

---

## 2. OBJETIVO DEL SITIO Y CONVERSIONES

Es un sitio **para vender**, no un portafolio. Cada sección termina empujando a una acción.

1. **Conversión principal:** clic a WhatsApp con mensaje prellenado según la sección o el plan.
2. **Secundaria:** agendar una llamada, videollamada o cita presencial (link de agenda).
3. **Terciaria:** formulario corto (respaldo para quien no usa WhatsApp).

Todas las conversiones se miden como eventos (sección 12).

---

## 3. PÚBLICO (segmentos que el copy debe tocar)

1. **Personas físicas en RESICO en la frontera:** oficios, servicios, comercio, contratistas eléctricos y de energía renovable. Quieren pagar poco, cumplir y aplicar el IVA al 8% sin broncas.
2. **Profesionales de la salud y servicios profesionales** que se acercan al tope de RESICO y no saben qué sigue: cambio a actividad empresarial o crear una SAS.
3. **Personas con ingresos sin registrar** que necesitan regularizarse para un crédito hipotecario, bancario o Infonavit. Incluye trabajadores transfronterizos.
4. **Emprendedores que se van a formalizar:** alta en RFC, elección de régimen, constitución de SAS.
5. **PyMEs con nómina pequeña** (2 a 15 trabajadores): IMSS, SUA, INFONAVIT, recibos timbrados.
6. **Vendedores en plataformas digitales:** Uber, DiDi, Airbnb, Mercado Libre, creadores de contenido.
7. **Negocios del poniente de la CDMX** (Cuajimalpa, Santa Fe, Álvaro Obregón, Huixquilucan) que prefieren verse en persona.

---

## 4. CASOS REALES (ya anonimizados — úsalos así, sin agregar datos)

Muéstralos como "Casos", no como testimonios. Usa formato de problema, qué se hizo y resultado. **No inventes cifras de resultado.**

1. **Contratista de energía renovable en Ciudad Juárez (RESICO).**
   - Problema: facturaba al 16% y no tenía el estímulo fronterizo.
   - Qué se hizo: alta en el padrón de beneficiarios del estímulo de la región fronteriza norte; se le dio seguimiento al retraso del portal del SAT hasta la aprobación; desglose mensual con IVA al 8%; contrato de servicios formal.
   - Resultado: factura al 8% y cumple cada mes.

2. **Profesional de la salud cerca del tope de RESICO.**
   - Problema: sus ingresos iban a rebasar el límite del régimen.
   - Qué se hizo: modelado de escenarios (seguir como persona física con actividad empresarial o constituir sociedad); cambio de régimen; constitución de una SAS para su práctica; alta patronal ante el IMSS para su primera nómina.
   - Resultado: estructura lista para crecer sin sorpresas.

3. **Trabajador transfronterizo del sector reciclaje.**
   - Problema: su constancia solo mostraba sueldos y le negaron un crédito hipotecario.
   - Qué se hizo: recuperación de e.firma y contraseña; diagnóstico de obligaciones; plan de regularización de su actividad empresarial.
   - Resultado: en proceso de regularización para volver a solicitar el crédito.
   - Este caso es real y está en curso; descríbelo como "en proceso".

4. **Devolución de saldo a favor.**
   - Problema: el contribuyente tenía saldo a favor sin reclamar.
   - Qué se hizo: integración del expediente y solicitud de devolución ante el SAT (FED).

5. **Grupo corporativo de medios** (experiencia en empleo, no cliente del despacho; preséntalo en "Sobre mí").
   - 15 radiodifusoras más la controladora.
   - Migración a SAP con validación de saldos iniciales cuenta por cuenta.
   - Atención de un requerimiento del SAT de un ejercicio anterior.

> **Testimonios:** el arreglo `testimonials` en config viene **vacío**. Si está vacío, la sección no se renderiza. Rick agregará solo testimonios reales con permiso escrito del cliente. **No generes testimonios de ejemplo.**

---

## 5. STACK TÉCNICO

- **Next.js** (última estable, App Router) + **TypeScript** estricto + **Tailwind CSS v4** (`@tailwindcss/postcss`, tokens en `@theme`).
- **GSAP** + **ScrollTrigger** + **SplitText**, usando el hook `useGSAP` de `@gsap/react`. GSAP y todos sus plugins son gratuitos.
- **Lenis** para scroll suave. Desactívalo con `prefers-reduced-motion` y deja el scroll nativo en táctil.
- **Motion** (`motion/react`, antes framer-motion) para interacciones de UI: menú, cotizador, toggles y acordeones.
- **lucide-react** para íconos.
- **Fuentes** con `next/font/google`: **Bricolage Grotesque** (display) e **IBM Plex Sans** (texto).
- **Mapa:** datos de Natural Earth (dominio público) procesados con `d3-geo` y `topojson-client` en un script de build. El resultado es un SVG estático; nada pesado en runtime.
- **Pruebas visuales:** Playwright con capturas a 375, 768 y 1440 px.
- **Calidad:** ESLint y Prettier.
- **Deploy:** Vercel (preview por cada PR y producción en `main`).
- **Sin backend propio.** El formulario manda a un webhook de Make (variable de entorno). Rick ya usa Make → Google Sheets/Telegram.

### Variables de entorno (`.env.example`)

```
NEXT_PUBLIC_SITE_URL=https://contabilidad.erickddp.com
NEXT_PUBLIC_GA_ID=            # GA4, opcional
NEXT_PUBLIC_LEAD_WEBHOOK_URL= # webhook de Make; si está vacío se oculta el formulario
NEXT_PUBLIC_BOOKING_URL=      # Cal.com o página de citas de Google Calendar; si está vacío, "Agendar" abre WhatsApp
```

---

## 6. ESTRUCTURA DEL REPO

```
/
├─ CLAUDE.md                  # resumen del proyecto, comandos y dónde se edita cada cosa
├─ docs/
│  ├─ PROMPT-MAESTRO.md       # este archivo
│  ├─ DESIGN.md               # plan de diseño (fase 1)
│  └─ DECISIONES.md
├─ public/
│  ├─ brand/logo.png
│  ├─ images/erick.png
│  ├─ media/                  # hero.mp4, hero.webm y hero-poster.webp cuando Rick los genere
│  └─ map/                    # SVG generado del mapa
├─ scripts/build-map.ts
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx
│  │  ├─ page.tsx                     # home
│  │  ├─ frontera/page.tsx            # landing IVA 8% (para anuncios)
│  │  ├─ regularizacion/page.tsx      # landing
│  │  ├─ constituir-sas/page.tsx      # landing
│  │  ├─ precios/page.tsx             # precios completos + cotizador
│  │  ├─ aviso-de-privacidad/page.tsx
│  │  ├─ terminos/page.tsx
│  │  ├─ gracias/page.tsx             # después del formulario (conversión)
│  │  ├─ sitemap.ts
│  │  ├─ robots.ts
│  │  └─ opengraph-image.tsx
│  ├─ components/
│  │  ├─ layout/ (Nav, MobileMenu, Footer, MobileActionBar, WhatsAppFab)
│  │  ├─ hero/ (Hero, HeroBackground, LedgerCard, DoubleRule)
│  │  ├─ sections/ (Dolores, Servicios, Frontera, Casos, Proceso, Precios, Tecnologia, SobreMi, Preguntas, CtaFinal)
│  │  ├─ pricing/ (PlanCard, BillingToggle, Cotizador, ServiciosUnicos)
│  │  └─ ui/ (Button, Chip, Accordion, Field)
│  ├─ content/
│  │  ├─ site.config.ts       # TODOS los datos editables (Anexo A)
│  │  ├─ pricing.ts           # planes, extras, servicios únicos y reglas del cotizador
│  │  ├─ faq.ts
│  │  └─ cities.ts            # ciudades fronterizas con coordenadas
│  ├─ lib/ (whatsapp.ts, analytics.ts, motion.ts, format.ts)
│  └─ styles/globals.css
└─ tests/visual.spec.ts
```

**Regla de oro:** Rick debe poder cambiar precios, teléfono, textos clave y ciudades **sin tocar componentes**. Solo edita `src/content/*`. Explícalo en `CLAUDE.md`.

---

## 7. SISTEMA DE DISEÑO — concepto "Doble raya"

### 7.1 Idea

Cuando un contador termina una cuenta y todo cuadra, traza **dos rayas debajo del total**. Ese es el gesto de la marca: *esto ya está cerrado y bien*.

Todo el sitio gira alrededor de ese gesto. La doble raya:
- se dibuja bajo el total de la tarjeta del hero;
- es la línea que viaja de Cuajimalpa a la frontera en el mapa;
- cierra el sitio en el footer.

La estética toma materiales del oficio: papel columnar verde pálido, tinta azul de pluma y el rojo de cuadre. Se traducen a una interfaz moderna, oscura y en movimiento. **Es lo único "atrevido" del sitio; todo lo demás va sobrio y disciplinado.**

### 7.2 Paleta (con roles estrictos)

| Token | Hex | Rol |
|---|---|---|
| `--tinta` | `#0B1733` | Fondo base oscuro (azul tinta de noche). Hero, frontera, footer. |
| `--tinta-2` | `#13224A` | Superficies elevadas sobre tinta. |
| `--papel` | `#EEF3EA` | Fondo de secciones claras (papel columnar). Precios, preguntas. |
| `--renglon` | `#C9D8C3` | Líneas de renglón y columnas sobre papel. Bordes finos. |
| `--pluma` | `#3157E0` | Interacción: links, foco, toggles, estados activos. |
| `--cuadre` | `#D23A2C` | **Solo** la doble raya, los totales y el estado "Cuadra". Nunca botones ni decoración. |
| `--ambar` | `#F2A541` | Frontera/atardecer: puntos de ciudades en el mapa y un brillo sutil del fondo del hero. |
| Texto sobre tinta | `#F3F5F1` | 100% para títulos, 72% de opacidad para texto secundario. |
| Texto sobre papel | `#0B1733` | Igual: 100% y 70%. |

- El botón principal es papel sobre tinta (`#EEF3EA` con texto `#0B1733`).
- El botón secundario es borde de 1 px con texto claro.
- El botón de WhatsApp **no** lleva verde de WhatsApp en el hero (rompe la paleta). Solo el FAB flotante y la barra móvil usan el ícono oficial, en tono sobrio.

### 7.3 Tipografía

- **Display:** Bricolage Grotesque, pesos 500 y 600, con tracking negativo en tamaños grandes (−0.02em a −0.035em). Escala de h1 con `clamp(2.5rem, 6.2vw, 5.75rem)` e interlineado 0.95.
- **Texto:** IBM Plex Sans, pesos 400 y 500. Cuerpo de 17 a 18 px en desktop y 16 px en móvil, interlineado 1.55, línea máxima de 68 caracteres.
- **Cifras:** siempre `font-variant-numeric: tabular-nums lining-nums`. Las columnas de dinero se alinean como en un libro contable y los contadores animados no "brincan". **No uses monoespaciada** para datos.
- Escala modular de 1.25 para h2 a h6. Documenta la escala en `docs/DESIGN.md`.

### 7.4 Forma, radios y profundidad (jerarquía, no un radio para todo)

- **Elementos de libro** (tablas, filas de la tarjeta, celdas de precio): radio de 4 px, bordes de renglón de 1 px y sin sombra.
- **Paneles de vidrio** sobre el hero y el mapa: radio de 22 px, `backdrop-filter: blur(18px)`, fondo `rgba(11,23,51,0.45)` y borde `rgba(243,245,241,0.08)`.
- **Botones:** radio de 12 px, alto de 52 px en desktop y 48 px en móvil, padding horizontal de 24 a 28 px. El texto **nunca** toca el borde.
- Solo el FAB de WhatsApp es circular.
- Las sombras se usan únicamente en el panel flotante del cotizador.

### 7.5 Retícula

- Contenedor: `max-width: 1320px`, padding horizontal de 20 px en móvil, 32 px en tablet y 64 px en desktop.
- En secciones de papel, dibuja con CSS (`background-image` de gradientes lineales) **líneas de columnas muy tenues**, como papel columnar: 12 columnas, `--renglon` al 35%. La retícula de diseño coincide con esas columnas. Así la textura es estructura, no decoración.
- Alineación general a la izquierda. Solo se centra el CTA final.

### 7.6 Prohibido (son las señales de "página hecha por IA")

- Pintar de otro color o poner en cursiva **una sola palabra** del titular.
- Etiquetas en MAYÚSCULAS con tracking abierto encima de cada título (*eyebrows*).
- Cadenas con puntos medios ("A · B · C") como adorno.
- Flechas "→" pegadas al texto de links y botones.
- Rejillas de tarjetas idénticas con el mismo radio y la misma sombra gris.
- Gradientes morados o azules como relleno decorativo.
- Fondo crema con acento terracota.
- Numeración 01/02/03 si el contenido no es una secuencia. Solo "Cómo trabajamos" lleva números, porque sí es un proceso.
- Fade-up genérico en **cada** sección. El movimiento está coreografiado en la sección 8; fuera de eso, las cosas simplemente están.
- Cursor personalizado y botones "magnéticos".
- Íconos decorativos en cada párrafo.

---

## 8. MOVIMIENTO (coreografía exacta)

Easing global: `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out). Duraciones de 600 a 900 ms. Todo debe tener versión con `prefers-reduced-motion: reduce`: contenido visible de inmediato, sin contadores, sin pin y sin scroll suave.

### 8.1 Entrada del hero (el único momento orquestado al cargar)

| ms | Elemento | Animación |
|---|---|---|
| 0 | Nav | opacidad 0→1, y −12→0 en 600 ms |
| 150 | Fondo (video o canvas) | opacidad 0→1 en 1200 ms |
| 300 / 420 / 540 | Las 3 líneas del h1 | Revelado con máscara: cada línea sube de `yPercent: 110` a 0 dentro de un contenedor con `overflow: hidden` (SplitText por líneas) |
| 750 | Subtítulo | opacidad y y: 16→0 |
| 900 | CTAs | opacidad y y: 16→0 |
| 1000 | Tarjeta "libro" | escala 0.96→1 y opacidad |
| 1200–2000 | Cifras de la tarjeta | Conteo de 0 al valor (tabular-nums), escalonado 120 ms por fila |
| 2100 | **Doble raya roja** bajo el total | `stroke-dashoffset` de 100% a 0, de izquierda a derecha, 600 ms; la segunda raya arranca 120 ms después |
| 2700 | Chip "Cuadra ✓ Presentada el 14 de octubre" | opacidad y escala 0.9→1 |

### 8.2 Scroll

1. **"¿Te pasa esto?"** (dolores)
   - Cada frase arranca al 18% de opacidad.
   - Sube al 100% con `scrub` al cruzar el centro del viewport.
   - Sin pin.

2. **Servicios** (scroll horizontal)
   - Sección **pineada** en desktop (≥1024 px).
   - El track horizontal se traslada con `scrub: 1`.
   - Debajo hay una barra de progreso fina en `--pluma`. Los servicios no son secuencia: **no los numeres**.
   - En móvil y tablet no hay pin: carrusel horizontal nativo con `scroll-snap`, mostrando un pedazo de la tarjeta siguiente.

3. **Frontera** (la pieza estrella)
   - Sección pineada unos 250vh en desktop.
   - **Fondo:** mapa SVG del norte de México, con estados en líneas muy finas y el contorno en `--renglon` al 20%.
   - **Avance 0→35%:** se traza una línea curva (doble raya en `--cuadre`) desde un punto en Cuajimalpa hasta Ciudad Juárez.
   - **Avance 35→80%:** la doble raya recorre la franja fronteriza de Tijuana a Matamoros. Cada ciudad "enciende" su punto `--ambar` (escala 0→1 y un halo) cuando la línea pasa por ella.
   - **Panel de vidrio a la derecha:** cambia en 3 pasos según el avance.
     1. "Qué es el estímulo"
     2. "Qué necesitas para aplicarlo"
     3. "Cómo trabajamos a distancia"
   - **Móvil:** mapa sticky arriba (45vh) y los 3 pasos abajo como bloques normales. El trazo se dispara con el scroll de esos bloques.

4. **Precios**
   - Toggle mensual/anual: los números cambian con una animación de rodillo **solo en los dígitos que cambian** (Motion).
   - El layout de las tarjetas se anima con `layout`.

5. **Cotizador**
   - Pasos con `AnimatePresence`.
   - El total final hace conteo y termina con la doble raya bajo el monto (segundo uso del gesto).

6. **Footer**
   - Al entrar al viewport, una doble raya de ancho completo se dibuja una sola vez (tercer y último uso).

### 8.3 Microinteracciones (solo como respuesta a una acción)

- **Menú móvil:** panel de vidrio que baja con escala 0.97→1. Los links aparecen escalonados 50 ms. El ícono hamburguesa se cruza con la X rotando; **nunca** se desmonta. El scroll del body se bloquea mientras está abierto.
- **Acordeón de preguntas:** altura animada y el ícono `+` rota 45°.
- **Botones:** hover con cambio de fondo en 150 ms. Sin escalas raras.

### 8.4 Fondo del hero

- **Modo A (default, sin assets):** canvas WebGL o 2D con **curvas de nivel topográficas** (ruido simplex) en `--tinta-2` sobre `--tinta`, moviéndose muy lento. Lleva un brillo `--ambar` muy tenue en el horizonte inferior derecho (atardecer en el desierto). Máximo 30 fps; se pausa con `IntersectionObserver` cuando no está visible y con `document.hidden`.
- **Modo B (cuando exista `/public/media/hero.mp4`):** video en loop, `muted autoplay playsInline`, con `preload="none"`, poster `hero-poster.webp`. Se carga después de `requestIdleCallback`. Encima va un degradado inferior de `--tinta` al 0% → 85% para legibilidad.
  - En móvil con `navigator.connection.saveData` o con reduced motion: solo poster.
  - El modo se elige con `heroMedia` en config.
- **Botón de pausa visible** (accesibilidad WCAG 2.2.2) en la esquina inferior del hero.

---

## 9. CONTENIDO COMPLETO (copy final, úsalo tal cual; puedes pulir gramática, no cambiar promesas)

### 9.1 Navegación

- **Logo + "EDDP Servicios Contables"** (en móvil solo el logo y "EDDP").
- **Links:** Servicios · Frontera · Precios · Casos · Sobre mí · Preguntas
- **CTA:** "Escríbeme"
- En desktop, los links van en una píldora de vidrio y el CTA aparte.
- En móvil va un botón hamburguesa de 44×44.

### 9.2 Hero

- **H1** (3 líneas en desktop):
  > Contabilidad que cuadra,
  > de la frontera
  > a la Ciudad de México.
- **Subtítulo:**
  > Soy Erick Domínguez, Contador Público. Llevo tus impuestos, tu contabilidad y tu nómina en línea, con el estímulo de región fronteriza aplicado como debe ser y respuesta directa por WhatsApp.
- **CTA primario:** "Escríbeme por WhatsApp" (mensaje `general`).
- **CTA secundario:** "Agenda una llamada de 20 min" (booking).
- **Microcopy bajo los botones:** "Primera revisión gratis. Respondo en menos de 24 horas hábiles."

**Tarjeta "libro"** (panel de vidrio a la derecha; abajo en móvil):

| Concepto | Monto |
|---|---|
| Ingresos cobrados | $78,500.00 |
| IVA trasladado (8%) | $6,280.00 |
| IVA acreditable | −$2,118.40 |
| IVA a pagar | $4,161.60 |
| ISR RESICO (1.10%) | $863.50 |
| **Total a pagar** | **$5,025.10** |

- Título de la tarjeta: "Pago provisional de septiembre".
- Bajo el total va la doble raya roja.
- Chip: "Cuadra ✓ Presentada el 14 de octubre".
- Nota mínima al pie de la tarjeta: "Ejemplo ilustrativo".

### 9.3 Franja de confianza (justo bajo el hero, sobre tinta)

Fila horizontal sin tarjetas, solo texto con separadores de línea vertical fina:
- "Contador Público titulado" (+ cédula si existe en config)
- "Más de 6 años de experiencia"
- "Más de 40 empresas llevadas en corporativo" (`TODO(Rick)`: confirmar cifra)
- "RESICO · Actividad empresarial · Personas morales"
  - **Excepción permitida:** aquí los puntos medios separan regímenes reales, no son adorno. Si se ve como "tell", usa comas.

### 9.4 "¿Te pasa esto?" (dolores, scroll-highlight)

- **Título:** "Si te identificas con alguna, hablemos."
- **Frases** (una por línea, tamaño grande):
  1. Te negaron un crédito porque tu constancia no refleja lo que realmente ganas.
  2. Facturas al 16% en la frontera cuando podrías hacerlo al 8%.
  3. Llevas meses sin declarar y el buzón tributario ya te está buscando.
  4. Estás cerca del tope de RESICO y nadie te ha dicho qué sigue.
  5. Tu contador solo aparece cuando hay que pagar.
- **CTA al final:** "Cuéntame tu caso" (WhatsApp `general`).

### 9.5 Servicios (scroll horizontal)

- **Título:** "Lo que hago por ti"
- **Intro:** "Todo en línea. Tú me mandas tus documentos por WhatsApp o Drive; yo presento, te explico y te aviso antes de que algo venza."

Cada panel lleva: nombre, para quién es, 3 o 4 entregables concretos, "desde $" (del config) y un botón "Pedir información" con un mensaje de WhatsApp específico.

1. **Contabilidad mensual**
   - Para quién: personas físicas y morales que quieren cumplir sin pensar en el SAT.
   - Entregables: declaraciones mensuales de ISR e IVA, contabilidad electrónica, conciliación bancaria y reporte mensual de tus números.

2. **Región fronteriza norte**
   - Para quién: negocios en municipios fronterizos.
   - Entregables: alta y mantenimiento en el padrón del estímulo, validación del requisito de ingresos en la región, facturación correcta al 8% y cálculo del beneficio de ISR cuando aplica.

3. **Regularización fiscal**
   - Para quién: quien tiene atrasos, errores o nunca declaró.
   - Entregables: diagnóstico completo, plan por prioridades, declaraciones atrasadas y complementarias, y opinión de cumplimiento positiva como meta.

4. **Estrategia fiscal**
   - Para quién: quien está por crecer, cambiar de régimen o abrir una empresa.
   - Entregables: comparativo de regímenes con números, escenarios de persona física contra SAS y un plan legal para pagar lo justo.

5. **Estados financieros**
   - Para quién: quien necesita un crédito, una licitación o tomar decisiones.
   - Entregables: balance general, estado de resultados, relaciones analíticas y explicación en lenguaje claro.

6. **Nómina e IMSS**
   - Para quién: negocios con 1 a 15 trabajadores.
   - Entregables: recibos timbrados, altas y bajas en IMSS, SUA, INFONAVIT, impuesto sobre nómina y retenciones.

7. **Constitución de SAS**
   - Para quién: emprendedores que quieren formalizarse.
   - Entregables: elección de régimen, constitución en línea, RFC, e.firma de la sociedad y configuración contable inicial.

8. **Declaración anual**
   - Para quién: asalariados con deducciones, personas con actividad y empresas.
   - Entregables: cálculo con deducciones personales bien aplicadas y presentación a tiempo.

9. **Requerimientos y cartas invitación del SAT**
   - Para quién: quien recibió un aviso y no sabe qué contestar.
   - Entregables: análisis, integración de pruebas, respuesta en tiempo y seguimiento.

10. **Devoluciones de saldo a favor**
    - Entregables: revisión, expediente y solicitud de devolución.

### 9.6 Frontera (sección estrella, mapa)

- **Título:** "Atiendo la frontera norte desde la Ciudad de México."
- **Bajada:** "Varios de mis clientes facturan en la franja fronteriza. No necesitas un contador en tu ciudad; necesitas uno que conozca el estímulo y te conteste."

**Paso 1 — Qué es**
> El estímulo de la región fronteriza norte reduce la tasa de IVA del 16% al 8% en tus ventas y servicios dentro de la región. Además otorga un crédito de ISR equivalente a una tercera parte del impuesto, si cumples los requisitos. Está vigente hasta el `{borderDecree.validUntil}` (prórroga publicada en el DOF el `{borderDecree.lastExtension}`).

**Paso 2 — Qué necesitas**
- Domicilio fiscal o establecimiento en un municipio de la región.
- Que al menos el 90% de tus ingresos se obtengan en la región.
- Estar inscrito en el padrón de beneficiarios del estímulo y mantener tus avisos al día.
- Facturar con la tasa correcta. El beneficio de ISR tiene requisitos adicionales y **no aplica en RESICO**; lo revisamos en tu diagnóstico.

**Paso 3 — Cómo trabajamos a distancia**
> Me mandas tu constancia y tus facturas por WhatsApp o Drive. Reviso si cumples, presento tus avisos y tus declaraciones, y te mando cada mes cuánto pagaste y por qué. Si un día necesitas hablar, agendamos videollamada.

**Mini-calculadora** (debajo del mapa, en papel):
- Input: "¿Cuánto vendes al mes antes de IVA?"
- Output: "Al 16% tu cliente paga $X. Al 8% paga $Y. Eres $Z más competitivo en cada venta."
- Disclaimer: "Estimación informativa. La aplicación del estímulo depende de que cumplas los requisitos."
- **CTA:** "Revisar si aplico al 8%" (WhatsApp `frontera`).

**Ciudades en el mapa:** desde `cities.ts` (Anexo B).

### 9.7 Cómo trabajamos (proceso; aquí SÍ van números porque es secuencia)

1. **Diagnóstico gratis.** 20–30 minutos por WhatsApp o llamada. Me cuentas tu situación y te digo qué urge.
2. **Propuesta y contrato.** Precio fijo por escrito, alcance claro y sin letras chiquitas.
3. **Alta.** Me compartes accesos (contraseña del SAT y, si aplica, e.firma bajo resguardo) y tus documentos.
4. **Operación mensual.** Presento, te mando el acuse y un resumen de tus números cada mes.
5. **Cierre anual.** Declaración anual y revisión de estrategia para el siguiente año.

### 9.8 Precios
Ver sección 10.

### 9.9 Casos
Usa la sección 4. Diseño tipo ficha de expediente sobre papel: problema → qué se hizo → resultado, con bordes de renglón. **No** uses tarjetas idénticas: alterna ancho completo y dos columnas.

### 9.10 Tecnología propia

- **Título:** "Herramientas que construí para trabajar más rápido (y cobrarte justo)."
- **Texto:**
  > Estudio Inteligencia Artificial y aplico lo que aprendo a la contabilidad. Analizo cientos de facturas en segundos, concilio con sistemas propios y automatizo recordatorios. Lo repetitivo lo hace la máquina; el criterio fiscal lo pongo yo.
- **Lista de herramientas:** de la sección 1, con estado (Disponible / En desarrollo) y link cuando exista.
- **Link:** "Ver todos mis proyectos" → proyectos.erickddp.com

### 9.11 Sobre mí

- Foto: `/public/images/erick.png`, con tratamiento duotono tinta/papel sutil y sin bordes redondeados exagerados.
- **Texto:**
  > Soy Erick Domínguez Del Prado, Contador Público. He llevado la contabilidad de grupos corporativos con más de quince empresas, migraciones a SAP y respuestas a requerimientos del SAT. Hoy pongo esa experiencia al servicio de personas y negocios que necesitan un contador que sí conteste. Trabajo desde el poniente de la Ciudad de México y atiendo en línea a clientes de todo el país, sobre todo de la frontera norte.
- **Datos en filas tipo libro:**
  - Formación: Contaduría Pública (CESCIJUC) y Licenciatura en IA (UTEL, en curso).
  - Cédula: solo si existe en config.
  - Experiencia: 15 radiodifusoras y controladora; 24 inmobiliarias y comercializadora.
  - Herramientas: SAP Business One, Aspel COI, CFDI 4.0, Python, SQL, Power BI, Make y n8n.

### 9.12 Preguntas frecuentes (`faq.ts`; acordeón y JSON-LD `FAQPage`)

1. **¿Trabajas con clientes de otras ciudades?**
   Sí. La mayoría de mi trabajo es en línea. Atiendo clientes de la frontera norte y de todo el país por WhatsApp, llamada y videollamada.

2. **¿Atiendes en persona?**
   Sí, en el poniente de la Ciudad de México (Cuajimalpa, Santa Fe, Álvaro Obregón, Huixquilucan), siempre con cita previa.

3. **¿Cómo te mando mis documentos?**
   Por WhatsApp o una carpeta compartida de Google Drive que te creo al darte de alta.

4. **Tengo años sin declarar, ¿qué pasa?**
   Primero hacemos un diagnóstico para saber qué tienes pendiente. Luego armamos un plan por prioridades para ponerte al corriente con el menor costo posible en multas y recargos.

5. **¿Me conviene RESICO?**
   Depende de tus ingresos, tus gastos y tu actividad. En el diagnóstico gratis te lo digo con números.

6. **¿Qué necesito para facturar al 8% en la frontera?**
   Domicilio o establecimiento en la región, al menos 90% de ingresos en la región y estar inscrito en el padrón del estímulo. Reviso tu caso sin costo.

7. **¿Firmamos contrato?**
   Sí. Contrato de prestación de servicios con precio y alcance por escrito.

8. **¿Cómo pago?**
   Transferencia o tarjeta. Planes mensuales por adelantado; si pagas el año completo tienes descuento.

9. **¿Qué pasa con mi contraseña y mi e.firma?**
   Se guardan bajo resguardo, solo se usan para tus trámites y puedes cambiarlas cuando quieras.

10. **¿Haces la facturación por mí?**
    Sí, como servicio adicional dentro de tu plan.

### 9.13 CTA final (centrado, sobre tinta)

- **Título:** "Tu primera revisión es gratis."
- **Texto:** "Cuéntame tu situación y en 20 minutos sabes qué urge, qué cuesta y qué puedes ahorrar."
- **Botones:** "Escríbeme por WhatsApp" · "Agendar llamada" · "Prefiero un formulario" (abre el formulario si existe el webhook).

### 9.14 Footer

- Logo + "EDDP Servicios Contables". "C.P. Erick Domínguez Del Prado". "Cuajimalpa de Morelos, Ciudad de México". Horario.
- Links:
  - Servicios: landings.
  - Legal: Aviso de privacidad, Términos.
  - Contacto: WhatsApp, correo, LinkedIn, Facebook.
- La doble raya de ancho completo.
- "© {año} EDDP Servicios Contables".

### 9.15 Elementos fijos de conversión

- **Desktop:** FAB de WhatsApp (56 px, abajo a la derecha). Aparece después de pasar el hero. El mensaje cambia según la sección visible (usa IntersectionObserver para saber la sección actual).
- **Móvil:** barra inferior fija con dos botones, "WhatsApp" y "Agendar". Respeta `env(safe-area-inset-bottom)`. Se oculta con el menú abierto. Reemplaza al FAB.

---

## 10. PRECIOS Y COTIZADOR (`src/content/pricing.ts`)

- Precios en MXN, mostrados como "desde".
- Bandera `pricesPlusTax: true` → mostrar "+ IVA" junto al precio.
- Pago anual: 10% de descuento (`annualDiscount: 0.10`).
- **Todo editable.**

### 10.1 Planes mensuales

| id | Nombre | Para quién | Desde | Incluye |
|---|---|---|---|---|
| `resico` | **Arranque RESICO** | Personas físicas en RESICO | **$500/mes** | Declaraciones mensuales ISR e IVA, revisión de hasta 30 CFDI al mes, opinión de cumplimiento, revisión de buzón tributario, recordatorios y atención por WhatsApp en horario hábil |
| `profesional` | **Profesional** | Actividad empresarial y profesional, arrendamiento, plataformas digitales | **$1,200/mes** | Todo lo anterior + contabilidad electrónica, pagos provisionales con deducciones bien aplicadas, DIOT, conciliación bancaria, hasta 80 CFDI y reporte mensual de resultados |
| `empresa` | **Empresa** | Personas morales (SAS, SA de CV; RESICO PM o régimen general) | **$2,800/mes** | Contabilidad completa, estados financieros mensuales, pagos provisionales, IVA, retenciones, DIOT, contabilidad electrónica, conciliaciones, hasta 150 CFDI y llamada mensual de revisión |
| `medida` | **A la medida** | Grupos, varias razones sociales, alto volumen, migraciones de sistema | **Cotización** | Diagnóstico y propuesta específica |

- El plan **Profesional** lleva una marca sobria de "El más elegido" con borde `--pluma`. Sin badges chillones.
- Cada plan tiene botón "Quiero este plan" → WhatsApp con mensaje `plan` (nombre + precio).

### 10.2 Extras mensuales

- **Estímulo región fronteriza:** +$300/mes (avisos y padrón, validación del 90%, revisión de facturación al 8% y cálculo del crédito de ISR cuando aplica).
- **Nómina:** desde $450/mes hasta 3 trabajadores; +$120 por trabajador adicional.
- **Facturación por ti:** +$250/mes hasta 30 facturas.

### 10.3 Servicios únicos

| Servicio | Desde |
|---|---|
| Diagnóstico fiscal (20–30 min) | **Gratis** |
| Declaración anual persona física (sueldos, deducciones) | $800 |
| Declaración anual persona física con actividad | $1,500 |
| Declaración anual persona moral | $4,500 |
| Regularización fiscal (diagnóstico y plan) | $2,500 + $350 por mes atrasado presentado |
| Constitución de SAS (honorarios) | $3,500 |
| Estados financieros para crédito o licitación | $2,500 |
| Requerimiento o carta invitación del SAT | $2,500 según alcance |
| Devolución de saldo a favor | $1,500 o porcentaje del monto recuperado (a convenir) |
| Estudio de estrategia fiscal (cambio de régimen, persona física a SAS, frontera) | $3,500 |
| Alta en RFC, cambio de régimen o recuperación de contraseña | $500 |

### 10.4 Cotizador interactivo (componente estrella de conversión)

Son 5 pasos con botones grandes (no selects). Funciona con teclado.

1. ¿Eres persona física o empresa?
2. Régimen: RESICO / Actividad empresarial o profesional / Arrendamiento / Plataformas digitales / No sé. Si es empresa: RESICO PM / Régimen general / No sé.
3. ¿Cuántas facturas emites y recibes al mes? Rangos: hasta 30 / 31–80 / 81–150 / más de 150.
4. ¿Tienes trabajadores? 0 / 1–3 / 4–10 / más de 10 (número exacto opcional).
5. ¿Facturas en la frontera norte? Sí / No. ¿Tienes meses sin declarar? No / 1–6 / 7–12 / más de 12.

**Reglas de cálculo** (en `pricing.ts`, funciones puras con tests):
- **Base:** según el plan que corresponda. "No sé" asigna Profesional para persona física y Empresa para persona moral.
- **Volumen:**
  - Si el rango de facturas supera el límite del plan, se agrega $150 por cada bloque de 30 CFDI excedente.
  - Más de 150 → "A la medida".
- **Nómina:** $450 + $120 por cada trabajador arriba de 3. Para el rango "más de 10", se marca "A la medida".
- **Frontera:** +$300.
- **Atrasos:** cobro único = $2,500 + $350 por mes. Para rangos usa el punto medio y muestra "aprox."
- **Resultado:**
  - "Tu estimado: desde $X/mes + IVA" y, si aplica, "+ $Y una sola vez por regularización".
  - Doble raya bajo el total.
  - Botón "Enviar mi cotización por WhatsApp" con mensaje `cotizador` que incluye **todas** las respuestas y el monto.
  - Disclaimer: "Estimación informativa. El precio final se confirma después del diagnóstico gratis."

---

## 11. CONTACTO (`src/lib/whatsapp.ts`)

Función `waLink(templateKey, vars)` que regresa `https://wa.me/525534806184?text=` + `encodeURIComponent(mensaje)`.

**Plantillas:**
- `general`: "Hola Erick, vengo de tu página. Quiero información sobre tus servicios contables."
- `plan`: "Hola Erick, me interesa el plan {plan} (desde {precio}). Mi situación es: "
- `frontera`: "Hola Erick, facturo en la frontera y quiero revisar si aplico al IVA del 8%."
- `regularizacion`: "Hola Erick, tengo declaraciones atrasadas y quiero regularizarme."
- `sas`: "Hola Erick, quiero constituir una SAS."
- `nomina`: "Hola Erick, necesito llevar la nómina de mi negocio."
- `servicio`: "Hola Erick, quiero información sobre: {servicio}."
- `agendar`: "Hola Erick, quiero agendar una llamada. Mi horario disponible es: "
- `cotizador`: "Hola Erick, hice mi cotización en tu página:\n• Tipo: {tipo}\n• Régimen: {regimen}\n• Facturas al mes: {cfdi}\n• Trabajadores: {trabajadores}\n• Frontera: {frontera}\n• Meses sin declarar: {atrasos}\nEstimado: desde {mensual}/mes{unico}. ¿Lo revisamos?"

**Agenda:**
- Si `NEXT_PUBLIC_BOOKING_URL` existe, "Agendar" abre esa URL en una pestaña nueva.
- Si no, abre WhatsApp con la plantilla `agendar`.
- Tipos de cita que Rick configurará en su agenda (menciónalos en `/precios`):
  - Llamada de diagnóstico (20 min, gratis)
  - Asesoría por videollamada (45 min)
  - Cita presencial en el poniente de la CDMX

**Formulario de respaldo** (solo si existe el webhook):
- Campos: nombre, WhatsApp, ciudad, "¿qué necesitas?" (select con servicios) y mensaje opcional.
- Casilla obligatoria de aceptación del aviso de privacidad.
- `POST` JSON al webhook.
- Si funciona, redirige a `/gracias`.
- Si falla, explica qué pasó y ofrece el WhatsApp.
- Honeypot anti-spam.

---

## 12. SEO, LOCAL Y MEDICIÓN

### Metadata

- **Home:**
  - Title: "Contador Público en línea | Frontera norte y CDMX | EDDP Servicios Contables"
  - Description: "Contabilidad mensual, impuestos, nómina y estrategia fiscal para personas físicas y empresas. Estímulo IVA 8% región fronteriza. Primera revisión gratis por WhatsApp."
- Cada landing tiene su title y description propios.
- `metadataBase` = `NEXT_PUBLIC_SITE_URL`.
- Open Graph y Twitter con imagen generada en `opengraph-image.tsx`: fondo tinta, h1 y doble raya.

### JSON-LD (en layout y páginas)

- `AccountingService` (o `ProfessionalService` + `@type` múltiple):
  - Nombre, url, telephone (+52 55 3480 6184), email.
  - `founder` (Person: Erick Domínguez Del Prado, `jobTitle` Contador Público).
  - `areaServed`: Ciudad de México + la lista de ciudades fronterizas + "México".
  - `address` solo con `addressLocality` "Cuajimalpa de Morelos", `addressRegion` "CDMX" y `addressCountry` "MX". Sin calle.
  - `openingHours` "Mo-Fr 09:00-19:00".
  - `priceRange` "$$".
  - `sameAs` (LinkedIn, Facebook, GitHub, erickddp.com).
- `FAQPage` en home y en `/precios`.
- `Service` por cada landing.

### Técnico

- `sitemap.ts` y `robots.ts`.
- `lang="es-MX"`, canonical y `hreflang` no necesario.
- Encabezados en orden: un solo h1 por página.
- **Landings para anuncios** (`/frontera`, `/regularizacion`, `/constituir-sas`): reutilizan componentes, tienen copy específico, un solo objetivo y el formulario visible.
- **Fase posterior (no ahora):** páginas `/contador-en/[ciudad]` **solo** con contenido único por ciudad: municipios incluidos, particularidades y casos de esa ciudad. Nada de páginas clonadas cambiando el nombre de la ciudad, porque Google las castiga.

### Medición (`src/lib/analytics.ts`)

- GA4 si existe ID.
- **Eventos:**
  - `whatsapp_click` (params: `section`, `template`, `plan`)
  - `booking_click` (`section`)
  - `quote_completed` (`monthly`, `oneTime`, `regime`)
  - `quote_whatsapp` (`monthly`)
  - `form_submit` y `form_error`
- Rick conectará esto después a Google Ads.
- Todos los links salientes llevan `rel="noopener"`.

---

## 13. RENDIMIENTO, ACCESIBILIDAD Y LEGAL

### Rendimiento

- **Lighthouse móvil:** rendimiento ≥ 90; accesibilidad, buenas prácticas y SEO ≥ 95.
- **LCP** < 2.5 s. El LCP debe ser el h1 (texto), **no** el video.
- **CLS** < 0.05.
- Fuentes con `display: swap` y subset latin.
- Imágenes con `next/image`, formatos AVIF o WebP y `sizes` correctos.
- **GSAP:** importa solo los plugins usados y registra ScrollTrigger del lado del cliente. Haz cleanup de todo en `useGSAP`.
- **Canvas del hero:** 30 fps máximo; se pausa cuando no es visible.

### Accesibilidad

- Contraste AA en todo, incluido el texto sobre vidrio. Verifícalo con axe en Playwright.
- Foco visible: outline de 2 px en `--pluma` con offset de 3 px.
- Skip link "Saltar al contenido".
- Landmarks semánticos.
- Menú con `aria-expanded` y `aria-controls`; se cierra con Esc y atrapa el foco cuando está abierto.
- El cotizador y el acordeón se pueden usar 100% con teclado.
- Botón de pausa del fondo animado.
- `prefers-reduced-motion` respetado en todo (sección 8).

### Legal (borradores marcados `TODO(Rick): revisar`)

- **Aviso de privacidad:**
  - Responsable: Erick Domínguez Del Prado.
  - Datos que se recaban: nombre, teléfono, correo, ciudad, situación fiscal general.
  - Finalidades: atender la solicitud y cotizar.
  - Medios para ejercer derechos ARCO: correo.
  - Transferencias: ninguna salvo obligación legal.
  - Uso de cookies y analítica.
  - Redáctalo conforme a la ley mexicana vigente de protección de datos personales en posesión de particulares; **no cites números de artículo**.
- **Términos:**
  - Naturaleza informativa del sitio.
  - Las calculadoras son estimaciones.
  - El servicio se formaliza solo con contrato.
  - El cliente es responsable de la veracidad de su información.
- **Nunca prometer:** "sin multas", "garantizamos devolución" ni "pagarás menos" en absoluto. Usa: "con el menor costo posible", "te digo con números si te conviene".

---

## 14. FASES DE TRABAJO

### Fase 0 — Repo y base (LOCAL, en la PC de Rick)

1. En la carpeta actual, inicializa el proyecto Next.js con TypeScript, Tailwind v4, ESLint y App Router, usando el gestor npm.
2. Mueve este archivo a `docs/PROMPT-MAESTRO.md`.
3. Crea:
   - `CLAUDE.md`: propósito, comandos (`npm run dev`, `build`, `lint`, `test:visual`), mapa de carpetas y "dónde edito qué".
   - `docs/DECISIONES.md` vacío.
   - `.env.example`.
4. Instala las dependencias de la sección 5.
5. Crea `src/content/site.config.ts`, `pricing.ts`, `faq.ts` y `cities.ts` con los Anexos A y B y los datos de este archivo.
6. Descarga el logo y la foto a `/public`.
7. Inicializa git en `main`, haz commit `chore: base del proyecto y prompt maestro`.
8. Crea el repo y súbelo:
   ```
   gh repo create Erickddp/eddp-contabilidad-web --private --source . --remote origin --push
   ```
   - Si `gh` no existe, dile a Rick que corra `winget install GitHub.cli` y luego `gh auth login`.
   - Como alternativa, que cree el repo vacío en github.com y tú haces `git remote add origin ...` y `git push -u origin main`.
9. Termina mostrando a Rick la URL del repo y los pasos para conectarlo a Vercel: New Project → Import → el repo → Deploy.

### Fase 1 — Sistema de diseño + layout + hero

- Escribe `docs/DESIGN.md`: tokens, escala tipográfica y wireframes ASCII de cada sección. **Revisa el plan contra la sección 7.6 y anota qué corregiste.**
- Globals y tokens.
- Nav, menú móvil, footer, barra móvil y FAB.
- Hero completo con fondo modo A, tarjeta libro, doble raya y la secuencia 8.1.
- Capturas a 3 anchos y autocrítica.
- PR.

### Fase 2 — Secciones del home

- Franja de confianza, Dolores, Servicios (horizontal), Frontera (mapa + script de build), Proceso, Casos, Tecnología, Sobre mí, Preguntas y CTA final.
- Capturas y PR.

### Fase 3 — Precios, cotizador y contacto

- `/precios`, componentes de precios y cotizador con tests unitarios de las reglas.
- `whatsapp.ts`, agenda, formulario y `/gracias`.
- Analítica con eventos.
- PR.

### Fase 4 — Landings, SEO, legal, rendimiento y accesibilidad

- `/frontera`, `/regularizacion` y `/constituir-sas`.
- Metadata, JSON-LD, sitemap, robots y OG.
- Aviso de privacidad y términos.
- Lighthouse y axe: corrige hasta cumplir la sección 13.
- PR.

### Fase 5 — Video del hero, dominio y lanzamiento

- Si existe `/public/media/hero.mp4`, activa el modo B.
- Revisión final con el checklist (sección 15).
- Instrucciones para Rick:
  - Agregar `contabilidad.erickddp.com` en Vercel y el registro CNAME en su DNS.
  - Redirigir `web.erickddp.com` → `contabilidad.erickddp.com` con 301.
  - Dar de alta la propiedad de dominio en Google Search Console y enviar el sitemap.

---

## 15. CHECKLIST DE ACEPTACIÓN (verifica todo antes de cerrar la Fase 5)

- [ ] Ningún nombre, RFC ni dato identificable de clientes en todo el repo.
- [ ] Ningún testimonio inventado; la sección se oculta si el arreglo está vacío.
- [ ] La cédula solo aparece si Rick la confirmó en config.
- [ ] Precios, teléfono, ciudades y textos clave se editan solo en `src/content/*`.
- [ ] Cada CTA de WhatsApp lleva el mensaje correcto de su sección o plan (probar 5 al azar).
- [ ] El cotizador produce el mensaje con todas las respuestas; sus reglas tienen tests.
- [ ] La doble raya aparece exactamente en 3 lugares: hero, resultado del cotizador y footer. La línea del mapa es la cuarta, con su propio contexto.
- [ ] `--cuadre` (rojo) no se usa en botones ni decoración.
- [ ] Nada de la lista 7.6.
- [ ] Hero: el texto es el LCP; video o canvas cargan después; botón de pausa presente.
- [ ] Reduced motion: todo visible, sin pin ni contadores.
- [ ] Móvil: barra inferior con WhatsApp y Agendar, sin scroll horizontal accidental, botones de al menos 44 px, nada pegado a los bordes.
- [ ] Lighthouse móvil ≥ 90 / ≥ 95 / ≥ 95 / ≥ 95.
- [ ] JSON-LD válido (Rich Results Test), sitemap y robots correctos.
- [ ] Capturas de 375, 768 y 1440 px revisadas y sin cortes ni textos encimados.

---

## ANEXO A — `src/content/site.config.ts` (base)

```ts
export const site = {
  brand: "EDDP Servicios Contables",
  shortBrand: "EDDP",
  owner: "Erick Domínguez Del Prado",
  title: "Contador Público",
  cedula: "", // TODO(Rick): confirmar en cedulaprofesional.sep.gob.mx (13182616 vs 13758780)
  education: [
    { title: "Licenciatura en Contaduría Pública", school: "CESCIJUC", years: "2019–2022" },
    { title: "Licenciatura en Inteligencia Artificial", school: "UTEL", years: "En curso" },
  ],
  stats: {
    years: "Más de 6 años de experiencia",
    companies: "Más de 40 empresas llevadas en corporativo", // TODO(Rick): confirmar
  },
  locality: "Cuajimalpa de Morelos, Ciudad de México",
  inPersonArea: ["Cuajimalpa", "Santa Fe", "Álvaro Obregón", "Huixquilucan"],
  hours: "Lunes a viernes, 9:00 a 19:00 (hora CDMX)",
  responseTime: "Respondo en menos de 24 horas hábiles",
  whatsapp: "525534806184",
  phoneDisplay: "+52 55 3480 6184",
  email: "cperickd@gmail.com", // TODO(Rick): contacto@erickddp.com
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? "",
  heroMedia: "canvas" as "canvas" | "video",
  borderDecree: {
    validUntil: "31 de diciembre de 2026",
    lastExtension: "31 de diciembre de 2025",
  }, // TODO(Rick): actualizar si hay nueva prórroga
  social: {
    linkedin: "https://www.linkedin.com/in/erick-dominguez-4296411a9/",
    facebook: "https://www.facebook.com/profile.php?id=61584844233250",
    github: "https://github.com/Erickddp",
    personal: "https://erickddp.com",
    projects: "https://proyectos.erickddp.com",
  },
  tools: [
    { name: "Analizador CFDI", desc: "Análisis fiscal masivo de XML", status: "Disponible", url: "https://axml.erickddp.com" },
    { name: "CFDI SQL Lab", desc: "Consultas y dashboards sobre CFDI", status: "Disponible", url: "https://sql.erickddp.com" },
    { name: "EVOAPP", desc: "Herramientas contables en un flujo guiado", status: "Disponible", url: "https://app.evorix.com.mx" },
    { name: "myfiscal", desc: "Declaraciones asistidas", status: "Disponible", url: "https://myfiscal.erickddp.com" },
    { name: "ContHabil", desc: "Contabilidad RESICO automatizada", status: "En desarrollo" },
    { name: "Nómina EDDP", desc: "Motor de nómina propio", status: "En desarrollo" },
    { name: "Descarga masiva de XML", desc: "Descarga y clasificación de CFDI del SAT", status: "En desarrollo" },
    { name: "Facturador CFDI 4.0", desc: "Facturación propia con PAC", status: "En desarrollo" },
  ],
  testimonials: [] as { quote: string; name: string; role: string }[], // solo reales con permiso
  pricesPlusTax: true,
  annualDiscount: 0.1,
};
```

## ANEXO B — `src/content/cities.ts`

```ts
export const origin = { name: "Cuajimalpa (CDMX)", lat: 19.357, lng: -99.299 };

export const borderCities = [ // de oeste a este, orden del trazo
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
```

---

**Fin del prompt maestro.** Si algo de este archivo contradice una instrucción directa de Rick en la sesión, gana Rick. Anota el cambio en `docs/DECISIONES.md`.
