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
  }
  addRoll(roll) {
    console.log('roll', roll);
    for (let i = 0; i < 10; i++) {
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
    if (this.frame === 9) {
      this.addFinalFrameBonus(roll);
    } else {
      console.log('add full bonus');
      this.addFullBonus(roll);
    }
  }
  addFinalFrameBonus(roll) {
    // if (this.frames[this.frame].type === 'Complete') {
    if (this.frames[this.frame].roll3 !== undefined) {
      // 3rd roll, frame 10 -> No bonus
    } else if (this.frames[this.frame].roll2 !== undefined) {
      // 2nd roll, frame 10 -> Less bonus
      this.firstStrikeBonus(roll);
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
    if (this.frames[this.lastFrame].type === 'Strike') {
      console.log('ADD 1ST STRIKE BONUS');
      this.frames[this.lastFrame].addBonus(roll);
    }
  }
  secondStrikeBonus(roll) {
    if (this.lastFrame >= 1) {
      // IF CURRENT FRAME IS COMPLETE AND NOT A STRIKE
      if (this.frames[this.lastFrame].type !== 'Strike') {
        // this.frames[this.lastFrame].addBonus(roll);
      } else
      // IF PREVIOUS FRAME WAS A STRIKE
      if (this.frames[this.secondLastFrame].type === 'Strike') {
        console.log('ADD 2ND STRIKE BONUS');
        this.frames[this.secondLastFrame].addBonus(roll);
      }
    }
  }
  addSpareBonus(roll) {
    if (this.frames[this.lastFrame].type === 'Spare') {
      if (['Incomplete', 'Strike'].includes(this.frames[this.frame].type)) {
        console.log('ADD SPARE BONUS');
        this.frames[this.lastFrame].addBonus(roll);
      }
    }
  }
  updateScore() {
    this.score = 0;
    for (let i = 0; i < 10; i++) {
      this.score += this.frames[i].score;
    }
    console.log('this.score', this.score);
  }
}
