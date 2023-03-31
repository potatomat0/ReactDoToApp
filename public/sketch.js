//create an array called particles
let particles = [];
//a const named numOfParticles that will define how many particles there wil be
const numOfParticles = 800;
//the smoothness of perlin noise
const noiseScale = 0.001;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // loop for "numOfParticles" amount of time
  //  each time push a vector with random width and height value into the particles array
  for(let i = 0; i < numOfParticles; i ++) {
    particles.push(createVector(random(width), random(height)));
    
  }
  //set the color of the vector
  stroke(70,12,104);
  strokeWeight(1.2)
  clear();
}

function draw() {
  //set the background for canvas
  background(245, 110, 179,5);
  // loop
  for(let i = 0; i < numOfParticles; i ++) {
    let particle = particles[i];
    // create a point with its width and height equals to the coordinate of the preexisting vector
    point(particle.x, particle.y);
    // create a noise value
    let n = noise(particle.x * noiseScale, particle.y * noiseScale, frameCount * noiseScale * noiseScale);
   
    // the direction that the point will be moving along
    let angle = TAU * n;
    direction(particle,angle)
    if(!onScreen(particle) ) {
      particle.x = random(width);
      particle.y = random(height);
    }
  }
  if(frameCount %180 ==0) {
    changeDirection()
    changeRGB()
  }

}

function direction(p,a) {
  //some really cool functions for reference: https://www.mzrg.com/math/graphs.shtml  
  // p.y -=sin(a)
  // p.x += cos(a);
    p.x += sin(a)
    p.y += cos(a)-2*cos(2*a)-cos(4*a)
   } 

// change the direction with 
function changeDirection() {
  noiseSeed(millis());
}

function changeRGB() {
  let r = random(255);
  let g = random(255);
  let b = random(255);
  stroke(r,g,b);
  background(r,g-120,b)
}
// check if the particle is still onscreen
function onScreen(v) {
  return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}