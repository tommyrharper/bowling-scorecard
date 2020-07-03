describe('Frame,', function() {
  let frame;

  describe('Creating a Frame', function() {
    it('Constructs correct roll number', () => {
      frame = new Frame(1, 2);
      expect(frame.roll1).toEqual(1);
      expect(frame.roll2).toEqual(2);
    });
  });

  describe('Scoring', function() {
    it('A 1 and a 2 scores 3', () => {
      frame = new Frame(1, 2);
      expect(frame.score).toEqual(3);
    });

    it('Accepts bonus points', () => {
      frame = new Frame(10);
      frame.addBonus(5);
      expect(frame.score).toEqual(15);
    });
  });

  describe('Knows type of frame', () => {
    it('Knows if it is not a strike', () => {
      frame = new Frame(5, 5);
      expect(frame.isStrike()).toEqual(false);
    });

    it('Knows if it is not a strike', () => {
      frame = new Frame(10);
      expect(frame.isStrike()).toEqual(true);
    });
  });
});
