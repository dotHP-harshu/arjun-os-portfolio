# DeskFolio 🖥️

DeskFolio is a highly customizable, interactive OS-style portfolio template built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. It provides a unique, windowed desktop experience for showcasing your projects, skills, and experience.

## ✨ Features

- **Window Management**: Draggable, resizable, minimizable, and maximizable windows.
- **Dynamic Content**: All text, projects, and system info are managed via a single `data.json` file.
- **Interactive Apps**: Built-in apps like Snake, TicTacToe, Memory Game, Notes, and a Code Runner.
- **Theming System**: Multiple built-in themes (Classic, Dark, Cyberpunk, Matrix, etc.) and custom backgrounds.
- **Sound System**: Interactive sound effects for window actions and system events.
- **SEO Optimized**: Pre-configured meta tags, structured data, and search engine files.
- **Mobile Responsive**: Custom mobile message and simplified layout for smaller screens.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd deskfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## 🛠️ Customization Guide

DeskFolio is designed to be easily personalized. Most changes can be made without touching the core logic.

### 1. Personal Content (`src/data/data.json`)

This is the most important file. Update this JSON to change:
- **Profile**: Name, role, bio, avatar, and social links.
- **Projects**: Title, description, tags, and links (Live/Code).
- **Experience**: Work history and role descriptions.
- **Tech Stack**: Languages, backend tools, databases, and DevOps skills.
- **System Branding**: OS name, version, and the boot sequence text.
- **App Control**: Use the `disabledApps` array to hide specific apps by their ID.

#### 📦 Available App IDs
You can rename any app in the `system.windows` section or disable it in the `disabledApps` section using these IDs:

| App ID | Default Title | Description |
| :--- | :--- | :--- |
| `about` | `About.txt` | Personal profile and system specs. |
| `projects` | `Projects.dir` | Your featured work/projects list. |
| `tech` | `TechStack.exe` | Technical skills and tools. |
| `experience` | `Experience.doc` | Work history and career timeline. |
| `contact` | `Contact.exe` | Secure communication form and social links. |
| `resume` | `Resume.pdf` | PDF Resume viewer. |
| `settings` | `Settings.cpl` | OS themes, backgrounds, and volume controls. |
| `notes` | `Notes.txt` | Interactive notepad with auto-save. |
| `coderunner` | `CodeRunner.exe` | Live code execution environment. |
| `sysmon` | `SysMon.exe` | System resource monitor simulation. |
| `snake` | `Snake.exe` | Retro arcade Snake game. |
| `tictactoe` | `TicTacToe.exe` | Classic Tic-Tac-Toe game. |
| `memory` | `MemoryMatch.exe` | Memory card matching game. |
| `bughunter` | `BugHunter.exe` | Interactive bug catching game. |

### 2. Branding & Personalization

To make DeskFolio your own, follow these steps:

- **Name & Role**: Change `profile.name` and `profile.role` in `data.json`.
- **Avatar**: Replace `public/user.jpg` with your own photo or update the `avatar` link in `data.json`.
- **Resume**: Replace `public/resume.pdf` with your professional resume.
- **Icons**: Add your custom PNG icons to `public/icons/`. Ensure the filenames match the IDs in `src/components/desktop/DesktopIcons.tsx`.
- **SEO**: Update the `<title>`, meta tags, and JSON-LD structured data in `index.html`. Also update `public/robots.txt` and `public/sitemap.xml` with your production URL.

### 3. Window Configuration (`src/config/window.config.tsx`)

Change initial window positions, default sizes, or icons for the desktop applications.

### 4. Themes (`src/config/themes.ts`)

Modify existing themes or add your own by defining new colors for `--bg`, `--accent`, `--window-bg`, etc.

## 📂 Project Structure

- `src/apps/`: Individual application components (About, Projects, Games).
- `src/components/`: Core UI components (Desktop, Taskbar, Window System).
- `src/hooks/`: Custom hooks like `useWindowManager` and `useSound`.
- `src/data/`: Centralized content in `data.json`.
- `src/config/`: Configuration files for windows and themes.

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Built with ❤️ by [Arjun Mehta](https://github.com/arjunmehta)
