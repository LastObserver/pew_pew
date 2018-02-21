export default class Cursor {
  constructor(field, context) {
    this.field = field;
    this.context = context;
    this.x = 0;
    this.y = 0;
    this.field.addEventListener('mousemove', this.update.bind(this));
  }

  draw() {
    this.context.beginPath();
    this.context.strokeStyle = '#fff';
    this.context.lineWidth = 2;
    this.context.arc(this.x, this.y, 12, 0, 2 * Math.PI);
    this.context.moveTo(this.x + Math.cos(Math.PI / 4) * 12, this.y + Math.sin(Math.PI / 4) * 12);
    this.context.lineTo(this.x + Math.cos(Math.PI / 4) * 5, this.y + Math.sin(Math.PI / 4) * 5);
    this.context.moveTo(this.x - Math.cos(Math.PI / 4) * 12, this.y - Math.sin(Math.PI / 4) * 12);
    this.context.lineTo(this.x - Math.cos(Math.PI / 4) * 5, this.y - Math.sin(Math.PI / 4) * 5);
    this.context.moveTo(this.x + Math.cos(Math.PI / 4) * 12, this.y - Math.sin(Math.PI / 4) * 12);
    this.context.lineTo(this.x + Math.cos(Math.PI / 4) * 5, this.y - Math.sin(Math.PI / 4) * 5);
    this.context.moveTo(this.x - Math.cos(Math.PI / 4) * 12, this.y + Math.sin(Math.PI / 4) * 12);
    this.context.lineTo(this.x - Math.cos(Math.PI / 4) * 5, this.y + Math.sin(Math.PI / 4) * 5);
    this.context.closePath();
    this.context.stroke();
  }

  update(event) {
    this.x = event.offsetX;
    this.y = event.offsetY;
  }
}
