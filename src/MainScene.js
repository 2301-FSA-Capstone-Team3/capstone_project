import Phaser from "phaser";
import 'phaser-matter-collision-plugin';

// import Player from "./Player.js"; ** this is for when the sprites are ready

export default class MainScene extends Phaser.Scene{
  constructor(){
    super('MainScene');
  }
  preload ()
  {
    this.load.atlas("hero", './src/assets/images/mrmeowgi', './src/assets/images/mrmeowgi_atlas');
    // this.load.animation("cat", "assets/images/cat");
    console.log('preload')
  }

  create ()
  {

      console.log('create')
      // this.player = new Player({scene: this, x:0 ,y:0 , texture:'hero',frame:'idle'})
      this.player = new Phaser.Physics.Matter.Sprite(this.matter.world,50,50,'hero', "tile001")
      this.add.existing(this.player)
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
