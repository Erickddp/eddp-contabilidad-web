@AGENTS.md

# EDDP Servicios Contables — sitio de ventas

Sitio para vender servicios contables del C.P. Erick Domínguez Del Prado. Dominio destino: `contabilidad.erickddp.com`. Repo: `Erickddp/eddp-contabilidad-web` (privado).

**Fuente de verdad:** `docs/CAMBIO-V2.md` (tiene prioridad) y `docs/PROMPT-MAESTRO.md`. Lee los dos completos antes de tocar código y trabaja solo la fase que se te pida. Sitio en español de México, tuteando.

## Comandos

- `npm run dev` — servidor de desarrollo
- `npm run build` — build de producción
- `npm run lint` — ESLint
- `npm run test:visual` — capturas Playwright a 375, 768 y 1440 px (se completa en la Fase 1)

## Mapa de carpetas

- `src/app/` — rutas (App Router)
- `src/components/` — layout, hero, sections, pricing, ui
- `src/content/` — **todos los datos editables**
- `src/lib/` — whatsapp, analytics, motion, format
- `src/styles/globals.css` — tokens de diseño
- `docs/` — prompt maestro, diseño y decisiones
- `public/` — brand, images, media, map
- `scripts/` — `build-map.ts` (mapa SVG)
- `tests/` — pruebas visuales

## Dónde edito qué

| Quiero cambiar… | Archivo |
|---|---|
| Teléfono, correo, cédula, textos clave, redes, herramientas, testimonios | `src/content/site.config.ts` |
| Precios, planes, extras, servicios únicos, reglas del cotizador | `src/content/pricing.ts` |
| Preguntas frecuentes | `src/content/faq.ts` |
| Ciudades fronterizas del mapa | `src/content/cities.ts` |
| Variables (GA4, webhook, agenda) | `.env.local` (ver `.env.example`) |

Regla de oro: precios, teléfono, textos clave y ciudades se cambian **solo** en `src/content/*`, sin tocar componentes.

## Reglas que no se negocian

- No inventar datos del dueño; usar `// TODO(Rick)` en config.
- Nunca nombres reales de clientes, RFC ni montos reales.
- No generar testimonios; la sección se oculta si el arreglo está vacío.
- Cédula: solo se muestra si tiene valor en config.
- Decisiones no especificadas: anotarlas en `docs/DECISIONES.md`.
