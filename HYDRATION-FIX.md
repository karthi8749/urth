# Hydration Error Fix

## Problem
The component was causing a React hydration error because:
1. Server-side rendering (SSR) rendered with `isMobile = false` (default state)
2. Client-side hydration immediately set `isMobile` based on window size
3. This caused a mismatch between server HTML and client React tree

## Error Message
```
A tree hydrated but some attributes of the server rendered HTML didn't match the client properties.
```

The specific mismatch was:
- Server: renders both desktop and mobile layouts
- Client: tries to conditionally render based on `isMobile` state
- Result: DOM mismatch = hydration error

## Solution

### What Changed
Removed client-side state (`isMobile`) and replaced with:

1. **CSS-based responsive behavior** - Both layouts always render, but visibility is controlled by CSS classes
2. **Client-side check in useEffect** - Mobile detection happens AFTER hydration completes

### Key Changes

**Before (Problematic):**
```tsx
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const checkMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };
  checkMobile(); // ← Runs after hydration, causes mismatch
  // ...
}, []);

// Later in JSX - conditional rendering based on state
<div className={isMobile ? "block" : "hidden"}>
```

**After (Fixed):**
```tsx
// No state variable

useEffect(() => {
  // Check mobile directly with matchMedia (no state update)
  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  if (isMobile) return; // Skip animation setup
  
  // Setup ScrollTrigger only on desktop...
}, []);

// In JSX - CSS handles visibility, both always render
<div className="hidden md:flex"> {/* Desktop */}
<div className="block md:hidden"> {/* Mobile */}
```

### Why This Works

1. **Server renders both layouts** - No conditional logic
2. **CSS controls visibility** - `hidden md:flex` and `block md:hidden`
3. **JavaScript enhancement happens post-hydration** - ScrollTrigger setup in useEffect
4. **No DOM structure changes** - Only animations are added, no layout changes

## Technical Details

### Media Query Approach
```tsx
const isMobile = window.matchMedia("(max-width: 767px)").matches;
```

Benefits:
- ✅ Runs only on client (inside useEffect)
- ✅ No state updates = no re-renders
- ✅ Pure JavaScript check, no React state involved
- ✅ Matches Tailwind's `md:` breakpoint (768px)

### CSS Visibility Classes
```tsx
// Desktop horizontal scroll
<div className="expertise-track hidden h-screen items-center will-change-transform md:flex">

// Mobile vertical layout  
<div className="block md:hidden">
```

Benefits:
- ✅ Both always in DOM (no hydration mismatch)
- ✅ Tailwind handles show/hide responsively
- ✅ Server and client render identical HTML
- ✅ CSS media queries apply consistently

## Testing Verification

After this fix, you should see:
- ✅ No hydration errors in console
- ✅ Desktop shows horizontal scroll animation
- ✅ Mobile shows vertical card layout
- ✅ No layout shift during page load
- ✅ Smooth transition when resizing window

## Additional Benefits

This approach also:
- Improves performance (no unnecessary re-renders)
- Simplifies the component (less state management)
- Makes it more predictable (CSS handles responsive behavior)
- Follows React 18 best practices for SSR

## Related Files Changed

1. `src/components/sections/expertise-horizontal-scroll.tsx`
   - Removed `useState` import
   - Removed `isMobile` state variable
   - Removed separate useEffect for mobile detection
   - Added direct `matchMedia` check inside animation useEffect
   - Both layouts always render (CSS controls visibility)

## Prevention

To avoid similar issues in the future:

1. **Never use state that depends on window size for initial render**
2. **Use CSS for responsive layouts** whenever possible
3. **Keep client-only logic in useEffect** (after hydration)
4. **Test SSR output** matches client output
5. **Use Tailwind responsive classes** instead of JS conditionals

## Verification Commands

```bash
# Check for hydration errors
npm run dev
# Open browser console
# Navigate to /expertise
# Should see NO hydration warnings
```

## Performance Note

This fix actually **improves** performance because:
- No state updates on mount
- No re-render when checking mobile/desktop
- Pure CSS responsiveness (faster than JS)
- ScrollTrigger only initializes once
