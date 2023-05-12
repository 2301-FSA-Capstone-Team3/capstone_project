
import mrmPng from "./assets/images/cat_sprite.png";
const mrmAtlasjson = require("./assets/images/cat_sprite_atlas.json");
const mrmAnims = require("./assets/images/cat_sprite_anim.json");

import healthBar from "./assets/images/health_bar.png"
const healthBarAtlasjson = require("./assets/images/health_bar_atlas.json")
const healthbarAnims = require("./assets/images/health_bar_anim.json")

export default class Player extends Phaser.Physics.Matter.Sprite {
  constructor(data) {
    let { scene, x, y, texture, frame } = data;
    super(scene.matter.world, x, y, texture, frame);
    this.scene.add.existing(this);
    const { Body, Bodies } = Phaser.Physics.Matter.Matter;
    let playerCollider = Bodies.circle(this.x, this.y, 13, {
      isSensor: false,
      label: "playerCollider",
    });
    let playerSensor = Bodies.circle(this.x, this.y, 25, {
      isSensor: true,
      label: "playerSensor",
    });
    const compoundBody = Body.create({
      parts: [playerCollider, playerSensor],
      frictionAir: 0.35,
    });
    this.setExistingBody(compoundBody);
    this.setFixedRotation();
  }
  static preload(scene) {
    scene.load.atlas("cat_sprite", mrmPng, mrmAtlasjson);
    scene.load.animation("cat_sprite_anims", mrmAnims);
    scene.load.atlas("health_bar", healthBar, healthBarAtlasjson);
    scene.load.animation("health_bar_anims", healthbarAnims);
  }
  create() {}
  update() {

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

    if (playerVelocity.x < 0) {
      this.setFlipX(true);
    } else if (playerVelocity.x > 0) {
      this.setFlipX(false);
    }


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
    } else if (this.inputKeys.Attack.isDown) {
      this.anims.play("cat_onetwo", true)
    } else if (this.inputKeys.Attack2.isDown){
      this.anims.play("cat_roundhouse",true)
    }else if (this.inputKeys.Attack3.isDown){
      this.anims.play("cat_uppercat", true)
    } else {
      this.anims.play("cat_idle", true);
    }
  }
}
