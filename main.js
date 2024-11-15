import './style.css'
import { resources } from "./src/Resource.js";
import { Sprite } from "./src/Sprite.js";
import { Vector2 } from "./src/Vector2.js";
import { GameLoop } from "./src/GameLoop.js";
import { Input } from "./src/Input.js";
import { gridCells } from "./src/helpers/grid.js";
import { GameObject } from "./src/GameObject.js";
import { Hero } from "./src/objects/Hero/Hero.js";


//get the canvas and context
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

//create the main scene
const mainScene = new GameObject({
  position: new Vector2(0, 0)
});

//add the sky and ground sprites
//todo: move to a separate file when more than one level
const skySprite = new Sprite({
  resource: resources.images.sky,
  frameSize: new Vector2(320, 180)
});
mainScene.addChild(skySprite);
const groundSprite = new Sprite({
  resource: resources.images.ground,
  frameSize: new Vector2(320, 180)
});
mainScene.addChild(groundSprite);

const hero = new Hero(gridCells(6), gridCells(5));
mainScene.addChild(hero);

//create the input object
mainScene.input = new Input();

//establish update and draw loops
const update = (delta) => {
  mainScene.stepEntry(delta, mainScene);

}

const draw = () => {
  mainScene.draw(ctx, 0, 0);
}

//start the game loop
const gameLoop = new GameLoop(update, draw);
gameLoop.start();