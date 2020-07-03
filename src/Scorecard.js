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
    console.log('roll', roll);
    for (let i = 0; i < 10; i++) {
      if (this.frames[i].type === 'Incomplete') {
        console.log('this frame:', i+1);
        this.frames[i].addRoll(roll);
        this.previousFrame = i-1;
        break;
      }
    }
    if (this.previousFrame >= 0) {
      this.addBonusPoints(roll);
    }
    this.updateScore();
  }
  addBonusPoints(roll) {
    if (this.previousFrame === 8) {
      this.addFinalFrameBonus(roll);
    } else {
      this.addFullBonus(roll);
    }
  }
  addFinalFrameBonus(roll) {
    if (this.frames[this.previousFrame+1].type === 'Complete') {
      // 3rd roll, frame 10 -> No bonus
    } else if (this.frames[this.previousFrame+1].roll2 !== undefined) {
      // 2nd roll, frame 10 -> Less bonus
      this.firstStrikeBonus(roll);
      this.addSpareBonus(roll);
    } else {
      // 1st roll, frame 10 -> Full bonus
      this.addFullBonus(roll);
    }
  }
  addFullBonus(roll) {
    this.firstStrikeBonus(roll);
    this.secondStrikeBonus(roll);
    this.addSpareBonus(roll);
  }
  firstStrikeBonus(roll) {
    if (this.frames[this.previousFrame].type === 'Strike') {
      this.frames[this.previousFrame].addBonus(roll);
    }
  }
  secondStrikeBonus(roll) {
    if (this.previousFrame >= 1) {
      if (this.frames[this.previousFrame-1].type === 'Strike') {
        this.frames[this.previousFrame-1].addBonus(roll);
      }
    }
  }
  addSpareBonus(roll) {
    if (this.frames[this.previousFrame].type === 'Spare') {
      if (this.frames[this.previousFrame+1].type === 'Incomplete') {
        this.frames[this.previousFrame].addBonus(roll);
      } else if (this.frames[this.previousFrame+1].type === 'Strike') {
        this.frames[this.previousFrame].addBonus(roll);
      }
    }
  }
  updateScore() {
    this.score = 0;
    for (let i = 0; i < 10; i++) {
      this.score += this.frames[i].score;
    }
    console.log('this.frames', this.frames);
    console.log('this.score', this.score);
  }
}
