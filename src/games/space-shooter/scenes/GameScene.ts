import { Scene } from "../../../engine/Scene";
import { Automated } from "../../../engine/entityHelpers/Automated";
import { getRandomPosition } from "../../../engine/sceneHelpers/getRandomPositon";
import { Enemy } from "../entities/Enemy";
import { Player } from "../entities/Player";
import { PauseScene } from "./PauseScene";

export class GameScene extends Scene {
  constructor() {
    super();
    this.backgroundColor = "#111";

    const GAME_WIDTH = 800;
    const GAME_HEIGHT = 500;

    // ====== PLAYER ======
    const player = new Player(
      100,
      100,
      50,
      50,
      {
        up: ["ArrowUp", "w"],
        down: ["ArrowDown", "s"],
        left: ["ArrowLeft", "a"],
        right: ["ArrowRight", "d"],
      },
      { health: 100, speed: 5 }
    );

    // ====== ENEMY ======
    const enemy = new Enemy(
      300,
      100,
      50,
      50,
      [
        { dx: 20, dy: 0, duration: 6 },
        { dx: -20, dy: 0, duration: 6 },
      ],
      true,
      { health: 40, damage: 15 }
    );

    // ====== COLLISIONS ======
    player.addCollision({
      target: enemy,
      onCollision: () => {
        console.log("Player hit enemy");
        enemy.takeDamage(10);
      },
    });

    // ====== BULLETS ======
    const bullets: Automated[] = [];
    for (let i = 0; i < 100; i++) {
      const pos = getRandomPosition(GAME_WIDTH, GAME_HEIGHT, {
        randomPositionStartingFrom: "top",
      });

      const bullet = new Automated(pos.x, pos.y, 10, 10, [
        { dx: 0, dy: 4, duration: 50 },
      ]);

      bullets.push(bullet);

      player.addCollision({
        target: bullet,
        onCollision: () => console.log("GOT HIT BY BULLET"),
      });

      this.add(bullet);
    }

    this.add(player);
    this.add(enemy);
  }

  update(dt: number) {
    super.update(dt);

    // Pause
    if (window["keys"]["p"]) {
      this.game.sceneManager.push(new PauseScene());
      window["keys"]["p"] = false;
    }
  }
}
