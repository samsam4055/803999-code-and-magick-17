'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var START_SETUP_TOP = '80px';
  var START_SETUP_LEFT = '50%';

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupUserName = setup.querySelector('.setup-user-name');
  var setupWizardCoat = setup.querySelector('.wizard-coat');
  var setupWizardEyes = setup.querySelector('.wizard-eyes');
  var setupFireball = setup.querySelector('.setup-fireball-wrap');
  var coatColors = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];
  var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var setupUserNameFocus = false;

  var onSetupFireballClick = function () {
    setupFireball.style.background = fireballColors[getRandomInt(fireballColors.length)];
  };

  var onSetupWizardCoatClick = function () {
    setupWizardCoat.style = 'fill: ' + coatColors[getRandomInt(coatColors.length)];
  };

  var onSetupWizardEyesClick = function () {
    setupWizardEyes.style = 'fill: ' + eyesColors[getRandomInt(eyesColors.length)];
  };

  var onSetupUserNameFocus = function () {
    setupUserNameFocus = true;
  };

  var onSetupUserNameFocusout = function () {
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
    setupFireball.addEventListener('click', onSetupFireballClick);
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    setupUserName.removeEventListener('focus', onSetupUserNameFocus);
    setupUserName.removeEventListener('focusout', onSetupUserNameFocusout);
    setupWizardCoat.removeEventListener('click', onSetupWizardCoatClick);
    setupWizardEyes.removeEventListener('click', onSetupWizardEyesClick);
    setupFireball.removeEventListener('click', onSetupFireballClick);
    setup.style.top = START_SETUP_TOP;
    setup.style.left = START_SETUP_LEFT;
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

  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;

    return wizardElement;
  };

  var successHandler = function (wizards){
  var fragment = document.createDocumentFragment();

  for (var j = 0; j < 4; j++) {
    fragment.appendChild(renderWizard(wizards[getRandomInt(wizards.length - 1)]));
  }

  var setupSimilarList = document.querySelector('.setup-similar-list');
  var setupSimilarDialog = document.querySelector('.setup-similar');

  setupSimilarList.appendChild(fragment);

  setupSimilarDialog.classList.remove('hidden');
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: yellow; top: 200px; padding: 45px 0px; color: red;';
    node.style.width = '500px';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  var similarForm = document.querySelector('.setup-wizard-form');

  similarForm.addEventListener('submit', function (evt) {

    var successHandler = function () {
      setup.classList.toggle('hidden');
    };

    window.backend.upload(new FormData(similarForm), successHandler, errorHandler);

    evt.preventDefault();
  });
})();
