# Arjun Mehta Portfolio

A modern, interactive portfolio website built with React, TypeScript, and Tailwind CSS. Features a retro desktop OS interface with multiple applications, themes, and responsive design.

## Features

- 🖥️ **Desktop OS Interface** - Interactive window-based UI with draggable windows
- 🎨 **Multiple Themes** - Light, dark, and custom color schemes
- 🌈 **Animated Backgrounds** - Grid, doodles, blobs, waves, dots, and particles
- 📱 **Responsive Design** - Mobile and tablet optimized with desktop-first messaging
- 📄 **PDF Resume Viewer** - Interactive resume with zoom, rotation, and download
- 🎵 **Sound System** - Audio feedback for UI interactions
- 🎮 **Mini Games** - Snake, Tic-Tac-Toe, Memory Match
- 📝 **Notes App** - Built-in notepad functionality
- 🐛 **Bug Hunter** - Debug mini-game
- 📊 **System Monitor** - Resource monitoring simulation
- 💻 **Code Runner** - Live code execution environment

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Animations**: Framer Motion
- **PDF**: react-pdf
- **Icons**: Lucide React
- **Build Tool**: Vite

## Project Structure

\\\
src/
├── apps/              # Application components
├── components/          # Reusable UI components
├── contexts/           # React contexts
├── config/            # Configuration files
├── hooks/             # Custom React hooks
├── types/             # TypeScript type definitions
├── lib/               # Utility libraries
└── data/              # Static data and content
\\\

## Getting Started

1. **Clone the repository**
   \\\ash
   git clone <repository-url>
   cd arjun-mehta-portfolio
   \\\

2. **Install dependencies**
   \\\ash
   npm install
   \\\

3. **Start development server**
   \\\ash
   npm run dev
   \\\

4. **Build for production**
   \\\ash
   npm run build
   \\\

## Customization

### Content Management
All website content is centralized in \src/data/content.json\:

\\\json
{
  
personal: {
    name: Your
Name,
    title: Your
Title,
    bio: Your
bio...
  },
  projects: [...],
  experience: [...],
  contact: {...}
}
\\\

### Themes
Add new themes in \src/config/themes.ts\:

\\\	ypescript
export const themes = {
  yourTheme: {
    bg: #background-color,
    windowBg: #window-bg,
    // ... other colors
  }
};
\\\

### Backgrounds
Create new background components in \src/components/Backgrounds.tsx\ and add to the \BackgroundType\ union.

## Deployment

The project builds to static files and can be deployed to any static hosting service:

- **Netlify**: Drag and drop the \dist\ folder
- **Vercel**: Connect your Git repository
- **GitHub Pages**: Use GitHub Actions for automatic deployment
- **Traditional Hosting**: Upload the \dist\ folder contents

## Browser Support

- ✅ Chrome/Chromium 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Performance

- 🚀 **Fast Loading** - Optimized assets and lazy loading
- 📱 **Mobile Optimized** - Responsive design with touch support
- 🎯 **SEO Friendly** - Semantic HTML and meta tags
- ♿ **Accessible** - ARIA labels and keyboard navigation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for your own portfolio!

---

**Built with ❤️ using modern web technologies**
