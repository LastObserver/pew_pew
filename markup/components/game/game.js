import Keyboard from 'components/keyboard/keyboard';
import Cursor from 'components/cursor/cursor';
import Timer from 'components/timer/timer';
import Boi from 'components/boi/boi';
import Projectile from 'components/projectile/projectile';

export default class Game {

  constructor(datGame, field) {
    this.game = datGame;
    this.field = field;
    this.context = this.field.getContext('2d');
    this.fps = 60;

    this.timer = new Timer(this.run().bind(this), this.fps);
    this.keyboard = new Keyboard();
    this.cursor = new Cursor(this.field, this.context);
    this.boi = new Boi(this.field, 5, this.context, this.keyboard, this.cursor, this.onShot.bind(this));
    this.projectiles = {
      boi: {},
    };

    this.initGameControls();
  }

  initGameControls() {
    this.stopButton = document.querySelector('.button_stop');
    this.stopButton.addEventListener('click', () => this.timer.stop());
    this.startButton = document.querySelector('.button_start');
    this.startButton.addEventListener('click', () => this.timer.start());
  }

  run() {
    let loops = 0;
    let nextGameTick = (new Date()).getTime();
    const skipTicks = 1000 / this.fps;
    const maxFrameSkip = 10;
    return () => {
      loops = 0;

      while ((new Date()).getTime() > nextGameTick && loops < maxFrameSkip) {
        this.update();
        nextGameTick += skipTicks;
        loops++;
      }
      if (loops) {
        this.draw();
      }
    };
  }

  draw() {
    this.context.clearRect(0, 0, this.field.width, this.field.height);
    const shooterNames = Object.keys(this.projectiles);
    shooterNames.map(shooter => {
      const projectileIDs = Object.keys(this.projectiles[shooter]);
      projectileIDs.map(id => this.projectiles[shooter][id].draw());
    });
    this.boi.draw();
    this.cursor.draw();
  }

  update() {
    const shooterNames = Object.keys(this.projectiles);
    shooterNames.map(shooter => {
      const projectileIDs = Object.keys(this.projectiles[shooter]);
      projectileIDs.map(id => this.projectiles[shooter][id].update());
    });
    this.boi.update();
  }

  onShot(pos, dir, speed, radius, shooter) {
    const id = this.getId();
    this.projectiles[shooter][id] = new Projectile(id, pos, dir, speed, radius, this.field, this.context, this.onProjectileHit.bind(this), shooter);
  }

  onProjectileHit(id, shooter) {
    delete this.projectiles[shooter][id];
  }

  getId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
}
