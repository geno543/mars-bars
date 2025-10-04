# Mastcam-Z Website

A sustainable waste management system for Mars' Jezero Crater - An immersive web experience featuring 3D backgrounds, interactive storytelling, and smooth animations.

## 🚀 Features

- **Immersive Landing Page** with 3D Spline background
- **Interactive Journey Page** with story-based navigation
- **Mars-themed Design** with rust/sand color palette
- **Smooth GSAP Animations** throughout the site
- **Fully Responsive** design for all devices
- **TypeScript** for type safety
- **Material UI** components with custom theming

## 🎨 Color Palette

- Dark Mars: `#3B060A` (rgb(59, 6, 10))
- Red: `#8A0000` (rgb(138, 0, 0))
- Orange: `#C83F12` (rgb(200, 63, 18))
- Yellow: `#FFF287` (rgb(255, 242, 135))

## 📦 Tech Stack

- **React 18** with TypeScript
- **Vite** for blazing fast development
- **Material UI** for components
- **GSAP** for animations
- **React Router** for navigation
- **Spline** for 3D backgrounds
- **Tailwind CSS** for utility styling

## 🛠️ Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## 📁 Project Structure

```
mastcam-z/
├── src/
│   ├── pages/
│   │   ├── LandingPage.tsx    # Main landing page with 3D background
│   │   ├── JourneyPage.tsx    # Interactive story experience
│   │   └── SystemPage.tsx     # System page (placeholder)
│   ├── App.tsx                # Main app component with routing
│   ├── main.tsx               # Application entry point
│   └── index.css              # Global styles and animations
├── public/                    # Static assets
├── index.html                 # HTML template
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite configuration
└── tailwind.config.js         # Tailwind CSS configuration
```

## 🎯 Pages

### Landing Page (/)
- Full-screen 3D Spline background
- Floating brand badge with "MARS BARS"
- Large gradient title and subtitle
- Two prominent navigation buttons
- Smooth entrance animations

### Journey Page (/journey)
- Three-chapter interactive story
- Animated background with glowing orbs
- Floating eye icon (Mastcam-Z representation)
- Progress indicator dots
- Smooth chapter transitions

### System Page (/system)
- Placeholder with "Coming Soon" message
- Mars gradient background
- Animated content

## 🎨 Design Features

- **Glassmorphism** effects with backdrop blur
- **Gradient text** with Mars color palette
- **Floating animations** for interactive elements
- **Ripple effects** on key icons
- **Particle backgrounds** for depth
- **Custom scrollbar** styling
- **Responsive typography** and spacing

## 🚀 Performance

- Optimized animations with GSAP
- Lazy loading for 3D content
- Efficient CSS with Tailwind utilities
- TypeScript for better code quality
- Vite for fast builds and HMR

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints for xs, sm, md, lg screens
- Adaptive font sizes and spacing
- Stack layout on mobile devices
- Touch-friendly interactive elements

## 🎭 Animations

- **GSAP Timeline** for entrance animations
- **Floating** elements with yoyo repeat
- **Pulse** effects for glowing elements
- **Drift** animations for particles
- **Ripple** effects for icons
- **Smooth transitions** between pages and chapters

## 📄 License

This project is part of the Mastcam-Z initiative for Mars exploration.

## 🌟 Credits

- NASA's Mars 2020 Perseverance rover mission
- Mastcam-Z camera system
- Spline for 3D backgrounds

---

Built with ❤️ for Mars exploration
