import Phaser from 'phaser'
import enemyPng from "./assets/images/enemies.png";
const enemyAtlas = require("./assets/images/enemies_atlas.json");
const enemyAnims = require("./assets/images/enemies_anim.json");

export default class Enemy extends Phaser.Physics.Arcade.Sprite{
  constructor(data){
    let { scene, x, y, texture, frame } = data;
    super(scene, x, y, texture, frame);
    this.target = this.scene.player;
    this.scene.add.existing(this);
    // const { Body, Bodies } = Phaser.Physics.Arcade.Matter;
    // let enemyCollider = Bodies.circle(this.x, this.y, 13, {
    //   isSensor: false,
    //   label: "enemyCollider",
    // });
    // let enemySensor = Bodies.circle(this.x, this.y, 50, {
    //   isSensor: true,
    //   label: "enemySensor",
    // });
    // const compoundBody = Body.create({
    //   parts: [enemyCollider, enemySensor],
    //   frictionAir: 0.35,
    // });
    // this.setExistingBody(compoundBody);
    // this.setFixedRotation();

  }
  static preload(scene){
    scene.load.atlas("enemies", enemyPng, enemyAtlas);
    scene.load.animation("enemies_anim", enemyAnims);
  }
  create(){
    // this.physics.moveToObject(this.enemy, scene.player, 100);

  }
  update() {
  //   this.input.on('pointerdown', (pointer) =>
  // {
  //     cursor.copyPosition(pointer).setVisible(true);

      // Move toward target at 200 px/s:
      // this.physics.moveToObject(this.scene.player, cursor, 200);

      // See <move and stop at position.js> for stopping.
  // });
    // let t = {};
    // this.targetMoving = false;

    // if (this.target.history !== undefined && this.target.history.length) {
    //   // This target has a history so go towards that
    //   t = this.target.history[0];
    //   this.setAngle();
    //   if (this.target.body.velocity.x !== 0 || this.target.body.velocity.y !== 0) {
    //     this.targetMoving = true;
    //   }
    // } else {
    //   // This target doesn't have a history defined so just
    //   // follow its current x and y position
    //   t = { a: this.target.x, b: this.target.y };
    //   this.setTargetAngle();

    //   // Calculate distance to target
    //   // If the position is far enough way then consider it "moving"
    //   // so that we can get this Follower to move.
    //   const distance = Phaser.Math.Distance.Between(this.x, this.y, t.a, t.b);

    //   if (distance > this.MIN_DISTANCE ) {
    //     this.targetMoving = true;
    //   }
    // }

    // // If the distance > MIN_DISTANCE then move
    // if (this.targetMoving) {
    //   // Add current position to the end of the history array
    //   const { x, y } = this;
    //   if (!Number.isNaN(x) && !Number.isNaN(y)) {
    //     this.history.push({ a: x, b: y });
    //   }

    //   // If the length of the history array is over a certain size
    //   // then remove the oldest (first) element
    //   if (this.history.length > this.HISTORY_LENGTH) {
    //     this.history.shift();
    //   }
    // }

    if(this.frame == 'normalmushroom_idle_1'){
      this.anims.play("normalmushroom_walk", true)
    }
    if(this.frame == 'troll_idle_1'){
      this.anims.play("troll_walk", true)
    }
    if(this.frame == 'golem_idle_1'){
      this.anims.play("golem_walk", true)
    }
    // const speed = 2;
    // let enemyDirection = new Phaser.Math.Vector2();
    // if (player.x < this.x) {
    //   enemyDirection.x = -1;
    // } else if (player.x > this.x) {
    //   enemyDirection.x = 1;
    // }
    // if (player.x < this.x) {
    //   enemyDirection.y = -1;
    // } else if (player.x > this.x) {
    //   enemyDirection.y = 1;
    // }
    // // enemyDirection.normalize();
    // enemyDirection.scale(speed);

    // this.setVelocity(enemyDirection.x, enemyDirection.y);

  }
}
