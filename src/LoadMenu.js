//import cat_sprite from "./assets/images/cat_sprite.png";
import playButton from "./assets/images/play_button.png";
import optionsButton from "./assets/images/options_button.png";
import menuscreen from "./assets/images/menu_screen.png"
import  Mainmenu  from "./Mainmenu";

export default class Loadmenu extends Phaser.Scene {
    constructor() {
        super("Loadmenu");
    }

    preload() {
        this.load.image("play_button.png", playButton);
        this.load.image("options_button.png", optionsButton);
        this.load.image("menu_screen.png", menuscreen);

        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff,
            }
        });

        this.load.on("progress", (percent) => {
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);

        });

        this.load.on("complete", () => {
            this.scene.start("Mainmenu", Mainmenu);
            console.log("Let's roll!");
        });
    }

    create() {
        this.add.text(20, 20, "Loading Game...");
    }
}
