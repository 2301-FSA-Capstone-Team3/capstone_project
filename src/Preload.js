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
    this.add.image(777,555, 'logo')
    this.input.on('pointerdown', ()=> this.scene.start('MainScene'))
    
  }
}
