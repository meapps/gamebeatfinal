# Testing Features for Mineral Explorer

This document outlines the testing features available in Mineral Explorer. These features are designed for developers and testers to verify game functionality.

## Keyboard Shortcuts

### Alt + S: Set New Random Seed
- Generates a new random seed for the game
- Resets the game with the new seed
- Displays the new seed value in an alert
- Useful for testing specific mineral layouts

### Alt + R: Reveal All Cells
- Instantly reveals all cells on the grid
- Does not trigger explosions or game over
- Helps verify mineral distribution
- Great for checking win conditions

### Alt + V: Show Victory Screen
- Forces the victory screen to appear
- Useful for testing win animations and effects
- Does not affect the actual game state
- Great for UI/UX testing

## Best Practices

1. **Testing Seeds**
   - Use Alt+S to generate reproducible layouts
   - Note down seeds that produce interesting scenarios
   - Share seeds when reporting bugs

2. **Layout Verification**
   - Use Alt+R to verify mineral distribution
   - Check probability distribution of minerals
   - Verify chain reaction patterns

3. **UI Testing**
   - Use Alt+V to test victory animations
   - Verify confetti effects
   - Test responsive design at different stages

## Notes

- These shortcuts are only for testing purposes
- Not mentioned in the main game UI
- Should not be used during normal gameplay
- May be disabled in production builds