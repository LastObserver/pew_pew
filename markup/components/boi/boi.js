export default class Boi {
  constructor(field, speed, context, keyboard, cursor, onShot) {
    this.speed = speed;
    this.context = context;
    this.keyboard = keyboard;
    this.cursor = cursor;
    this.field = field;
    this.onShot = onShot;

    this.x = 32;
    this.y = 32;

    this.field.addEventListener('click', this.shoot.bind(this));
  }

  update() {
    if (this.keyboard.isPressed(this.keyboard.UP)) {
      this.moveUp();
    }
    if (this.keyboard.isPressed(this.keyboard.DOWN)) {
      this.moveDown();
    }
    if (this.keyboard.isPressed(this.keyboard.LEFT)) {
      this.moveLeft();
    }
    if (this.keyboard.isPressed(this.keyboard.RIGHT)) {
      this.moveRight();
    }
  }

  draw() {
    const hyp = Math.sqrt(Math.pow(this.x - this.cursor.x, 2) + Math.pow(this.y - this.cursor.y, 2));
    const sin = (this.cursor.y - this.y) / hyp;
    const cos = (this.cursor.x - this.x) / hyp;
    const radgrad = this.context.createRadialGradient(this.x, this.y, 18, this.x, this.y, 32);
    radgrad.addColorStop(0, 'transparent');
    radgrad.addColorStop(0.5, 'transparent');
    radgrad.addColorStop(1, 'rgba(0,255,249, 1)');
    this.context.fillStyle = radgrad;
    this.context.beginPath();
    this.context.arc(this.x, this.y, 32, 0, Math.PI * 2);
    this.context.fill();
    this.context.fillStyle = '#105f17';
    this.context.beginPath();
    this.context.arc(this.x, this.y, 16, 0, Math.PI * 2);
    this.context.fill();
    this.context.beginPath();
    this.context.fillStyle = '#00b923';
    this.context.arc(this.x, this.y, 10, 0, Math.PI * 2);
    this.context.fill();
    this.context.strokeStyle = '#00b923';
    this.context.lineWidth = 4;
    this.context.beginPath();
    this.context.moveTo(this.x, this.y);
    this.context.lineTo(this.x + 24 * cos, this.y + 24 * sin);
    this.context.closePath();
    this.context.stroke();
    this.context.lineWidth = 6;
    this.context.beginPath();
    this.context.moveTo(this.x + 22 * cos, this.y + 22 * sin);
    this.context.lineTo(this.x + 28 * cos, this.y + 28 * sin);
    this.context.closePath();
    this.context.stroke();
  }

  moveLeft() {
    if (this.x > 18) {
      this.x += -this.speed;
    }
  }

  moveRight() {
    if (this.x < this.field.width - 18) {
      this.x += this.speed;
    }
  }

  moveUp() {
    if (this.y > 18) {
      this.y += -this.speed;
    }
  }

  moveDown() {
    if (this.y < this.field.height - 18) {
      this.y += this.speed;
    }
  }

  shoot(event) {
    this.onShot({ x: this.x, y: this.y }, { x: event.offsetX, y: event.offsetY }, 10, 6, 'boi');
  }
}
