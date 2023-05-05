
// export default class Player extends Phaser.Physics.Matter.Sprite{
//   constructor(data){
//     let {scene,x,y,texture,frame} = data
//     super(scene.matter.world,x,y,texture,frame);
//   }
//  static preload (scene)
//   {
//       scene.load.atlas('hero', '*path to png','*path to json')
//       scene.load.animation('hero_anim', '*path to anim json')
//   }

//   create ()
//   {

//   }
//   update ()
//   {
//       console.log('update')
//       const speed = 2.5;
//       let playerVelocity = new Phaser.Math.Vector2();
//       if(this.inputKeys.left.isDown){
//         playerVelocity.x = -1
//       }else if (this.inputKeys.right.isDown){
//         playerVelocity.x = 1
//       }
//       if(this.inputKeys.up.isDown){
//         playerVelocity.y = -1
//       }else if (this.inputKeys.down.isDown){
//         playerVelocity.y = 1
//       }
//       playerVelocity.normalize()
//       playerVelocity.scale(speed)
//       this.setVelocity(playerVelocity.x, playerVelocity.y)
//   }
// }
