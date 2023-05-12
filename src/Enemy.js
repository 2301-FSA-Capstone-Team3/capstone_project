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
    super({scene, x:enemy.x, y:enemy.y , texture:'enemies', frame:"normalmushroom_idle_1", health, name:enemy.name});
    this.scene.add.existing(this);
  }
  update() {
    console.log('enemy')
  }
}
