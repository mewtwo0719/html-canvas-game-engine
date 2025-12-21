import { Game } from "../../engine/Game";
import { Controllable } from "../../engine/playerHelpers.ts/Controllable";
import { Scene } from "../../engine/Scene";

// Move with Arrow keys OR WASD
const player = new Controllable(100, 100, 50, 50, {
  up: ["ArrowUp", "w"],
  down: ["ArrowDown", "s"],
  left: ["ArrowLeft", "a"],
  right: ["ArrowRight", "d"],
});

// Another entity with different keys
const enemy = new Controllable(200, 200, 50, 50, {
  up: ["i"],
  down: ["k"],
  left: ["j"],
  right: ["l"],
});

// Input handling
window["keys"] = {};
window.addEventListener("keydown", (e) => (window["keys"][e.key] = true));
window.addEventListener("keyup", (e) => (window["keys"][e.key] = false));

// Setup
const scene = new Scene("#111"); // dark background
scene.add(player);
scene.add(enemy);
const game = new Game("canvas", scene);
game.start();
