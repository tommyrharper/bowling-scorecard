class Scorecard {
  constructor() {
    this.score = 0;
    this.currentFrame = 0;
    this.frames = [
      new Frame(),
      new Frame(),
      new Frame(),
      new Frame(),
      new Frame(),
      new Frame(),
      new Frame(),
      new Frame(),
      new Frame(),
      new Frame(),
    ];
  }
  addRoll(roll) {
    console.log('roll', roll);
    for (let i = 0; i < 10; i++) {
      if (this.frames[i].type === 'Incomplete') {
        this.frames[i].addRoll(roll);
        this.currentFrame = i;
        break;
      }
    }
    this.addBonusPoints(roll);
    this.updateScore();
  }
  addBonusPoints(roll) {
    const previousFrame = this.currentFrame - 1;

    if (previousFrame >= 0) {
      if (this.frames[previousFrame].type === 'Strike') {
        this.frames[previousFrame].addBonus(roll);
      }
    }
  }
  updateScore() {
    this.score = 0;
    for (let i = 0; i < 10; i++) {
      // console.log('i', i);
      // console.log('this.frames', this.frames);
      this.score += this.frames[i].score;
    }
  }
}
