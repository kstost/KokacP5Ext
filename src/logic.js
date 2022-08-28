const kokac = new KokacP5Ext();

// let cnt = 0;
let myFont;
function preload() {
  myFont = loadFont("fonts/NotoSansKR-Bold.otf");
}
async function setup() {
  // 로직은 setup 안에서만 손 대면 되도록 코드를 구성함
  let sizeWidth = document.querySelector("#stg").getBoundingClientRect().width;
  let sizeHeight = sizeWidth * 0.3;
  sizeWidth = innerWidth;
  sizeHeight = innerHeight;
  createCanvas(sizeWidth, sizeHeight);
  noStroke();
  kokac.add((e) => background(0));
  let y = 0;
  kokac.add((e) => {
    kokac.text(`abc\ndef\n한글`, 10, y, 30, myFont);
  });
  return;
  kokac.add((e) => background(0));
  let rd = sizeWidth / 20;
  let round = sizeWidth / 1000;
  let lst = [];
  for (let i = 0; i < (sizeWidth - rd) / rd; i++) {
    for (let ia = 0; ia < (sizeHeight - rd) / rd; ia++) {
      let cc = {
        radian: i * 0.1 * ia,
        x: rd * 1 + i * rd,
        y: rd * 1 + ia * rd,
        r: round,
        rr: rd,
      };
      cc.update = function () {
        this.radian += 0.1;
      };
      cc.redraw = function () {
        let x = this.x + Math.cos(this.radian) * this.r;
        let y = this.y + Math.sin(this.radian) * this.r;
        this.cx = x;
        this.cy = y;
      };
      kokac.add(cc);
      lst.push(cc);
    }
  }
  lst.forEach((cc, i) => {
    let ln = { radian: i * 0.02 };
    ln.update = function () {
      this.x1 = cc.cx;
      this.y1 = cc.cy;
      this.radian += 0.01;
    };
    ln.redraw = function () {
      strokeWeight(rd / 1.2);
      stroke(130);
      let length = rd / 2;
      let ex = this.x1 + length * Math.cos(this.radian);
      let ey = this.y1 + length * Math.sin(this.radian);
      line(this.x1, this.y1, ex, ey);
    };
    kokac.add(ln);
  });
}
