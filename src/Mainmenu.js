import playButton from "./assets/images/play_button.png";
import MenuScreen from "./assets/images/menu_screen.png";

export default class Mainmenu extends Phaser.Scene {
    constructor() {
        super('Mainmenu');
    }

    preload() {
        this.Button = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, playButton).setDepth(0);
        this.add.image(0, 0, 'menu_screen.png').setOrigin(1);
        this.add.image(0,0, MenuScreen).setOrigin(0);
        this.cameras.main.centerOn(this.Button);
        console.log("You're here");
    }
}
