export default class Timer {
  constructor(callback, fps) {
    this.stopped = false;
    this.callback = callback;
    this.fps = fps;
    this.reqAnimation = window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.webkitRequestAnimationFrame;
  }

  onEachFrame(callback, reqAnimation) {
    const loop = () => {
      callback();
      if (!this.stopped) {
        reqAnimation(loop.bind(this));
      }
    };
    loop();
  }

  initLoop() {
    if (this.reqAnimation) {
      this.onEachFrame(this.callback, this.reqAnimation);
      return {
        type: 'req',
      };
    } else {
      return {
        type: 'interval',
        id: setInterval(this.callback, 1000 / this.fps),
      };
    }
  }

  start() {
    this.stopped = false;
    this.loop = this.initLoop();
  }

  stop() {
    if (this.loop) {
      switch (this.loop.type) {
        case 'req':
          this.stopped = true;
          break;
        case 'interval':
          clearInterval(this.loop.id);
          break;
      }
      this.loop = null;
    }
  }

}
