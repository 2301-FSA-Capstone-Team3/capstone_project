import Phaser from 'phaser'
import mrmPng from "./assets/images/cat_sprite.png";
const mrmAtlasjson = require("./assets/images/cat_sprite_atlas.json");
const mrmAnims = require("./assets/images/cat_sprite_anim.json");

export default class Enemy extends Phaser.Physics.Matter.Sprite{
  constructor(data){
    let { scene, x, y, texture, frame } = data;
    super(scene.matter.world, x, y, texture, frame);
    this.scene.add.existing(this);
    const { Body, Bodies } = Phaser.Physics.Matter.Matter;
    let enemyCollider = Bodies.circle(this.x, this.y, 13, {
      isSensor: false,
      label: "enemyCollider",
    });
    let enemySensor = Bodies.circle(this.x, this.y, 50, {
      isSensor: true,
      label: "enemySensor",
    });
    const compoundBody = Body.create({
      parts: [enemyCollider, enemySensor],
      frictionAir: 0.35,
    });
    this.setExistingBody(compoundBody);
    this.setFixedRotation();



  }
  preload(scene){
    scene.load.atlas("cat_sprite", mrmPng, mrmAtlasjson);
    scene.load.animation("cat_sprite_anims", mrmAnims);
  }
  create(){

  }
  update(player) {
    const speed = 2;
    let enemyDirection = new Phaser.Math.Vector2();
    if (player.x < this.x) {
      enemyDirection.x = -1;
    } else if (player.x > this.x) {
      enemyDirection.x = 1;
    }
    if (player.x < this.x) {
      enemyDirection.y = -1;
    } else if (player.x > this.x) {
      enemyDirection.y = 1;
    }
    // enemyDirection.normalize();
    enemyDirection.scale(speed);

    // if (enemyDirection.x < 0) {
    //   this.setFlipX(true);
    // } else if (enemyDirection.x > 0) {
    //   this.setFlipX(false);
    // }

    this.setVelocity(enemyDirection.x, enemyDirection.y);
    // if (this.inputKeys.up.isDown && this.inputKeys.right.isDown) {
    //   this.anims.play("cat_walk", true);
    // } else if (this.inputKeys.up.isDown) {
    //   this.anims.play("cat_walk", true);
    // } else if (this.inputKeys.down.isDown && this.inputKeys.right.isDown) {
    //   this.anims.play("cat_walk", true);
    // } else if (this.inputKeys.down.isDown) {
    //   this.anims.play("cat_walk", true);
    // } else if (this.inputKeys.left.isDown || this.inputKeys.right.isDown) {
    //   this.anims.play("cat_walk", true);
    // } else {
    //   this.anims.play("cat_idle", true);
    // }
  }
}
