import Phaser from 'phaser';

class MyGame extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.spritesheet('Mr.Meowgi', 'assets/cat_fighter_sprite2.png', 64,64 )
    }

    create ()
    {
        mysprite = this.game.add.sprite(15, 30, 'Mr.Meowgi');
        mysprite.frame = 3;

        mysprite.animations.add('left', [0, 1, 2, 3], 10, true);
mysprite.animations.add('right', [5, 6, 7, 8], 10, true);

mysprite.animations.play('left');
mysprite.animations.stop();
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: MyGame
};

const game = new Phaser.Game(config);
