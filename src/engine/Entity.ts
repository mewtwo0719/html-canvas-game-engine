interface CollisionConfig {
  target: Entity | HTMLElement; // entity or DOM element to check
  onCollision: () => void; // custom event when collision occurs
}

export class Entity {
  x = 0;
  y = 0;
  width = 50;
  height = 50;
  visible = true;

  collisions: CollisionConfig[] = [];

  constructor(x = 0, y = 0, width = 50, height = 50) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  addCollision(config: CollisionConfig) {
    this.collisions.push(config);
  }

  checkCollisions() {
    console.log("Checking collision");
    this.collisions.forEach((c) => {
      if (c.target instanceof Entity) {
        // Collision with another entity
        if (this._isCollidingWithEntity(c.target)) {
          c.onCollision();
        }
      } else if (c.target instanceof HTMLElement) {
        // Collision with DOM element
        const rect = c.target.getBoundingClientRect();
        if (this._isCollidingWithRect(rect)) {
          c.onCollision();
        }
      }
    });
  }

  private _isCollidingWithEntity(other: Entity) {
    return !(
      this.x + this.width < other.x ||
      this.x > other.x + other.width ||
      this.y + this.height < other.y ||
      this.y > other.y + other.height
    );
  }

  private _isCollidingWithRect(rect: DOMRect) {
    const canvasRect = {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };
    return !(
      canvasRect.x + canvasRect.width < rect.left ||
      canvasRect.x > rect.right ||
      canvasRect.y + canvasRect.height < rect.top ||
      canvasRect.y > rect.bottom
    );
  }

  update(deltaTime?: number) {
    // Override in child classes
    this.checkCollisions(); // check collisions each frame
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.visible) return;
    ctx.fillStyle = "white";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
