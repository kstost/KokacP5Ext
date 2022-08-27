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
}
function draw() {
  kokac.step();
}
