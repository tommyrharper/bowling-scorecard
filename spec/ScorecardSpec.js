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

    it('Role a spare, strike', () => {
      scorecard.addRoll(5);
      scorecard.addRoll(5);
      scorecard.addRoll(10);
      expect(scorecard.score).toEqual(30);
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

    it('Role a strike, spare, strike', () => {
      scorecard.addRoll(10);
      scorecard.addRoll(5);
      scorecard.addRoll(5);
      scorecard.addRoll(10);
      expect(scorecard.score).toEqual(60);
    });

    it('Role a spare, strike, strike', () => {
      scorecard.addRoll(5);
      scorecard.addRoll(5);
      scorecard.addRoll(10);
      scorecard.addRoll(10);
      expect(scorecard.score).toEqual(50);
    });

    it('Role a strike, strike, strike, strike', () => {
      scorecard.addRoll(10);
      scorecard.addRoll(10);
      scorecard.addRoll(10);
      scorecard.addRoll(10);
      expect(scorecard.score).toEqual(90);
    });
  });

  describe('Full games', function() {
    it('Perfect Game', () => {
      for (let i = 0; i < 12; i++) {
        scorecard.addRoll(10);
      }
      expect(scorecard.score).toEqual(300);
      expect(scorecard.frames[9].type).toEqual('Complete');
    });

    it('Gutter game', () => {
      for (let i = 0; i < 20; i++) {
        scorecard.addRoll(0);
      }
      expect(scorecard.score).toEqual(0);
      expect(scorecard.frames[9].type).toEqual('Complete');
    });

    it('10 scores of 0, 5 scores 50', () => {
      for (let i = 0; i < 10; i++) {
        scorecard.addRoll(0);
        scorecard.addRoll(5);
      }
      expect(scorecard.score).toEqual(50);
      expect(scorecard.frames[9].type).toEqual('Complete');
    });

    it('11 strikes and one 5 scores 295', () => {
      for (let i = 0; i < 11; i++) {
        scorecard.addRoll(10);
      }
      scorecard.addRoll(5);
      expect(scorecard.score).toEqual(295);
      expect(scorecard.frames[9].type).toEqual('Complete');
    });

    it('10 strikes and one spare scores 285', () => {
      for (let i = 0; i < 10; i++) {
        scorecard.addRoll(10);
      }
      scorecard.addRoll(5);
      scorecard.addRoll(5);
      expect(scorecard.score).toEqual(285);
      expect(scorecard.frames[9].type).toEqual('Complete');
    });

    it('9 strikes and one spare, one strike scores 275', () => {
      for (let i = 0; i < 9; i++) {
        scorecard.addRoll(10);
      }
      scorecard.addRoll(5);
      scorecard.addRoll(5);
      scorecard.addRoll(10);
      expect(scorecard.score).toEqual(275);
      expect(scorecard.frames[9].type).toEqual('Complete');
    });

    it('9 strikes, 2,2 scores 250', () => {
      for (let i = 0; i < 9; i++) {
        scorecard.addRoll(10);
      }
      scorecard.addRoll(2);
      scorecard.addRoll(2);
      expect(scorecard.score).toEqual(250);
      expect(scorecard.frames[9].type).toEqual('Complete');
    });

    it('10 * open frame and 5 scores 150 ', () => {
      for (let i = 0; i < 20; i++) {
        scorecard.addRoll(5);
      }
      scorecard.addRoll(5);
      expect(scorecard.score).toEqual(150);
      expect(scorecard.frames[9].type).toEqual('Complete');
    });
  });
});
