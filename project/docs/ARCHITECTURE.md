# Technical Architecture 🏗️

## Core Components

### Game Logic
- Grid generation
- Mineral placement
- Score calculation
- Win/lose conditions
- Chain reactions

### State Management
- Game state
- Settings
- High scores
- Player preferences

### Audio System
- Sound effects
- Event handling
- Mobile optimization
- Preloading

### User Interface
- Grid rendering
- Animations
- Popups
- Statistics
- Settings modal

## File Structure

```
src/
├── components/      # React components
├── types/          # TypeScript interfaces
├── utils/          # Helper functions
└── assets/         # Static resources

components/
├── Grid.tsx        # Main game grid
├── Cell.tsx        # Individual cells
├── icons/          # Mineral icons
└── popups/         # Modal components

utils/
├── gameLogic.ts    # Core game mechanics
├── storage.ts      # Local storage
└── seedManager.ts  # Random generation
```

## Technologies

- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Howler.js
- Local Storage API