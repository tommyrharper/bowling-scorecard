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

## Writing my first tests

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

## Realising I need to refactor

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

## Continue with TDD for Scorecard Class

Okay lets continue testing the scorecard class.

I write a test for a spare followed by and open frame. RED.

- Add logic to the addBonusPoints method. GREEN.

It now occurs to me I need to plan systematically my testing to cover all possibilites.

### Planning Tests

The order affects the score, so I have to test bost ```Spare | Strike``` and ```Strike | Spare``` for example.

| Frame 1 | Frame 2 |
|---------|---------|
| Open Frame | Open Frame |
| Open Frame | Spare |
| Open Frame | Strike |
| Spare | Open Frame |
| Spare | Spare |
| Spare | Strike |
| Strike | Open Frame |
| Strike | Spare |
| Strike | Strike |

Okay lets systematically test these.

### Back to TDD with the Scorecard Class

So I can see a whole with my logic, so I am going straight into writing a test for that, a spare, strike, strike. RED.

- Add some logic to addBonusPoints. Green.
- Now lets refactor the code to improve readability.
- I created two new methods, addStrikeBonus and addSpareBonus. REFACTORED.

## Testing for full games

Now lets test the functionality of this app from start to finish.

First lets test a perfect game, 300 points for bowling 12 strikes! RED.

- Aha! I need to create my ```Frame10.js``` Frame10 class to deal with this situation.
- Copy code from ```Frame.js``` class to start. They are going to be almost identical.
- Write test for adding a third roll to Frame10. RED.
- Add this.roll3 to Frame10. GREEN.
- Add logic to stop certain bonus points accruing on the 10th game. GREEN.

Yay, we did it! A perfect game now scores 300.

First lets refactor the code a bit. I pulled out a few extra methods, that is more readable now.

Test for 9 strikes, one spare, on strike scores 275. RED.

Oh no! I wasn't expecting that. Lets find the problem:

- I made a false assumption that on the final frame, the game is complete after a spare. This is false! This is the root of the error. Lets fix it. GREEN.
- Time to refactor. I refactored a few methods including this.addSpareBonus(). GREEN.

Test for 9 strikes, 2,2. RED.

- Change ```else if``` statement to ```if```. GREEN.

Test for 10 times open frames and then a 5 scores 150. RED.

- Another false assumption, there should be no spare bonus on the second last role. GREEN.

As far as I can tell that is it. I can't think of any more edge cases. It seems to be working.


## User inteface

Okay now to build a user interface.

Lets start by creating ```index.html``` and ```interface.js``` and installing ```jquery.js```.

Now I quickly sketch out a table in HTML, and write some logic in jQuery to display the results to the screen.

### jQuery Logic

The jQuery logic was not totally straight forward, had to think a little bit about the final frame and the buttons that are available, but overall was not too hard.

### Adding a reset button

Okay so now all the scores add up and the buttons work for the UI, but there is no reset button, lets add that.