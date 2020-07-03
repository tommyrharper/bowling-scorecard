class Scorecard {
  constructor() {
    this.totalRolls = 0;
    this.score = 0;
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
    this.rolls = [];
  }
  addRoll(roll) {
    // console.log('this.frames', this.frames);
    console.log('roll', roll);
    // console.log('this.frames before loop', this.frames);
    for (let i = 0; i < 10; i++) {
      if (this.frames[i].type === 'Incomplete') {
        // console.log('i', i);
        this.frames[i].addRoll(roll);
        break;
      }
    }
    // console.log('this.frames', this.frames);
    this.updateScore();
  }
  updateScore() {
    this.score = 0;
    for (let i = 0; i < 10; i++) {
      console.log('i', i);
      // console.log('this.frames[i].score', this.frames[i].score);
      console.log('this.frames', this.frames);
      this.score += this.frames[i].score;
    }
  }
}
