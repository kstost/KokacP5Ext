class KokacP5Ext {
  #tasks = new Map();
  add(v) {
    this.#tasks.set(v);
  }
  remove(v) {
    this.#tasks.delete(v);
  }
  get iterator() {
    return this.#tasks.keys();
  }
  delay(s) {
    if (!s) return new Promise((resolve) => setTimeout(resolve));
    let waiter = {};
    this.add(waiter);
    return new Promise((resolve) => {
      waiter.update = () => {
        if (--s > 0) return;
        this.remove(waiter);
        resolve();
      };
    });
  }
  step() {
    const { iterator } = this;
    while (true) {
      let nt = iterator.next();
      if (nt.done) break;
      let { value } = nt;
      if (value.constructor === Function) {
        value();
        continue;
      }
      value.update && value.update();
      value.redraw && value.redraw();
    }
  }
  text(string, xx, yy, size, font, nocalcbound) {
    let myFont = font;
    let text1 = string;
    let fontSizeSmall = size;
    let x = xx;
    let y = yy;
    let bounding_box = myFont.textBounds(text1, x, y, fontSizeSmall);
    x -= bounding_box.x;
    y -= bounding_box.y;
    let rectinfo;
    if (!nocalcbound) {
      rectinfo = {
        x: x + bounding_box.x,
        y: y + bounding_box.y,
        w: bounding_box.w,
        h: bounding_box.h,
      };
    }
    textFont(myFont);
    textSize(fontSizeSmall);
    text(text1, x + xx, y + yy);
    return rectinfo;
  }
}
function draw() {
  kokac.step();
}
