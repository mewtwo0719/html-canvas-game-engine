import { Scene } from "../../../engine/Scene";
import { GameScene } from "./GameScene";

export class MenuScene extends Scene {
  backgroundColor = "#111";

  update() {
    if (window["keys"]["Enter"]) {
      this.game.sceneManager.set(new GameScene());
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    super.draw(ctx);

    ctx.fillStyle = "white";
    ctx.font = "30px sans-serif";
    ctx.fillText("SPACE SHOOTER", 250, 200);
    ctx.font = "18px sans-serif";
    ctx.fillText("Press ENTER to start", 270, 260);
  }
}
