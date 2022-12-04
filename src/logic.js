const kokac = new KokacP5Ext();
function setup() {
  createCanvas(innerWidth, innerHeight);
  kokac.add(() => background(0, 0, 0, 10));
  noStroke();

  function makeThread() {
    let dot = {
      x: mouseX,
      y: mouseY,
      color: color(random(200, 255), random(200, 255), random(200, 255)),
      dir: -QUARTER_PI * 2,
      setDir() {
        const div = 0.5;
        this.from = { x: this.x, y: this.y };
        this.dir += QUARTER_PI * div * (Math.random() < 0.5 ? -1 : 1);
        this.length = 0;
      },
      update() {
        if (
          this.x < 0 ||
          this.y < 0 ||
          this.x > innerWidth ||
          this.y > innerHeight
        ) {
          kokac.remove(dot);
          makeThread();
        }
        if (!this.length || this.length === lineLength) this.setDir();
        this.length += innerWidth / 200;
        if (this.length >= lineLength) this.length = lineLength;
        const { x, y } = this.from;
        const pos = Geometry.getPointByRadian(x, y, this.dir, this.length);
        this.x = pos[0];
        this.y = pos[1];
      },
      redraw() {
        fill(this.color);
        circle(this.x, this.y, innerWidth / 500);
      },
    };
    kokac.add(dot);
  }
  const lineLength = innerWidth / 200;
  for (let i = 0; i < 5000; i++) {
    makeThread();
  }
}
