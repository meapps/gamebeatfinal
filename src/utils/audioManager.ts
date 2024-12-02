import { Howl } from 'howler';

// Pre-initialize all game sounds
const sounds = {
  empty: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'],
    preload: true,
    volume: 0.3,
    html5: true // Enable HTML5 Audio for better mobile support
  }),
  silver: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3'],
    preload: true,
    volume: 0.4,
    html5: true
  }),
  gold: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2573/2573-preview.mp3'],
    preload: true,
    volume: 0.5,
    html5: true
  }),
  danger: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2574/2574-preview.mp3'],
    preload: true,
    volume: 0.6,
    html5: true
  }),
  explosion: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2575/2575-preview.mp3'],
    preload: true,
    volume: 0.5,
    html5: true
  }),
  victory: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2576/2576-preview.mp3'],
    preload: true,
    volume: 0.7,
    html5: true
  }),
  swipe: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2577/2577-preview.mp3'],
    preload: true,
    volume: 0.15,
    rate: 1.5,
    html5: true
  })
};

// Create a pool of swipe sounds for better performance
const swipeSoundPool = Array(3).fill(null).map(() => sounds.swipe);
let currentSwipeIndex = 0;

let isAudioInitialized = false;

// Initialize audio context on first user interaction
export const initAudio = () => {
  if (!isAudioInitialized) {
    const context = Howler.ctx;
    if (context && context.state !== 'running') {
      context.resume();
    }
    isAudioInitialized = true;
    
    // Pre-load all sounds
    Object.values(sounds).forEach(sound => {
      sound.load();
    });
  }
};

export const playSound = {
  empty: () => {
    if (isAudioInitialized) sounds.empty.play();
  },
  silver: () => {
    if (isAudioInitialized) sounds.silver.play();
  },
  gold: () => {
    if (isAudioInitialized) sounds.gold.play();
  },
  danger: () => {
    if (isAudioInitialized) sounds.danger.play();
  },
  explosion: () => {
    if (isAudioInitialized) sounds.explosion.play();
  },
  victory: () => {
    if (isAudioInitialized) sounds.victory.play();
  },
  swipe: () => {
    if (isAudioInitialized) {
      swipeSoundPool[currentSwipeIndex].play();
      currentSwipeIndex = (currentSwipeIndex + 1) % swipeSoundPool.length;
    }
  }
};