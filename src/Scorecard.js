class Scorecard {
  constructor() {
    this.score = 0;
    this.rolls = [];
    this.frames = [];
  }
  addRoll(roll) {
    this.rolls.push(roll);
    if (this.rolls.length === 2) {
      this.frames.push(new Frame(this.rolls[0], this.rolls[1]));
      this.rolls = [];
    }
    this.updateScore();
  }
  updateScore() {
    let index = 0;
    for (index; index < this.frames.length; index++) {
      this.score += this.frames[index].score;
    }
  }
}
