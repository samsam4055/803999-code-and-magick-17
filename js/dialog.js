'use strict';
(function () {

  var setupDialogElement = document.querySelector('.setup');
  var dialogHandler = setupDialogElement.querySelector('.upload');
  var artifactHandler = setupDialogElement.querySelector('.setup-artifacts-cell > img');

  dialogHandler.addEventListener('mousedown', function (evtDialog) {
    evtDialog.preventDefault();

    var startCoords = {
      x: evtDialog.clientX,
      y: evtDialog.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupDialogElement.style.top = (setupDialogElement.offsetTop - shift.y) + 'px';
      setupDialogElement.style.left = (setupDialogElement.offsetLeft - shift.x) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (evtDragged) {
          evtDragged.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var onMousedownArtifactHandler = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      artifactHandler.style.position = 'absolute';

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      artifactHandler.style.top = (artifactHandler.offsetTop - shift.y) + 'px';
      artifactHandler.style.left = (artifactHandler.offsetLeft - shift.x) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (upEvt.explicitOriginalTarget.className === 'setup-artifacts-cell') {
        document.querySelector('.setup-artifacts-cell').removeChild(artifactHandler);
        document.querySelector('.setup-artifacts > .setup-artifacts-cell').appendChild(artifactHandler);
        artifactHandler.style.position = 'inherit';
        artifactHandler.style.top = '0px';
        artifactHandler.style.left = '0px';
      } else {
        artifactHandler.style.position = 'inherit';
        document.querySelector('.setup-artifacts-shop > .setup-artifacts-cell').appendChild(artifactHandler);
        artifactHandler.style.top = '109px';
        artifactHandler.style.left = '196px';
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
  artifactHandler.addEventListener('mousedown', onMousedownArtifactHandler);

})();
