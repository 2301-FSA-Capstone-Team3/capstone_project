import enemy from "./assets/images/enemies.png";
const enemyAtlasjson = require("./assets/images/enemies_atlas.json");
const enemyAnims = require("./assets/images/enemies_anim.json");

export default class Enemy extends Phaser.Physics.Matter.Sprite {
  constructor(data) {
    let { scene, enemy } = data;

    super(
      scene.matter.world,
      enemy.x,
      enemy.y,
      "enemies",
      `${enemy.name}_idle_1`
    );
    this.name = enemy.name;
  }
  static preload(scene) {
    scene.load.atlas("enemies", enemy, enemyAtlasjson);
    scene.load.animation("enemies_anim", enemyAnims);
  }
  update() {
    console.log("enemy update");
  }
}
