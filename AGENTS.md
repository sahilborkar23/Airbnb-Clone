# AI Agents Usage

This document outlines how AI assistants were utilized to construct the Airbnb clone.

## Role of the Agent
The AI was primarily used for:
1. **Scaffolding**: Generating the boilerplate for the React/Vite/Tailwind setup.
2. **Component Structuring**: Breaking down the monolithic page into reusable React components (`Gallery.jsx`, `ListingDetails.jsx`, `ReviewsSection.jsx`, `MapSection.jsx`).
3. **Pixel-Perfect Styling**: Iteratively adjusting Tailwind spacing (`px-20`, `pt-8`) and typography to match screenshots of the original Airbnb webpage.
4. **SVG Icon Extraction**: Extracting authentic Airbnb SVGs from the DOM and mapping them into a dedicated `AmenityIcons.jsx` component library to ensure visual fidelity.

## Workflow
- The human developer provided architectural direction, structural constraints, and visual reference (screenshots, HTML snippets).
- The AI rapidly generated the implementation code, debugged layout issues, and refactored UI states (like expanding modals and scroll locks) to match production standards.
