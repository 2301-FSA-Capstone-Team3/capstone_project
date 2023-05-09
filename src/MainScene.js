import Player from "./Player.js";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }
  preload() {
    Player.preload(this);

    //     // this.load.image('tiles', 'src/assets/images/???')
    //     // this.load.tilemapTiledJSON('map1', 'src/assets/images/map1.json')
  }

  create() {
    //     let mySprites = this.add.sprite(300, 200, "cat");
    //     // const map1= this.make.tilemap({key: 'map'})
    //     // const tileset = map1.addTilesetImage('name', 'tiles', 32,32,0,0)
    //     // const layer1 = map1.createStaticLayer('Tile layer 1', tileset)
    //     // layer1.setCollisionByProperty({collides:true})
    console.log("create");
    //     // this.player = new Player({scene: this, x:0 ,y:0 , texture:'hero',frame:'idle'})
    this.player = new Player({
      scene: this,
      x: 0,
      y: 0,
      texture: "male_main_character",
      frame: "tile000",
    });
    this.add.existing(this.player);
    this.player.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
  }

  update() {
    this.player.update();
  }
}
