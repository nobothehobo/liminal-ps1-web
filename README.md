# liminal-ps1-web

Mobile-first PS1-era liminal mall exploration prototype built with **Vite + TypeScript + Three.js**.

## Current milestone
This repository currently implements **STEP 1 → STEP 4** of the requested roadmap:
- project scaffold and clear Three.js scene
- iPhone-first touch controls (left joystick + right drag look)
- PS1-style rendering defaults (low internal resolution, fog, pixelated scaling, optional wobble)
- one coherent modular vertical-slice mall chunk with atrium reveal, escalator, second-floor balcony, storefront facades, lights, and props

## Local development
```bash
npm install
npm run dev
```
Open the local URL from Vite (usually `http://localhost:5173`).

Build check:
```bash
npm run build
```

## iPhone Safari testing notes
1. Start dev server on your machine:
   ```bash
   npm run dev -- --host
   ```
2. Ensure iPhone and dev machine are on the same network.
3. Visit `http://<your-local-ip>:5173` in iPhone Safari.
4. Tap **Tap to Enter**.
5. Use:
   - left joystick to move
   - right-side drag to look
   - settings button for sensitivity, quality preset, and wobble toggle

## GitHub Pages deployment notes (for STEP 6)
This repo has **not yet implemented STEP 6** intentionally.
When ready for STEP 6:
1. Set `vite.config.ts` base to:
   ```ts
   base: '/<REPO>/'
   ```
2. Add GitHub Actions workflow that builds and deploys `dist` to Pages.
3. Enable Pages in GitHub repository settings.

## Structure
- `src/main.ts`
- `src/game/engine` (renderer, loop, time)
- `src/game/input` (touch joystick + look)
- `src/game/player` (controller + collision)
- `src/game/world` (modular kit + level assembly)
- `src/ui` (start screen + settings)
- `public/assets/textures` (placeholder path)
