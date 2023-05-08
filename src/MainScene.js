import Phaser from "phaser";
import 'phaser-matter-collision-plugin';

// import Player from "./Player.js"; ** this is for when the sprites are ready

export default class MainScene extends Phaser.Scene{
  constructor(){
    super('MainScene');
  }
  preload ()
  {
    this.load.atlas("cat", "assets/images/cat.png", 'assets/images/cat_atlas');
      console.log('preload')
      
      // this.load.image('tiles', 'src/assets/images/???')
      // this.load.tilemapTiledJSON('map1', 'src/assets/images/map1.json')
  }

  create ()
  {
    var mySprites = this.add.sprite(300,200,"cat")
    // const map1= this.make.tilemap({key: 'map'})
    // const tileset = map1.addTilesetImage('name', 'tiles', 32,32,0,0)
    // const layer1 = map1.createStaticLayer('Tile layer 1', tileset)
    // layer1.setCollisionByProperty({collides:true})
      console.log('create')
      // this.player = new Player({scene: this, x:0 ,y:0 , texture:'hero',frame:'idle'}) ** this is for when the sprites are ready
      this.player = new Phaser.Physics.Matter.Sprite(this.matter.world,0,0,'cat', 'cat')
      this.inputKeys = this.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D,
      })
  }
  update ()
  {
      // this.player.update() ** this is for when the sprites are ready
      const speed = 2.5;
      let playerVelocity = new Phaser.Math.Vector2();
      if(this.inputKeys.left.isDown){
        playerVelocity.x = -1
      }else if (this.inputKeys.right.isDown){
        playerVelocity.x = 1
      }
      if(this.inputKeys.up.isDown){
        playerVelocity.y = -1
      }else if (this.inputKeys.down.isDown){
        playerVelocity.y = 1
      }
      playerVelocity.normalize()
      playerVelocity.scale(speed)
      this.player.setVelocity(playerVelocity.x, playerVelocity.y)

  }
}
