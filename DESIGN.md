---
name: Academic Precision
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#434655'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#0051b1'
  on-tertiary: '#ffffff'
  tertiary-container: '#0f69dc'
  on-tertiary-container: '#edf0ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#d8e2ff'
  tertiary-fixed-dim: '#adc6ff'
  on-tertiary-fixed: '#001a42'
  on-tertiary-fixed-variant: '#004395'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  display-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style
The design system embodies a dependable, institutional clarity engineered for focused academic evaluation and grade computation. Targeted at university students, faculty, and academic administrators, the interface establishes an atmosphere of intellectual rigor, mathematical certainty, and calm efficiency.

The visual approach unites corporate modernity with academic functionalism. Rather than relying on decorative gradients or whimsical motion, the system utilizes high-contrast typography, disciplined alignments, balanced borders, and generous whitespace. Every visual element exists to facilitate rapid data entry, accurate parsing of complex weighting systems, and unambiguous feedback of calculation results.

## Colors
The palette leverages a crisp, paper-like background environment paired with authoritative deep navy and slate tones, punctuated by restrained royal blue accents:

- **Primary (`#2563EB`)**: Directs focus to core interactive affordances—primary submission triggers, active state toggles, and critical grade targets.
- **Secondary (`#0F172A`)**: The anchor tone for primary headlines, data readouts, and high-emphasis metric displays, providing maximum contrast against white surfaces.
- **Tertiary (`#3B82F6`)**: Used for secondary focus rings, informational chips, and sub-metric trends.
- **Neutrals**:
  - `#FFFFFF`: Pure surface for elevated cards, inputs, and primary content modules.
  - `#F8FAFC`: Canvas background to prevent visual fatigue and create soft contrast against containers.
  - `#E2E8F0`: Structural hair-line borders for clean segmentations.
  - `#334155` and `#64748B`: Body text and metadata labels.

## Typography
Typography is set strictly in Inter to maximize cross-platform legibility and uniform metric layout. 

Tabular figures (`font-variant-numeric: tabular-nums`) must be applied across all grade inputs, credit displays, coefficients, and summary cards to prevent visual jitter during real-time calculation. Use negative letter spacing on titles above 20px to sustain structural density. Maintain strict distinction between body copy (`400`), interactive labels (`500`), and numeric key metrics (`600` or `700`).

## Layout & Spacing
The layout adheres to an 8px architectural grid with a 12-column fluid structure on desktop, a 6-column system on tablet, and a 4-column stack on mobile devices.

- **Desktop (≥ 1024px)**: Dual-pane focus with sticky calculation summaries alongside module evaluation tables. Outer margins scale to `margin-desktop`, with `gutter-desktop` separating inputs.
- **Tablet (768px – 1023px)**: Responsive reflow prioritizing module tables full-width, placing cumulative averages directly below the header or as a persistent bottom summary bar.
- **Mobile (< 768px)**: Single-column linear layout. Outer padding drops to `margin`, and internal card padding leverages `space-md` to preserve viewport density.

## Elevation & Depth
Depth in this system is conveyed through structural containment rather than heavy lighting simulations:

- **Flat Stratification**: The main workspace rests upon the `#F8FAFC` foundation. Cards, data tables, and input panels rest on clean `#FFFFFF` with precise `1px solid #E2E8F0` borders.
- **Restrained Elevation**:
  - *Standard Surface*: Zero blur, relying strictly on the structural border.
  - *Active / Hover Card*: `0 2px 4px 0 rgba(15, 23, 42, 0.04), 0 1px 2px 0 rgba(15, 23, 42, 0.02)`.
  - *Dropdowns / Popovers*: `0 10px 15px -3px rgba(15, 23, 42, 0.06), 0 4px 6px -4px rgba(15, 23, 42, 0.04)`.
- **Focus Hierarchy**: Focus states must use an outer 2px ring in `#2563EB` with an offset of 2px, ensuring accessibility during rapid keyboard data entry.

## Shapes
In alignment with roundedness level `1` (Soft), standard elements feature subtle `0.25rem` (4px) radii. Large cards, modal dialogs, and segmented table containers use `rounded-lg` (`0.5rem` / 8px). 

This soft geometry balances the precision of tabular academic computation with a contemporary, accessible feel. Pure pill shapes are restricted strictly to status badges (e.g., "Passed", "Retake", "Validated") to differentiate categorical tags from interactive controls.

## Components

### Buttons
- **Primary**: Solid `#2563EB` fill, white text, 4px radius, `0.5rem 1rem` padding. Subtle brightness decrease on hover (`#1D4ED8`).
- **Secondary / Outlined**: White surface, 1px `#E2E8F0` border, `#0F172A` text. Hover shifts to `#F8FAFC` background with `#CBD5E1` border.
- **Destructive (Module Removal)**: Transparent surface, `#EF4444` text, soft `#FEE2E2` hover state.

### Input Fields & Calculation Controls
- Crisp `#FFFFFF` background with 1px `#E2E8F0` border and 4px radius. 
- Right-aligned monospaced text for numerical marks and coefficient weights.
- Inner padding `space-sm` vertically, `space-md` horizontally.
- Validation states: Soft red border (`#EF4444`) with accompanying subtext for invalid grade entries (e.g., marks out of bounds).

### Cards & Module Containers
- White background with single-pixel `#E2E8F0` frame and 8px border radius.
- Headers separate visually via a subtle bottom border (`#F1F5F9`).
- Modules grouped into semesters should feature explicit coefficient counters alongside cumulative credit summaries.

### Badges & Chips
- Semesters, modules, and validation thresholds display using compact pill tags (`rounded-full`, text size `12px`, font weight `500`).
- Positive status (Validated): `#ECFDF5` background with `#047857` text.
- Warning / Remedial (Retake): `#FFFBEB` background with `#B45309` text.

### Data Tables & Module Lists
- Border-collapse with `#E2E8F0` horizontal lines.
- Alternating rows avoid dark zebra striping; instead, subtle hover highlights (`#F8FAFC`) identify the active row.
- Table headers are uppercase `label-sm` with slate `#64748B` foreground.

### Cumulative Summary Metric Display
- High-visibility anchor card for GPA and overall average.
- Primary number displayed in `display` size Inter Bold in deep `#0F172A`.
- Sub-text indicates passing criteria and credit tally with clear visual cues.