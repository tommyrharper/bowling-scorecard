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


    if (scorecard.frames[frameIndex].type === 'Strike') {
      $('#roll' + numberOfRolls).text(rollScore);
      numberOfRolls += 1;
      $('#roll' + numberOfRolls).text('/');
    } else {
      $('#roll' + numberOfRolls).text(rollScore);
    }

    for (let i = 0; i < 10; i++) {
      if (scorecard.frames[i].type !== 'Incomplete') {
        $('#frame' + (i+1)).text(scorecard.frames[i].score);
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

    updateButtons(scorecard.frames[frameIndex].type, rollScore);

    // $('#frame' + scorecard.frame+1).text(scorecard.score);
  });

  function updateButtons(frameType, rollScore) {
    if (frameType === 'Incomplete') {
      for (i = 11-rollScore; i < 11; i++) {
        $(`#${i}.record`).prop('disabled', true);
      }
    } else {
      $('.record').prop('disabled', false);
    }
  }
});
