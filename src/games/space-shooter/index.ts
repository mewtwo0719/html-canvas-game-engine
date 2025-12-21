import { Game } from "../../engine/Game";
import { Scene } from "../../engine/Scene";
import { Automated } from "../../engine/entityHelpers/Automated";
import { Controllable } from "../../engine/entityHelpers/Controllable";
import { getRandomPosition } from "../../engine/sceneHelpers/getRandomPositon";

// ====== GAME CONFIG ======
const GAME_WIDTH = 800;
const GAME_HEIGHT = 500;

// ====== PLAYER ======
const player = new Controllable(100, 100, 50, 50, {
  up: ["ArrowUp", "w"],
  down: ["ArrowDown", "s"],
  left: ["ArrowLeft", "a"],
  right: ["ArrowRight", "d"],
});

// ====== ENEMY ======
const enemy = new Automated(
  300,
  200,
  50,
  50,
  [
    { dx: 2, dy: 0, duration: 50 }, // move right 2 units for 50 frames
    { dx: 0, dy: 2, duration: 50 }, // move down
    { dx: -2, dy: 0, duration: 50 }, // move left
    { dx: 0, dy: -2, duration: 50 }, // move up
  ],
  true
);

// ====== BULLETS ======
const bullets: Automated[] = [];
for (let i = 0; i < 100; i++) {
  const pos = getRandomPosition(GAME_WIDTH, GAME_HEIGHT, {
    randomPositionStartingFrom: "top",
  });
  const bullet = new Automated(pos.x, pos.y, 10, 10, [
    { dx: 0, dy: 4, duration: 50 }, // dy per frame
  ]);
  bullets.push(bullet);
}

// ====== COLLISIONS ======
// Player vs enemy
player.addCollision({
  target: enemy,
  onCollision: () => console.log("Player collided with enemy!"),
});

// Player vs bullets
bullets.forEach((bullet) => {
  player.addCollision({
    target: bullet,
    onCollision: () => console.log("GOT HIT BY BULLET"),
  });
});

// ====== SCENE ======
const scene = new Scene("#111");
scene.add(player);
scene.add(enemy);
bullets.forEach((bullet) => scene.add(bullet));

// ====== GAME ======
const game = new Game("canvas", scene, GAME_WIDTH, GAME_HEIGHT);
game.start();

// ====== INPUT ======
window["keys"] = {};
window.addEventListener("keydown", (e) => (window["keys"][e.key] = true));
window.addEventListener("keyup", (e) => (window["keys"][e.key] = false));
