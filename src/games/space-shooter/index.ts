import { Game } from "../../engine/Game";
import { MenuScene } from "./scenes/MenuScene";

const game = new Game("canvas", new MenuScene(), 800, 500);
game.start();

// ====== INPUT ======
window["keys"] = {};
window.addEventListener("keydown", (e) => (window["keys"][e.key] = true));
window.addEventListener("keyup", (e) => (window["keys"][e.key] = false));
