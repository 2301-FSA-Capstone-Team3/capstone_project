import mrmPng from './assets/images/cat_sprite.png'
const mrmAtlasjson = require('./assets/images/cat_sprite_atlas.json')
const mrmAnims = require('./assets/images/cat_sprite_anim.json')
export default class Player extends Phaser.Physics.Matter.Sprite{
  constructor(data){
    let {scene,x,y,texture,frame} = data
    super(scene.matter.world,x,y,texture,frame);
    this.scene.add.existing(this)
  }
 static preload (scene)
  {
    scene.load.atlas("cat_sprite", mrmPng, mrmAtlasjson);
    scene.load.animation("cat_sprite_anims", mrmAnims);
  }
  create ()
  {
  }
  update ()
  {
    const speed = 1;
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
    this.setVelocity(playerVelocity.x, playerVelocity.y);
    if (this.inputKeys.up.isDown && this.inputKeys.right.isDown) {
      this.anims.play("cat_walk", true);
    } else if (this.inputKeys.up.isDown) {
      this.anims.play("cat_walk", true);
    } else if (this.inputKeys.down.isDown && this.inputKeys.right.isDown) {
      this.anims.play("cat_walk", true);
    } else if (this.inputKeys.down.isDown) {
      this.anims.play("cat_walk", true);
    } else if (this.inputKeys.left.isDown || this.inputKeys.right.isDown) {
      this.anims.play("cat_walk", true);
    } else {
      this.anims.play("cat_idle", true);
    }
  }
}
