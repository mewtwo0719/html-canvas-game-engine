import { Entity } from "../Entity";

interface ControlKeys {
  up: string[]; // one or more keys
  down: string[];
  left: string[];
  right: string[];
}

export class Controllable extends Entity {
  speed: number = 5;
  keys: ControlKeys;

  constructor(
    x = 0,
    y = 0,
    width = 50,
    height = 50,
    keys?: Partial<ControlKeys> // allow partial override
  ) {
    super(x, y, width, height);
    // Default to arrow keys
    this.keys = {
      up: ["ArrowUp"],
      down: ["ArrowDown"],
      left: ["ArrowLeft"],
      right: ["ArrowRight"],
      ...keys, // merge with user-specified keys
    };
  }

  update() {
    const pressed = window["keys"] || {};

    if (this.keys.up.some((key) => pressed[key])) this.y -= this.speed;
    if (this.keys.down.some((key) => pressed[key])) this.y += this.speed;
    if (this.keys.left.some((key) => pressed[key])) this.x -= this.speed;
    if (this.keys.right.some((key) => pressed[key])) this.x += this.speed;
  }
}
