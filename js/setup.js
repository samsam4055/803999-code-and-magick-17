'use strict';

(function () {

  var pageSetup = document.querySelector('.setup');

  pageSetup.classList.remove('hidden');

  var getRandomInt = function (max) {
    return Math.floor(Math.random() * max);
  };

  var generateHeroes = function () {
    var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
    var surnames = ['да Мария', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
    var coatColors = [
      'rgb(101, 137, 164)',
      'rgb(241, 43, 107)',
      'rgb(146, 100, 161)',
      'rgb(56, 159, 117)',
      'rgb(215, 210, 55)',
      'rgb(0, 0, 0)'
    ];

    var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

    var heroes = [];

    for (var i = 0; i < 4; i++) {
      heroes.push({
        name: names[getRandomInt(names.length)] + ' ' + surnames[getRandomInt(surnames.length)],
        coatColor: coatColors[getRandomInt(coatColors.length)],
        eyesColor: eyesColors[getRandomInt(eyesColors.length)]
      });
    }

    return heroes;
  };

  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;

    return wizardElement;
  };

  var fragment = document.createDocumentFragment();

  var heroes = generateHeroes();

  for (var j = 0; j < heroes.length; j++) {
    fragment.appendChild(renderWizard(heroes[j]));
  }

  var setupSimilarList = document.querySelector('.setup-similar-list');
  var setupSimilarDialog = document.querySelector('.setup-similar');

  setupSimilarList.appendChild(fragment);

  setupSimilarDialog.classList.remove('hidden');

})();
