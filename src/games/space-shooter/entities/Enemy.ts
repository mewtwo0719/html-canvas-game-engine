// src/engine/entities/Enemy.ts
import { Automated } from "../../../engine/entityHelpers/Automated";

export interface EnemyOptions {
  health?: number;
  damage?: number;
}

export class Enemy extends Automated {
  health: number;
  damage: number;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    pattern: { dx: number; dy: number; duration: number }[],
    repeat = true,
    options: EnemyOptions = {}
  ) {
    super(x, y, width, height, pattern, repeat);

    this.health = options.health ?? 30;
    this.damage = options.damage ?? 10;
  }

  takeDamage(amount: number) {
    this.health -= amount;
    if (this.health <= 0) {
      this.health = 0;
      this.onDeath();
    }
  }

  onDeath() {
    console.log("Enemy destroyed");
    //this.active = false; // if you support disabling entities
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
