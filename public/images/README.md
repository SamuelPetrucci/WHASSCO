# Images Directory

Place your organization's images here, including:

- `logo.png` or `logo.svg` - Your organization logo
- `hero-image.jpg` - Hero section background image (optional)
- Any other images you want to use on the website

## Logo Usage

Once you add your logo, update the Header component (`components/Header.tsx`) to use it:

```tsx
import Image from "next/image";

// Replace the placeholder logo div with:
<Image 
  src="/images/logo.png" 
  alt="WHAASCO Logo" 
  width={40} 
  height={40} 
/>
```
