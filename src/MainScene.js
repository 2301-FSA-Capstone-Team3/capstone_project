import Phaser from "phaser";
import "phaser-matter-collision-plugin";

import Player from "./PlayerRay.js";
import MainMapTiles from "./assets/images/IceTileset.png";
import Enemy from "./EnemyRay.js";
const MainMapJSON = require("./assets/images/MainMap.json");
export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
    this.enemies = [];
  }
  preload() {
    Player.preload(this);
    Enemy.preload(this);
    this.load.image("tiles", MainMapTiles);
    this.load.tilemapTiledJSON("MainMap", MainMapJSON);
  }

  create() {
    const MainMap = this.make.tilemap({ key: "MainMap" });
    const tileset = MainMap.addTilesetImage("IceTileset", "tiles", 32, 32);
    const layer1 = MainMap.createLayer("Tile Layer 1", tileset, 0, 0);
    const layer2 = MainMap.createLayer("Tile Layer 2", tileset, 0, 0);
    layer1.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(layer1);
    layer2.setCollisionByProperty({ collides2: true });
    this.matter.world.convertTilemapLayer(layer2);
    MainMap.getObjectLayer("Enemies").objects.forEach((enemy) => {
      this.enemies.push(new Enemy({ scene: this, enemy }));
    });
    this.player = new Player({
      scene: this,
      x: 50,
      y: 50,
      texture: "cat_sprite",
      frame: "tile000",
    });
    this.player = new Player({
      scene: this,
      x: 50,
      y: 50,
      texture: "cat_sprite",
      frame: "tile000",
    });
    this.player.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
    this.cameras.main.startFollow(this.player);
    this.cameras.main.centerOn(this.player.x, this.player.y);
  }
  update() {
    // this.enemies.forEach((enemy) => enemy.update());
    this.player.update();
  }
}
//delete this comment here
