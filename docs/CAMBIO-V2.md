# CAMBIO DE DIRECCIÓN V2 — tiene prioridad sobre PROMPT-MAESTRO.md

> **Para Claude Code.** Rick rechazó el hero de la Fase 1: plano, aburrido y con la frontera en todos lados.
> Este documento **reemplaza** las secciones 7.1, 8, 9.1, 9.2, 9.3, 9.4 y 9.6 del maestro y agrega la 9.16.
> Todo lo demás del maestro sigue vigente: datos, precios, privacidad, SEO, legal y fases.
> Si hay conflicto entre los dos documentos, gana este.

---

## 1. LO QUE ESTÁ MAL Y NO SE REPITE

1. **Hero plano:** canvas de curvas de nivel con texto encima. Se ve como plantilla y nadie se queda.
2. **Tarjeta del pago provisional:** enseña al cliente *cuánto paga*, no *cuánto se ahorra*. Se elimina por completo.
3. **Frontera en el titular, el subtítulo y la sección estrella.** La frontera es **un servicio más**, no la identidad del despacho. Los clientes de Rick son de todo México.
4. **Diseño pensado en desktop.** **El teléfono es lo principal.** Se diseña primero a 375 px y luego se escala.

---

## 2. NUEVO CONCEPTO: "La balanza"

**Pieza central:** una **balanza contable 3D hecha de partículas** que vive en un canvas WebGL fijo detrás de toda la página.

- La balanza **se desarma y se transforma** conforme el usuario hace scroll.
- Cada sección tiene su propia forma.
- Al final se **reensambla en equilibrio**.

**La historia que cuenta el scroll:** *tus impuestos desordenados → orden → estrategia → equilibrio.*

La doble raya roja se queda, pero solo como acento: bajo el ahorro del comparativo y en el footer.

---

## 3. STACK ADICIONAL

```
npm i three @react-three/fiber @react-three/drei
npm i -D @types/three
```

- **Un solo canvas WebGL** para toda la página (`position: fixed; inset: 0; z-index: 0`). El contenido va encima con `position: relative; z-index: 1`. **Nunca** crees un canvas por sección.
- Las partículas son un `THREE.Points` con `ShaderMaterial` propio.
- **Prohibido:** un mesh por partícula y modelos 3D descargados. Toda la geometría se construye en código.
- **Bloom** (`@react-three/postprocessing`): solo en desktop y solo si los fps se sostienen. En móvil, el brillo se simula en el fragment shader con una caída radial suave y `AdditiveBlending`.

---

## 4. LAS FORMAS (morph targets)

Cada forma es un `Float32Array` con N posiciones, generadas al montar con `MeshSurfaceSampler` (`three/examples/jsm/math/MeshSurfaceSampler.js`) sobre geometrías armadas en código.

| # | Forma | Sección | Cómo se construye |
|---|---|---|---|
| 0 | **Balanza desequilibrada** | Hero | Base (cilindro bajo), columna (cilindro delgado), brazo (box largo inclinado ~12°), dos cadenas (líneas de puntos) y dos platillos (cilindros planos, uno más bajo que el otro). El platillo pesado tiene más partículas, con un tinte ámbar. |
| 1 | **Papeles en caos** | "¿Te pasa esto?" | Unos 60 rectángulos pequeños (hojas, facturas) con posición y rotación aleatorias en un volumen amplio, con turbulencia lenta. |
| 2 | **Libro ordenado** | Servicios | Una cuadrícula tipo hoja de cálculo en perspectiva: renglones y columnas de puntos alineados que se ordenan de izquierda a derecha. |
| 3 | **Dos columnas** | Comparativo de estrategia | Dos prismas verticales. El izquierdo es alto, en ámbar (sin estrategia). El derecho es bajo, en azul pluma (con estrategia). Su altura relativa sale de los números del comparativo. |
| 4 | **Camino de 5 nodos** | Cómo trabajamos | Una curva suave con 5 esferas, una por paso del proceso. |
| 5 | **Nube tenue** | Precios, Casos, Preguntas | Las partículas se dispersan lejos del centro, a un 25% de opacidad, para no estorbar la lectura. |
| 6 | **Balanza en equilibrio** | CTA final | La misma balanza de la forma 0, ahora nivelada, en azul y claro, girando muy lento. |

**Número de partículas** (constante por dispositivo; todas las formas usan el mismo N):
- Móvil (`pointer: coarse` o ancho < 768): **4,000**.
- Si `navigator.hardwareConcurrency <= 4` o `deviceMemory <= 4`: **2,500**.
- Desktop: **14,000**.
- DPR máximo de 1.5 en móvil y 2 en desktop.

---

## 5. EL SHADER (cómo se ve el morph)

### Atributos por partícula

- `aFrom`, `aTo`: posición en la forma actual y en la siguiente. Se reescriben al cambiar de tramo.
- `aRandom`: `vec4` aleatorio.
- `aColorFrom`, `aColorTo`.

### Uniforms

- `uProgress` (0→1 dentro del tramo actual)
- `uTime`
- `uPointer` (solo desktop)
- `uSize`
- `uPixelRatio`

### Vertex shader

1. **Progreso escalonado por partícula** para que no se muevan todas igual:
   `p = smoothstep(aRandom.x * 0.4, aRandom.x * 0.4 + 0.6, uProgress)`.
2. **Disolución:** a mitad de la transición, cada partícula se separa con ruido 3D (curl o simplex). La amplitud se calcula con `sin(p * PI)` y es máxima a la mitad, para que la forma "se deshaga" y luego "se rearme".
3. **Vida en reposo:** un movimiento leve con `uTime` (amplitud de 0.02 unidades).
4. **Puntero (desktop):** las partículas cercanas al cursor se repelen un poco.
5. **Tamaño:** `gl_PointSize = uSize * uPixelRatio * (1.0 / -mvPosition.z)`, con variación por `aRandom.y`.

### Fragment shader

- Punto redondo con caída suave: `alpha = smoothstep(0.5, 0.0, length(gl_PointCoord - 0.5))`.
- Color mezclado entre `aColorFrom` y `aColorTo`.

### Paleta de partículas

| Uso | Color |
|---|---|
| Base | claro `#F3F5F1` al 85% |
| Brillo | pluma `#3157E0` (mezcla 30–60%) |
| "Peso, impuestos de más" | ámbar `#F2A541` |

Fondo del canvas: `#070F24`, más profundo que tinta, para que las partículas brillen. Agrega un degradado radial muy sutil de `#13224A` en el centro.

---

## 6. CONTROL CON SCROLL

- **GSAP ScrollTrigger** con Lenis sincronizado (`lenis.on('scroll', ScrollTrigger.update)` y `gsap.ticker`).
- Cada `<section data-forma="N">` define un tramo. Al entrar una sección:
  1. se toma la forma anterior como `aFrom` y la nueva como `aTo`;
  2. se resetea `uProgress`;
  3. `uProgress` se anima con `scrub: 1` sobre los primeros ~60vh de la sección.
- **Hero:** la balanza gira lento en Y. Con el **primer scroll** (0–40% del alto del hero) **se equilibra** (el brazo pasa de 12° a 0°) y **luego** se desarma hacia la forma 1.
- **Cámara:** un leve dolly (z de 6 a 5.4) y un paneo según la sección. En móvil la balanza ocupa la mitad superior, con el texto abajo; en desktop va a la derecha.
- **Rendimiento:**
  - El loop se pausa con `document.hidden`.
  - Si el FPS promedio de 2 s baja de 40, reduce partículas a la mitad y desactiva el bloom (una sola vez).
  - **Fallback** si no hay WebGL o con `prefers-reduced-motion`: imagen estática de la balanza en equilibrio (render del canvas exportado a `/public/media/balanza.webp`, o un SVG de puntos) y el contenido normal sin pin.

---

## 7. ANIMACIONES DE CADA SECCIÓN (además del fondo)

Rick quiere movimiento en cada scroll. Hazlo con oficio, no con fade-up genérico. Cada sección tiene **su propio** gesto:

| Sección | Gesto |
|---|---|
| Hero | Entrada orquestada: las 2 líneas del h1 suben con máscara (SplitText por líneas, stagger 120 ms), luego el subtítulo, los CTAs y la balanza aparece desde partículas dispersas que convergen (1.4 s). |
| ¿Te pasa esto? | Frases grandes que se iluminan de 15% a 100% con `scrub` al cruzar el centro. En móvil, una frase por pantalla. |
| Servicios | Desktop: pin y track horizontal. Móvil: tarjetas apiladas tipo **deck**; cada una se desliza y queda encima de la anterior con `position: sticky` y escala 0.94 de la de atrás. |
| Comparativo | Los números hacen conteo sincronizado con las columnas de partículas. El ahorro aparece al final con la doble raya. |
| Cómo trabajamos | Una línea de progreso vertical se llena con scroll; cada paso se enciende al llegar. |
| Precios | Las tarjetas entran con un leve giro 3D (rotateX 8° → 0) en stagger. El toggle mensual/anual rueda dígitos. |
| Casos | Cada ficha se revela con un clip-path de abajo hacia arriba (como abrir un expediente). |
| Preguntas | Sin entrada; solo el acordeón animado. |
| CTA final | La balanza se rearma en equilibrio y el título aparece por letras. |

Todo con `prefers-reduced-motion`: sin pin, sin scrub y sin conteo; contenido visible de inmediato.

---

## 8. NUEVO COPY

### Nav
Links: Servicios · Estrategia · Precios · Casos · Sobre mí · Preguntas. CTA: "Escríbeme". (**"Frontera" sale de la nav.**)

### Hero (mobile-first)

- **H1:**
  > Tus impuestos,
  > en equilibrio.
- **Subtítulo:**
  > Contabilidad, declaraciones y estrategia fiscal para personas y empresas en todo México. Pagas lo que marca la ley, ni un peso de más.
- **CTAs:** "Escríbeme por WhatsApp" · "Agenda una llamada de 20 min"
- **Microcopy:** "Primera revisión gratis. Respondo en menos de 24 horas hábiles."
- **Layout móvil (375 px):**
  - balanza en el 45% superior de la pantalla;
  - h1 de 44–48 px;
  - subtítulo de 16 px;
  - CTAs a ancho completo, apilados, de 52 px de alto;
  - todo dentro del primer viewport sin scroll.
- **Layout desktop:** texto a la izquierda en 6 columnas, la balanza llenando el lado derecho, h1 de hasta 96 px.

### Franja de confianza (sin frontera)

- "Contador Público titulado"
- "Más de 6 años de experiencia"
- "Más de 40 empresas llevadas en corporativo" (`TODO(Rick)`)
- "Personas físicas y morales"
- **Móvil:** marquee horizontal lento y continuo (pausa al tocar y con reduced motion).

### "¿Te pasa esto?"

- **Título:** "Si te identificas con alguna, hablemos."
- **Frases:**
  1. Pagas más impuestos de los que deberías y nadie te explica por qué.
  2. Te negaron un crédito porque tu constancia no refleja lo que ganas.
  3. Llevas meses sin declarar y el buzón tributario ya te está buscando.
  4. Estás cerca del tope de RESICO y nadie te ha dicho qué sigue.
  5. Tu contador solo aparece cuando hay que pagar.

### Servicios

Los mismos 10 del maestro (9.5). **"Región fronteriza norte" es uno más**, en la posición 6, no destacado.

### Frontera
- La sección pineada con mapa **sale del home**.
- El mapa y el contenido de 9.6 viven solo en la landing `/frontera`.
- En el home, la frontera aparece únicamente:
  - como tarjeta de servicio;
  - en una pregunta frecuente;
  - en el footer.

---

## 9.16 NUEVA SECCIÓN: "Mismo ingreso. Otra estrategia." (id `estrategia`, `data-forma="3"`)

Esta sección sustituye a la tarjeta del pago provisional. Es la sección que vende.

- **Título:** "Mismo ingreso. Otra estrategia."
- **Bajada:** "La diferencia entre pagar de más y pagar lo justo casi nunca es el ingreso: es el régimen, las deducciones y el orden."

### Selector de 3 escenarios

Tabs o chips. En móvil son chips deslizables. Todos los números viven en `src/content/estrategia.ts`.

1. **Profesionista que factura sus servicios**
   - Ingresos de $1,800,000 al año.
   - Sin estrategia: actividad profesional casi sin deducciones.
   - Con estrategia: régimen correcto para su nivel de ingreso.
2. **Persona física con gastos de su negocio**
   - Sin estrategia: deducciones mal soportadas o sin CFDI.
   - Con estrategia: deducciones autorizadas bien comprobadas y deducciones personales aplicadas en la anual.
3. **Negocio que ya creció**
   - Comparativo de persona física con actividad empresarial contra SAS (con nómina para el dueño, gastos deducibles y reparto de utilidades).

### Estructura de cada escenario (en DOM, sobre las columnas de partículas)

| | Sin estrategia | Con estrategia |
|---|---|---|
| ISR anual estimado | $X | $Y |
| **Diferencia** | | **$X − Y al año** (doble raya roja) |

**Valores iniciales del escenario 1** (calculados con la tarifa anual de personas físicas y la tabla anual de RESICO):

- Sin estrategia (régimen de actividad profesional, deducciones del 10%, base de $1,620,000): **≈ $431,800**.
- Con estrategia (RESICO PF, tasa del 2% sobre $1,800,000): **$36,000**.
- Cada escenario lleva: `// TODO(Rick): validar con la tarifa vigente del ejercicio y ajustar`.
- Escenarios 2 y 3: deja campos con `TODO(Rick)` y **no inventes cifras**. Si están vacíos, ese tab no se muestra.

**Pie obligatorio:**
> "Ejemplos ilustrativos con supuestos simplificados. No son una promesa de ahorro: cada caso depende de tus ingresos, gastos, requisitos del régimen y la ley vigente. En tu diagnóstico gratis lo calculamos con tus números."

**CTA:** "Calcula mi caso" → WhatsApp con la plantilla nueva `estrategia`: "Hola Erick, quiero saber cuánto podría ahorrar con una estrategia fiscal. Mi situación es: ".

**Prohibido en esta sección:** "evita impuestos", "no pagues", "garantizado" y cualquier esquema agresivo. Se trata de **planeación legal**: régimen correcto, deducciones correctas y orden.

---

## 10. MOBILE-FIRST: REGLAS DURAS

- **Diseña cada componente a 375 px primero**, luego a 768 y luego a 1440. Las capturas de Playwright se revisan **primero en 375**.
- **Áreas táctiles** de 48 px o más. Nada pegado a los bordes (gutter de 20 px).
- **Nada de pin horizontal en móvil.** Usa los patrones del punto 7.
- **Fuentes:** h1 de 44–48 px, h2 de 32–36 px, cuerpo de 16 px.
- **Rendimiento:**
  - El canvas móvil a 4,000 partículas debe sostener **≥ 50 fps** en un Android de gama media. Pruébalo con el throttling de CPU 4× de Chrome y documenta el resultado en `docs/DECISIONES.md`.
  - La barra inferior (WhatsApp / Agendar) siempre visible, salvo con el menú abierto.
  - **LCP** sigue siendo el h1; el canvas se monta después del primer pintado (`requestIdleCallback` o dynamic import con `ssr: false`).

---

## 11. CÓMO EJECUTAR ESTO

1. Lee este archivo y luego el maestro.
2. Borra lo que se elimina:
   - `HeroBackground` de curvas de nivel;
   - `LedgerCard` y su uso;
   - las referencias a frontera en hero, nav y franja.
3. Implementa en este orden, con commit al final de cada uno:
   1. **Canvas de partículas + forma 0 + hero nuevo** (mobile-first). Toma capturas a 375 y a 1440 y revisa.
   2. **Formas 1–6 + ScrollTrigger + secciones del home** (incluye la 9.16).
   3. **Animaciones por sección** (punto 7) y fallback.
4. Antes de cada commit:
   - corre `npm run lint` y `npm run build`;
   - toma las capturas;
   - **graba un video corto de scroll** con Playwright (`recordVideo`) a 375 px y revísalo: que el morph se vea fluido y que el texto siempre se lea sobre las partículas.
5. Al terminar, resume para Rick qué cambió y qué quedó pendiente.
