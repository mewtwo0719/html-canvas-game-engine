import { Entity } from "./Entity";
import type { Game } from "./Game";

export abstract class Scene {
  protected game!: Game;
  protected entities: Entity[] = [];
  backgroundColor = "#000";

  /** Called once when scene becomes active */
  onEnter(game: Game): void {
    this.game = game;
  }

  /** Called once when scene is removed */
  onExit(): void {}

  update(deltaTime: number): void {
    for (const entity of this.entities) {
      entity.update(deltaTime);
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (const entity of this.entities) {
      entity.draw(ctx);
    }
  }

  add(entity: Entity) {
    this.entities.push(entity);
  }

  remove(entity: Entity) {
    this.entities = this.entities.filter((e) => e !== entity);
  }
}
