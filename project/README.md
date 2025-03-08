# Recipe Contest Platform

A modern, responsive web application for managing and showcasing recipe contests. Built with React, TypeScript, and Tailwind CSS.

![Recipe Contest Platform Screenshot](https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&q=80&w=1200)

## Features

- 🔍 **Advanced Search**: Search recipes by name, chef, or description
- 🔄 **Smart Sorting**: Sort by newest, oldest, highest-rated, or lowest-rated
- 🏷️ **Comprehensive Filtering**:
  - Recipe Attributes (Contest Winner, Featured, Test Kitchen-Approved)
  - Meal Types (Dinner, Lunch, Dessert, Breakfast)
  - Dish Types (Curry, Pizza, Seafood, Soup, Mexican, Smoothie)
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- 🎨 **Modern UI**: Clean, intuitive interface with beautiful recipe cards
- ⚡ **Performance Optimized**: Efficient filtering and sorting with React's useMemo

## Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: npm

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

## Project Structure

```
src/
├── components/         # React components
│   ├── FilterSidebar.tsx
│   ├── RecipeCard.tsx
│   ├── SearchBar.tsx
│   └── SortDropdown.tsx
├── data/              # Sample data and constants
│   └── recipes.ts
├── types/             # TypeScript type definitions
│   └── index.ts
├── App.tsx           # Main application component
└── main.tsx         # Application entry point
```

## Component Overview

### SearchBar
- Handles recipe search functionality
- Searches through recipe names, chef names, and descriptions
- Real-time search updates

### SortDropdown
- Manages recipe sorting options
- Supports sorting by date and rating
- Clean dropdown interface

### FilterSidebar
- Comprehensive filtering system
- Multiple filter categories
- Active filters display
- Clear all/individual filter functionality

### RecipeCard
- Displays recipe information
- Shows recipe attributes with icons
- Responsive image handling
- Rating display

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Recipe images from [Unsplash](https://unsplash.com)
- Icons from [Lucide React](https://lucide.dev)