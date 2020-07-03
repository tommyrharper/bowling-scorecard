class Scorecard {
  constructor() {
    this.score = 0;
    this.previousFrame = 0;
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
      new Frame10(),
    ];
  }
  addRoll(roll) {
    for (let i = 0; i < 10; i++) {
      if (this.frames[i].type === 'Incomplete') {
        this.frames[i].addRoll(roll);
        this.previousFrame = i-1;
        break;
      }
    }
    this.addBonusPoints(roll);
    this.updateScore();
  }
  addBonusPoints(roll) {
    if (this.previousFrame === 8) {
      if (this.frames[this.previousFrame+1].type === 'Complete') {
      } else if (this.frames[this.previousFrame+1].roll2 !== undefined) {
        if (this.frames[this.previousFrame].type === 'Strike') {
          this.frames[this.previousFrame].addBonus(roll);
        }
        this.addSpareBonus(roll);
      } else if (this.previousFrame >= 0 ) {
        this.addStrikeBonus(roll);
        this.addSpareBonus(roll);
      }
    } else if (this.previousFrame >= 0 ) {
      this.addStrikeBonus(roll);
      this.addSpareBonus(roll);
    }
  }
  addStrikeBonus(roll) {
    if (this.frames[this.previousFrame].type === 'Strike') {
      this.frames[this.previousFrame].addBonus(roll);
      if (this.previousFrame >= 1) {
        if (this.frames[this.previousFrame-1].type === 'Strike') {
          this.frames[this.previousFrame-1].addBonus(roll);
        }
      }
    }
  }
  addSpareBonus(roll) {
    if (this.frames[this.previousFrame].type === 'Spare' &&
    this.frames[this.previousFrame+1].type === 'Incomplete') {
      this.frames[this.previousFrame].addBonus(roll);
    }
  }
  updateScore() {
    this.score = 0;
    for (let i = 0; i < 10; i++) {
      this.score += this.frames[i].score;
    }
  }
}
