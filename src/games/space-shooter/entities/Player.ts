// src/engine/entities/Player.ts
import { Controllable } from "../../../engine/entityHelpers/Controllable";

export interface PlayerOptions {
  speed?: number;
  health?: number;
}

export class Player extends Controllable {
  health: number;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    keys?: Partial<{
      up: string[];
      down: string[];
      left: string[];
      right: string[];
    }>,
    options: PlayerOptions = {}
  ) {
    super(x, y, width, height, keys);

    this.speed = options.speed ?? this.speed;
    this.health = options.health ?? 100;
  }

  takeDamage(amount: number) {
    this.health -= amount;
    if (this.health <= 0) {
      this.health = 0;
      this.onDeath();
    }
  }

  onDeath() {
    console.log("Player died");
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "cyan";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
