import { Scene } from "phaser";
import FrontLogo from './assets/images/FrontLogo.jpg'
export default class PreLoadScene extends Scene{
  constructor(){
    super('preload')
  }
  preload(){
    this.load.image('logo', FrontLogo)
  }
  create(){
    this.add.image(777,555, 'logo').setScale(1.5)
    let text = this.add.text(
      480, 300,
      `Survival Is Not A Winning Game
       Welcome, Mr. Meowgi`,
      {
        font: '22px Arial',
        fill: '#000',
        align: 'center'
      }
    )
    let controls = this.add.text(
      888, 300,
     `A = Left
     S = Down
     W = Up
     D = Right
     Q, E, Space = Attacks

      Click To Start Your Journey
     ... Don't Stop Believing`,
      {
        font: '20px Arial',
        fill: '#000',
        align: 'center'
      }
    )
    let HoldOn = this.add.text(
      555, 777,
     `Hold On To That Feeling`,
      {
        font: '40px Arial',
        fill: '#000',
        align: 'center'
      }
    )
    this.input.on('pointerdown', ()=> this.scene.start('MainScene'))

  }
}
