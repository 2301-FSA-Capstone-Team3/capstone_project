import Phaser from "phaser";
import enemyPng from "./assets/images/enemies.png";
const enemyAtlas = require("./assets/images/enemies_atlas.json");
const enemyAnims = require("./assets/images/enemies_anim.json");
import ExtendedEntity from "./ExtendedEntity";

export default class Enemy extends ExtendedEntity {
  static preload(scene) {
    scene.load.atlas("enemies", enemyPng, enemyAtlas);
    scene.load.animation("enemies_anim", enemyAnims);
  }

  constructor(data) {
    let { scene, enemy } = data;
    let health = enemy.properties.find((p) => p.name == "health").value;
    super({
      scene,
      x: enemy.x,
      y: enemy.y,
      texture: "enemies",
      frame: `${enemy.name}_idle_1`,
      health,
      name: enemy.name,
    });
    this.scene.add.existing(this);

    const { Body, Bodies } = Phaser.Physics.Matter.Matter;
    let enemyCollider = Bodies.circle(this.x, this.y, this.width / 3, {
      isSensor: false,
      label: "enemyCollider",
    });
    let enemySensor = Bodies.circle(this.x, this.y, this.width * 2, {
      isSensor: true,
      label: "enemySensor",
    });
    const compoundBody = Body.create({
      parts: [enemyCollider, enemySensor],
      frictionAir: 1,
    });
    this.setExistingBody(compoundBody);
    this.setFixedRotation();
    this.scene.matterCollision.addOnCollideStart({
      objectA: [enemySensor],
      callback: (other) => {
        if (other.gameObjectB && other.gameObjectB.name == "player")
          this.attacking = other.gameObjectB;
      },
      context: this.scene,
    });
  }
  attack = (target) => {
    if (target.dead || this.dead) {
      clearInterval(this.attacktimer);
      return;
    }
    target.hit();
  };
  update() {
    if (this.dead) return;
    if (this.attacking) {
      let player = this.attacking.position;
      let direction = player.subtract(this.position);
      if (direction.length() > 24) {
        let v = direction.normalize();
        this.setVelocityX(direction.x);
        this.setVelocityY(direction.y);
        if (this.attacktimer) {
          clearInterval(this.attacktimer);
          this.attacktimer = null;
        }
      } else {
        if (this.attacktimer == null) {
          this.attacktimer = setInterval(this.attack, 500, this.attacking);
        }
      }
      console.log("enemyUpdate");
    }
    let enemyDirection = new Phaser.Math.Vector2();
    this.setFlipX(enemyDirection.x < 0);
    if (Math.abs(enemyDirection.x) > 0.1 || Math.abs(enemyDirection.y) > 0.1) {
      this.anims.play(`${this.name}_walk`, true);
    } else {
      this.anims.play(`${this.name}_idle`, true);
    }
  }
}
