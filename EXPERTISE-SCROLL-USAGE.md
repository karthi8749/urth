# Quick Start Guide - Expertise Horizontal Scroll

## What You Get

A premium scroll-driven horizontal journey through your four expertise areas:

**01 Architecture** → **02 Human-Centric Design** → **03 Interior Design** → **04 Design Management**

## Visual Flow

```
┌─────────────────────────────────────────────────────┐
│ EXPERTISE                                   ●○○○    │  ← Progress indicator
│                                                     │
│                                                     │
│    01                                               │  ← Large number (9xl)
│                                                     │
│    Architecture                                     │  ← Title (6xl)
│                                                     │
│    We design architecture that responds...          │  ← Description
│    ───                                              │  ← Orange accent
│                                                     │
└─────────────────────────────────────────────────────┘

              SCROLL DOWN ↓
              (Section pins, content moves horizontally →)

┌─────────────────────────────────────────────────────┐
│ EXPERTISE                                   ○●○○    │
│                                                     │
│                                                     │
│              02                                      │
│                                                     │
│              Human-Centric Design                   │
│                                                     │
│              We design around the way people...     │
│              ───                                     │
│                                                     │
└─────────────────────────────────────────────────────┘

              CONTINUE SCROLLING ↓

┌─────────────────────────────────────────────────────┐
│ EXPERTISE                                   ○○●○    │
│                                                     │
│                            03                        │
│                                                     │
│                            Interior Design          │
│                            ...                       │
└─────────────────────────────────────────────────────┘

              KEEP SCROLLING ↓

┌─────────────────────────────────────────────────────┐
│ EXPERTISE                                   ○○○●    │
│                                                     │
│                                  04                  │
│                                                     │
│                                  Design Management  │
│                                  ...                 │
└─────────────────────────────────────────────────────┘

              SECTION RELEASES ↓
              (Normal vertical scroll continues)
```

## Key Features

### ✅ Scroll-Controlled
- Vertical scroll = horizontal movement
- Direct 1:1 relationship (scrub: 1)
- No buttons, no carousel, no autoplay

### ✅ Smooth Transitions
- Active item: `opacity: 1`, `scale: 1`
- Inactive items: `opacity: 0.4`, `scale: 0.96`
- Numbers animate upward as they activate

### ✅ Visual Feedback
- Progress dots at bottom
- Active dot turns orange
- Orange accent line under each item

### ✅ Mobile-Optimized
- Desktop: Horizontal scroll experience
- Mobile: Clean vertical layout
- No cramped text or overflow issues

### ✅ Accessible
- Respects `prefers-reduced-motion`
- Keyboard navigable
- Semantic HTML structure

## How to Use

The component is already integrated into the Expertise page:

```tsx
import { ExpertiseHorizontalScroll } from "@/components/sections/expertise-horizontal-scroll";

<ExpertiseHorizontalScroll />
```

## Customization Options

### Colors
Edit these in the component:
- Number color: `text-cream/20` (line 248)
- Active number: Changes to full opacity
- Title color: `text-cream` (line 254)
- Description: `text-cream/70` (line 259)
- Orange accent: `bg-orange` (line 263)
- Progress dots: Orange for active, cream/30 for inactive

### Spacing
- Item width: `maxWidth: "900px"` (line 243)
- Horizontal padding: `px-6 md:px-12 lg:px-20` (line 241)
- Progress dot size: `h-1.5 w-1.5` (line 221)

### Animation Timing
- Scrub amount: `scrub: 1` (line 97) - Lower = more lag, higher = snappier
- Scale range: `0.96` to `1` (lines 108-112)
- Opacity range: `0.4` to `1` (lines 107-113)

### Typography
- Number: `text-7xl md:text-8xl lg:text-9xl` (line 248)
- Title: `text-4xl md:text-5xl lg:text-6xl` (line 254)
- Description: `text-base md:text-lg lg:text-xl` (line 259)

## Content Structure

Content is defined at the top of the component:

```tsx
const expertiseData = [
  {
    number: "01",
    title: "Architecture",
    description: "We design architecture that...",
  },
  // ... more items
];
```

## Testing Checklist

- [ ] Desktop: Scroll smoothly controls horizontal movement
- [ ] Section pins during animation
- [ ] Section releases after fourth item
- [ ] Progress dots update correctly
- [ ] Orange accent appears on active item
- [ ] Mobile: Shows vertical layout (no horizontal scroll)
- [ ] Reduced motion: Shows static layout
- [ ] No jank or frame drops during scroll
- [ ] Typography is readable at all sizes
- [ ] Keyboard navigation works

## Browser Compatibility

Works in all modern browsers:
- ✅ Chrome/Edge 88+
- ✅ Firefox 85+
- ✅ Safari 14+
- ✅ Mobile Safari (iOS 14+)
- ✅ Chrome Mobile

## Performance

The animation uses GPU-accelerated transforms:
- `transform: translate3d()` ← Fast
- `will-change: transform` ← Optimization hint
- No layout thrashing
- Passive scroll listeners
- Efficient ScrollTrigger setup

Expected 60fps on modern devices.

## Troubleshooting

### Animation doesn't work
- Check browser console for errors
- Verify GSAP and ScrollTrigger are loaded
- Ensure component is client-side (`"use client"`)

### Scroll feels laggy
- Increase `scrub` value for snappier response
- Check for other scroll listeners
- Test on different device

### Mobile layout broken
- Check `md:` breakpoint (768px)
- Verify mobile styles aren't overridden

### Section doesn't release
- Check `end` calculation in ScrollTrigger
- Verify track width calculation
- Test with smaller content

## Need Help?

Check these files:
1. `src/components/sections/expertise-horizontal-scroll.tsx` - Main component
2. `src/app/expertise/page.tsx` - Page integration
3. `EXPERTISE-SCROLL-IMPLEMENTATION.md` - Technical details
