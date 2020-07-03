describe('Scorecard,', function() {
  let scorecard;

  beforeEach(function() {
    scorecard = new Scorecard;
  });

  describe('Adding Rolls', function() {
    it('Starts with a score of 0 for 0 rolls', () => {
      expect(scorecard.score).toEqual(0);
    });

    it('Score of 4 for rolls 1, 3', () => {
      scorecard.addRoll(1);
      scorecard.addRoll(3);
      expect(scorecard.score).toEqual(4);
    });

    it('Score of 4 for rolls 1, 3', () => {
      scorecard.addRoll(10);
      scorecard.addRoll(1);
      scorecard.addRoll(3);
      expect(scorecard.score).toEqual(18);
    });
  });
});
