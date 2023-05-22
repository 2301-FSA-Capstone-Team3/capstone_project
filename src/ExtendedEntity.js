
export default class ExtendedEntity extends Phaser.Physics.Matter.Sprite {
  constructor(data) {
    let { scene, x, y, texture, frame, depth, name, health} = data;
    super(scene.matter.world, x, y, texture, frame);
    this.x += this.width/2;
    this.y -= this.height/2;
    this.depth = depth || 1;
    this.name = name;
    this.health = health;
    this._pos = new Phaser.Math.Vector2(this.x, this.y);
    this.scene.add.existing(this);
  }
  //need to get entity position?
  get pos(){
    this._pos.set(this.x, this.y);
    return this._pos;
  }
  //need to get velocity?
  get Vel(){
    return this.body.velocity;
  }
  //need to know if the entity is dead - returns true if the health is greater than 0
  get Dead(){

    return this.health <= 0;
  }
  onDeath(){this.anims.stop()}
  //need to decrease health by one
  hit(){
    this.health--;
    if(this.Dead){
      this.onDeath();
      // console.log(this.name, 'is dead')
    }
    //more features can be stored here
  }
}
