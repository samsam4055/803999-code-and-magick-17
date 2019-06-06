'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 16;
var BAR_HEIGHT = 150;
var BAR_WIIDTH = 40;
var GAP_X = 50;
var MESSAGE_Y = CLOUD_Y + FONT_GAP;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var getRandomNumber = function (min, max) {
  return Math.random() * (max - min) + min;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';

  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP_X, MESSAGE_Y);
  ctx.fillText('Список результатов:', CLOUD_X + GAP_X, MESSAGE_Y + FONT_GAP);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], CLOUD_X + GAP_X + (GAP_X + BAR_WIIDTH) * i, CLOUD_Y + MESSAGE_Y + GAP + FONT_GAP);

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + getRandomNumber(0.1, 1) + ')';
    }

    ctx.fillRect(CLOUD_X + GAP_X + (GAP_X + BAR_WIIDTH) * i, CLOUD_Y + MESSAGE_Y + FONT_GAP * 2 + GAP, BAR_WIIDTH, FONT_GAP + (BAR_HEIGHT * times[i]) / maxTime);
    ctx.fillStyle = '#000';
    ctx.fillText(Math.floor(times[i]), CLOUD_X + GAP_X + (GAP_X + BAR_WIIDTH) * i, CLOUD_Y + MESSAGE_Y + GAP + FONT_GAP * 3 + (BAR_HEIGHT * times[i]) / maxTime);
  }
};
