# Portfolio Website - Built with Emergent

A modern, animated portfolio website built with React, Vite, and integrated with [Emergent](https://emergent.sh).

## 🎨 Tech Stack

- **Frontend**: React 18 with Vite
- **Animation**: Framer Motion
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Typography Animation**: React Typed
- **Intersection Observer**: react-intersection-observer
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Build Tool**: Vite

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Navigation header with scroll detection
│   │   ├── Hero.jsx            # Landing section with animations
│   │   ├── About.jsx           # About section with feature cards
│   │   ├── Skills.jsx          # Technical skills with progress bars
│   │   ├── Projects.jsx        # Featured projects showcase
│   │   ├── Contact.jsx         # Contact section with CTA
│   │   ├── Footer.jsx          # Footer with links
│   │   └── ui/
│   │       └── button.jsx      # Reusable button component
│   ├── data/
│   │   └── mock.js             # Mock project data
│   ├── App.jsx                 # Main app component
│   ├── App.css                 # App styling
│   ├── main.jsx                # React entry point
│   ├── index.css               # Global styles
│   └── assets/                 # Static assets
├── public/                     # Public assets
├── index.html                  # HTML entry point
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
├── package.json                # Dependencies
└── README.md                   # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Create a `.env` file** (optional, for backend integration):
```bash
REACT_APP_BACKEND_URL=http://localhost:5000
```

3. **Start the development server:**
```bash
npm run dev
```

The app will open at `http://localhost:5000`

## 📜 Available Scripts

- `npm run dev` - Start development server with hot module reloading
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## ✨ Features

- **Smooth Animations**: Framer Motion animations throughout the site
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Intersection Observer**: Smooth scroll animations triggered on view
- **Interactive Elements**: Hover effects and interactive components
- **Performance Optimized**: Fast build times with Vite
- **Purple Theme**: Modern dark theme with purple accents
- **SEO Friendly**: Semantic HTML and proper meta tags
- **Accessibility**: ARIA labels and keyboard navigation support

## 🎯 Sections

### Header
- Fixed navigation with scroll detection
- Mobile menu with smooth animations
- Active section highlighting

### Hero
- Animated gradient text
- Typed text animation
- Floating particles and glowing orbs
- Call-to-action buttons
- Social media links

### About
- Personal introduction
- Professional highlights
- Feature cards showcasing specialties
- Statistics display

### Skills
- Technical skills by category (Frontend, Backend, Database, Tools)
- Animated progress bars
- Technology badges
- Backend-focused skill presentation

### Projects
- Featured projects showcase
- Project cards with hover effects
- Technology badges for each project
- GitHub links and star counts

### Contact
- Contact information (Email, LinkedIn, GitHub)
- Collaboration CTA
- Call-to-action buttons with icons
- Professional availability status

### Footer
- Quick navigation links
- Social media links
- Copyright information
- Scroll-to-top button

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to change the color scheme. Default is purple-based:

```javascript
colors: {
  purple: {
    // ...purple color scale
  }
}
```

### Fonts
The portfolio uses IBM Plex Sans and IBM Plex Mono. Change in `App.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=...');
```

### Content
- Update component content directly in source files
- Edit `src/data/mock.js` for projects data
- Update personal information in Footer and Contact components

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (md)
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔗 Integration

### With Backend
If you have a backend API, update `REACT_APP_BACKEND_URL` in `.env` to connect your APIs.

### With Emergent
This portfolio is built with [Emergent](https://emergent.sh) in mind for future integrations.

## 🌐 Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Then drag and drop the dist folder to Netlify
```

### Deploy to GitHub Pages
Update `vite.config.js`:
```javascript
export default defineConfig({
  base: '/your-repo-name/',
  // ...
})
```

## 📚 Dependencies

- **react**: ^18.2.0 - UI library
- **react-dom**: ^18.2.0 - DOM rendering
- **framer-motion**: ^10.16.0 - Animation library
- **tailwindcss**: ^3.3.0 - Utility CSS
- **lucide-react**: ^0.344.0 - Icon library
- **react-intersection-observer**: ^9.8.0 - Scroll detection
- **react-typed**: ^1.7.1 - Typing animation
- **axios**: ^1.6.0 - HTTP client

## 🛠️ Development

### Code Style
- Use functional components with hooks
- Use Framer Motion for animations
- Follow component-based architecture
- Use Tailwind CSS for styling

### File Naming
- Components: PascalCase (e.g., `Header.jsx`)
- Utilities: camelCase (e.g., `mock.js`)
- Styles: lowercase with .css extension

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

## 📧 Contact

- Email: aryan11jr@gmail.com
- LinkedIn: [Aryan](https://www.linkedin.com/in/aryan-46191b265)
- GitHub: [@Arya7n](https://github.com/Arya7n)

---

Built with ❤️ using React & Framer Motion
