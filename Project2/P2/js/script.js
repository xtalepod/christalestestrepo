// // reference information related to the parable
// // https://en.wikipedia.org/wiki/The_Hedgehog_and_the_Fox
// // isaiah berlin "the hedgehog and the fox" https://assets.press.princeton.edu/chapters/s9981.pdf
// //https://en.wikipedia.org/wiki/Archilochus
//coil - queens of the rotating library: https://www.youtube.com/watch?v=3l_NO-Qm1ag
//***the audio file i used for coil was corrupted but you should listen to this while you play!


//references related to code sourcing
//daniel shiffman the coding train array series 7.1-7.3
//https://www.youtube.com/watch?v=fBqaA7zRO58
//https://www.youtube.com/watch?v=RXWO3mFuW-I
//https://www.youtube.com/watch?v=VIQoUghHSxU
//pj.j5 reference
//https://p5js.org/reference/
//pippin barr cart253 fall 2019
// https://github.com/pippinbarr/cart253-2019
//xtalepod repository cart253xtale
//https://github.com/xtalepod/cart253xtale

//HEDGEHOD AND FOX

//the hedgehog and fox are are non-traditional predators
//they appear on the screen as squares
//the hedgehog knows how to survive.
//the fox understands survival.
//the hedgehog and the fox move independantly of each other (allowing for 2 players)
//and interact  with objects (boxes) on the storyboard (playing field)


let hedgehog;
let fox;

//the boxes are non-traditional prey
//they appear on the screen as circles with text that appears when the hedgehog of the fox overlap
//the story circles teach us about the abstract nature of hedgehog and the fox
//you are encouraged to collect stories by writing them down on paper
//its like a diy poem generator!

let boxes = [];

//declaring start and gameOver states
let state = "START"; //there is another way to do this
let gameOver = false;

//two arrays that display only on displayStoryScreen
//0 story variables
let story0 = [
  "the fox knows",
  "many things",
  "but the hedgehog",
  "knows one big thing.",
  "--archilochus"
];
let storyIndex0 = 0;
//1 story variables
let story1 = [
  "who would you",
  "rather be?",
  "better yet",
  "who are you?"
];
let storyIndex1 = 0;

//an array for the displayPlayScreen background of rectanlges which loosely resemble trees (if you look hard enough)
let trees = [100, 25, 6, 20];
//a variable for sound
// let coilSound;
let beeSound


//set anything that needs to be preloaded
function preload() {
  beeSound = loadSound ("assets/sounds/bees.wav")
  // coilSound = loadSound("assets/sounds/coil.mp3")
  // console.log("coilSound");
}
// setup()
//
// Sets up a canvas
// Creates objects for the fox, the hedgehog, and the boxes
function setup() {
  createCanvas(windowWidth, windowHeight);
    beeSound.loop();
    // coilSound.loop()
  //creating the hedgohog(x, y, w, h,fillColor, speed, upKey, downKey, rightKey, leftKey) {
  hedgehog = new Hedgehog(60, 300, 40, 40, color(26, 255, 140), 2.5, UP_ARROW, DOWN_ARROW, RIGHT_ARROW, LEFT_ARROW);
  //creating the fox(x, y,w,h,fillColor, speed, upKey, downKey, rightKey, leftKey) {
  fox = new Fox(100, 40, 70, 70, color(153, 255, 204), 5, 87, 83, 65, 68, 70);
  //for loops to create the box objects (which are shaped like circles)
  push();
  for (let i = 0; i < 3; i++) {
    let x = 50 + 100 * i
    let y = 100 + 100 * i
    boxes.push(new Boxes(x, y, 40, color(255, 153, 153)));
  }
  for (let i = 0; i < 3; i++) {
    let x = 850 - 100 * i
    let y = 100 + 100 * i
    boxes.push(new Boxes(x, y, 40, color(255, 153, 153)));
    pop();
  }
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  //set the background to a nice grey
  background(200);
  //if its start state displayStartScreen else if displayStoryScreen
  //else if displayPlayScreen else if showGameOver
  if (state === "START") {
    displayStartScreen();
  } else if (state === "STORY") {
    displayStoryScreen();
  } else if (state === "PLAY") {
    displayPlayScreen();
    //set variables for return true statement so the hedgehog and fox go back to their start stae after overlapping
    let hedgehogOverLapping = false;
    let foxOverLapping = false;
    //for loop to display the total number of boxes and handleCollision w the hedgehog
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].display();
      if (boxes[i].handleCollision(hedgehog)) {
        hedgehogOverLapping = true;
      }
    }
    //for loop to display the total number of boxes and handleCollision w the fox
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].display();
      if (boxes[i].handleFoxCollision(fox)) {
        foxOverLapping = true;
      }
    }

    //handle the input, movement, and display for the hedgehog
    hedgehog.setup();
    hedgehog.handleInput();
    hedgehog.move();
    ////*******related to gameOver state and and conviction: all health variables, setup(), checkHealth(), and check collision are attempting to visbily track 'health'(overlaps) and change to gameOver state
    hedgehog.checkHealth();
    hedgehog.display(hedgehogOverLapping);

    //handle the input, movement, and display for the fox
    fox.handleInput();
    fox.move();
    fox.display(foxOverLapping);

    //     if (hedgehog.health === 0) {
    //    state = "GAMEOVER"
    //   }
    //   // else if (state === "GAMEOVER") {
    //   //   showGameOver();
  }
}
//
function mousePressed() {
  //click rectangle to start game
  if (state === "START") {
    if (mouseX > width / 2 && mouseX < width * 2 && mouseY > height / 2 && mouseY < height * 2) {
      state = "STORY"
    }
  } else if (state === "STORY") {
    if (mouseX > width / 2 && mouseX < width * 2 && mouseY > height / 2 && mouseY < height * 2) {
      state = "PLAY";
    }
  }
}

//story state
function displayStoryScreen() {
  //set the background
  background(204, 153, 255)
  //set the rectangle which will go behind phrase0
  rectMode(CENTER, CENTER);
  fill(200);
  ellipse(width / 2, height / 2, 100);
  //set the font color for all text
  //declare a variable for story0 and its index
  let phrase0 = story0[storyIndex0];
  //set the text variables for phrase0
  fill(20);
  textSize(30);
  textAlign(CENTER, CENTER);
  text(phrase0, width / 2, height / 2);
  //declare a variable for story1 and its index
  let phrase1 = story1[storyIndex1];
  //set the text variables for phrase0

  fill(0);
  textSize(10);
  text(phrase1, width / 2, 80);
  //set the text variables and text for button of the screen instructions
  push();
  fill(20);
  textFont('Courier New', [20]);
  textStyle(BOLD);
  text("press any key to start", width / 2, height / 1.1);
  text("click the mouse to begin game play", width / 2, height / 1.06);
  pop();

  //a little hedgehog avatar for the story screen to better prepare the player
  //includes key instructions
  noStroke();
  fill(26, 255, 140);
  rect(width / 2 + 300, 110, 40, 40);
  textFont('Courier New', [20]);
  fill(5);
  text("hedgehog", width / 2 + 300, 150);
  text("UP, DOWN, LEFT, RIGHT", width / 2 + 300, 175);
  //a little fox avatar for the story screen to better prepare the player
  //includes key instructions
  noStroke();
  fill(153, 255, 204);
  rect(width / 2 - 300, 100, 70, 70);
  fill(5);
  textFont('Courier New', [20]);
  text("fox", width / 2 - 300, 150);
  text("W,A,S,D + F", width / 2 - 300, 175);

  //set the text variables instructions
  fill(20);
  textSize(10);
  textStyle(BOLD);
  text("instructions: get a pen and paper, explore the board", width / 2, height / 1.25);
  text("write down what you read, do you understand now?", width / 2, height / 1.2)
}

//start state
function displayStartScreen() {
  background(250, 198, 180)
  //display the title of the game
  push();
  textAlign(CENTER, CENTER);
  fill(0);
  textFont('Courier New', [50]);
  text("hedgehog and fox", width / 2, height / 2); // Title
  pop();
  //display the start button (area)
  push();
  fill(20);
  textFont('Courier New', [20]);
  textStyle(BOLD);
  text("start", width / 1.1, height / 1.1);
  pop();
  //a little hedgehog avatar for the start screen to better prepare the player
  noStroke();
  fill(26, 255, 140);
  rect(width / 2 - 50, height / 2 + 60, 40, 40);
  //a little fox avatar for the start screen to better prepare the player
  noStroke();
  fill(153, 255, 204);
  rect(width / 2, height / 2 + 30, 70, 70);

}

//play state
function displayPlayScreen() {
  push();
  //a for loop to display the correct number of trees in background evenly dispursed
  for (let i = 0; i < 10; i++) {
    x = i * 0.5 + 50
    y = i * 40 + 40
    // rect(10, i * 40 + 40, trees[2], trees[3])
    for (let j = 0; j < 20; j++) {
      fill(color(100, 100, 50));
      rect(j * .05 + 60 + j * 50, i * 40 + 40, trees[2], trees[3])
    }
  }
  pop();
}

//what would display the gameOver state with restart option
// function showGameOver () {
//   textSize(20);
//   textAlign(CENTER, CENTER);
//   fill(0);
//   text("references", width / 2, height / 2);
//
// }

//to scroll through the text arrays on the displayStoryScreen
function keyPressed() {
  storyIndex0 += 1;
  storyIndex1 += 1;
  if (storyIndex0 >= story0.length) {
    storyIndex0 = 0;
    if (storyIndex1 >= story1.length) {
      storyIndex1 = 0;
    }
  }
}
