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
