import { GameLoop } from './src/GameLoop';
import { resources } from './src/Resources';
import { Sprite } from './src/Sprite';
import { Vector2 } from './src/Vector2';
import { DOWN, UP, LEFT, Input, RIGHT } from './src/Input';
import './style.css'
import { gridCells, isSpaceFree } from './src/helpers/grid';
import { moveTowards } from './src/helpers/moveTowards';
import { walls } from './src/levels/level1';
import { Animations } from './src/Animations';
import { FrameIndexPattern } from './src/FrameIndexPattern';
import { STAND_DOWN, STAND_UP, STAND_LEFT, STAND_RIGHT, WALK_DOWN, WALK_LEFT, WALK_RIGHT, WALK_UP } from './src/objects/Hero/heroAnimations';

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const skySprite = new Sprite({
  resource: resources.images.sky,
  frameSize: new Vector2(320, 180)
});
const groundSprite = new Sprite({
  resource: resources.images.ground,
  frameSize: new Vector2(320, 180)
});
const hero = new Sprite({
  resource: resources.images.hero,
  frameSize: new Vector2(32, 32),
  position: new Vector2(gridCells(6), gridCells(5)),
  hFrames: 3,
  vFrames: 8,
  frame: 1,
  animations: new Animations({
    walkDown: new FrameIndexPattern(WALK_DOWN),
    walkUp: new FrameIndexPattern(WALK_UP),
    walkLeft: new FrameIndexPattern(WALK_LEFT),
    walkRight: new FrameIndexPattern(WALK_RIGHT),
    standDown: new FrameIndexPattern(STAND_DOWN),
    standUp: new FrameIndexPattern(STAND_UP),
    standLeft: new FrameIndexPattern(STAND_LEFT),
    standRight: new FrameIndexPattern(STAND_RIGHT),
  })

});

const heroDestinationPosition = hero.position.duplicate();

let heroFacing = DOWN;
const shadow = new Sprite({
  resource: resources.images.shadow,
  frameSize: new Vector2(32, 32),
});

const input = new Input();

const update = (delta) => {
  console.log('delta', delta);
  const distance = moveTowards(hero, heroDestinationPosition, 1);
  const hasArrived = distance <= 1;
  if (hasArrived) {
    tryMove();
  }

  //work on here animations
  hero.step(delta)

  return;

}
const tryMove = () => {

  if (!input.direction) {
    switch (heroFacing) {
      case UP:
        hero.animations.play('standUp');
        break;
      case DOWN:
        hero.animations.play('standDown');
        break;
      case LEFT:
        hero.animations.play('standLeft');
        break;
      case RIGHT:
        hero.animations.play('standRight');
        break;
    }
    return;
  }
  let nextX = heroDestinationPosition.x;
  let nextY = heroDestinationPosition.y;
  const gridSize = 16;
  switch (input.direction) {
    case UP:
      nextY -= gridSize;
      hero.animations.play('walkUp');
      break;
    case DOWN:
      nextY += gridSize;
      hero.animations.play('walkDown');
      break;
    case LEFT:
      nextX -= gridSize;
      hero.animations.play('walkLeft');
      break;
    case RIGHT:
      nextX += gridSize;
      hero.animations.play('walkRight');
      break;
  }
  heroFacing = input.direction ?? heroFacing;

  if (isSpaceFree(walls, nextX, nextY)) {
    heroDestinationPosition.x = nextX;
    heroDestinationPosition.y = nextY;
  }

}
const draw = () => {
  skySprite.drawImage(ctx, 0, 0);
  groundSprite.drawImage(ctx, 0, 0);

  // Center the Hero in the cell
  const heroOffset = new Vector2(-8, -21);
  const heroPosX = hero.position.x + heroOffset.x;
  const heroPosY = hero.position.y + 1 + heroOffset.y;

  shadow.drawImage(ctx, heroPosX, heroPosY);
  hero.drawImage(ctx, heroPosX, heroPosY);
}

const gameLoop = new GameLoop(update, draw);
gameLoop.start();