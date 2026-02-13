# Luna Ing Web

Sitio estático profesional para **Luna Ing**, construido con HTML + CSS + JS sin frameworks ni build step.

## Stack

- HTML semántico
- CSS responsive y tema claro/oscuro
- JavaScript vanilla (navegación activa, toggle de tema y formulario mailto)

## Estructura

```text
/
  index.html
  assets/
    css/styles.css
    js/main.js
    img/source_winlab/...
    favicon.svg
  robots.txt
  sitemap.xml
  README.md
```

## Contacto hardcodeado

- WhatsApp: +54 299 620 9136
- Email: marcoantoniolunavillegas@gmail.com
- Ubicación: Neuquén, Argentina

## Tema y UX

- Modo inicial automático por `prefers-color-scheme`
- Toggle manual de tema persistido en `localStorage`
- Header sticky + smooth scroll + sección activa en navegación
- CTA principal por WhatsApp y email

## GitHub Pages

URL esperada:

`https://marcoluna-nqn.github.io/luna-ing/`

Si la activación por API falla por permisos, habilitar manualmente:

1. Ir a `Settings` del repo.
2. Abrir `Pages`.
3. En `Build and deployment`, elegir:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
4. Guardar y esperar la publicación.
