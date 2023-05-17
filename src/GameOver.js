import Game_Over from './assets/images/GAME_OVER.jpg'
export default class GameOver extends Phaser.Scene{
  constructor(){
    super({key:'GameOver', active:false})
  }
  // init(data){
  //   this.score = data.time

  // }
  preload(){
    this.load.image('GG', Game_Over)
  }
  create(){
    this.add.image(777,555, 'GG')
    let text = this.add.text(
      777, 555,
      'Survival is not a winning game',
      {
        font: '24px Arial',
        fill: 'fff',
        align: 'center'
      }
    )
    let score = this.add.text(
      777, 600,
      `Your Score: ${this.score}`,
      {
        font: '24px Arial',
        fill: '#fff',
        align: 'center'
      }
    )

    // text.anchor.set(0.5)
    this.input.on('pointerdown', ()=> this.scene.restart('MainScene'))
  }
}
