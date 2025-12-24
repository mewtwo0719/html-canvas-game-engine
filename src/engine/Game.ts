import { Scene } from "./Scene";
import { SceneManager } from "./SceneManager";

export class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  sceneManager: SceneManager;
  lastTime = 0;

  gameWidth: number;
  gameHeight: number;

  constructor(
    canvasId: string,
    initialScene: Scene,
    gameWidth = 800,
    gameHeight = 600
  ) {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvas) throw new Error(`Canvas "${canvasId}" not found`);

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("No canvas context");

    this.canvas = canvas;
    this.ctx = ctx;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.canvas.width = gameWidth;
    this.canvas.height = gameHeight;

    this.sceneManager = new SceneManager(this);
    this.sceneManager.set(initialScene);

    this.resize();
    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    const windowRatio = window.innerWidth / window.innerHeight;
    const gameRatio = this.gameWidth / this.gameHeight;

    if (windowRatio > gameRatio) {
      this.canvas.style.height = `${window.innerHeight}px`;
      this.canvas.style.width = `${window.innerHeight * gameRatio}px`;
    } else {
      this.canvas.style.width = `${window.innerWidth}px`;
      this.canvas.style.height = `${window.innerWidth / gameRatio}px`;
    }

    this.canvas.style.margin = "0 auto";
    this.canvas.style.display = "block";
  }

  start() {
    this.lastTime = performance.now();
    requestAnimationFrame(this.loop);
  }

  private loop = (time: number) => {
    const dt = (time - this.lastTime) / 1000;
    this.lastTime = time;

    this.sceneManager.update(dt);
    this.sceneManager.draw(this.ctx);

    requestAnimationFrame(this.loop);
  };
}
