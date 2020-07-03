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
        console.log('this frame:', i+1);
        this.frames[i].addRoll(roll);
        this.secondLastFrame = i-2; this.lastFrame = i-1; this.frame = i;
        break;
      }
    }
    if (this.lastFrame >= 0) {
      this.addBonusPoints(roll);
    }
    this.updateScore();
  }
  addBonusPoints(roll) {
    if (this.lastFrame === 8) {
      this.addFinalFrameBonus(roll);
    } else {
      this.addFullBonus(roll);
    }
  }
  addFinalFrameBonus(roll) {
    console.log('this.lastFrame', this.lastFrame);
    console.log('this.frames[this.frame].roll2', this.frames[this.frame].roll2);
    // if (this.frames[this.frame].type === 'Complete') {
    if (this.frames[this.frame].roll3 !== undefined) {
      // 3rd roll, frame 10 -> No bonus
    } else if (this.frames[this.frame].roll2 !== undefined) {
      // 2nd roll, frame 10 -> Less bonus
      console.log('second last possible roll:', roll);
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
      this.frames[this.lastFrame].addBonus(roll);
    }
  }
  secondStrikeBonus(roll) {
    if (this.lastFrame >= 1) {
      if (this.frames[this.secondLastFrame].type === 'Strike') {
        this.frames[this.secondLastFrame].addBonus(roll);
      }
    }
  }
  addSpareBonus(roll) {
    console.log('addSpareBonus:', roll);
    if (this.frames[this.lastFrame].type === 'Spare') {
      if (['Incomplete', 'Strike'].includes(this.frames[this.frame].type)) {
        this.frames[this.lastFrame].addBonus(roll);
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
