class Frame {
  constructor() {
    this.type = undefined;
    this.roll1 = undefined;
    this.roll2 = undefined;
    this.score = undefined;
  }
  addRoll(roll) {
    if (this.roll1 === undefined) {
      this.addFirstRoll(roll);
    } else if (this.roll2 === undefined) {
      this.addSecondRoll(roll);
    } else {
      throw new Error('Frame already full');
    }
    this.updateFrameScore();
  }
  updateFrameScore() {
    this.score = this.roll1 + this.roll2;
  }
  addFirstRoll(roll) {
    if (this.roll1 === undefined) {
      this.roll1 = roll;
      if (roll === 10) {
        this.roll2 = 0;
        this.type = 'Strike';
      }
    }
  }
  addSecondRoll(roll) {
    this.roll2 = roll;
    if (this.roll1 + roll === 10) {
      this.type = 'Spare';
    } else {
      this.type = 'OpenFrame';
    }
  }
  addBonus(bonus) {
    this.score += bonus;
  }
}
