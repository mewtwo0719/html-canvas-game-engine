import { Scene } from "./Scene";

export class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  scene: Scene;
  lastTime: number = 0;

  gameWidth: number; // fixed game resolution
  gameHeight: number;

  constructor(
    canvasId: string,
    scene?: Scene,
    gameWidth = 800,
    gameHeight = 600
  ) {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvas) throw new Error(`Canvas with id "${canvasId}" not found`);
    this.canvas = canvas;

    const ctx = this.canvas.getContext("2d");
    if (!ctx) throw new Error("Cannot get canvas context");
    this.ctx = ctx;

    this.scene = scene || new Scene();

    // Set fixed internal game resolution
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.canvas.width = this.gameWidth;
    this.canvas.height = this.gameHeight;

    this.resize();
    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    const windowRatio = window.innerWidth / window.innerHeight;
    const gameRatio = this.gameWidth / this.gameHeight;

    if (windowRatio > gameRatio) {
      // Window is wider than game ratio → scale by height
      this.canvas.style.height = `${window.innerHeight}px`;
      this.canvas.style.width = `${window.innerHeight * gameRatio}px`;
    } else {
      // Window is taller than game ratio → scale by width
      this.canvas.style.width = `${window.innerWidth}px`;
      this.canvas.style.height = `${window.innerWidth / gameRatio}px`;
    }

    // Optional: center canvas
    this.canvas.style.display = "block";
    this.canvas.style.margin = "0 auto";
  }

  start() {
    this.lastTime = performance.now();
    requestAnimationFrame(this.loop.bind(this));
  }

  private loop(currentTime: number) {
    const deltaTime = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;

    this.update(deltaTime);
    this.draw();

    requestAnimationFrame(this.loop.bind(this));
  }

  update(deltaTime: number) {
    this.scene.update(deltaTime);
  }

  draw() {
    this.scene.draw(this.ctx);
  }
}
