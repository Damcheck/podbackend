# PODBACKEND motion system

Extension of the existing warm white / coral identity. Audience: brands and creators exploring podcast services. Existing content, routes, images, typography, forms and players are preserved.

Design calibration: visual variance 5, motion 7, density 6, asset dependence 8, brand fidelity 10. Motion establishes a spoken-word rhythm and connects discovery to growth without changing the page architecture.

- KineticHeading: word-level perspective / blur reveals, 820 ms with 42 ms stagger; semantic headings and selectable text remain available before JavaScript.
- Reveal: alternating card arrival, maximum 510 ms stagger; each section enters once.
- PodcastScene: Framer Motion spring follows scroll progress to lift, tilt and spread hero cards. Smaller screens keep side cards in their existing positions.
- ProcessSignal: a scroll-drawn SVG waveform connects the process narrative.
- WebGLRibbons: custom interference shader using pointer position and scroll energy. 30 fps cap, bounded canvas resolution, hidden-tab pause, static reduced-motion mode, CSS background fallback.
- Lenis follows the operating system reduced-motion preference, including changes during a session.

Verification: production build / TypeScript pass, 29 generated routes. Browser inspection confirmed WebGL initialization and readable settled headings. Fresh-preview keyboard contact activation and mouse podcast activation work. Decorative episode badge cannot intercept input.
