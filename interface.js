$(document).ready(function() {
  let scorecard = new Scorecard();
  let numberOfRolls = 0;

  $('.Reset').click(function(e) {
    e.preventDefault(e);
    scorecard = new Scorecard();
    numberOfRolls = 0;
    $('#score').text(scorecard.score);
    $('#frames').text(0);
    for (let i = 0; i < 10; i++) {
      $('#frame' + (i+1)).text('');
      $('.record').prop('disabled', false);
    }
    for (let i = 0; i < 21; i++) {
      $('#roll' + (i+1)).text('');
    }
    $('#score').text('');
  });

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

    if (frameNumber === 10) {
      updateButtonsFrame10(scorecard.frames[frameIndex].type,
          rollScore,
          scorecard.frames[frameIndex].finalType);
    } else {
      updateButtons(scorecard.frames[frameIndex].type, rollScore);
    }

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

  function updateButtonsFrame10(frameType, rollScore, finalType) {
    if (frameType === 'Incomplete') {
      if (rollScore < 10 && finalType === 'Spare') {
        $('.record').prop('disabled', false);
      } else if (rollScore < 10) {
        for (i = 11-rollScore; i < 11; i++) {
          $(`#${i}.record`).prop('disabled', true);
        }
      }
    } else {
      $('.record').prop('disabled', true);
    }
  }
});
