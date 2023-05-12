export default class ExtendedEntity extends Phaser.Physics.Matter.Sprite {
  constructor(data) {
    let { scene, x, y, texture, frame, depth, name, health, drops} = data;
    super(scene.matter.world, x, y, texture, frame);
    this.x += this.width/2;
    this.y -= this.height/2;
    this.depth = depth || 1;
    this.name = name;
    this.health = health;
    this.pos = new Phaser.Math.Vector2(this.x, this.y);
    this.scene.add.existing(this);
    //need to get entity position?
    getpos=()=>{
      this.pos.set(this.x, this.y);
      return this.pos;
    }
    //need to get velocity?
    getVel=()=>{
      return this.body.velocity;
    }
    //need to know if the entity is dead - returns true if the health is greater than 0
    getDead=()=>{
      return this.health <= 0;
    }
    //need to decrease health by one
    hit=()=>{
      this.health--;
      //more features can be stored here
    }
  }
  static preload(scene) {
    scene.load.atlas("cat_sprite", mrmPng, mrmAtlasjson);
    scene.load.animation("cat_sprite_anims", mrmAnims);
  }
  create() {}
  update() {

    const speed = 2.5;
    let entityDirection = new Phaser.Math.Vector2();
    if (this.inputKeys.left.isDown) {
      entityDirection.x = -1;
    } else if (this.inputKeys.right.isDown) {
      entityDirection.x = 1;
    }
    if (this.inputKeys.up.isDown) {
      entityDirection.y = -1;
    } else if (this.inputKeys.down.isDown) {
      entityDirection.y = 1;
    }
    entityDirection.normalize();
    entityDirection.scale(speed);

    if (entityDirection.x < 0) {
      this.setFlipX(true);
    } else if (entityDirection.x > 0) {
      this.setFlipX(false);
    }

    this.setVelocity(entityDirection.x, entityDirection.y);
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
    } else {
      this.anims.play("cat_idle", true);
    }
  }
}
