class Scorecard {
  constructor() {
    this.score = 0;
    this.lastFrame;
    this.frame;
    this.secondLastFrame;
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
    this.NUMBER_OF_FRAMES = 10;
  }
  addRoll(roll) {
    for (let i = 0; i < this.NUMBER_OF_FRAMES; i++) {
      if (this.frames[i].type === 'Incomplete') {
        this.frames[i].addRoll(roll);
        this.secondLastFrame = i-2; this.lastFrame = i-1; this.frame = i;
        break;
      }
    }
    if (this.frame >= 1) {
      this.addBonusPoints(roll);
    }
    this.updateScore();
  }
  addBonusPoints(roll) {
    if (this.frame === this.NUMBER_OF_FRAMES-1) {
      this.addFinalFrameBonus(roll);
    } else {
      this.addFullBonus(roll);
    }
  }
  addFinalFrameBonus(roll) {
    if (this.frames[this.frame].roll3 !== undefined) {
    } else if (this.frames[this.frame].roll2 !== undefined) {
      this.firstStrikeBonus(roll);
    } else {
      this.addFullBonus(roll);
    }
  }
  addFullBonus(roll) {
    this.firstStrikeBonus(roll);
    this.secondStrikeBonus(roll);
    this.addSpareBonus(roll);
  }
  firstStrikeBonus(roll) {
    if (this.frames[this.lastFrame].type === 'Strike') {
      this.frames[this.lastFrame].addBonus(roll);
    }
  }
  secondStrikeBonus(roll) {
    if (this.lastFrame >= 1) {
      if (this.frames[this.secondLastFrame].type === 'Strike' &&
      this.frames[this.lastFrame].type === 'Strike') {
        this.frames[this.secondLastFrame].addBonus(roll);
      }
    }
  }
  addSpareBonus(roll) {
    if (this.frames[this.lastFrame].type === 'Spare') {
      if (['Incomplete', 'Strike'].includes(this.frames[this.frame].type)) {
        this.frames[this.lastFrame].addBonus(roll);
      }
    }
  }
  updateScore() {
    this.score = 0;
    for (let i = 0; i < this.NUMBER_OF_FRAMES; i++) {
      this.score += this.frames[i].score;
    }
  }
}
