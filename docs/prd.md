# PRD — Fitness/Clothing E-Commerce Template (JSON-Based, Gymshark-Style)

## 0) Goals

* Ship a **Lovable template** replicating Gymshark/Nike/Bombshell shopping flows.
* Use **static JSON files** in `/data` as the source of truth (no Supabase, no DB).
* Pages (Home, Departments, PLPs, PDPs, Collections) are programmatically generated from JSON.
* Cart + Checkout are **mocked** (client-side only).
* Extractor scripts convert raw HTML/XML into JSON files (already produced from `gymshark.xml`).

---

## 1) Data Source of Truth

All catalog/content lives in `/data`.

* **`/data/products.json`** → Products with variants & images (generated from extractor).
* **`/data/categories.json`** → Category hierarchy (currently empty; can be filled from category pages).
* **`/data/collections.json`** → Named groupings like “new-arrivals,” “sale.”
* **`/data/content-blocks.json`** → Hero sections, promo grids, SEO blocks for homepage/department pages.

Pages import JSON directly via file system:

```ts
import products from "@/data/products.json";
```

---

## 2) Routes / Information Architecture

* `/` → Home (hero blocks, promos, featured collections, SEO content).
* `/men`, `/women` → Department hubs (categories pulled from `categories.json`).
* `/category/[slug]` → Category PLPs (grid, filters).
* `/collection/[slug]` → Collection PLPs.
* `/product/[slug]` → PDPs.
* `/search` → Client-side search across `products.json`.
* `/cart` → Mock cart (localStorage).
* `/checkout` → Mock checkout (two-step: shipping → confirmation).

---

## 3) JSON Schema References

### products.json

```json
[
  {
    "id": "p001",
    "slug": "everyday-seamless-leggings",
    "title": "Everyday Seamless Leggings",
    "priceCents": 3800,
    "currency": "USD",
    "fit": "regular",
    "colorName": "Cherry Purple",
    "variants": [
      {
        "id": "p001-v1",
        "sku": "everyday-seamless-leggings-sku",
        "size": "M",
        "images": [
          { "url": "https://cdn.shopify.com/.../leggings-front.jpg", "alt": "Front view" }
        ]
      }
    ]
  }
]
```

### categories.json

```json
[
  { "slug": "leggings", "name": "Leggings", "parent": "women" }
]
```

### collections.json

```json
[
  { "slug": "new-arrivals", "name": "New Arrivals", "productSlugs": ["everyday-seamless-leggings"] }
]
```

### content-blocks.json

```json
[
  {
    "page": "/",
    "blockType": "hero",
    "title": "Train Different",
    "subtitle": "Engineered for performance",
    "mediaUrl": "/images/hero/train.jpg",
    "ctaLabel": "Shop New Arrivals",
    "ctaHref": "/collection/new-arrivals"
  }
]
```

---

## 4) Page Generation

* **Home**: Render blocks from `content-blocks.json`.
* **Department pages**: Read categories from `categories.json`.
* **PLPs**: Filter products from `products.json` by `categories` or `collections`.
* **PDPs**: Resolve by `slug`. Display images, variants, details.
* **Search**: Client-side filter over product titles/descriptions.

---

## 5) Components Inventory

* **Global**: Header (mega-nav), Footer, Search overlay.
* **PLP**: ProductCard, FilterDrawer (filters via product fields), SortDropdown.
* **PDP**: ImageGallery, VariantSelector, StickyATC, RecommendationsCarousel.
* **Cart/Checkout**: CartDrawer, CartPage, CheckoutSteps.
* **Content Blocks**: HeroCarousel, PromoGrid, SEOBlock.

---

## 6) Extractor & Importer Flow

* **Extractor (`scripts/extractors/gymshark_html_extractor.ts`)**

  * Parses HTML/XML into normalized JSON (already used for your `gymshark.xml`).
  * Produces `products.json`.

* **Importer (`scripts/importers/jsonProductImporter.ts`)**

  * Merges `extracted.json` into existing `products.json`.
  * Dedupes by slug.

> Collections and categories may be manually edited in their respective JSON files.

---

## 7) Cart & Checkout (Mock)

* Cart stored in `localStorage`.
* Checkout collects name, email, address → generates fake order id.
* No payments.

---

## 8) SEO & Accessibility

* Canonical slugs derived from `slug`.
* `sitemap.xml` auto-generated from JSON.
* Images include `alt` text from extractor.
* Filters, dialogs, and nav are keyboard-navigable.

---

## 9) Delivery Plan

* **Week 1**: Integrate JSON data files, route scaffolding.
* **Week 2**: Build PLP/PDP from JSON.
* **Week 3**: Cart + Checkout mocks.
* **Week 4**: Styling & Apple-grade design polish.

---

## 10) Risks & Mitigation

* **HTML structure drift** → Extractor must be maintained if source markup changes.
* **Limited product fields** → Some data (sizes, reviews) missing; can be added manually in JSON.
* **Image hotlinking** → Option to mirror external images locally later.

Exactly. Your current PRD is solid, but it’s very “functional scope.” What it’s missing (and what will help Lovable generate more consistent, production-like code) are those **contracts and inventories** we talked about:

* Component Inventory & Naming Map
* Data Contracts (TypeScript types)
* Design Tokens reference (so the design doc and PRD link together)

Here’s a clean **PRD Addendum** you can append to the bottom of your JSON-based PRD.

---

# PRD Addendum — Component, Data, and Design Contracts

## 1. Component Inventory & Naming Map

All UI components must live in `/components/ui`. Filenames must match exactly.

### Global

* **Header.tsx** → Logo, navigation, search, cart.
* **MegaNav.tsx** → Expanding mega menu panel with category links + promo tiles.
* **Footer.tsx** → Footer links, social, newsletter.
* **SearchOverlay.tsx** → Full-screen search with autosuggest.

### Home / Content Blocks

* **HeroCarousel.tsx** → Carousel of hero banners.
* **PromoGrid.tsx** → 2x2 or 4-up promo tiles.
* **ContentBlockRenderer.tsx** → Reads `content-blocks.json` and renders correct block.
* **SEOBlock.tsx** → Rich text SEO copy.

### PLP (Product Listing Pages)

* **ProductCard.tsx** → Image, title, price, hover secondary image, quick-add.
* **ProductGrid.tsx** → Grid layout of product cards.
* **FacetFilter.tsx** → Drawer of filters (size, color, price).
* **SortDropdown.tsx** → Sort by featured, newest, price.

### PDP (Product Detail Page)

* **ProductGallery.tsx** → Image/video gallery with thumbnails.
* **VariantSelector.tsx** → Color swatches, size grid.
* **StickyATC.tsx** → Sticky add-to-cart bar (mobile).
* **RecommendationsCarousel.tsx** → “You may also like.”

### Cart & Checkout

* **CartDrawer.tsx** → Slide-in cart summary.
* **CartPage.tsx** → Dedicated `/cart` page.
* **CheckoutSteps.tsx** → Two-step mock checkout.

---

## 2. Data Contracts (TypeScript Types)

File: `/types/product.ts`

```ts
export type Product = {
  id: string;
  slug: string;
  title: string;
  priceCents: number;
  currency: string;
  fit?: string;
  colorName?: string;
  categories?: string[];
  collections?: string[];
  variants: Variant[];
};

export type Variant = {
  id: string;
  sku: string;
  size?: string;
  colorName?: string;
  images: ProductImage[];
};

export type ProductImage = {
  url: string;
  alt?: string;
};
```

Other types (optional):

* `Category { slug: string; name: string; parent?: string }`
* `Collection { slug: string; name: string; productSlugs: string[] }`
* `ContentBlock { page: string; blockType: string; title?: string; mediaUrl?: string; ctaLabel?: string; ctaHref?: string }`

---

## 3. Design Tokens Reference

Cross-reference the design guidelines directly in Tailwind config.

File: `tailwind.config.js`

```js
theme: {
  colors: {
    accent: {
      light: '#7FC6EF',
      DEFAULT: '#38A1F3',
      dark: '#1F78D1',
    },
    text: {
      DEFAULT: '#222222',
      secondary: '#777777',
      muted: '#888888',
    },
    bg: {
      light: '#FFFFFF',
      DEFAULT: '#F9F9F9',
      dark: '#F0F0F0',
    },
    error: '#D93E30',
    success: '#39A85A',
    disabled: '#C0C0C0',
  },
  fontSize: {
    h1: ['48px', '56px'],
    h2: ['32px', '40px'],
    h3: ['24px', '32px'],
    base: ['16px', '24px'],
    sm: ['14px', '20px'],
    xs: ['12px', '16px'],
  },
  borderRadius: { DEFAULT: '4px' },
}
```

---

## 4. Development Guardrails

* **File placement**: All UI components in `/components/ui`, types in `/types`, data in `/data`.
* **Imports**: Always import from `@/types` or `@/data` — no ad-hoc JSON parsing inline.
* **Consistency**: Product pages must always consume `products.json` via the `Product` type.
* **Testing**: At least one Playwright test to ensure `ProductCard` renders a title + price + image for each product in `products.json`.

---

### Why this matters

* Prevents **naming drift** in component files.
* Ensures JSON schema → Types → Components stay aligned.
* Gives Lovable deterministic contracts instead of letting it improvise.

Perfect — I can expand the PRD + design guidance with **e-commerce best practices** tailored to the exact Gymshark-style layout you’ve screenshotted. Think of this as a **UX playbook section**: bullet points per screen/section with proven e-com conventions.

---

# 📌 E-Commerce Best Practices Addendum (Screen by Screen)

## 1. **Homepage**

* **Hero Banner**

  * Always feature a *clear CTA* (“Shop Women”, “Shop Men”) above the fold.
  * Show a product in action, not just flat-lay (drives lifestyle connection).
  * Use concise copy: benefit-driven headline + price anchor (like “From \$24”).

* **Featured Collections / Campaigns**

  * Display *2–3 hero collections* (e.g., “Everyday Seamless”, “All-Rounder Shorts”).
  * Consistency: Always image grid + CTA button → collection page.
  * Ensure mobile breakpoints keep banners legible and tappable.

* **Editorial Content Blocks**

  * Sections like “How Do You Train?” → map to lifestyle/intent (Running, Yoga, Gym).
  * Each tile should link to a filtered PLP (not generic collection).

* **Popular Now**

  * Social proof: use trending products with real images.
  * Always label why it’s “Popular” (best seller, trending on TikTok, staff pick).

---

## 2. **PLP (Category & Collection Pages)**

* **Product Grid**

  * Use *hover-to-swap* images (front/back, lifestyle vs studio).
  * Show **price, color swatches, and quick-add** directly on cards.
  * 3–4 columns desktop, 2 columns mobile.

* **Filters**

  * Collapse less-used facets (material, activity), expand top ones (size, color).
  * Always show active filters as removable chips above results.
  * Sort default = “Featured”; allow “Newest” and “Price Low→High”.

* **SEO Block**

  * Place longform SEO content *below* product grid, never above.
  * Use H2/H3s with internal links for crawlability.

---

## 3. **PDP (Product Detail Page)**

* **Gallery**

  * Support zoom/pinch for product inspection.
  * Always include 1 lifestyle photo + 2–3 product shots.
  * Video slot is a plus (show fit in motion).

* **Variants**

  * Use **color swatches** with actual thumbnails (not just dots).
  * Size grid should mark unavailable sizes clearly (greyed out).
  * Add “What’s my size?” CTA → size guide modal.

* **ATC (Add to Cart)**

  * Sticky CTA on mobile.
  * Default state = disabled until size selected.
  * Show free shipping/returns reassurance near button.

* **Cross-Sells**

  * “Complete the Look” carousel: link to complementary items.
  * “You May Also Like”: related products by category.

* **Content Hierarchy**

  * Tabs/accordions for: Description, Material & Care, Shipping/Returns.
  * Reviews (even if stubbed) add trust.

---

## 4. **Cart / Checkout**

* **Cart Drawer**

  * Slide-in drawer on add to cart (quick confirm).
  * Show line item image, size, color, price, qty controls.
  * Keep checkout CTA above fold on mobile.

* **Cart Page**

  * Show upsell modules: “Add a Top to Complete Your Set”.
  * Display shipping threshold: “You’re \$10 away from free shipping!”.
  * Add coupon/promo code input inline.

* **Checkout**

  * Keep steps minimal (contact → shipping → confirmation).
  * Use trust badges/logos for reassurance (SSL, returns).
  * On confirmation: show order summary + “Continue Shopping” CTA.

---

## 5. **Footer**

* **Navigation**

  * Mirror top-level categories for SEO/internal linking.
  * Add customer service links (FAQ, returns, contact).
  * Newsletter signup = prominent, simple email field.

* **Social Proof**

  * Social links + brand badges (partnerships, sustainability).
  * Footer copy should include *brand mission* short form.

---

## 6. **Global Best Practices**

* **Performance**

  * LCP < 2.5s (optimize hero images).
  * Lazy load secondary images.

* **Accessibility**

  * Alt text for every image.
  * Keyboard navigable menus and filters.

* **Consistency**

  * Use same CTA style across all screens.
  * Always fallback from lifestyle to product detail imagery.

* **Conversion Drivers**

  * Urgency: low stock badges.
  * Social proof: star ratings, “X people viewing this now” (optional).
  * Trust: clear return/refund policy links on PDP + cart.