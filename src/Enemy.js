import Phaser from 'phaser'
import enemyPng from "./assets/images/enemies.png";
const enemyAtlas = require("./assets/images/enemies_atlas.json");
const enemyAnims = require("./assets/images/enemies_anim.json");
import ExtendedEntity from './ExtendedEntity';
import { PhaserMatterCollisionPlugin as matterCollision }  from 'phaser-matter-collision-plugin';

export default class Enemy extends ExtendedEntity{
  static preload(scene){
    scene.load.atlas("enemies", enemyPng, enemyAtlas);
    scene.load.animation("enemies_anim", enemyAnims);
  }


  constructor(data){
    let { scene, enemy, target} = data;
    let health = enemy.properties.find(p=>p.name=='health').value
    super({scene, x:enemy.x, y:enemy.y , texture:'enemies', frame:`${enemy.name}_idle_1`, health, name:enemy.name});
    this.target = target


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
      frictionAir: 0.35,
    });
    this.setExistingBody(compoundBody);
    this.setFixedRotation();
    this.scene.matterCollision.addOnCollideStart({
      objectA: [enemySensor],
      callback: evt => {if(evt.gameObjectB && evt.gameObjectB.name == 'player')this.attacking = evt.gameObjectB},
          // bodyB will be the matter body that the player touched
          // gameObjectB will be the game object that owns bodyB, or undefined if there's no game object
        context:this.scene,
    });
  }
  attack=(target)=>{
    if(target.Dead || this.Dead){
      clearInterval(this.attacktimer)
      return
    }
    target.hit()
  }
  update() {
    // console.log('enemyUpdate')
    if(this.Dead) return

    if(this.attacking){
      let direction = new Phaser.Math.Vector2();
      direction = this.attacking.pos.subtract(this.pos)
      // direction.scale(4)
      if(direction.length()>24){
        let v = direction.normalize()
        this.setVelocityX(direction.x)
        this.setVelocityY(direction.y)

        if(this.attacktimer){
          clearInterval(this.attacktimer)
          this.attacktimer = null;
        }
      }else{
        if(this.attacktimer == null)
        this.attacktimer = setInterval(this.attack(this.attacking),500,this.attacking)
      }
    //   console.log(direction)
    }
    // console.log(this.target)
  }
}
