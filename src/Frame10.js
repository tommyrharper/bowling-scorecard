class Frame10 {
  constructor() {
    this.type = 'Incomplete';
    this.roll1 = undefined;
    this.roll2 = undefined;
    this.roll3 = undefined;
    this.score = 0;
  }
  addRoll(roll) {
    if (this.roll1 === undefined) {
      this.addFirstRoll(roll);
    } else if (this.roll2 === undefined) {
      this.addSecondRoll(roll);
    } else if (this.roll3 === undefined) {
      this.roll3 = roll;
    } else {
      throw new Error('Frame already full');
    }
    this.updateFrameScore(roll);
  }
  updateFrameScore(roll) {
    this.score += roll;
  }
  addFirstRoll(roll) {
    if (this.roll1 === undefined) {
      this.roll1 = roll;
      if (roll === 10) {
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
