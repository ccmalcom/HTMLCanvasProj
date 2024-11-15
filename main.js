import './style.css'
import { resources } from "./src/Resource.js";
import { Sprite } from "./src/Sprite.js";
import { Vector2 } from "./src/Vector2.js";
import { GameLoop } from "./src/GameLoop.js";
import { Input } from "./src/Input.js";
import { gridCells } from "./src/helpers/grid.js";
import { GameObject } from "./src/GameObject.js";
import { Hero } from "./src/objects/Hero/Hero.js";
import { events } from "./src/Events.js";
import { Camera } from './src/Camera.js';


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

const groundSprite = new Sprite({
  resource: resources.images.ground,
  frameSize: new Vector2(320, 180)
});
mainScene.addChild(groundSprite);

const hero = new Hero(gridCells(6), gridCells(5));
mainScene.addChild(hero);

const camera = new Camera();
mainScene.addChild(camera);

//create the input object
mainScene.input = new Input();


//establish update and draw loops
const update = (delta) => {
  mainScene.stepEntry(delta, mainScene);

}

const draw = () => {

  //clear anything stale
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  skySprite.drawImage(ctx, 0, 0);
  //for camera effect
  //save current state
  ctx.save();

  //offset by the camera position
  ctx.translate(camera.position.x, camera.position.y);

  //draw the main scene
  mainScene.draw(ctx, 0, 0);

  //restore the state
  ctx.restore();
}

//start the game loop
const gameLoop = new GameLoop(update, draw);
gameLoop.start();