import playButton from "./assets/images/play_button.png";
import MenuScreen from "./assets/images/menu_screen.png";
import optionButton from "./assets/images/options_button.png";
import PreLoadScene from "./Preload.js";
export default class Mainmenu extends Phaser.Scene {
    constructor() {
        super('Mainmenu');
    }

    preload() {
        this.load.image('menu_screen', MenuScreen);
        this.load.image('play_button', playButton);
        this.load.image('options_button', optionButton);
    }

    create() {
        const playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'play_button').setDepth(1);
        const optionButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, 'options_button').setDepth(1);

        playButton.setInteractive();
        playButton.on('pointerdown', () => {
            this.scene.start("MainScene")
            console.log("Play button clicked");
        });
        playButton.on("pointerout", () => {
            console.log("Pointer out of the play button");
        });
        playButton.on("pointerup", ()=>{
            console.log("let go of play")
        })

        optionButton.setInteractive();
        optionButton.on('pointerdown', () => {
            this.scene.start(" PreLoadScene,", PreLoadScene)
            console.log("Options button clicked");
        });
        optionButton.on("pointerout", () => {
            console.log("Pointer out of the options button");
        });
        optionButton.on("pointerup", ()=>{
            console.log("let go of options")
        });


        this.add.image(-0, -0, 'menu_screen').setOrigin(-0, -0);

        console.log("You're here");
    }
}

