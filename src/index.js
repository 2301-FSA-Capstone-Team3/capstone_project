import Phaser from "phaser";
import MainScene from "./MainScene.js";
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";
const config = {
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "#333333",
  type: Phaser.AUTO,
  parent: "phaser-example",
  scene: [MainScene],
  scale: {
    zoom: Phaser.Scale.ZOOM_4X,
    mode:Phaser.Scale.FIT,
  },
  physics: {
    default: "matter",
    matter: {
      debug: false,
      gravity: { y: 0 },
    },
    arcade: {
      debug: true,
      gravity: { y: 0 }
  },
  },
  plugins: {
    scene: [
      {
        plugin: PhaserMatterCollisionPlugin, // The plugin class
        key: "matterCollision", // Where to store in Scene.Systems, e.g. scene.sys.matterCollision
        mapping: "matterCollision", // Where to store in the Scene, e.g. scene.matterCollision
      },
    ],
  },
};
new Phaser.Game(config);
