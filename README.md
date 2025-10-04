# Mars Waste Recycling System# Mastcam-Z Website



An interactive web platform demonstrating sustainable waste management solutions for Mars habitats, with real-time AI-powered recycling analysis.A sustainable waste management system for Mars' Jezero Crater - An immersive web experience featuring 3D backgrounds, interactive storytelling, and smooth animations.



## Overview## 🚀 Features



This project explores practical approaches to waste processing and resource recovery in Martian environments. The system uses AI to analyze waste composition and recommend recycling strategies optimized for Mars' unique constraints.- **Immersive Landing Page** with 3D Spline background

- **Interactive Journey Page** with story-based navigation

## Key Components- **Mars-themed Design** with rust/sand color palette

- **Smooth GSAP Animations** throughout the site

**Landing Page** - Introduction to the Mars waste management challenge  - **Fully Responsive** design for all devices

**Journey Page** - Interactive narrative explaining the recycling process  - **TypeScript** for type safety

**System Page** - AI-powered waste analysis tool with real-time recommendations- **Material UI** components with custom theming



The waste analysis system accepts multiple material types, calculates optimal recycling pathways, and provides detailed resource usage projections.## 🎨 Color Palette



## Getting Started- Dark Mars: `#3B060A` (rgb(59, 6, 10))

- Red: `#8A0000` (rgb(138, 0, 0))

Install dependencies:- Orange: `#C83F12` (rgb(200, 63, 18))

```bash- Yellow: `#FFF287` (rgb(255, 242, 135))

npm install

```## 📦 Tech Stack



Run development server:- **React 18** with TypeScript

```bash- **Vite** for blazing fast development

npm run dev- **Material UI** for components

```- **GSAP** for animations

- **React Router** for navigation

Build for production:- **Spline** for 3D backgrounds

```bash- **Tailwind CSS** for utility styling

npm run build

```## 🛠️ Installation



## Technical Stack1. Install dependencies:

```bash

- React 18 + TypeScriptnpm install

- Vite (build tool)```

- Material UI (components)

- Chart.js (data visualization)2. Start the development server:

- Axios (API calls)```bash

- AI integration via Hack Club APInpm run dev

```

## Project Structure

3. Build for production:

``````bash

src/npm run build

├── pages/```

│   ├── LandingPage.tsx          # Entry point

│   ├── JourneyPage.tsx          # Educational content4. Preview production build:

│   ├── SystemPage.tsx           # Main analysis interface```bash

│   └── SpecificSolutionsPage.tsxnpm run preview

├── components/```

│   ├── WasteVisualization.tsx   # Charts and graphs

│   ├── OutputSummary.tsx        # Results display## 📁 Project Structure

│   └── ChocolateLoader.tsx      # Loading states

└── Videos/                       # Mars rover footage```

```mastcam-z/

├── src/

## AI Analysis Features│   ├── pages/

│   │   ├── LandingPage.tsx    # Main landing page with 3D background

The system analyzes waste materials and generates:│   │   ├── JourneyPage.tsx    # Interactive story experience

- Recycled output products with quantities│   │   └── SystemPage.tsx     # System page (placeholder)

- Energy and water consumption estimates  │   ├── App.tsx                # Main app component with routing

- Processing time requirements│   ├── main.tsx               # Application entry point

- Sustainability metrics (70-95% efficiency range)│   └── index.css              # Global styles and animations

- Contamination impact on recycling quality├── public/                    # Static assets

├── index.html                 # HTML template

Results are cached for consistency. Changing any input parameter (material type, quantity, description, or contamination level) triggers a fresh analysis.├── package.json               # Dependencies and scripts

├── tsconfig.json              # TypeScript configuration

## Color Scheme├── vite.config.ts             # Vite configuration

└── tailwind.config.js         # Tailwind CSS configuration

The interface uses Mars-inspired colors:```

- `#3B060A` - Deep Martian red

- `#8A0000` - Iron oxide red## 🎯 Pages

- `#C83F12` - Rust orange

- `#FFF287` - Sand yellow### Landing Page (/)

- Full-screen 3D Spline background

## Development Notes- Floating brand badge with "MARS BARS"

- Large gradient title and subtitle

The AI system uses the Hack Club free API (no authentication required). Model responses vary based on material quality indicators in the description field - pristine materials yield higher efficiency ratings than contaminated inputs.- Two prominent navigation buttons

- Smooth entrance animations

Video assets are stored in `public/videos/` and `src/Videos/` directories.

### Journey Page (/journey)

## Repository- Three-chapter interactive story

- Animated background with glowing orbs

https://github.com/geno543/mars-bars- Floating eye icon (Mastcam-Z representation)

- Progress indicator dots

## Context- Smooth chapter transitions



Developed as part of research into closed-loop life support systems for long-duration Mars missions. The waste recycling calculations account for Mars-specific limitations including water scarcity, solar power constraints, and the need for near-total material recovery.### System Page (/system)

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
