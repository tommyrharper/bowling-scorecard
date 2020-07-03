class Frame {
  constructor(roll1, roll2 = 0) {
    this.roll1 = roll1;
    this.roll2 = roll2;
    this.score = roll1 + roll2;
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
