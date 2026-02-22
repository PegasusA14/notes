# Notes App: React Frontend

This directory contains the user interface layer for the Notes App—designed with a strong emphasis on speed, modularity, and a stunning "light theme" aesthetic modeled heavily on Vengeance UI components via **shadcn**.

## Technical Stack
- **Core Engine**: React 18 & Vite (using `@vitejs/plugin-react-swc`)
- **Styling Architecture**: Tailwind CSS `v4` injected natively via Vite CSS plugins
- **UI Tooling**: `shadcn/ui` components (radix-ui mapped) 
- **API Mapping**: `@tanstack/react-query` feeding directly into Axios interceptors.
- **Client Search**: `zustand` powers a global debounce store, filtering optimistic queries without trashing backend IO.

## Structure

* **`src/api`**: Interceptor layers natively capturing endpoints on port `5024`, including auto-logout injections triggering `authStore` dumps.
* **`src/store`**: High-performance persistent storage mapping across tabs (handling modals, JWTs, and text caching).
* **`src/features`**: Feature-rich logic (Auth, Notes Layout Maps, Editors).
* **`src/components/ui`**: Explicit `shadcn` auto-generated primitive wrappers leveraging precise TS parameters.

## Commands

```bash
# Fast-track component building and TS module installs
bun install

# Verify complete typing safety and bundle mapping capabilities
bun run build

# Boot the hot-module-reload server specifically keyed to localhost:5173
bun run dev
```
