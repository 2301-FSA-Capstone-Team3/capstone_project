import Phaser from 'phaser'
import enemyPng from "./assets/images/enemies.png";
const enemyAtlas = require("./assets/images/enemies_atlas.json");
const enemyAnims = require("./assets/images/enemies_anim.json");
import ExtendedEntity from './ExtendedEntity';

export default class Enemy extends ExtendedEntity{
  static preload(scene){
    scene.load.atlas("enemies", enemyPng, enemyAtlas);
    scene.load.animation("enemies_anim", enemyAnims);
  }


  constructor(data){
    let { scene, enemy } = data;
    let health = enemy.properties.find(p=>p.name=='health').value
    super({scene, x:enemy.x, y:enemy.y , texture:'enemies', frame:`${enemy.name}_idle_1`, health, name:enemy.name});
    this.scene.add.existing(this);

    const { Body, Bodies } = Phaser.Physics.Matter.Matter;
    let enemyCollider = Bodies.circle(this.x, this.y, this.width/3, {
      isSensor: false,
      label: "enemyCollider",
    });
    let enemySensor = Bodies.circle(this.x, this.y, this.width*2, {
      isSensor: true,
      label: "enemySensor",
    });
    const compoundBody = Body.create({
      parts: [enemyCollider, enemySensor],
      frictionAir: 1,
    });
    this.setExistingBody(compoundBody);
    this.setFixedRotation();
  }
  update() {
    console.log('enemyUpdate')

  }
}
