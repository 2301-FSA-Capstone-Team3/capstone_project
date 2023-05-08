import Phaser from "phaser";

// import Player from "./Player.js"; ** this is for when the sprites are ready

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }
  preload() {
    this.load.image("iceTileset", "src/assets/images/iceTileset.png");
    this.load.tilemapTiledJSON("iceMap1", "src/assets/images/iceTileMap.json");
    console.log("preload");
  }

  create() {
    const map = this.make.tilemap({ key: "iceMap1" });
    const tileset = map.addTilesetImage("iceTileset", "iceTileset");
    const layer1 = map.createStaticLayer("layer1", tileset, 0, 0);
    const layer2 = map.createStaticLayer("layer2", tileset, 0, 0);
    const obstacles = map.createStaticLayer("obstacles", tileset, 0, 0);
    // this.map = this.make.tilemap({ key: "iceMap1" });
    // let tiles = this.map.addTilesetImage("iceTileset", "iceTileset");
    // this.groundLayer = this.map.createLayer("ground", tiles, 0, 0);
    // this.map.setCollisionByExclusion({ solid: true });
    // this.matter.world.convertTilemapLayer(this.groundLayer);
    console.log("create");

    this.player = new Phaser.Physics.Matter.Sprite(this.matter.world);
    this.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
  }

  update() {
    // this.player.update() ** this is for when the sprites are ready
    const speed = 2.5;
    let playerVelocity = new Phaser.Math.Vector2();
    if (this.inputKeys.left.isDown) {
      playerVelocity.x = -1;
    } else if (this.inputKeys.right.isDown) {
      playerVelocity.x = 1;
    }
    if (this.inputKeys.up.isDown) {
      playerVelocity.y = -1;
    } else if (this.inputKeys.down.isDown) {
      playerVelocity.y = 1;
    }
    playerVelocity.normalize();
    playerVelocity.scale(speed);
    this.player.setVelocity(playerVelocity.x, playerVelocity.y);
  }
}
