import mrmPng from './assets/images/mrmeowgi.png'
const mrmAtlasjson = require('./assets/images/mrmeowgi_atlas.json')
const mrmAnims = require('./assets/images/mrmeowgi_anim.json')
export default class Player extends Phaser.Physics.Matter.Sprite{
  constructor(data){
    let {scene,x,y,texture,frame} = data
    super(scene.matter.world,x,y,texture,frame);
    this.scene.add.existing(this)
  }
 static preload (scene)
  {
    scene.load.atlas("hero", mrmPng, mrmAtlasjson);
    scene.load.animation("hero_anims", mrmAnims);
  }
  create ()
  {

  }
  update ()
  {
    
      // this.anims.play('idle', true)
      //** breaks with error cant find properties of duration
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
      this.setVelocity(playerVelocity.x, playerVelocity.y)

  }
}
