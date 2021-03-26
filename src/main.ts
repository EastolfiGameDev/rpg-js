import { RpgGame } from './game/game';

let app = null;

// Once everything is loaded, initialize the game
window.addEventListener('DOMContentLoaded', () => {
    app = new RpgGame();
});
