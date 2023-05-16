import ExtendedEntity from "./ExtendedEntity";
import mrmPng from "./assets/images/cat_sprite.png";
const mrmAtlasjson = require("./assets/images/cat_sprite_atlas.json");
const mrmAnims = require("./assets/images/cat_sprite_anim.json");
import healthBar from "./assets/images/health_bar.png"
const healthBarAtlasjson = require("./assets/images/health_bar_atlas.json")
const healthbarAnims = require("./assets/images/health_bar_anim.json")

export default class Player extends ExtendedEntity {
  constructor(data) {
    let { scene, x, y, texture, frame, name } = data;
    super({scene, x:x, y:y , texture:texture, frame:frame, health: 9, name: name});
    this.touching = []
    this.healthBarSprite = new Phaser.GameObjects.Sprite(this.scene, 0, 0,"health_bar", "health_bar15_[full]")
    this.healthBarSprite.setScale(0.1,0.2)
    this.scene.add.existing(this.healthBarSprite)
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
  update() {
    const speed = 4.5;

    let playerDirection = new Phaser.Math.Vector2();
    if (this.inputKeys.left.isDown) {
      playerDirection.x = -1;
    } else if (this.inputKeys.right.isDown) {
      playerDirection.x = 1;
    }
    if (this.inputKeys.up.isDown) {
      playerDirection.y = -1;
    } else if (this.inputKeys.down.isDown) {
      playerDirection.y = 1;
    }
    playerDirection.normalize();
    playerDirection.scale(speed);

    if (playerDirection.x < 0) {
      this.setFlipX(true);
    } else if (playerDirection.x > 0) {
      this.setFlipX(false);
    }
    this.setVelocity(playerDirection.x, playerDirection.y);


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

    this.healthBarSprite.setPosition(this.x, this.y-15)
  }
}
