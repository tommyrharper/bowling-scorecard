describe('scorecard,', function() {
  let scorecard;

  beforeEach(function() {
    scorecard = new Scorecard
  });

  describe('Adding Rolls', function() {
    it('Starts with a score of 0 for 0 rolls', () => {
      expect(scorecard.score).toEqual(0);
    });
  });
});
