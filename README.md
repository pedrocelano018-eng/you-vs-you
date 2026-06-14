# You vs You

Una PWA minimalista para seguir tu rutina diaria. Funciona 100% offline, sin
cuentas ni servidores. Optimizada para iPhone, compatible con Android.

## Características

- Rutina de semana y de fin de semana (cambio automático según el día).
- Pegás tu rutina desde Apple Notes; cada línea se convierte en una tarea.
- Tareas agrupadas automáticamente por categoría.
- Barra de progreso y estadísticas mensuales.
- Pantalla **YOU VS YOU**: si no completás el día, registrás una excusa.
- Pantalla de bienvenida diaria que te muestra las excusas del mes.
- Calendario mensual con días cumplidos / incumplidos / vacaciones.
- Modo vacaciones que congela la racha.
- Reinicio por nuevo día (al abrir la app), no a medianoche.
- Persistencia local con LocalStorage. Instalable como PWA.

## Estética

Blanco, negro y violeta (#7C3AED). Nada más. Tipografía SF Pro / Inter,
bordes redondeados y animaciones suaves.

## Tecnología

React · TypeScript · Vite · TailwindCSS · vite-plugin-pwa

## Desarrollo

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # build de producción (genera la PWA)
npm run preview  # previsualizar el build
```

Los íconos se generan con `node scripts/gen-icons.mjs`.

## Cómo instalarla en el iPhone

1. Serví el build (`npm run preview`) o desplegalo en cualquier hosting estático.
2. Abrilo en Safari.
3. Compartir → "Agregar a pantalla de inicio".
4. Se abre a pantalla completa, como una app nativa, y funciona offline.
