# Style Guide — Precedent Study (Exposing.AI)

## Project Aesthetic

This website documents an analysis of **Exposing.AI** by Adam Harvey (2021). The visual language mirrors the project's hacktivist, counter-surveillance mindset and the dystopian surveillance landscape depicted in the Exposing.AI poster.

The site should feel like a classified interface or leaked backend dashboard — cold, mechanical, and oppressive — not a friendly academic blog.

---

## Reference

The primary visual reference is the Exposing.AI poster: an isometric grid of giant eyeball observers tracking tiny human silhouettes with red laser lines and detection bounding boxes.

Key motifs to translate into web UI:

- Mass surveillance and object detection
- Rigid grid structures
- High-contrast grayscale with alarming red accents
- Monospace, terminal-style typography
- Lo-fi grain and halftone textures

---

## Color Palette

| Role | Hex | Usage |
|------|-----|-------|
| Background (primary) | `#2B2B2B` | Page base, deep charcoal |
| Background (secondary) | `#404040` | Panels, header, elevated surfaces |
| Surface (concrete) | `#CCCCCC` | Callout blocks, label backgrounds |
| Text (primary) | `#FFFFFF` | Body copy, headings |
| Text (secondary) | `#999999` | Meta info, subtitles, de-emphasized text |
| Text (muted) | `#666666` | Tertiary labels |
| Accent (alert) | `#FF0000` | Section labels, borders, links, tracking lines, hover states |
| Outline | `#111111` | Fine line work, shadows |

**Rule:** Red is reserved for emphasis, danger, and surveillance UI elements (bounding boxes, tracking lines, critical labels). Do not use it decoratively.

---

## Typography

- **Font family:** Monospace only — `IBM Plex Mono`, `Courier New`, or system monospace fallback
- **Weight:** 400 (regular) for body; 700 (bold) for section titles and emphasis
- **Case:** Section titles in `UPPERCASE`
- **Sizing:**
  - Body: 15–16px
  - Section titles: 12–14px (label style, not large headings)
  - Meta / header: 12–14px
  - Project title: 22–26px

Text should read like terminal output or a surveillance system's log feed.

---

## Layout & Structure

- **Grid-based, brutalist layout** — elements snap to a rigid structure; no soft or organic spacing
- **Sharp corners only** — `border-radius: 0` everywhere
- **Max content width:** ~800px, centered
- **Generous vertical rhythm** between sections (40px+ between major blocks)
- **Thin dividers:** 1px solid `#FF0000` or `#555555` to mimic tracking lines and UI separators

---

## Textures & Background

- **Dot-matrix / halftone floor:** Subtle repeating radial-gradient dot pattern on dark background, evoking the poster's perforated metal floor
- **Grain overlay:** Low-opacity noise texture across the page for CCTV / lo-fi print quality
- **Optional scanlines:** Very subtle horizontal line overlay for monitor effect (use sparingly)

---

## UI Components

### Header
- Dark secondary background (`#404040`)
- Bottom border: 1px red tracking line
- Links turn red on hover with underline removed

### Section Titles (`.section-title`)
- Styled as poster callout labels: red text on light gray (`#CCCCCC`) rectangular background
- Uppercase, monospace, inline-block padding
- Evokes system warning / detection labels

### Body Text (`p`)
- White on dark background
- Line-height ~1.65 for readability

### Links
- Default: white or light gray
- Hover: red (`#FF0000`) with optional red bounding-box outline (`outline: 1px solid #FF0000`)

### Buttons
- Dark background, white monospace text
- 1px red border (detection-box frame)
- Hover: red background or inverted colors; no rounded corners
- Cursor: pointer

### Message / Output Areas
- Bordered with 1px red rectangle (object-detection bounding box)
- Dark interior background
- Monospace text output

---

## Interaction States

| State | Treatment |
|-------|-----------|
| Hover (links) | Color shifts to `#FF0000` |
| Hover (buttons) | Red fill, white text, subtle box-shadow glow |
| Focus | Red 1px outline (accessibility + surveillance frame) |
| Active sections | Optional left red border (tracking line anchor) |

Avoid smooth, friendly animations. If motion is used, prefer quick, mechanical transitions (≤ 0.2s).

---

## Imagery (if added later)

- High-contrast black-and-white photography or illustration
- Red digital overlays: bounding boxes, crosshairs, scan lines
- Silhouetted figures — featureless, anonymous
- Isometric or grid-based compositions

---

## Tone

| Do | Don't |
|----|-------|
| Cold, clinical, oppressive | Warm, friendly, approachable |
| Sharp, grid-snapped layouts | Rounded, soft, bubbly UI |
| High contrast | Pastels or gradients |
| Monospace typography | Sans-serif corporate fonts |
| Red as alert / surveillance signal | Red as decorative accent |
| Lo-fi, grainy, terminal feel | Glossy, polished SaaS aesthetic |

---

## CSS Custom Properties (Reference)

```css
:root {
  --bg-primary: #2B2B2B;
  --bg-secondary: #404040;
  --surface-concrete: #CCCCCC;
  --text-primary: #FFFFFF;
  --text-secondary: #999999;
  --accent-red: #FF0000;
  --font-mono: 'IBM Plex Mono', 'Courier New', monospace;
}
```
