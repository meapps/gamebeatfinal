# Development Prompts Documentation 📝

This document chronicles the sequence of prompts used to develop the Mineral Explorer game, showcasing the iterative development process and feature additions.

## Initial Setup and Core Game
1. "Create a grid like for the game mines and add a random seed instead of mines there a different type of minerals red can explore gold and silver are fine green can create can reactions."
   - Established basic grid structure
   - Implemented mineral types
   - Added seed-based generation

## Sound System
2. "Add tools that y drag over the field and detect which it could be. And y receive different sounds."
   - Implemented hover detection
   - Added unique sounds for each mineral type
   - Created sound feedback system

## Scoring and Feedback
3. "For a blank field a small noice or silve a bit louder and for green special sound and for red danger."
   - Differentiated sound levels
   - Enhanced audio feedback
   - Implemented danger warnings

## Game Mechanics
4. "If you click on the black field it will give a knocking sound that can indicate how cells away danger."
   - Added proximity detection
   - Implemented knocking sound mechanic
   - Enhanced danger indication system

## Scoring System
5. "Goal is to avoid green and red others give you extra points."
   - Implemented scoring system
   - Added points for safe minerals
   - Created penalty system for dangerous minerals

## Visual Enhancements
6. "Don't show numbers and add the art for green dimonds and red and silver and gold"
   - Added mineral icons
   - Implemented visual feedback
   - Enhanced UI design

## Mobile Support
7. "Disable the scrolling on mobile"
   - Added mobile-specific CSS
   - Prevented scroll bouncing
   - Enhanced touch interactions

## UI Improvements
8. "If you swipe over the cell you should hear the sounds too"
   - Added touch event handling
   - Implemented swipe detection
   - Enhanced mobile sound feedback

## Game Modes
9. "Add a mobile mode accessable with button"
   - Created mobile/desktop toggle
   - Adjusted UI for different screens
   - Implemented responsive design

## Customization
10. "Create a default playername that can be change by click on it"
    - Added player name system
    - Implemented name editing
    - Added local storage persistence

## Statistics Panel
11. "Show on the side stats how many mineral from each type are left and make it optional"
    - Added mineral statistics
    - Created toggleable panel
    - Implemented remaining mineral counts

## Testing Features
12. "Add ALT S for testing and also add ALT R for reveling all fields for testing"
    - Added developer shortcuts
    - Implemented reveal all feature
    - Added seed manipulation

## Victory Conditions
13. "Add ALT V for showing the victory or win screen"
    - Implemented victory screen
    - Added win animations
    - Created confetti effects

## Game Settings
14. "Make it possible to adjust the how many cells and how many diamonds etc in a custom mode"
    - Added custom game settings
    - Implemented grid size adjustment
    - Created mineral distribution controls

## Documentation
15. "Create a documation with seperate md files for suggestion roadmap future ideas etc"
    - Created comprehensive documentation
    - Added feature roadmap
    - Documented architecture and contribution guidelines

## Branding
16. "Change the title to GemBeat"
    - Updated game title
    - Modified branding elements
    - Enhanced visual identity

## Development Process Notes

### Key Development Principles
- Iterative feature addition
- User feedback incorporation
- Mobile-first approach
- Accessibility considerations

### Testing Strategy
- Developer shortcuts for testing
- Mobile compatibility testing
- Sound system verification
- Performance optimization

### Documentation Focus
- Clear feature documentation
- Comprehensive roadmap
- Detailed architecture overview
- Contribution guidelines

This documentation serves as a historical record of the development process and can be used to understand the evolution of features and design decisions in the Mineral Explorer game.