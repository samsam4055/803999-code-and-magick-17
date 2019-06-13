'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupUserName = setup.querySelector('.setup-user-name');
  var setupWizardCoat = setup.querySelector('.wizard-coat');
  var setupWizardEyes = setup.querySelector('.wizard-eyes');
  var coatColors = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
    ];
  var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  var setupUserNameFocus = false;

  var onSetupWizardCoatClick = function (evt) {
    setupWizardCoat.style = 'fill: ' + coatColors[getRandomInt(coatColors.length)];
  };

  var onSetupWizardEyesClick = function (evt) {
    setupWizardEyes.style = 'fill: ' + eyesColors[getRandomInt(eyesColors.length)];
  };

  var onSetupUserNameFocus = function (evt) {
    setupUserNameFocus = true;
  };

  var onSetupUserNameFocusout = function (evt) {
    setupUserNameFocus = false;
  };

  var onPopupEscPress = function (evt) {
    if (!setupUserNameFocus && evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    setupUserName.addEventListener('focus', onSetupUserNameFocus);
    setupUserName.addEventListener('focusout', onSetupUserNameFocusout);
    setupWizardCoat.addEventListener('click', onSetupWizardCoatClick);
    setupWizardEyes.addEventListener('click', onSetupWizardEyesClick);
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    setupUserName.removeEventListener('focus', onSetupUserNameFocus);
    setupUserName.removeEventListener('focusout', onSetupUserNameFocusout);
    setupWizardCoat.removeEventListener('click', onSetupWizardCoatClick);
    setupWizardEyes.removeEventListener('click', onSetupWizardEyesClick);
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });

  var getRandomInt = function (max) {
    return Math.floor(Math.random() * max);
  };

  var generateHeroes = function () {
    var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
    var surnames = ['да Мария', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

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
