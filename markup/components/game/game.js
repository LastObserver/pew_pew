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
    this.overlay = this.game.querySelector('.overlay');
    this.fps = 60;
    this.started = false;

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
    this.startButton = document.querySelector('.button_start');
    this.resumeButton = document.querySelector('.button_resume');
    this.resumeButton.style.display = 'none';
    this.startButton.addEventListener('click', () => this.startGame());
    this.resumeButton.addEventListener('click', () => this.resumeGame());
    document.addEventListener('keydown', ev => {
      if (ev.keyCode === 27) {
        if (this.overlay.classList.contains('overlay_hidden')) {
          this.pauseGame();
        } else {
          this.resumeGame();
        }
      }
    });
  }

  run() {
    return () => {
      this.update();
      this.draw();
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

  startGame() {
    this.timer.start();
    this.overlay.classList.add('overlay_hidden');
    this.field.classList.add('field_started');
    this.startButton.style.display = 'none';
    this.resumeButton.style.display = 'block';
  }

  resumeGame() {
    this.timer.start();
    this.overlay.classList.add('overlay_hidden');
    this.field.classList.add('field_started');
  }

  pauseGame() {
    this.timer.stop();
    this.overlay.classList.remove('overlay_hidden');
    this.field.classList.remove('field_started');
  }
}
