import Phaser from 'phaser';
import MainScene from './MainScene.js';
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";
const config = {
    width: 800,
    height: 600,
    backgroundColor: '#777777',
    type: Phaser.AUTO,
    parent: 'phaser-example',
    scene: [MainScene],
    scale:{
        zoom:2,
    },
    physics:{
        default: 'matter',
        matter:{
            debug: false,
            gravity: {y:0},
        }
    },
    plugins: {
        scene: [
          {
            plugin: PhaserMatterCollisionPlugin, // The plugin class
            key: "matterCollision", // Where to store in Scene.Systems, e.g. scene.sys.matterCollision
            mapping: "matterCollision" // Where to store in the Scene, e.g. scene.matterCollision
          }
        ]
      }
};
new Phaser.Game(config);
