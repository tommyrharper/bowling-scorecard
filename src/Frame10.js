class Frame10 {
  constructor() {
    this.type = 'Incomplete';
    this.finalType = 'Incomplete';
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
      this.type = 'Complete';
    } else {
      throw new Error('Frame already full');
    }
    this.updateFrameScore(roll);
  }
  updateFrameScore(roll) {
    this.score += roll;
  }
  addFirstRoll(roll) {
    this.roll1 = roll;
    if (roll === 10) {
      this.finalType = 'Strike';
    }
  }
  addSecondRoll(roll) {
    this.roll2 = roll;
    if (this.roll1 !== 10) {
      if (this.roll1 + roll === 10) {
        this.finalType = 'Spare';
        this.type = 'Complete';
      } else {
        this.finalType = 'OpenFrame';
        this.type = 'Complete';
      }
    }
  }
  addBonus(bonus) {
    this.score += bonus;
  }
}
