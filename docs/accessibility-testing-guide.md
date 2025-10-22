# Accessibility Testing Guide
**Version:** 1.0  
**Author:** Devmart Suriname  
**Last Updated:** 2025-10-22

## Overview
This document provides a comprehensive guide for testing the accessibility features implemented in the VZ Juspol Admin Portal.

---

## ✅ Implemented Accessibility Features

### 1. ARIA Labels and Semantic HTML
- **Navigation**: Main navigation has `role="navigation"` and `aria-label="Main navigation"`
- **Menu Items**: Active links include `aria-current="page"` attribute
- **Expandable Menus**: `aria-expanded` attribute indicates collapsed/expanded state
- **Icons**: All decorative icons have `aria-hidden="true"`
- **Buttons**: All action buttons have descriptive `aria-label` attributes
- **Tables**: Tables include `role="grid"`, `scope="col"` for headers
- **Form Controls**: All inputs have associated labels (visible or `visually-hidden`)

### 2. Keyboard Navigation
- **Focus Indicators**: Purple outline (2px) with glow effect on `:focus-visible`
- **Skip to Main Content**: Keyboard-accessible link at top of page
- **Table Navigation**: 
  - Rows are focusable with `tabIndex={0}`
  - Enter/Space keys navigate to detail page
- **Button Focus**: Enhanced focus states for all interactive elements
- **Form Focus**: Custom focus styles for inputs and selects

### 3. Screen Reader Support
- **Live Regions**: Result counts use `aria-live="polite"`
- **Status Updates**: Loading spinners have `role="status"`
- **Hidden Labels**: Form labels use `visually-hidden` class where needed
- **Descriptive Links**: Links include context (e.g., "View details for submission X")

### 4. Visual Accessibility
- **Color Contrast**: All text meets WCAG AA standards
- **Focus Indicators**: High contrast purple outline with shadow
- **Tooltips**: Dark/light theme adaptive tooltips for icon buttons
- **Touch Targets**: Minimum 44×44px touch target size

---

## 🧪 Testing Checklist

### Manual Keyboard Testing
- [ ] **Tab Navigation**: Tab through entire admin interface
  - [ ] All interactive elements are reachable
  - [ ] Focus order is logical
  - [ ] Focus indicators are clearly visible
  
- [ ] **Skip to Main Content**: 
  - [ ] Press Tab on page load
  - [ ] "Skip to main content" link appears
  - [ ] Pressing Enter skips to main content
  
- [ ] **Navigation Menu**:
  - [ ] Tab to menu items
  - [ ] Enter/Space opens submenu
  - [ ] Arrow keys navigate within menu (if implemented)
  
- [ ] **Tables**:
  - [ ] Tab to table
  - [ ] Arrow keys navigate rows (if implemented)
  - [ ] Enter/Space activates row action
  
- [ ] **Forms**:
  - [ ] Tab through form fields
  - [ ] Arrow keys work in selects
  - [ ] Enter submits forms
  
- [ ] **Modals/Dialogs**:
  - [ ] Focus trapped within modal
  - [ ] Escape closes modal
  - [ ] Focus returns to trigger element

### Screen Reader Testing

#### NVDA (Windows - Free)
1. **Install**: Download from [nvaccess.org](https://www.nvaccess.org/)
2. **Basic Commands**:
   - `Ctrl`: Stop reading
   - `Insert + Down`: Read from cursor
   - `Insert + Space`: Toggle browse/focus mode
   - `H`: Navigate by heading
   - `T`: Navigate by table
   - `B`: Navigate by button
   - `F`: Navigate by form field

3. **Test Scenarios**:
   - [ ] Navigate main menu
   - [ ] Read table contents
   - [ ] Fill out forms
   - [ ] Hear status messages
   - [ ] Verify button labels

#### JAWS (Windows - Commercial/Demo)
Similar commands to NVDA. Test same scenarios.

#### VoiceOver (macOS - Built-in)
1. **Enable**: System Preferences → Accessibility → VoiceOver
2. **Basic Commands**:
   - `Cmd + F5`: Toggle VoiceOver
   - `VO + A`: Read from top
   - `VO + Right/Left`: Navigate elements
   - `VO + Space`: Activate element
   - `VO + H`: Navigate by heading

3. **Test Scenarios**:
   - [ ] Navigate with rotor (VO + U)
   - [ ] Hear form labels correctly
   - [ ] Verify table headers
   - [ ] Test modal dialogs

### Automated Testing

#### Lighthouse Audit
1. Open Chrome DevTools (F12)
2. Go to Lighthouse tab
3. Select "Accessibility" category
4. Run audit on:
   - [ ] `/admin/dashboard` (Target: ≥ 95)
   - [ ] `/admin/submissions` (Target: ≥ 95)
   - [ ] `/admin/content` (Target: ≥ 95)
   - [ ] `/vergunningen` (Target: ≥ 95)

#### axe DevTools (Browser Extension)
1. Install axe DevTools extension
2. Open extension on each page
3. Run scan
4. Address Critical and Serious issues

---

## 🎯 Target Metrics

| Metric | Target | Notes |
|--------|--------|-------|
| Lighthouse Accessibility Score | ≥ 95 | All admin pages |
| Keyboard Navigation Coverage | 100% | All interactive elements |
| Screen Reader Compatibility | WCAG AA | NVDA, JAWS, VoiceOver |
| Color Contrast Ratio | ≥ 4.5:1 | Normal text |
| Touch Target Size | ≥ 44×44px | Mobile/tablet |

---

## 📋 Known Issues & Limitations

### Current Limitations
- **Table Sorting**: Arrow key navigation within tables not yet implemented
- **Dropdown Menus**: Arrow key navigation in custom dropdowns needs enhancement
- **Modal Focus Management**: Some modals may need additional focus trap logic

### Future Enhancements
- [ ] Implement comprehensive keyboard shortcuts
- [ ] Add screen reader-only text for complex interactions
- [ ] Enhance table column sorting announcements
- [ ] Add high contrast mode toggle
- [ ] Implement reduced motion preferences

---

## 🔍 Common Issues to Check

### Focus Management
- Focus should be visible on ALL interactive elements
- Focus should never be trapped unintentionally
- Focus should return to trigger after closing modals

### Color Contrast
- Text on colored backgrounds must meet 4.5:1 ratio
- Links must be distinguishable from regular text
- Status badges must be readable

### Keyboard Traps
- User should always be able to Tab away from elements
- Modal dialogs should trap focus but allow Escape to exit
- Dropdowns should close on Escape

### Missing Labels
- All form inputs must have labels
- Icon buttons must have `aria-label` or `title`
- Images must have descriptive alt text

---

## 📚 Resources

### WCAG Guidelines
- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM WCAG Checklist](https://webaim.org/standards/wcag/checklist)

### Testing Tools
- [NVDA Screen Reader](https://www.nvaccess.org/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE Browser Extension](https://wave.webaim.org/extension/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

### Color Contrast Checkers
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Coolors Contrast Checker](https://coolors.co/contrast-checker)

---

## ✅ Sign-Off

### Testing Completed By
- [ ] Developer: _________________
- [ ] QA Engineer: _________________
- [ ] Accessibility Specialist: _________________

### Date Completed
- Testing Start: _______________
- Testing End: _______________

### Notes
_[Add any additional notes or findings here]_

---

## 📞 Support

For questions or issues with accessibility testing, contact:
- **Email**: accessibility@devmart.sr
- **Documentation**: See `/docs/admin-user-guide.md` for usage instructions
