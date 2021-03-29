var tower, towerImage;
var door, doorImage;
var climber, climberImage, climberGroup;
var ghost, ghostImage , ghostStanding;
var invisibleBlock, invisibleBlockGroup;
var gameState = "PLAY"


function preload() {
  towerImage = loadImage("tower.png")
  doorImage = loadImage("door.png")
  climberImage = loadImage("climber.png")
  ghostImage = loadImage("ghost-jumping.png")
  ghostStanding = loadImage("ghost-standing.png")
}


function setup() {
  createCanvas(600, 600)
  tower = createSprite(300, 300, 20, 20)
  tower.addImage("climbingSite", towerImage)
  // tower.y = tower.height/2;
  tower.velocityY = 2;
  ghost = createSprite(300, 400, 20, 20)
  ghost.addImage("culobSetien", ghostImage)
  ghost.addImage("horror",ghostStanding)
  ghost.scale = 0.4
  climberGroup = new Group()
  invisibleBlockGroup = new Group()


}


function draw() {
  background(0)

  if (gameState === "PLAY") {
    if (tower.y > 400) {
      tower.y = 300
    }
    if (keyDown("left_arrow")) {
      ghost.x = ghost.x - 3
    }

    if (keyDown("right_arrow")) {
      ghost.x = ghost.x + 3
    }

    if (keyDown("space")) {
      ghost.velocityY = -6;
      ghost.changeImage("culobSetien")
    }
    ghost.velocityY = ghost.velocityY + 0.8

    if (climberGroup.isTouching(ghost)) {
      ghost.velocityY = 0
        ghost.changeImage("horror")


    }

    if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy()
      gameState = "END"
    }
    spawnDoors();
    drawSprites()
  } else if (gameState === "END") {
    fill("yellow")
    textSize(30)
    text("Game Over", 230, 250)

  }


}

function spawnDoors() {
  if (frameCount % 240 === 0) {
    door = createSprite(200, -50, 20, 20)
    door.addImage("safetyAndEnd", doorImage)
    door.velocityY = 2
    door.x = Math.round(random(120, 400))
    door.lifetime = 800;

    climber = createSprite(200, 10, 60, 60)
    climber.addImage("climber", climberImage)
    climber.velocityY = 2
    climber.x = door.x;
    climber.lifetime = 800;
    climberGroup.add(climber)

    invisibleBlock = createSprite(200, 15)
    invisibleBlock.velocityY = 2;
    invisibleBlock.width = climber.width / 2
    invisibleBlock.height = climber.height / 2
    invisibleBlock.x = climber.x;
    invisibleBlock.visible = false;
    invisibleBlockGroup.add(invisibleBlock)

    ghost.depth = door.depth
    ghost.depth = ghost.depth + 1
  }
}             