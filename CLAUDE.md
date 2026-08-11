# Project: Airbnb Listing Page Clone

## Goal
Pixel-perfect, behavior-perfect clone of: https://airbnb-clone-umber-two.vercel.app
Desktop only. Three views: Listing Page, Photo Tour (full gallery), Lightbox (single photo viewer).

## Tech Stack
- Next.js (App Router) + TypeScript + Tailwind CSS

## Code Quality Rules (always follow)
- One component = one responsibility. If a component does more than one thing, split it.
- No copy-pasted blocks — extract shared UI into `components/ui/`.
- Use clear names: `PhotoTourModal`, not `Modal2` or `Overlay`.
- All components must be typed (no `any`).
- Keep files short — if a component file is 150+ lines, break it up.

## Folder Structure
- `components/listing/` – listing page pieces (header, gallery preview, booking card, amenities)
- `components/photo-tour/` – full-screen gallery overlay
- `components/lightbox/` – single-photo viewer with prev/next
- `components/ui/` – buttons, icons, shared small pieces
- `hooks/` – custom hooks (keyboard nav, focus trap)
- `lib/` – helpers/utilities
- `types/` – shared TypeScript types

## Accessibility Requirements (non-negotiable)
- Lightbox and Photo Tour must trap focus while open and restore it on close.
- Left/Right arrow keys must navigate photos in the Lightbox.
- Escape key must close overlays.
- All interactive elements must be real `<button>`s with visible focus states.

## Visual Fidelity Workflow
1. Take a screenshot of the reference page.
2. Take a screenshot of my current implementation.
3. Compare them and list concrete differences (spacing, font, color).
4. Fix only what's listed. Don't rewrite unrelated code.

## What NOT to do
- Don't invent extra features not present in the reference.
- Don't skip animations — match transition duration/easing as closely as possible.
- Don't leave unused code, console.logs, or commented-out blocks in the final version.
