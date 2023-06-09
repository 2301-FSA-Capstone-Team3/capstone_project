
import Phaser from "phaser";
import "phaser-matter-collision-plugin";
import Player from "./Player.js";
import MainMapTiles from "./assets/images/IceTileset.png";
const MainMapJSON = require("./assets/images/MainMap.json");
import Enemy from "./Enemy.js";
export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
    this.enemies = []
  }
  preload() {
    Player.preload(this);
    Enemy.preload(this);

    this.load.image("tiles", MainMapTiles);
    this.load.tilemapTiledJSON("MainMap", MainMapJSON);
  }

  create() {
    console.log(this.enemies)
    this.add.text(20, 20, "Playing game", {font: "25px Arial", fill: "yellow" })
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
          x: 444,
          y: 888,
          texture: "cat_sprite",
          frame: "tile000",
          name: 'player'
        });
        MainMap.getObjectLayer("Enemies").objects.forEach((enemy)=> {
          this.enemies.push(new Enemy({ scene: this, enemy, target:this.player}))
        })

        this.makeBabies=(foe)=>{
          let batter = MainMap.getObjectLayer("Enemies").objects.filter(e=> e.name === foe.name)
          console.log(batter.length)
          let rando = Math.floor(Math.random()*(batter.length-0))
          const enemy = batter[rando];
            this.enemies.push(new Enemy({ scene: this, enemy, target:this.player}))
        }

        this.player.inputKeys = this.input.keyboard.addKeys({
          up: Phaser.Input.Keyboard.KeyCodes.W,
          down: Phaser.Input.Keyboard.KeyCodes.S,
          left: Phaser.Input.Keyboard.KeyCodes.A,
          right: Phaser.Input.Keyboard.KeyCodes.D,
      Attack: Phaser.Input.Keyboard.KeyCodes.SPACE,
      Attack2: Phaser.Input.Keyboard.KeyCodes.E,
      Attack3: Phaser.Input.Keyboard.KeyCodes.Q,
    });
    this.cameras.main.startFollow(this.player);
    this.cameras.main.centerOn(this.player.x, this.player.y);
  }

  update() {
    this.enemies.forEach((enemy) => enemy.update());
    this.player.update();
    // console.log(this.player.health)
  }
  showGameOver(){
    // this.scene.start('GameOver')
    this.scene.start('GameOver',{kills: this.enemies.length})
  }
}


