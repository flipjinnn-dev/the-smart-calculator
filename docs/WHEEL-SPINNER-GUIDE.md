# 🎡 Wheel Spinner - Complete Usage Guide

## Quick Start

1. **Navigate to the app**: `/games/wheel-spinner`
2. **Edit slices**: Use the left panel to add, remove, or customize slices
3. **Spin the wheel**: Click the "SPIN" button or swipe on the wheel
4. **View result**: See the winner in the popup modal

## Features Overview

### 🎯 Core Functionality

#### Spinning the Wheel
- **Button Click**: Click the "SPIN" button below the wheel
- **Swipe/Drag**: On mobile or desktop, swipe down on the wheel to spin
- **Physics-Based**: Realistic deceleration with 5-10 full rotations
- **Winner Selection**: Pointer at top indicates the winning slice

#### Editor Panel
Located on the left side (collapsible on mobile):

**Slice Management:**
- **Add Slice**: Click "+ Add Slice" button
- **Remove Slice**: Click trash icon (minimum 2 slices required)
- **Duplicate Slice**: Click copy icon to duplicate with same settings
- **Reorder**: Drag slices using the grip handle
- **Edit Label**: Click on text to edit inline

**Bulk Operations:**
- **Bulk Add**: Click "Bulk Add", paste newline-separated list
- **Clear All**: Reset to 2 default slices
- **Reset**: Return to default configuration

### 🎨 Customization Options

#### Per-Slice Customization
Each slice can be individually customized:

1. **Label**: Text displayed on the slice
2. **Slice Color**: Background color picker
3. **Text Color**: Text color picker
4. **Font Size**: 8-32px range
5. **Font Family**: Arial, Helvetica, Times New Roman, Courier New, Georgia, Verdana
6. **Font Weight**: Normal or Bold (B button)
7. **Font Style**: Normal or Italic (I button)

#### Global Wheel Settings
Click the settings icon (⚙️) in the top-right:

**Appearance:**
- **Border Width**: 0-10px slider
- **Border Color**: Color picker + hex input
- **Background Color**: Wheel background
- **Pointer Color**: Color of the indicator
- **Pointer Shape**: Triangle, Arrow, or Circle
- **Spin Button Color**: Customize button appearance
- **Spin Button Text**: Change button label

**Audio:**
- **Sound Effects**: Toggle win sound on/off
- **Tick Sound**: Toggle slice-crossing sounds during spin

**Theme:**
- **Light Mode**: Bright, clean interface
- **Dark Mode**: Dark theme for low-light environments

### 💾 Data Management

#### Export Options

**JSON Export:**
1. Click "JSON" button in editor
2. Downloads complete wheel configuration
3. Includes all slice data and settings

**CSV Export:**
1. Click "CSV" button in editor
2. Downloads slice data in spreadsheet format
3. Columns: Label, Color, TextColor, FontSize, FontFamily, FontWeight, FontStyle

#### Import

**JSON Import:**
1. Click "Import" button
2. Select previously exported JSON file
3. Wheel configuration loads instantly

#### Share Wheel

**Generate Shareable Link:**
1. Click share icon (📤) in header
2. URL is copied to clipboard
3. Share link with others
4. Recipients see your exact wheel configuration

#### Export as Image

**Save Wheel Screenshot:**
1. Click download icon (⬇️) in header
2. PNG image of current wheel is saved
3. Perfect for sharing on social media

### 🔄 Undo/Redo

**History Management:**
- **Undo**: Click undo button (↶) to revert last change
- **Redo**: Click redo button (↷) to reapply undone change
- **Auto-tracking**: All slice additions, removals, and reorders are tracked

### 📱 Mobile Experience

**Touch Interactions:**
- **Swipe to Spin**: Swipe down on wheel to trigger spin
- **Collapsible Editor**: Editor panel collapses on small screens
- **Floating Menu**: Tap floating button to open editor
- **Responsive Canvas**: Wheel scales to fit screen

**Mobile Optimizations:**
- Touch-friendly buttons
- Larger tap targets
- Optimized layout for portrait/landscape
- Smooth touch animations

### 🔊 Sound System

**Spin Sounds:**
- **Tick Sounds**: Plays when wheel crosses slice boundaries
- **Win Sound**: Celebratory tone when spin completes
- **Web Audio API**: Dynamic sound generation (no files needed)
- **Toggle Controls**: Enable/disable in settings

### 💡 Pro Tips

1. **Quick Duplicate**: Use duplicate button to create variations of existing slices
2. **Bulk Import**: Paste a list of names for quick setup (great for raffles)
3. **Color Coordination**: Use complementary colors for better visibility
4. **Font Sizing**: Adjust font size if labels are too long
5. **Share Links**: Generate shareable URLs for team decisions
6. **Dark Mode**: Use dark mode for presentations or low-light environments
7. **Export Before Major Changes**: Export JSON before making big changes

### 🎯 Use Cases

**Decision Making:**
- Choose restaurants
- Pick movie options
- Select team activities
- Random task assignment

**Games & Fun:**
- Truth or dare spinner
- Random name picker
- Prize wheel
- Party games

**Education:**
- Random student selector
- Topic picker for presentations
- Group assignment randomizer
- Quiz question selector

**Business:**
- Meeting ice breakers
- Team building activities
- Random prize drawings
- Fair task distribution

### ⚙️ Technical Details

**Performance:**
- Canvas-based rendering for smooth 60fps animations
- requestAnimationFrame for optimal performance
- Minimal re-renders with Zustand state management
- LocalStorage auto-save (changes persist across sessions)

**Browser Support:**
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires JavaScript enabled
- Web Audio API for sounds

**Data Persistence:**
- Auto-saves to localStorage every change
- Survives page refreshes
- Undo/redo history maintained
- Theme preference saved

### 🐛 Troubleshooting

**Wheel won't spin:**
- Ensure minimum 2 slices exist
- Check if wheel is already spinning
- Try refreshing the page

**Sounds not working:**
- Check browser sound permissions
- Ensure sounds are enabled in settings
- Some browsers block autoplay audio

**Editor not visible on mobile:**
- Tap the floating menu button (☰)
- Swipe from left edge
- Rotate to landscape mode

**Import failed:**
- Verify JSON file format
- Ensure minimum 2 slices in import
- Check for valid color codes

### 🔐 Privacy & Data

- **All data stored locally** in your browser
- **No server uploads** - everything runs client-side
- **Shareable links** encode data in URL (not stored on server)
- **No tracking** or analytics on wheel data

### 📊 Limits & Constraints

- **Minimum Slices**: 2
- **Maximum Slices**: 100+ (no hard limit, but UI may get crowded)
- **Label Length**: No limit, but long labels may wrap
- **Font Size**: 8-32px
- **Spin Duration**: Fixed at 5 seconds
- **Rotations**: Random 5-10 full spins per activation

### 🚀 Keyboard Shortcuts

- **Ctrl/Cmd + Z**: Undo
- **Ctrl/Cmd + Shift + Z**: Redo
- **Space**: Spin wheel (when focused)
- **Escape**: Close result modal

### 📝 Best Practices

1. **Keep labels concise** for better readability
2. **Use high contrast** between slice and text colors
3. **Test on mobile** if sharing with mobile users
4. **Export regularly** to save configurations
5. **Use descriptive names** for saved JSON files
6. **Limit to 20 slices** for optimal visibility
7. **Enable sounds** for better user experience

## Advanced Features

### URL Parameters

Share wheels with encoded data:
```
/games/wheel-spinner?data=<base64-encoded-json>
```

The app automatically decodes and loads the configuration.

### Custom Color Palettes

Default colors can be modified in the store configuration for consistent branding.

### Animation Customization

Spin duration and easing functions can be adjusted in `wheel-physics.ts` for different effects.

## Support

For issues or feature requests, please refer to the main project documentation.
