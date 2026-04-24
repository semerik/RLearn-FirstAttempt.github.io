# R//LEARN — Plataforma Interactiva de Programación en R

Plataforma web educativa para aprender R con consola interactiva real, construida con **Nuxt 3**.

---

## Stack

| Capa       | Tecnología                              |
|------------|-----------------------------------------|
| Frontend   | Nuxt 3 + Vue 3 (Composition API)        |
| Estado     | Pinia                                   |
| Backend    | Nuxt Server Routes (stateless)          |
| Ejecución R | WebR (R corriendo en el navegador)      |
| Estilos    | CSS custom (Vaporwave/Outrun design)    |
| Tipos      | TypeScript                              |

---

## Estructura del proyecto

```
rlearn/
├── assets/css/main.css        # Design system global
├── components/
│   ├── AppHeader.vue          # Header con navegación y progreso
│   ├── ExerciseCard.vue       # Tarjeta de ejercicio individual
│   ├── ModuleSidebar.vue      # Panel lateral de módulos/temas
│   ├── ProgressView.vue       # Vista de progreso del usuario
│   ├── RConsole.vue           # Consola R interactiva (editor + output)
│   ├── TopicView.vue          # Teoría + lista de ejercicios
│   └── WelcomeScreen.vue      # Pantalla de bienvenida
├── composables/
│   └── useRExecutor.ts        # Lógica de ejecución y validación
├── data/
│   └── modules.ts             # Currículum completo (3 módulos, 14 temas)
├── pages/
│   └── index.vue              # Página principal
├── server/api/
│   ├── execute.post.ts        # (legacy) endpoint previo de ejecución remota
│   └── validate.post.ts       # (legacy) endpoint previo de validación remota
├── stores/
│   └── rlearn.ts              # Pinia store (estado global)
├── types/
│   └── index.ts               # Interfaces TypeScript compartidas
├── app.vue                    # Componente raíz
└── nuxt.config.ts             # Configuración de Nuxt
```

---

## Instalación y arranque

### Requisitos
- Node.js >= 18
- npm >= 9

### Pasos

```bash
# 1. Descomprimir el ZIP y entrar al directorio
cd rlearn

# 2. Instalar dependencias
npm install

# 3. Iniciar en desarrollo
npm run dev
```

La app estará disponible en: **http://localhost:3000**

### Build de producción

```bash
npm run build
npm run preview
```

---

## Cómo funciona la consola R

La ejecución de código R real ocurre en el navegador usando WebR:

```
Usuario escribe código R
        ↓
RConsole.vue → useRExecutor.ts
        ↓
WebR (WASM)
        ↓
Output real de R → devuelto al frontend
```

### Validación de ejercicios

```
validateCode(code)
        ↓
Ejecuta el código en WebR
        ↓
Compara output con expected:
  1. Match exacto (normalizado)
  2. Match numérico con tolerancia ±1%
  3. Match insensible a mayúsculas
        ↓
{ correct: bool, output, feedback }
```

---

## Módulos de contenido

### Módulo 01 — Lógica Básica
- Tipos de datos · Variables · Condicionales · Bucles · Funciones

### Módulo 02 — R Avanzado
- Vectores y matrices · Data Frames · Indexación · Funciones nativas

### Módulo 03 — Química con R
- Concentraciones y molaridad · Cálculo de pH · Regresión lineal (Beer-Lambert) · Estadística experimental · Cinética química

---

## Añadir contenido

Para añadir nuevos módulos/temas/ejercicios, edita únicamente `data/modules.ts`.
La estructura es totalmente tipada (`types/index.ts`).

---

## Consideraciones de seguridad

- WebR ejecuta el código localmente en WebAssembly dentro del navegador
- No se necesita API key externa para ejecutar ni validar ejercicios
- No se almacena ningún código del usuario en el servidor

---

## Progreso del usuario

El progreso se guarda automáticamente en `localStorage` del navegador.
No requiere cuenta ni base de datos (stateless by design).
