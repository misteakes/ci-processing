let system;

function setup() {
  createCanvas(1290, 594);
  system = new ParticleSystem(createVector(width / 2, 250));

  r = random(255);
  g = random(255);
  b = random(255);
}

function draw() {
  background(255);
  system.addParticle();
  system.run();

  text('first word to mind?', 100, 240);
  text('...', 100, 297);
  textSize(48);
  textStyle(BOLD);
}

// A simple Particle class
let Particle = function(position) {
  this.acceleration = createVector(0, 0.0025);
  this.velocity = createVector(random(-1, 1), random(-1, 0));
  this.position = position.copy();
  this.lifespan = 1400;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};

// Method to display
Particle.prototype.display = function() {
  // stroke(255, this.lifespan);
  strokeWeight(0);
  // fill(187, 141, 214, this.lifespan);
  fill(r, g, b, 255, this.lifespan);
  ellipse(this.position.x, this.position.y, 34, 34);
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
  return this.lifespan < 0;
};

let ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() {
  for (let i = this.particles.length-1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};