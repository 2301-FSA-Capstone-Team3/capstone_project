import Phaser from "phaser";
import "phaser-matter-collision-plugin";

import Player from "./Player.js";
import MainMapTiles from "./assets/images/IceTileset.png";
const MainMapJSON = require("./assets/images/MainMap.json");
import Enemy from "./Enemy.js";
export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }
  preload() {
    Player.preload(this);
    // Enemy.preload(this)
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


    this.player = new Player({
      scene: this,
      x: 50,
      y: 50,
      texture: "cat_sprite",
      frame: "tile000",
    });
    this.enemy1 = new Enemy({
      scene: this,
      x: 200,
      y: 200,
      texture: "cat_sprite",
      frame: "tile000",
    });
    this.enemy2 = new Enemy({
      scene: this,
      x: 200,
      y: 200,
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
    this.cameras.main.setViewport(this.player.x,this.player.y, window.innerWidth,window.innerHeight)
  }
  update() {
    this.player.update();
    this.enemy1.update(this.player)
    this.enemy2.update(this.player)
  }
}
