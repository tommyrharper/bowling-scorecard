describe('Scorecard,', function() {
  let scorecard;

  beforeEach(function() {
    scorecard = new Scorecard;
  });

  describe('Adding Rolls', function() {
    it('Starts with a score of 0 for 0 rolls', () => {
      expect(scorecard.score).toEqual(0);
    });

    it('Roll an open frame', () => {
      scorecard.addRoll(1);
      scorecard.addRoll(3);
      expect(scorecard.score).toEqual(4);
    });

    it('Roll a strike, open frame', () => {
      scorecard.addRoll(10);
      scorecard.addRoll(1);
      scorecard.addRoll(3);
      expect(scorecard.score).toEqual(18);
    });

    it('Role a spare, open frame', () => {
      scorecard.addRoll(5);
      scorecard.addRoll(5);
      scorecard.addRoll(3);
      scorecard.addRoll(2);
      expect(scorecard.score).toEqual(18);
    });

    it('Role a strike, strike, strike', () => {
      scorecard.addRoll(10);
      scorecard.addRoll(10);
      scorecard.addRoll(10);
      expect(scorecard.score).toEqual(60);
    });

    it('Role a spare, strike, strike', () => {
      scorecard.addRoll(5);
      scorecard.addRoll(5);
      scorecard.addRoll(10);
      scorecard.addRoll(10);
      expect(scorecard.score).toEqual(40);
    });

    // it('Role a strike, strike, strike, strike', () => {
    //   scorecard.addRoll(10);
    //   scorecard.addRoll(10);
    //   scorecard.addRoll(10);
    //   scorecard.addRoll(10);
    //   expect(scorecard.score).toEqual(50);
    // });
  });

  describe('Full games', function() {
    // it('Perfect Game', () => {
    //   for (let i = 0; i < 12; i++) {
    //     scorecard.addRoll(10);
    //   }
    //   expect(scorecard.score).toEqual(300);
    // });
  });
});
