import { Scene } from "../../../engine/Scene";

export class PauseScene extends Scene {
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "32px sans-serif";
    ctx.fillText("PAUSED", 330, 250);
  }

  update() {
    if (window["keys"]["p"]) {
      window["keys"]["p"] = false; // <-- consume input
      this.game.sceneManager.pop();
    }
  }
}
