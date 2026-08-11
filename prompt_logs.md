# AI Prompt History

This document contains the sequence of professional, high-level prompts used to architect and build the Airbnb Clone. The development was structured into distinct phases to maximize AI efficiency and code modularity.

### Phase 1: Project Scaffolding & Design System
```text
I am building a pixel-perfect clone of the Airbnb listing page. 
Reference URL: https://www.airbnb.co.in/rooms/1599895892448055764

Initialize the project using React.js and Vite. Use Tailwind CSS for all styling, and Framer Motion for any animations. Do not install PostCSS. 
You must maintain a modular folder structure (e.g., separating components into `src/components`). 

The visual design is the single source of truth. Your clone must match it strictly across:
1. Identical layout, spacing (`px-10 md:px-20`), typography, colors (`#222222`, `#717171`), and assets.
2. Interactive behaviors: Hover states, transitions, and sticky scrolling components.

Begin by scaffolding the main `App.jsx` layout container and the `StickyNav` component.
```

---

### Phase 2: Core Layout Implementation (Gallery & Content)
```text
Next, implement the `Gallery` component and the `ListingDetails` section. 
Extract the image assets from the live DOM and implement a 5-image masonry grid for desktop view. 

For `ListingDetails`:
Create a two-column layout using flexbox. The left column (65% width) will contain the listing title, host information, and features. The right column (35% width) will contain the Booking Widget.
Ensure the Booking Widget is sticky (`sticky top-24`) so it scrolls alongside the left column. 
Instead of a static price, render an "Add dates for prices" state that matches Airbnb's unselected date UI.
```

---

### Phase 3: Complex UI State & Modals (About This Space)
```text
Refactor the "About this space" section. Instead of a simple inline expansion, implement an Airbnb-style modal popup.

Requirements:
- The default view should truncate the text after the first paragraph.
- Render an Airbnb-style bordered pill button that says "Show more >".
- When clicked, it should open a centered modal with a dimmed, click-to-close background (`bg-black/50`).
- Implement scroll-locking (`overflow: hidden`) on the document body when the modal is active.
- Inside the modal, render the full textual description formatted with appropriate spacing and bold headers.
```

---

### Phase 4: Iconography & Visual Fidelity (SVG Extraction)
```text
We need to ensure 100% visual fidelity for the iconography. Do not use generic icon libraries like Lucide or FontAwesome. 

Create a dedicated `src/assets/icons/AmenityIcons.jsx` component library. I have extracted the raw SVG paths directly from the Airbnb DOM. Map these paths to React components and use them in the "What this place offers" section.

Here are the SVG paths for the primary amenities:
[Provided raw SVG paths for Wifi, Kitchen, Pool, Pets, etc.]

Implement a dynamically mapped list that renders these SVG components alongside the amenity text. Strike through the text for unavailable amenities (e.g., Smoke alarm, Carbon monoxide alarm).
```

---

### Phase 5: Amenities Modal Refactoring
```text
Now, implement the "Show all 50 amenities" modal. 
This must match the screenshot exactly:
1. Use a single-column layout.
2. Add full-width horizontal bottom borders (`border-b border-gray-200`) under every amenity item.
3. Remove the bottom border from the modal's header section (the one containing the 'X' close button) to achieve a seamless white header.

Integrate these newly extracted SVG paths for the 'Bathroom' and 'Bedroom and laundry' categories:
[Provided SVG paths for Hairdryer, Cleaning products, Washing machine, Bed linen, etc.]
```

---

### Phase 6: Final Polish & Map Integration
```text
Finalize the page by implementing the `ReviewsSection` and `MapSection`. 

For the MapSection:
Integrate `react-leaflet`. I want the map marker to look exactly like Airbnb's custom pin, not the default Leaflet blue marker. Use this custom HTML/SVG for the `L.divIcon`:
[Provided SVG for the authentic Airbnb map pin with the semi-transparent neighborhood aura]

Ensure the map is non-interactive (disable scroll zoom) and centered on Candolim, Goa. Verify all final paddings across the entire application to ensure it matches the `max-w-[1280px]` container constraints.
```
