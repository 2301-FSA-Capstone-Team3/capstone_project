
export default class ExtendedEntity extends Phaser.Physics.Matter.Sprite {
  constructor(data) {
    let { scene, x, y, texture, frame, depth, name, health} = data;
    super(scene.matter.world, x, y, texture, frame);
    this.x += this.width/2;
    this.y -= this.height/2;
    this.depth = depth || 1;
    this.name = name;
    this.health = health;
    this.pos = new Phaser.Math.Vector2(this.x, this.y);
    this.scene.add.existing(this);
    //need to get entity position?
    const getpos=()=>{
      this.pos.set(this.x, this.y);
      return this.pos;
    }
    //need to get velocity?
    const getVel=()=>{
      return this.body.velocity;
    }
    //need to know if the entity is dead - returns true if the health is greater than 0
    const getDead=()=>{
      return this.health <= 0;
    }
    //need to decrease health by one
    const hit=()=>{
      this.health--;
      //more features can be stored here
    }
  }
}
