class Frame {
  constructor() {
    this.roll1 = undefined;
    this.roll2 = undefined;
    this.score = undefined;
  }
  addRoll(roll) {
    console.log('roll', roll);
    if (this.roll1 === undefined) {
      this.roll1 = roll;
      if (roll === 10) {
        this.roll2 = 0;
      }
    } else if (this.roll2 === undefined) {
      this.roll2 = roll;
    } else {
      throw new Error('Frame already full');
    }
    this.score = this.roll1 + this.roll2;
  }
  isStrike() {
    if (this.roll1 === 10) {
      return true;
    } else {
      return false;
    }
  }
  isSpare() {
    if (this.roll1 + this.roll2 === 10 && this.roll1 != 10) {
      return true;
    } else {
      return false;
    }
  }
  isOpenFrame() {
    if (this.roll1 + this.roll2 < 10) {
      return true;
    } else {
      return false;
    }
  }
  addBonus(bonus) {
    this.score += bonus;
  }
}
