describe('Frame,', function() {
  let frame;

  beforeEach(function() {
    frame = new Frame();
  });

  describe('Frame accepts rolls', function() {
    it('Accepts added rolls', () => {
      frame.addRoll(2);
      frame.addRoll(3);
      expect(frame.roll1).toEqual(2);
      expect(frame.roll2).toEqual(3);
    });

    it('Accepts a strike', () => {
      frame.addRoll(10);
      expect(frame.roll1).toEqual(10);
      expect(frame.roll2).toEqual(0);
    });

    it('Rejects third roll', () => {
      frame.addRoll(10);
      expect(function() {
        frame.addRoll(1);
      }).toThrowError('Frame already full');
    });
  });

  describe('Scoring', function() {
    it('A 1 and a 2 scores 3', () => {
      frame.addRoll(1);
      frame.addRoll(2);
      expect(frame.score).toEqual(3);
    });

    it('Accepts bonus points', () => {
      frame.addRoll(10);
      frame.addBonus(5);
      expect(frame.score).toEqual(15);
    });
  });

  describe('Knows type of frame', () => {
    it('Knows if it is not a strike', () => {
      frame.addRoll(5);
      frame.addRoll(5);
      expect(frame.isStrike()).toEqual(false);
    });

    it('Knows if it is a strike', () => {
      frame.addRoll(10);
      expect(frame.isStrike()).toEqual(true);
    });

    it('Knows if it is a spare', () => {
      frame.addRoll(5);
      frame.addRoll(5);
      expect(frame.isSpare()).toEqual(true);
    });

    it('Knows if it is not a spare', () => {
      frame.addRoll(10);
      expect(frame.isSpare()).toEqual(false);
    });

    it('Knows if it is an open frame', () => {
      frame.addRoll(2);
      frame.addRoll(5);
      expect(frame.isOpenFrame()).toEqual(true);
    });

    it('Knows if it is not an open frame', () => {
      frame.addRoll(10);
      expect(frame.isOpenFrame()).toEqual(false);
    });
  });


});
