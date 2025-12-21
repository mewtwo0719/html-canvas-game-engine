import { Entity } from "../Entity";

export interface MovementStep {
  dx?: number; // change in X per frame or per unit
  dy?: number; // change in Y per frame or per unit
  duration: number; // how long to move in frames or seconds
}

export class Automated extends Entity {
  pattern: MovementStep[] = [];
  repeat: boolean = true;
  private currentStepIndex = 0;
  private stepTimeElapsed = 0;

  constructor(
    x = 0,
    y = 0,
    width = 50,
    height = 50,
    pattern: MovementStep[] = [],
    repeat = true
  ) {
    super(x, y, width, height);
    this.pattern = pattern;
    this.repeat = repeat;
  }

  update(deltaTime: number = 1) {
    super.update(deltaTime); // still check collisions, etc.

    if (!this.pattern.length) return;

    const step = this.pattern[this.currentStepIndex];

    // Move entity
    this.x += (step.dx || 0) * deltaTime;
    this.y += (step.dy || 0) * deltaTime;

    // Count duration
    this.stepTimeElapsed += deltaTime;

    if (this.stepTimeElapsed >= step.duration) {
      // Move to next step
      this.stepTimeElapsed = 0;
      this.currentStepIndex++;
      if (this.currentStepIndex >= this.pattern.length) {
        if (this.repeat) this.currentStepIndex = 0; // repeat pattern
        else this.currentStepIndex = this.pattern.length - 1; // stay at last step
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    super.draw(ctx);
  }
}
