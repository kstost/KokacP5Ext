const kokac = new KokacP5Ext();

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
  kokac.add((e) => {
    fill("#00dd00");
    kokac.text(`abc\ndef\n한글`, 10, 0, 230, myFont);
  });
  //-----------------------------------------
  class Mother {
    constructor() {
      this.x = 0;
      this.y = 0;
      this.r = 20;
      this.alpha = 0;
      this.alphaToggle = false;
    }
    update() {
      this.x += 0.1;
      if (!this.alphaToggle) {
        this.alpha++;
        if (this.alpha >= 255) this.alphaToggle = !this.alphaToggle;
      } else {
        this.alpha--;
        if (this.alpha <= 0) this.alphaToggle = !this.alphaToggle;
      }
    }
    redraw() {
      fill(255, 0, 0, this.alpha);
      circle(this.x, this.y, this.r * 2);
    }
  }
  for (let i = 0; i < 10; i++) {
    let c2 = new Mother();
    c2.x = c2.r;
    c2.y = c2.r + i * c2.r * 2;
    kokac.add(c2);
    let c3 = { r: 10 };
    c3.redraw = function () {
      fill(255, 255, 0);
      circle(c2.x, c2.y, this.r * 2);
    };
    kokac.add(c3);

    kokac.add(() => {
      let bound = kokac.textBounds(
        `${Math.random()}`,
        c2.x,
        c2.y,
        20,
        myFont,
        true
      );
      let margin = 4;
      push();
      stroke(255);
      fill(30);
      rect(
        c2.r + margin + bound.rect.x - margin,
        bound.rect.y - margin - bound.rect.h * 0.5,
        bound.rect.w + margin * 2,
        bound.rect.h + margin * 2
      );
      pop();
      let { string, x, y, font, size } = bound;
      fill(255);
      textFont(font);
      textSize(size);
      text(string, c2.r + margin + x, y - bound.rect.h * 0.5);
    });
  }
}
