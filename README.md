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
