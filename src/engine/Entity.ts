// src/engine/Entity.ts

export class Entity {
  x: number = 0; // X position
  y: number = 0; // Y position
  width: number = 50; // width of entity (default)
  height: number = 50; // height of entity (default)
  visible: boolean = true; // should it be drawn?

  constructor(x = 0, y = 0, width = 50, height = 50) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  // Called every frame to update entity state
  update(deltaTime?: number) {
    // Override in subclasses
  }

  // Called every frame to draw entity on canvas
  draw(ctx: CanvasRenderingContext2D) {
    if (!this.visible) return;
    ctx.fillStyle = "white"; // default color
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
