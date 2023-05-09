import mainCharacterPNG from "./assets/images/male_main_character.png";
const mainCharacterJSON = require("./assets/images/male_main_character_atlas.json");
const mainCharacterAnimation = require("./assets/images/male_main_character_anim.json");

export default class Player extends Phaser.Physics.Matter.Sprite {
  constructor(data) {
    let { scene, x, y, texture, frame } = data;
    super(scene.matter.world, x, y, texture, frame);
    this.scene.add.existing(this);
  }

  static preload(scene) {
    scene.load.atlas(
      "male_main_character",
      mainCharacterPNG,
      mainCharacterJSON
    );
    scene.load.animation("male_main_character_anim", mainCharacterAnimation);
  }

  get velocity() {
    return this.body.velocity;
  }
  update() {
    console.log("update");
    //     // this.player.update() ** this is for when the sprites are ready
    // this.anims.play("down_walk", true);
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
      this.anims.play("side_walk", true);
    } else if (this.inputKeys.up.isDown) {
      this.anims.play("up_walk", true);
    } else if (this.inputKeys.down.isDown && this.inputKeys.right.isDown) {
      this.anims.play("side_walk", true);
    } else if (this.inputKeys.down.isDown) {
      this.anims.play("down_walk", true);
    } else if (this.inputKeys.left.isDown || this.inputKeys.right.isDown) {
      this.anims.play("side_walk", true);
    } else {
      this.anims.play("down_idle", true);
    }
  }
}
