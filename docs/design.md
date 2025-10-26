## 1) Design Philosophy

* **Less, but better**: The design must feel inevitable, not decorative. Remove anything that does not serve utility or clarity.
* **Grid as a silent system**: A consistent grid ensures rhythm across homepage, PLPs, and PDPs. Products must feel like they “breathe.”
* **Neutral brand-first canvas**: Design must let the photography and product speak, not overwhelm them. Backgrounds: neutral whites, grays, subtle gradients.
* **Human-centered first**: Every touchpoint (filters, size guides, cart) must feel effortless, tactile, and respectful of user intent.

---

## 2) Color System - Electric Blue Focus

* **Foundation**: High-contrast neutral system with pure whites, deep blacks, and sophisticated grays creating a premium canvas
* **Primary Accent**: Electric Blue (#38A1F3) - used exclusively for CTAs, hover states, and key interactive elements to create focus and energy
* **Secondary Palette**: Complete neutral scale from neutral-50 to neutral-900 for typography hierarchy and subtle backgrounds  
* **State Colors**: Success (#22c55e), destructive (#ef4444), warning (#f59e0b) for feedback and system messages
* **Accessibility**: All combinations exceed WCAG AA standards with high-contrast ratios for readability

---

## 3) Typography

* **Type system**:

  * Headings: Sans-serif geometric (SF Pro Display, Inter, or similar). Bold weights, large sizes.
  * Body: Clean sans (SF Pro Text, Inter, Helvetica Now). Comfortable tracking and leading.
  * Monospace only for SKUs or developer-facing text.

* **Hierarchy**:

  * H1: 40–48px (hero/landing).
  * H2: 28–32px (section headers, PLPs).
  * Body: 16–18px, 24px line height.
  * Microcopy: 12–14px, muted gray.

---

## 4) Layout & Spacing

* **Grid**: 12-column responsive grid, with 16px gutters.
* **Section rhythm**: 80–120px vertical spacing between major sections (home, PLPs).
* **Consistency**: Use multiples of 8px for all spacing tokens.

---

## 5) Imagery

* **Photography direction**:

  * High-contrast, sharp, editorial-style product photography.
  * Neutral backdrops for PLPs/PDPs (light or studio gray).
  * Lifestyle/editorial shots in hero blocks and “How Do You Train?” sections.

* **Ratios**:

  * Product cards: 4:5 vertical (consistent grid).
  * PDP hero: 1:1 or 3:4 depending on device.
  * Carousels: fixed height to maintain rhythm.

* **Motion**: Minimal but intentional. Subtle fade/slide, parallax on hero. Avoid noisy animations.

---

## 6) Components & UI

**Header / Navigation**

* Minimal bar with logo left, nav center, utilities (search, cart, account) right.
* Mega-nav uses imagery sparingly: one strong visual per panel, rest is clean text links.

**Search Overlay**

* Full-screen takeover on desktop; edge-to-edge on mobile.
* Search bar centered, results appear instantly.
* Autocomplete shows products + collections.

**Product Listing (PLP)**

* Card: clean edge-to-edge image, hover secondary image, product name + price below.
* Quick add: slide-up size picker on hover/tap.
* Filters: slide-out drawer on mobile, left rail on desktop. Minimal toggle chips, clean swatches.

**Product Detail (PDP)**

* Gallery first, copy second. User should “fall in love” with the product before reading.
* Variant selectors: tactile swatches, clear disabled states, large tappable targets.
* Sticky ATC on mobile, elegantly minimal.
* Expandable sections (accordion) for description, materials, shipping.

**Cart / Checkout**

* Cart: side drawer, clean summary, clear CTA.
* Checkout: only essential steps. Clear typography, no clutter. White space = calm.

---

## 7) Tone of Voice

* **Direct, human, and confident**.
* Product copy should describe **function first, emotion second**:

  * “Seamless leggings built for movement.”
  * “Designed for training. Styled for everywhere.”
* Avoid exclamation marks, buzzwords, or over-selling.

---

## 8) Accessibility & Inclusivity

* Tap targets ≥ 44px.
* VoiceOver / screen readers tested on PDP flows.
* Size guides must account for different body types, not only “athletic fit.”
* Photography inclusive across gender, skin tones, and body types.

---

## 9) Branding System

* **Logo**: Monochrome, flat. Never gradient, never shadow.
* **Iconography**: Outline icons, consistent stroke. From Lucide or custom.
* **Microinteractions**: Consistent easing (cubic-bezier standard curve), 200–250ms duration.

---

## 10) Deliverables for Build

* **Design tokens**: Color, spacing, typography in JSON for Tailwind config.
* **Component library**: Figma components mapped 1:1 to React (shadcn).
* **Mockups**: Home, PLP, PDP, Cart, Checkout. Both desktop + mobile.
* **Motion spec**: Hero fade, hover transitions, drawer slide.

---

## 11) Guardrails

* No gradients in background unless brand-defined.
* Never more than one accent color in play.
* No more than 2 typefaces.
* CTA placement always bottom-right or primary focus area.
* Always respect breathing room: never collapse content blocks.

[![Nike - Sneakers Website Design UI on Behance](https://tse2.mm.bing.net/th/id/OIP.glC1mL-5EszLWoh34iGYEQHaFj?r=0\&pid=Api)](https://www.behance.net/gallery/155573343/Nike-Sneakers-Website-Design-UI)

I'm starting with a carousel of **four high-fi visual references** (Nike/Gymshark-style fitness e-commerce layouts) to ground our design detail expansion.

---

## Design Guidelines Addendum (Technical & Specific)

Below is a **super detailed layer** on top of the existing design spec, with exact values, hex codes, typographic scales, spacing, icon sizing—everything you need to implement a polished UI that channels Nike and Gymshark.

---

### 1. Electric Blue Brand Palette - Current Implementation

Our current design system uses a refined electric blue palette with high-contrast neutrals:

| Role                 | HSL Value                | Hex Equivalent | Usage Context                                          |
| -------------------- | ------------------------ | -------------- | ----------------------------------------------------- |
| Electric Blue (Primary) | `hsl(207, 94%, 60%)`   | `#38A1F3`     | Primary CTAs, key interactive elements, brand accents |
| Electric Blue Hover     | `hsl(207, 94%, 70%)`   | `#59B3F5`     | Hover states for primary buttons and links           |
| Electric Blue Light     | `hsl(207, 94%, 85%)`   | `#A5D0F9`     | Background highlights and subtle accents             |
| Background              | `hsl(0, 0%, 100%)`     | `#FFFFFF`     | Primary background, cards, clean surfaces            |
| Foreground              | `hsl(222.2, 84%, 4.9%)`| `#020817`     | Primary text, high-contrast headings                 |
| Muted                   | `hsl(210, 40%, 96%)`   | `#F1F5F9`     | Subtle backgrounds, disabled states                  |
| Neutral Scale           | `hsl(210, 40%, X%)`    | Various       | Complete grayscale from 50-900 for hierarchy        |

**Implementation Notes:**

* All colors use HSL format for consistent theming and easy manipulation
* Electric blue creates energy and focus without overwhelming the neutral foundation
* Neutral scale provides sophisticated typography hierarchy and subtle backgrounds
* High contrast ratios ensure accessibility compliance across all combinations

---

### 2. Typography Scale (Inter or system sans-serif)

| Element             | Font Size | Line Height | Weight      |
| ------------------- | --------- | ----------- | ----------- |
| H1 (Hero / Landing) | 48px      | 56px        | 700         |
| H2 (Section Header) | 32px      | 40px        | 600         |
| H3 (Card Title)     | 24px      | 32px        | 600         |
| Body Text           | 16px      | 24px        | 400         |
| Small / Meta        | 14px      | 20px        | 400 (muted) |
| Microcopy           | 12px      | 16px        | 400 (muted) |

**Font Weights**: Inter 400 (regular), 600 (semi-bold), 700 (bold).
**Tracking**: H1 + H2: -0.5px; Body: 0 normal; Microcopy: +0.25px for legibility.

---

### 3. Spacing & Layout System

* **Grid**: 12-column responsive grid with 16px gutters.
* **Vertical rhythm**: section margins set multiples of 24px: e.g., 120px top/bottom on homepage blocks, 80px for department sections.
* **Padding**:

  * Container horizontal padding: 24px mobile, 64px desktop.
  * Card padding: 16px internal.
* **Component spacing**:

  * Button vertical padding: 14px top/bottom; 32px horizontal.
  * Filter chips: 8px padding inside, 8px margin between.
  * Image gallery thumbnails: 8px gap.

---

### 4. Button Styles

* **Primary (CTA)**:

  * Background: `#38A1F3`
  * Text: `#FFFFFF`, uppercase, 14px tracking +1px
  * Border-radius: 4px
  * Shadow: `0 2px 4px rgba(0,0,0,0.1)`
  * Hover: background `#7FC6EF`, shadow stronger `0 4px 8px rgba(0,0,0,0.15)`

* **Secondary (Outline)**:

  * Border: 2px solid `#333333`
  * Text: `#333333`
  * Hover: text `#38A1F3`, border `#38A1F3`

---

### 5. Icons & Interactive Elements

* **Icon size**: 24x24px primary (e.g., search, cart), 20px secondary (filters).
* **Stroke width**: 2px for consistency.
* **Hover states**: icons fill accent (`#38A1F3`) on hover; otherwise default `#333333`.
* **Accessible tap targets**: minimum 44x44px with 8px surrounding padding.

---

### 6. Imagery & Motion

* **Image ratios**:

  * Product card: 4:5 (e.g., 400x500).
  * PDP gallery: 1:1 square or 3:4 vertical hero.
* **Hover transition**: image swap / fade in 0.3s ease-in-out.
* **Carousel slide**: 300ms, ease-out, left-to-right.

---

### 7. Elevation / Shadows

| Level            | Box-Shadow                   |
| ---------------- | ---------------------------- |
| Card             | `0 1px 3px rgba(0,0,0,0.1)`  |
| Drawer / Overlay | `0 3px 8px rgba(0,0,0,0.2)`  |
| Modal / MegaNav  | `0 8px 16px rgba(0,0,0,0.3)` |

---

### 8. State Styles (Form Controls)

* **Focus ring**: 2px solid accent `#38A1F3` with 4px padding.
* **Input states**:

  * Default: border `#CCCCCC`
  * Focused: `#38A1F3`
  * Error: border `#D93E30`, label text `#D93E30`

---

### 9. Accessibility Standards

* **Color contrast**: Title on background > 7:1 contrast (e.g., `#222222` on `#F9F9F9`).
* **Minimum tap target size**: 44px.
* **ARIA**: Mega-nav must support keyboard focus, `aria-expanded` and `aria-haspopup`.
* **Alt text**: every image must have descriptive `alt`.

---

### 10. Design Tokens - Current Implementation

Our tailwind.config.ts reflects the kinetic, electric blue aesthetic:

```typescript
export default {
  theme: {
    extend: {
      colors: {
        // Electric Blue System - Primary brand accent
        'electric-blue': {
          DEFAULT: 'hsl(var(--electric-blue))',      // hsl(207, 94%, 60%) - #38A1F3
          hover: 'hsl(var(--electric-blue-hover))',  // Hover state variant
          light: 'hsl(var(--electric-blue-light))',  // Light accent variant
        },
        
        // High-Contrast Neutral System
        neutral: {
          50: 'hsl(var(--neutral-50))',   // Lightest gray
          100: 'hsl(var(--neutral-100))', // Very light gray  
          200: 'hsl(var(--neutral-200))', // Light gray
          300: 'hsl(var(--neutral-300))', // Medium-light gray
          400: 'hsl(var(--neutral-400))', // Medium gray
          500: 'hsl(var(--neutral-500))', // True medium
          600: 'hsl(var(--neutral-600))', // Medium-dark gray
          700: 'hsl(var(--neutral-700))', // Dark gray
          800: 'hsl(var(--neutral-800))', // Very dark gray
          900: 'hsl(var(--neutral-900))', // Darkest gray
        },
        
        // Semantic color system for consistent theming
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
      },
      
      // Kinetic animation system
      keyframes: {
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        'hover-lift': {
          from: { transform: 'translateY(0px)' },
          to: { transform: 'translateY(-8px)' }
        },
        'electric-glow': {
          '0%, 100%': { boxShadow: '0 0 20px hsl(207 94% 60% / 0.3)' },
          '50%': { boxShadow: '0 0 30px hsl(207 94% 60% / 0.5)' }
        }
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        'hover-lift': 'hover-lift 0.3s ease-out', 
        'electric-glow': 'electric-glow 2s ease-in-out infinite'
      }
    }
  }
};
```

**Animation Philosophy:**
- Subtle but purposeful motion that enhances the premium feel
- Hover effects create tactile feedback and engagement
- Staggered animations create visual rhythm and polish
- Electric glow effects add energy to key interactive elements

---

## Summary

This **Design Addendum** turns broad-strokes guidelines into actionable tokens and styles. You now have:

* Real hex codes & color roles
* Exact typographic scale
* Spacing & layout system
* Button, icon, shadow, state specs
* Tailwind-friendly token config
* Accessibility-first states and contrast guidelines

Let me know if you want a Figma tokens file or a component-level UI spec next.

[1]: https://brandfetch.com/gymshark.com?utm_source=chatgpt.com "Gymshark Logo & Brand Assets (SVG, PNG and vector)"
[2]: https://www.gymshark.com/?utm_source=chatgpt.com "Gymshark Official Store - Gym Clothes & Workout Clothes"
