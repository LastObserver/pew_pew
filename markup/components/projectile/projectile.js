export default class Projectile {
  constructor(id, pos, dir, speed, radius, field, context, onProjectileHit, shooter) {
    this.dir = dir;
    this.pos = pos;
    this.id = id;
    this.V = speed;
    this.radius = radius;
    this.context = context;
    this.field = field;
    this.shooter = shooter;
    this.onProjectileHit = onProjectileHit;

    const hyp = Math.sqrt(Math.pow(this.dir.x - this.pos.x, 2) + Math.pow(this.dir.y - this.pos.y, 2));
    const sin = (this.dir.y - this.pos.y) / hyp;
    const cos = (this.dir.x - this.pos.x) / hyp;

    this.Vy = this.V * sin;
    this.Vx = this.V * cos;
  }
  move() {
    if (this.pos.x >= this.field.width + 2 ||
      this.pos.y >= this.field.height + 2 ||
      this.pos.x <= -2 || this.pos.y <= -2) {
      this.delete();
    }
    this.pos.x += this.Vx;
    this.pos.y += this.Vy;
  }
  update() {
    this.move();
  }
  draw() {
    const radgrad = this.context.createRadialGradient(this.pos.x, this.pos.y, 1, this.pos.x, this.pos.y, this.radius);
    radgrad.addColorStop(0, 'yellow');
    radgrad.addColorStop(0.5, 'transparent');
    radgrad.addColorStop(1, 'rgba(255,165,0, 1)');
    this.context.fillStyle = radgrad;
    this.context.beginPath();
    this.context.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    this.context.fill();
  }
  delete() {
    this.onProjectileHit(this.id, this.shooter);
  }
}
