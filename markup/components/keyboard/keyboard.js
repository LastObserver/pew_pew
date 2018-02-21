export default class Keyboard {
  constructor() {
    this.pressed = {};

    this.UP = 87;
    this.DOWN = 83;
    this.LEFT = 65;
    this.RIGHT = 68;

    document.addEventListener('keyup', this.onKeyUp.bind(this));
    document.addEventListener('keydown', this.onKeyDown.bind(this));
  }

  isPressed(keyCode) {
    return this.pressed[keyCode];
  }

  onKeyUp(event) {
    delete this.pressed[event.keyCode];
  }

  onKeyDown(event) {
    this.pressed[event.keyCode] = true;
  }
}
