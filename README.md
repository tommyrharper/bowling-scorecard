# Bowling Scorecard

This is a JavaScript application for a digital Bowling Scorecard

## Set up

```
npm init --yes
eslint --init
unzip jasmine-standalone-3.5.0.zip
```

### Setting up CI

Create ```.travis.yml```
```yml
language: node_js
node_js:
  - "stable"
```

### Setting up ESLint

Before you can initialise ESLint you have to run ```npm init```. Then you can run ```eslint --init```. Then simply go through the different questions, I selected google for my style guide.

Then there is one important adjustment to make to the ```.eslint.json``` file:
```json
    "rules": {
        "require-jsdoc": 0,
        "no-unused-vars": 0
    }
```
Simply change this bit of the rules and then you are ready to go!

# Developmental Journal

## Planning

### Class Diagram

Objects | Messages
--------|---------
Scorecard | this.score <br> this.rolls <br> this.frames <br> this.gameComplete |
Frame | this.roll1 <br> this.roll2 <br> this.frameNumber <br> this.frameScore <br> isStrike <br> isSpare <br> isOpenFrame |
Frame10 | this.roll1 <br> this.roll2 <br> this.roll3 <br> this.frameNumber <br> this.frameScore <br> isDoubleStrike <br> isStrike <br> isSpare <br> isOpenFrame |

## Setting up Files

First I create 6 files, ```Scorecard.js```, ```Frame.js```, ```Frame10.js```, ```ScorcardSpec.js```, ```FrameSpec.js```, ```Frame10Spec.js```.

Then I had to configure Jasmine, so I added the following code to ```SpecRunner.html```
```html
  <!-- include source files here... -->
  <script src="src/Scorecard.js"></script>
  <script src="src/Frame.js"></script>
  <script src="src/Frame10.js"></script>

  <!-- include spec files here... -->
  <script src="spec/ScorecardSpec.js"></script>
  <script src="spec/FrameSpec.js"></script>
  <script src="spec/Frame10Spec.js"></script>
```

### Writing my first tests

First I want to Test Drive the creation of my Scorecard and Frame classes. Lets start with something simple, the score should start at 0:
```JavaScript
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
```

RED.

The solution to this most simply:

```JavaScript
class Scorecard {
  constructor() {
    this.score = 0;
  }
}
```
GREEN.

Now to similarly test drive the creation of the Frame class.

I write the first test to check the Frame stores the correct rolls. RED.

Create the class with ```this.roll1``` and ```this.roll2```. GREEN.

Then I want to test for Frame score. 1 and 3 should score 4. Red

Add ```this.score = roll1 + roll2``` to the Frame constructor. Green.

Now back to ```Scorecard.js```. I write a test for adding two rolls, 1 and 3. RED.

I create the updateScore function to solve this:

```JavaScript
  updateScore() {
    let index = 0;
    for (index; index < this.frames.length; index++) {
      this.score += this.frames[index].score;
    }
  }
```

GREEN.

Now lets add bonus points functionality to the Frame class. We will write at test that expects frame.addBonus to update the frameScore. RED.

- Add addBonus method to Frame class.

Green.

Now I need to Frame to know if it is a Strike or not.

- Write test for is not a strike. RED.
- Write isStrike method returns false. Green.
- Write test for isStrike. RED
- Write propper solution in isStrike method. GREEN.

Now I need to do the same for isSpare and isOpenFrame.

- Test for is not a spare. RED.
- Add isSpare method to Frame.js. GREEN.
- Test for isSpare. RED.
- Add logic to isSpare method. GREEN.
- Test for isOpenFrame. RED.
- Add isOpenFrame method Frame class. GREEN.

Now lets test for some more complex behaviour. A strike, 1, 3 should score 18. RED.

Hmmm, this is strangely complex to solve, I think I need to refactor.

### Realising I need to refactor

I started running into some complexity that seemed unnecessary. Time to redesign my code to make more sense.

Here is my new design for the Frame class:

| Objects | Messages |
|---------|----------|
| Frame | this.type <br> this.roll1 <br> this.roll2 <br> this.score <br> addRoll(roll) <br> addBonus(bonus) |
| Scorecard | this.score <br> this.previousFrame <br> this.frames <br> addRoll(roll) <br> addBonusPoints(roll) <br> updateScore() |

This simplifies the class, removing a method for checking for each type, and it allows the addition of single rolls to the Frame class, simplifying the process for the Scorecard class.

Few that has made things so much easier. My code is much more elegant now!

Now I can provide a simple solution for that test earlier.

- Add addBonusPoints method. GREEN.

### Continue with TDD for Scorecard Class

Okay lets continue testing the scorecard class.

