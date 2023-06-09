import Game_Over from './assets/images/GAME_OVER.jpg'
import MainScene from './MainScene'
export default class GameOver extends Phaser.Scene{
  constructor(){
    super({key:'GameOver', active:false})
  }
  init(data){
    this.score = data.kills

  }
  preload(){
    this.load.image('GG', Game_Over)
  }
  create(){
    this.add.image(777,555, 'GG')
    let text = this.add.text(
      777, 555,
      'Survival Is Not A Winning Game',
      {
        font: '24px Arial',
        fill: '#fff',
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
    this.input.on('pointerdown', ()=>{
      this.scene.stop('GameOver')
      this.scene.stop('MainScene')
      this.scene.stop('Preload')
      this.scene.stop('Mainmenu')
      this.scene.stop('LoadMenu')
      this.events.off()
      // this.scene.manager.destroy()
      //  ('MainScene')
      // console.log(this.game.cache)
      // this.scene.restart('MainScene')
      this.scene.create()
      this.scene.start('Mainmenu')

  } )
  }
}
