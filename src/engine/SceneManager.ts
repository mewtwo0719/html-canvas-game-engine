import type { Game } from "./Game";
import { Scene } from "./Scene";

export class SceneManager {
  private stack: Scene[] = [];
  private game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  /** Replace entire stack */
  set(scene: Scene) {
    this.clear();
    this.push(scene);
  }

  /** Push overlay (pause menu etc.) */
  push(scene: Scene) {
    scene.onEnter(this.game);
    this.stack.push(scene);
  }

  /** Pop top scene */
  pop() {
    const scene = this.stack.pop();
    scene?.onExit();
  }

  clear() {
    while (this.stack.length) {
      this.pop();
    }
  }

  update(dt: number) {
    // Only top scene updates
    this.current()?.update(dt);
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Draw all scenes (for overlays)
    for (const scene of this.stack) {
      scene.draw(ctx);
    }
  }

  current(): Scene | undefined {
    return this.stack[this.stack.length - 1];
  }
}
