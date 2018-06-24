/*
 * This file is used from
 * http://jlongster.com/Making-Sprite-based-Games-with-Canvas
 * Please do not re-distribute without permission
 *
 * ARP 28/07/2014
 *
 */


(function() {
    var pressedKeys = {};

    function setKey(event, status) {
        var code = event.keyCode;
        var key;

        switch(code) {
        case 13:
            key = 'ENTER'; break;
        case 32:
            key = 'SPACE'; break;
        case 37:
            key = 'LEFT'; break;
        case 38:
            key = 'UP'; break;
        case 39:
            key = 'RIGHT'; break;
        case 40:
            key = 'DOWN'; break;
        case 17:
            key = 'CTRL'; break;
        case 18:
            key = 'ALT'; break;
        case 27:
            key = 'ESCAPE'; break;
        case 48:
            key = '0'; break;
        case 49:
            key = '1'; break;
        case 50:
            key = '2'; break;
        case 51:
            key = '3'; break;
        case 52:
            key = '4'; break;
        case 53:
            key = '5'; break;
        case 54:
            key = '6'; break;
        case 55:
            key = '7'; break;
        case 56:
            key = '8'; break;
        case 57:
            key = '9'; break;
        case 90:
            key = 'Z'; break;
        case 88:
            key = 'X'; break;
        case 67:
            key = 'C'; break;
        case 68:
            key = 'D'; break;
        case 83:
            key = 'S'; break;
        case 65:
            key = 'A'; break;
        default:
            // Convert ASCII codes to letters
            key = String.fromCharCode(code);
        }

        pressedKeys[key] = status;
    }

    document.addEventListener('keydown', function(e) {
        setKey(e, true);
    });

    document.addEventListener('keyup', function(e) {
        setKey(e, false);
    });

    window.addEventListener('blur', function() {
        pressedKeys = {};
    });

    window.input = {
        isDown: function(key) {
            return pressedKeys[key.toUpperCase()];
        }
    };
})();