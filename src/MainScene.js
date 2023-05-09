import Phaser from "phaser";
import 'phaser-matter-collision-plugin';

import Player from "./Player.js";

export default class MainScene extends Phaser.Scene{
  constructor(){
    super('MainScene');
  }
  preload ()
  {
    Player.preload(this)
  }

  create ()
  {
      this.player = new Player({scene:this , x:50, y:50, texture:'cat_sprite', frame: "tile000"})
      this.player.inputKeys = this.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D,
      })
  }
  update ()
  {
    this.player.update()

  }
}
