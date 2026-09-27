# Expertise Section with Portrait Images

## Overview
The Expertise horizontal scroll section now includes beautiful portrait image panels on the left side of each expertise item, creating a premium architectural magazine-style layout.

## Visual Layout

### Desktop (≥768px)
```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  ┌──────────┐                                                │
│  │          │  01                                            │
│  │ Portrait │                                                │
│  │  Image   │  Architecture                                 │
│  │  Panel   │                                                │
│  │          │  We design architecture that responds...      │
│  │ Pattern  │  ───                                           │
│  │ Overlay  │                                                │
│  │          │                                                │
│  │    01    │                                                │
│  └──────────┘                                                │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

As user scrolls horizontally:
```
Image → Content → Image → Content → Image → Content → Image → Content
  01       01       02       02       03       03       04       04
```

### Mobile (<768px)
```
┌─────────────────────────────┐
│  ┌────────────────────────┐ │  ← Portrait image (h-64)
│  │   Pattern + Gradient   │ │
│  │        01              │ │
│  └────────────────────────┘ │
│                             │
│  01                         │
│  Architecture               │
│  Description...             │
│  ───                        │
└─────────────────────────────┘
```

## Portrait Image Features

Each portrait panel includes:

### 1. **Layered Background**
- Base gradient with expertise-specific tint color
- Architectural brand pattern overlay
- Bottom-to-top fade for depth

### 2. **Large Watermark Number**
- Positioned at bottom left
- Ultra-large size (8xl on desktop, 9xl on large screens)
- Low opacity (5%) for subtle effect
- Creates architectural sophistication

### 3. **Small Label**
- Top left corner
- Uppercase tracking
- Low opacity
- Shows expertise title

### 4. **Color Palette per Expertise**

**01 Architecture:**
- Tint: Orange accent `rgba(250,79,1,0.22)`
- Pattern: Bold Orange

**02 Human-Centric Design:**
- Tint: Sky blue `rgba(147,186,186,0.20)`
- Pattern: Soft Cream

**03 Interior Design:**
- Tint: Soft cream `rgba(255,237,227,0.10)`
- Pattern: Soft Cream

**04 Design Management:**
- Tint: Sky blue variation `rgba(147,186,186,0.15)`
- Pattern: Bold Orange

## Dimensions

### Desktop Portrait Panels
- Width: `320px` (w-80)
- Large desktop: `380px` (lg:w-95)
- Height: Full viewport height
- Position: Fixed to left of each item

### Mobile Portrait Panels
- Width: Full width
- Height: `256px` (h-64)
- Position: Top of each section

## Technical Implementation

### Component Structure
```tsx
<div className="expertise-item">
  {/* Left: Portrait Image Panel */}
  <div className="portrait-panel">
    <div className="gradient-base" />
    <div className="brand-pattern-overlay" />
    <div className="bottom-fade" />
    <div className="watermark-number">01</div>
    <div className="small-label">Architecture</div>
  </div>
  
  {/* Right: Content */}
  <div className="content">
    <div className="number">01</div>
    <h2 className="title">Architecture</h2>
    <p className="description">...</p>
    <div className="orange-accent" />
  </div>
</div>
```

### Horizontal Scroll Behavior
- Each expertise item is full viewport width
- Portrait panel: Fixed width (320-380px)
- Content area: Flexible width (flex-1)
- Items scroll horizontally as track moves

### GSAP Animation
- Portrait panels move with their parent items
- Scale and opacity transitions apply to entire item
- Watermark numbers travel with panels
- Smooth scroll-driven movement

## Styling Details

### Portrait Panel Layers (Bottom to Top)
1. **Base gradient** - Expertise-specific tint
2. **Brand pattern** - SVG pattern at 12% opacity
3. **Bottom fade** - Gradient overlay for text legibility
4. **Watermark number** - White at 5% opacity
5. **Label text** - Cream at 30% opacity

### Content Area
- Max width: `768px` (2xl) on desktop
- Padding: Responsive (8 → 16 → 20)
- Typography hierarchy maintained
- Orange accent line below description

## Responsive Behavior

### Desktop (md: 768px+)
- Portrait panels always visible on left
- Horizontal scroll animation active
- Full-height panels
- Side-by-side layout

### Tablet (sm-md: 640-767px)
- Switches to mobile layout
- Vertical stacking
- Horizontal panel at top
- No horizontal scroll

### Mobile (<640px)
- Vertical card layout
- Portrait panel above content
- Reduced panel height (h-64)
- Smaller typography

## Brand Pattern Integration

Uses the existing `brandPatternSrc()` utility:
```tsx
import { brandPatternSrc } from "@/lib/brand-assets";

backgroundImage: `url(${brandPatternSrc(item.patternColor)})`
```

Pattern colors rotate:
- Orange for 01 and 04
- Cream for 02 and 03

## Performance Considerations

### GPU Acceleration
- Portrait panels use `transform` properties
- Patterns are SVG (scalable, small file size)
- Background images cached by browser

### Optimization
- `overflow: hidden` on panels prevents layout shift
- Fixed dimensions prevent reflow
- CSS gradients render efficiently
- Low-opacity overlays are GPU-friendly

## Accessibility

### Reduced Motion
- Portrait panels remain visible
- No separate animation on panels
- They move with parent item (follows main animation)

### Semantic Structure
- Images are decorative (no alt text needed)
- Watermark numbers are purely visual
- Content remains fully accessible

### Keyboard Navigation
- Portrait panels don't interfere with focus
- Content remains keyboard navigable
- ARIA attributes on content, not images

## Future Enhancements (Optional)

### Actual Project Images
Replace brand pattern panels with real architectural photos:

```tsx
const expertiseData = [
  {
    number: "01",
    title: "Architecture",
    imageUrl: "/images/expertise/architecture.jpg",
    // ... rest
  },
];
```

Then in component:
```tsx
<div 
  className="portrait-panel"
  style={{
    backgroundImage: `url(${item.imageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Keep gradient overlays for text legibility */}
</div>
```

### Parallax Effect
Add subtle parallax to portrait images:
```tsx
gsap.to(imagePanel, {
  y: -50,
  scrollTrigger: {
    trigger: item,
    containerAnimation: horizontalScroll,
    scrub: 1,
  },
});
```

### Hover States
Add interactive hover effects:
```css
.portrait-panel:hover {
  transform: scale(1.02);
  transition: transform 0.6s ease;
}
```

## Testing Checklist

Desktop:
- [ ] Portrait panels visible on left of each item
- [ ] Panels are 320px wide (380px on large screens)
- [ ] Brand pattern overlays visible at correct opacity
- [ ] Watermark numbers positioned at bottom left
- [ ] Each panel has correct color tint
- [ ] Horizontal scroll includes both panels and content
- [ ] No layout shift during scroll

Mobile:
- [ ] Portrait panels appear at top of each section
- [ ] Panels are full width, 256px height
- [ ] Content below panel is properly spaced
- [ ] Brand patterns scale appropriately
- [ ] All content remains readable
- [ ] No horizontal overflow

Both:
- [ ] Pattern SVGs load correctly
- [ ] Gradients render smoothly
- [ ] Typography hierarchy maintained
- [ ] Orange accent lines visible
- [ ] Build completes without errors

## File Modified

**`src/components/sections/expertise-horizontal-scroll.tsx`**
- Added `brandPatternSrc` import
- Extended `expertiseData` with `tint` and `patternColor`
- Added portrait panel markup (desktop)
- Added portrait panel markup (mobile)
- Updated layout to flex with fixed-width panel + flexible content
- Maintained all existing animations and behavior

## Related Documentation

- `EXPERTISE-SCROLL-IMPLEMENTATION.md` - Technical animation details
- `EXPERTISE-SCROLL-USAGE.md` - Quick start guide
- `HYDRATION-FIX.md` - SSR hydration solution
- `src/lib/brand-assets.ts` - Brand pattern utility

## Visual Reference

The portrait panels create a layout similar to:
- Architectural magazines (Dezeen, ArchDaily)
- Premium portfolio sites
- Editorial design layouts
- Museum exhibition displays

The combination of:
- Architectural patterns
- Moody gradients
- Large watermark numbers
- Horizontal scroll journey

Creates a sophisticated, premium user experience that reflects Urth Studio's design philosophy.
