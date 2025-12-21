// src/engine/Scene.ts
import { Entity } from "./Entity";

export class Scene {
  entities: Entity[] = [];
  backgroundColor: string = "#000"; // default black

  constructor(backgroundColor?: string) {
    if (backgroundColor) this.backgroundColor = backgroundColor;
  }

  add(entity: Entity) {
    this.entities.push(entity);
  }

  remove(entity: Entity) {
    this.entities = this.entities.filter((e) => e !== entity);
  }

  update(deltaTime?: number) {
    for (const entity of this.entities) {
      entity.update(deltaTime);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Clear background
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw entities
    for (const entity of this.entities) {
      entity.draw(ctx);
    }
  }

  clear() {
    this.entities = [];
  }
}
