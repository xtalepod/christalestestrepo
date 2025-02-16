"use strict"
//explore new worlds//a digital art piece by christale terris

//variables holding all the states
let currentScene; // To store the current scene;
let titleScene;
let worldOne;
let worldArray = [];
let worldTwo;
let worldGameOver;
//a constant to check how many portals have been visited. health starts at zero and as you visit portals increases to 7, then the performance is over
const NUMBER_PORTALS = 3;
let health = 0;
//an array for the portals
let portalArray = [];
//an array for the shapes
let shapeArray = [];
//a variable for the key
let key;

//background images
let worldOneBackground;
let worldTwoBackground;

//audio from milky video
let milkyAudio;
// //an array for textures pictures

function preload() {

  milkyAudio = loadSound("assets/sounds/milky3.mp3");
  worldOneBackground = loadImage("assets/images/textures/image1.JPG");
  worldTwoBackground = loadImage("assets/images/textures/image10.JPG")
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //setting up the start screen
  titleScene = new TitleScene();
  //setting up the three worlds
  worldOne = new WorldOne(worldOneBackground);
    worldArray.push(worldOne);
  worldTwo = new WorldTwo(worldTwoBackground,milkyAudio);
    worldArray.push(worldTwo);
  worldGameOver = new GameOverWorld(worldTwoBackground,milkyAudio);
    worldArray.push(worldGameOver);

// setting up the key
  key = new Key(50, 50,40);

  currentScene = titleScene; // Because we start on the title
//a function to set up the portals
  setUpPortals();
}

function draw() {
  // In draw we just tell the current scene to draw
  // and whichever scene it is will display as per its class
  background(0);
  currentScene.draw();
}

function mousePressed() {
  // In mousePressed we call the mousePressed of the current scene
  // so it knows the mouse was pressed
  currentScene.mousePressed();
}

function setUpPortals() {
  //   //array containing the informations of the portals
  let portalProperties = [{
      x: windowWidth / 2,
      y: windowHeight / 2,
      radius: 20,
      npoints: 6,
    },
    {
      x: windowWidth / 1.5,
      y: windowHeight / 2,
      radius: 20,
      npoints: 6,
    },
  ];

  //a for loop for the portals
  for (let i = 0; i < portalProperties.length; i++) {
    let portal = new Portal(portalProperties[i].x, portalProperties[i].y, portalProperties[i].radius, portalProperties[i].npoints, worldArray[i]);
    portalArray.push(portal);
  }
}
