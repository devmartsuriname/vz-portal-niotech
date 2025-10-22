# Branding Guide — VZ Suriname Logo Usage

**Version:** 1.0  
**Last Updated:** 2025-10-22  
**Author:** Devmart Suriname

---

## 📁 Logo Assets

All official VZ Suriname logos are located in `/public/assets/branding/`:

| File | Usage | Background Compatibility |
|------|-------|-------------------------|
| `logo-vz.svg` | Main full logo | Light backgrounds |
| `logo-vz-icon.svg` | Icon/favicon only | Any (purple shield with white VZ) |
| `logo-vz-white.svg` | Full logo inverted | Dark backgrounds |
| `logo-vz-dark.svg` | Alternative dark variant | Light backgrounds |

---

## 🗺️ Implementation Map

### **Frontend (Public Interface)**

| Location | Component | Logo Used | Context |
|----------|-----------|-----------|---------|
| **Header** | `src/Components/Header/Header4.jsx` | `logo-vz.svg` | Purple shield + dark text on light background |
| **Footer** | `src/Components/Footer/Footer.jsx` | `logo-vz-white.svg` | White version for dark footer background |

### **Admin Panel**

| Location | Component | Logo Used | Context |
|----------|-----------|-----------|---------|
| **Sidebar (collapsed)** | `src/admin/components/wrapper/LogoBox.tsx` | `logo-vz-icon.svg` | Icon only (purple shield with VZ) |
| **Sidebar (expanded - dark)** | `src/admin/components/wrapper/LogoBox.tsx` | `logo-vz.svg` | Full logo for dark mode |
| **Sidebar (expanded - light)** | `src/admin/components/wrapper/LogoBox.tsx` | `logo-vz-white.svg` | White version for light mode |
| **Auth Pages (dark)** | `src/admin/pages/auth/SignIn.tsx`<br>`src/admin/pages/auth/SignUp.tsx` | `logo-vz.svg` | Standard version |
| **Auth Pages (light)** | `src/admin/pages/auth/SignIn.tsx`<br>`src/admin/pages/auth/SignUp.tsx` | `logo-vz-white.svg` | White version |

### **System-Wide**

| Location | File | Logo Used | Context |
|----------|------|-----------|---------|
| **Favicon** | `index.html` | `logo-vz-icon.svg` | Browser tab icon (SVG primary, PNG fallback) |
| **Page Title** | `index.html` | — | "Vreemdelingen Zaken Suriname \| VZ Juspol Portal" |

---

## 🎨 Design Specifications

### **Color Palette**
- **Primary Purple:** `#7444FD` (Shield background in main logo)
- **Dark Text:** `#282C32` (Body text and dark shield variant)
- **White:** `#FFFFFF` (Text on dark backgrounds, inverted logo)

### **Typography**
- **Font Family:** Urbanist, Arial, sans-serif
- **Main Title Weight:** 700 (Bold) — "Vreemdelingen Zaken"
- **Subtitle Weight:** 400 (Regular) — "Suriname"
- **Shield Text Weight:** 700 (Bold) — "VZ"

### **Design Style**
- Flat design with no gradients or shadows
- Clean, modern shield icon with centered "VZ" text
- Horizontal layout with icon on left, text on right
- Scalable SVG format for all resolutions

---

## ♿ Accessibility Standards

### **Alt Text Requirements**
- **Frontend:** "Vreemdelingen Zaken Suriname"
- **Admin Panel:** "VZ Juspol Admin Portal"
- **Auth Pages:** "Vreemdelingen Zaken Suriname"

### **Color Contrast**
- Purple (`#7444FD`) on white background: ✅ **Passes WCAG AA**
- White logo on dark footer/sidebar: ✅ **Passes WCAG AA**
- All color combinations meet accessibility standards

### **Responsive Scaling**
- SVG format ensures crisp rendering at all screen sizes
- Tested breakpoints: 320px (mobile), 768px (tablet), 1200px+ (desktop)
- No pixelation or quality loss at any resolution

---

## 📦 File Structure

```
public/
└── assets/
    └── branding/
        ├── logo-vz.svg           # Main logo (purple shield + dark text)
        ├── logo-vz-icon.svg      # Icon only (purple shield with VZ)
        ├── logo-vz-white.svg     # White version (for dark backgrounds)
        └── logo-vz-dark.svg      # Dark version (dark shield + dark text)
```

---

## ✅ Integration Checklist

- [x] Frontend header logo replaced
- [x] Frontend footer logo replaced (white variant)
- [x] Admin sidebar logo replaced (icon + full versions)
- [x] Admin auth pages updated (dark + light variants)
- [x] Favicon updated to VZ shield icon
- [x] Page title updated
- [x] Meta description added
- [x] All alt text updated for accessibility
- [x] Color contrast verified (WCAG AA compliant)
- [x] Deprecated Niotech assets removed

---

## 🔄 Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2025-10-22 | Initial branding integration | Devmart Suriname |

---

## 📝 Usage Guidelines

### **DO:**
✅ Use the correct logo variant for the background (dark vs. light)  
✅ Maintain proper spacing around the logo  
✅ Use SVG format for scalability  
✅ Include descriptive alt text for accessibility  
✅ Test logo display across different screen sizes  

### **DON'T:**
❌ Stretch or distort the logo proportions  
❌ Change the official color palette  
❌ Add effects (shadows, gradients, etc.)  
❌ Use low-resolution PNG versions  
❌ Remove or modify the "VZ" text in the shield  

---

## 🆘 Support

For questions about logo usage or branding guidelines, contact:  
**Devmart Suriname**  
Email: info@juspol.sr
