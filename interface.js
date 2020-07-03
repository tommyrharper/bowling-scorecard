$(document).ready(function() {
  const scorecard = new Scorecard();
  let numberOfRolls = 0;

  $('.record').click(function(e) {
    e.preventDefault(e);

    numberOfRolls += 1;
    const rollScore = parseInt(e.currentTarget.value);
    scorecard.addRoll(rollScore);
    const frameNumber = scorecard.frame+1;
    const frameIndex = scorecard.frame;


    if (rollScore === 10) {
      $('#roll' + numberOfRolls).text(rollScore);
      numberOfRolls += 1;
      $('#roll' + numberOfRolls).text('/');
    } else {
      $('#roll' + numberOfRolls).text(rollScore);
    }
    
    // $('#frame' + frameNumber).text(scorecard.frames[frameIndex].score);
    console.log('scorecard.frames', scorecard.frames);
    for (let i = 0; i < 10; i++) {
      // console.log('scorecard.frames[i].type', scorecard.frames[i].type);
      console.log('i', i);
      if (scorecard.frames[i].type !== 'Incomplete') {
        console.log('i', i);
        console.log('INSIDE');
        console.log('(i+1)', (i+1));
        // $('#frame' + (i+1)).text("yo");
        $('#frame' + (i+1)).text(scorecard.frames[i].score);
        // break;
      }
    }

    // This works DONT WORRY/IGNORE
    $('#score').text(scorecard.score);
    $('#frames').text(frameNumber);


    // numberOfRolls += 1;
    // const rollScore = parseInt(e.currentTarget.value);
    // scorecard.addRoll(rollScore);
    // const frameNumber = scorecard.frame+1;

    // $('#score').text(scorecard.score);
    // $('#frames').text(frameNumber);

    // if (frameNumber >= 10 && rollScore === 10) {
    //   $('#roll' + numberOfRolls).text(rollScore);
    // } else if (rollScore === 10) {
    //   $('#roll' + numberOfRolls).text(rollScore);
    //   numberOfRolls += 1;
    //   $('#roll' + numberOfRolls).text('/');
    // } else {
    //   $('#roll' + numberOfRolls).text(rollScore);
    //   $('#frame' + scorecard.frames.length).text;
    // }

    // updateButtons(scorecard.rolls.length, rollScore);

    // $('#frame' + scorecard.frame+1).text(scorecard.score);
  });

  function updateButtons(rollsThisFrame, rollScore) {
    if (rollsThisFrame === 1) {
      for (i = 11-rollScore; i < 11; i++) {
        $(`#${i}.record`).prop('disabled', true);
      }
    } else {
      $('.record').prop('disabled', false);
    }
  }
});
