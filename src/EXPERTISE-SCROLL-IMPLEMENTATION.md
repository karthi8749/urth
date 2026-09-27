# Expertise Horizontal Scroll Implementation

## Overview
The Expertise section now features a scroll-driven horizontal journey animation where vertical page scrolling controls horizontal movement through four expertise items.

## What Was Changed

### 1. New Component Created
**File**: `src/components/sections/expertise-horizontal-scroll.tsx`

This component implements:
- **Horizontal scroll animation** controlled by vertical scroll
- **Section pinning** while the animation plays
- **Active state transitions** with subtle opacity and scale changes
- **Progress indicator** at the bottom showing current position
- **Number animations** that fade in as items become active
- **Mobile fallback** with clean vertical layout
- **Accessibility support** with `prefers-reduced-motion` compliance

### 2. Updated Expertise Page
**File**: `src/app/expertise/page.tsx`

Replaced the previous vertical pillar rows with the new `ExpertiseHorizontalScroll` component.

## Technical Implementation

### GSAP ScrollTrigger
Uses GSAP's ScrollTrigger plugin (already in project dependencies) for:
- Pinning the section during horizontal animation
- Smooth scrubbing tied directly to scroll position
- Container animation for nested scroll triggers
- Responsive recalculation on window resize

### Animation Features
1. **Horizontal Movement**: Uses `translate3d()` for GPU-accelerated transforms
2. **Active States**: Items scale from 0.96 to 1.0 and fade from 40% to 100% opacity
3. **Number Animation**: Subtle upward movement and fade-in
4. **Progress Dots**: Orange highlight moves with scroll progress
5. **Scroll Physics**: `scrub: 1` provides smooth, directly-controlled movement

### Responsive Behavior
- **Desktop (768px+)**: Full horizontal scroll experience
- **Mobile (<768px)**: Simple vertical layout with proper spacing
- **Reduced Motion**: Falls back to static vertical layout

## Content
Uses the exact content specified in the requirements:

```
01 — Architecture
02 — Human-Centric Design
03 — Interior Design
04 — Design Management
```

## Performance Optimizations
- GPU-friendly transforms (`translate3d`)
- `will-change: transform` for performance hints
- Passive scroll listeners
- Single data source (no content duplication)
- Cleanup of ScrollTrigger instances on unmount

## Accessibility
- Respects `prefers-reduced-motion: reduce`
- Keyboard navigation works naturally
- All content remains accessible
- Semantic HTML structure maintained

## Visual Design
- **Typography**: Strong hierarchy with large lightweight numbers, prominent titles
- **Colors**: Cream text on brown background with orange accents
- **Spacing**: Generous whitespace between items
- **Active Emphasis**: Subtle scale and opacity changes
- **Progress Indicator**: Minimal dots with connecting lines

## How It Works

### User Experience Flow:
1. User scrolls down the page
2. Expertise section reaches viewport
3. Section pins/locks in place
4. Vertical scroll drives horizontal animation
5. Four items travel across the screen
6. Section releases after complete journey
7. Normal vertical scrolling continues

### Technical Flow:
```
Vertical Scroll Position
        ↓
ScrollTrigger Calculates Progress (0 → 1)
        ↓
GSAP Updates Transform
        ↓
Horizontal Track Moves
        ↓
Active State Animations Fire
        ↓
Progress Indicator Updates
```

## Testing Recommendations
1. Test on desktop at various widths (1920px, 1440px, 1024px)
2. Test mobile breakpoint transition at 768px
3. Test with `prefers-reduced-motion` enabled
4. Test scroll performance with DevTools FPS monitor
5. Test with keyboard navigation
6. Test on different browsers (Chrome, Safari, Firefox)

## Dependencies Used
- **GSAP** (already in package.json): Animation engine
- **ScrollTrigger** (GSAP plugin): Scroll-driven animations
- **Tailwind CSS**: Styling
- **Next.js**: React framework

## Future Enhancements (Optional)
- Add parallax effect to numbers
- Stagger animations for description text
- Custom cursor that hints at scroll behavior
- Sound design for transitions
- Loading animations for initial state
