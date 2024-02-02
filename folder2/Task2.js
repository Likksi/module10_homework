document.addEventListener('DOMContentLoaded', function() {
      let screenSizeButton = document.getElementById('screenSizeButton');

      screenSizeButton.addEventListener('click', function() {
        let screenWidth = window.innerWidth;
        let screenHeight = window.innerHeight;
        let screenSizeMessage = 'Ширина экрана: ' + screenWidth + ' пикселей\n' +
                                'Высота экрана: ' + screenHeight + ' пикселей';
        alert(screenSizeMessage);
      });
    });
