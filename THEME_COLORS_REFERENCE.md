# Theme Colors Reference

## Quick Color Reference

### Light Mode Colors

| Variable | Color Value | Hex Equivalent | Usage |
|----------|-------------|----------------|-------|
| `--light-modeblack` | `rgba(250, 250, 250, 1)` | `#FAFAFA` | Page background (very light gray) |
| `--light-modedark-grey` | `rgba(255, 255, 255, 1)` | `#FFFFFF` | Card backgrounds (pure white) |
| `--light-modewhite` | `rgba(17, 24, 39, 1)` | `#111827` | Primary text (dark gray) |
| `--light-modegrey` | `rgba(107, 114, 128, 1)` | `#6B7280` | Secondary text (medium gray) |
| `--light-modeborder` | `rgba(229, 231, 235, 1)` | `#E5E7EB` | Light borders |
| `--light-modeborder-2` | `rgba(209, 213, 219, 1)` | `#D1D5DB` | Slightly darker borders |

### Dark Mode Colors

| Variable | Color Value | Hex Equivalent | Usage |
|----------|-------------|----------------|-------|
| `--light-modeblack` | `rgba(10, 14, 19, 1)` | `#0A0E13` | Page background (very dark) |
| `--light-modedark-grey` | `rgba(26, 31, 38, 1)` | `#1A1F26` | Card backgrounds (dark gray) |
| `--light-modewhite` | `rgba(232, 234, 237, 1)` | `#E8EAED` | Primary text (off-white) |
| `--light-modegrey` | `rgba(156, 163, 175, 1)` | `#9CA3AF` | Secondary text (light gray) |
| `--light-modeborder` | `rgba(55, 65, 81, 0.3)` | `#374151` (30% opacity) | Subtle dark borders |
| `--light-modeborder-2` | `rgba(55, 65, 81, 1)` | `#374151` | Visible dark borders |

### Accent Colors (Same in Both Modes)

| Variable | Color Value | Hex Equivalent | Usage |
|----------|-------------|----------------|-------|
| `--green` | `rgba(41, 161, 64, 1)` | `#29A140` | Primary actions, success |
| `--blue` | `rgba(68, 138, 255, 1)` | `#448AFF` | Links, rank #2 |
| `--yellow` | `rgba(255, 193, 11, 1)` | `#FFC10B` | Rank #1 (gold) |
| `--orange` | `rgba(247, 147, 26, 1)` | `#F7931A` | Rank #3 |
| `--red` | `rgba(244, 67, 54, 1)` | `#F44336` | Errors, warnings |

## Visual Comparison

### Light Mode
```
┌─────────────────────────────────────────────┐
│  CARELEVEL              ☀️ 🌙  [Buy]  [Login]│  ← #FAFAFA (very light gray bg)
├─────────────────────────────────────────────┤
│                                             │
│  Improve Your CareLevel                     │  ← #111827 (dark text)
│  The cryptocurrency that levels up...       │  ← #6B7280 (gray text)
│                                             │
│  ┌─────────────────────────────────────┐  │
│  │  $0.0000083262 │ $793K │ $158.2K   │  │  ← #FFFFFF (white cards)
│  │  Price         │ Cap   │ Donated   │  │  ← Clean, bright
│  └─────────────────────────────────────┘  │
│                                             │
│  [❤️ Donate]  [Buy $CARELEVEL]             │  ← Green buttons pop
│                                             │
└─────────────────────────────────────────────┘
```

### Dark Mode
```
┌─────────────────────────────────────────────┐
│  CARELEVEL              🌙 ☀️  [Buy]  [Login]│  ← #0A0E13 (very dark bg)
├─────────────────────────────────────────────┤
│                                             │
│  Improve Your CareLevel                     │  ← #E8EAED (light text)
│  The cryptocurrency that levels up...       │  ← #9CA3AF (light gray text)
│                                             │
│  ┌─────────────────────────────────────┐  │
│  │  $0.0000083262 │ $793K │ $158.2K   │  │  ← #1A1F26 (dark gray cards)
│  │  Price         │ Cap   │ Donated   │  │  ← Elevated from bg
│  └─────────────────────────────────────┘  │
│                                             │
│  [❤️ Donate]  [Buy $CARELEVEL]             │  ← Green buttons stand out
│                                             │
└─────────────────────────────────────────────┘
```

## Usage in Components

### Example 1: Page Layout
```tsx
<div className="bg-light-modeblack text-light-modewhite min-h-screen">
  {/* Light mode: white bg, dark text */}
  {/* Dark mode: dark bg, light text */}
</div>
```

### Example 2: Card Component
```tsx
<Card className="bg-light-modedark-grey border-[#d7dce5]">
  {/* Light mode: #F9F9F9 background */}
  {/* Dark mode: #171B20 background */}
</Card>
```

### Example 3: Text Hierarchy
```tsx
<div>
  <h1 className="text-light-modewhite">Primary Heading</h1>
  <p className="text-light-modegrey">Secondary text / description</p>
</div>
```

### Example 4: Buttons
```tsx
{/* Primary action - always green */}
<Button className="bg-green text-light-modeblack">
  Buy $CARELEVEL
</Button>

{/* Secondary action - theme aware */}
<Button className="bg-light-modedark-grey text-light-modewhite">
  Back
</Button>
```

## Color Contrast Ratios

### Light Mode
- Background to text: **#FAFAFA (bg) to #111827 (text)** = 15.8:1 ✅ (Excellent)
- Card to text: **#FFFFFF (card) to #111827 (text)** = 16.6:1 ✅ (Excellent)
- Secondary text: **#FAFAFA (bg) to #6B7280 (gray)** = 4.6:1 ✅ (Good for large text)

### Dark Mode
- Background to text: **#0A0E13 (bg) to #E8EAED (text)** = 14.2:1 ✅ (Excellent)
- Card to text: **#1A1F26 (card) to #E8EAED (text)** = 12.8:1 ✅ (Excellent)
- Secondary text: **#0A0E13 (bg) to #9CA3AF (gray)** = 6.8:1 ✅ (AAA compliant)

All primary text combinations exceed WCAG AAA standards (7:1 for normal text).
Secondary text meets WCAG AA standards (4.5:1 for normal text).

## Design System

### Typography Colors
- **Primary**: `text-light-modewhite` - Used for headings and important text
- **Secondary**: `text-light-modegrey` - Used for descriptions and labels
- **Success**: `text-green` - Used for positive feedback
- **Error**: `text-red` - Used for errors and warnings

### Background Layers
1. **Base**: `bg-light-modeblack` - Main page background
2. **Elevated**: `bg-light-modedark-grey` - Cards and panels
3. **Overlay**: `bg-light-modeblack` - Input fields, nested components

### Border System
- **Subtle**: `border-light-modeborder` - Barely visible separators
- **Standard**: `border-[#d7dce5]` - Regular component borders
- **Strong**: `border-light-modeborder-2` - Emphasized borders

## Browser DevTools Inspection

To inspect the current theme:

1. Open DevTools (F12)
2. Go to Elements/Inspector
3. Select `<html>` element
4. Check for `class="dark"` or `class="light"`
5. Inspect computed CSS variables in Styles panel

You can also manually toggle in console:
```javascript
// Switch to dark mode
document.documentElement.classList.remove('light');
document.documentElement.classList.add('dark');

// Switch to light mode
document.documentElement.classList.remove('dark');
document.documentElement.classList.add('light');

// Check current theme
localStorage.getItem('theme');
```

---

**Note**: The naming convention uses "light-mode" and "dark-mode" prefixes, but the actual values swap between themes. This is intentional based on the original Anima design system.

