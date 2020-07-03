describe('Frame,', function() {
  let frame;

  describe('Creating a Frame', function() {
    it('Constructs correct roll number', () => {
      frame = new Frame(1, 2);
      expect(frame.roll1).toEqual(1);
      expect(frame.roll2).toEqual(2);
    });
  });
});
