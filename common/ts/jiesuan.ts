interface jiesuan {
  appear: (boxIndex: number) => void;
  xxrun: () => void;
  clickBtn: () => void;
  reset: () => void;
  next: () => void;
  hide: () => void;
  isClick: boolean;
}
let jiesuan = new Game() as Game & jiesuan;
jiesuan.isClick = false;
jiesuan.resource = {
  YDjieshuan1: {
    type: 'spine',
    data: {visible: false, x: 720, y: 400}
  },
  YDjieshuan2: {
    type: 'spine',
    data: { visible: false, x: 720, y: 430 }
  },
  resetbtn: {
    type: 'spine',
    data: { visible: false, x: 620, y: 590, interactive: true }
  },
  nextbtn: {
    type: 'spine',
    data: { visible: false, x: 820, y: 590, interactive: true }
  }
}
jiesuan.load = function() {
  this.load = null;
  jiesuan.loadResource(jiesuan.resource, jiesuan.stage, () => {
    for (let i = 0;i < 2;i++) {
      jiesuan.$(i+2).on('pointertap', jiesuan.clickBtn);
    }
  });
  $('#jiesuan').append(jiesuan.renderer.view);
}
jiesuan.appear = function(boxIndex) {
  let box = <PIXI.spine.Spine>jiesuan.$(boxIndex-1);
  box.lastTime = 0;
  box.visible = true;
  jiesuan.isClick = false;
  for (let i = 0;i < 2;i++) {
    let btn = <PIXI.spine.Spine>jiesuan.$(i+2);
    btn.lastTime = 0;
    btn.visible = false;
  }
  sound.sfx_win.play();
  sound.svo_win.play();
  animates._add('jiesuan');
  if (isPortrait) rendererResize(jiesuan);
  box.state.setAnimation(0, 'appear', false);
  box.state.addAnimation(0, 'idle', true, 0);
  if (boxIndex == 2) {
    for (let i = 1;i < 6;i++) {
      box.state.setEmptyAnimation(i, 0);
    }
  }
  proxyTimeout(function() {
    if (boxIndex == 2) {
      jiesuan.xxrun();
    }
    for (let i = 0;i < 2;i++) {
      proxyTimeout(() => {
        let btn = <PIXI.spine.Spine>jiesuan.$(i+2);
        btn.visible = true;
        sound.sfx_btn_in.play();
        btn.state.setAnimation(0, 'appear', false);
      }, (i * 450) + (boxIndex == 2 ? 2500 : 0));
    } 
  }, 1200);
  $('#jiesuan').show();
  sound.sfx_sahua.play();
};
jiesuan.xxrun = function() {
  let box = <PIXI.spine.Spine>jiesuan.$(1);
  for (let i = 1;i < 6;i++) {
    proxyTimeout(() => {
      box.state.setAnimation(i, `star${i}`, false);
      sound.sfx_star_in.play();
    }, 500 * i);
  }
}
jiesuan.clickBtn = function() {
  if (jiesuan.isClick) return;
  jiesuan.isClick = true;
  sound.sfx_dianji.play();
  this.state.setAnimation(0, 'click', false);
  switch (this.name) {
    case 'resetbtn':
      jiesuan.reset();
      break;
    case 'nextbtn':
      jiesuan.next();
      break;
  }
}
jiesuan.next = function() {
  if (chLevel != 4) {
    $('.chlist div').eq(chLevel).click();
  } else {
    $('#return').click();
  }
}
jiesuan.reset = function() {
  $('.chlist div').eq(chLevel-1).click();
}
jiesuan.hide = function() {
  $('#jiesuan').hide();
  jiesuan.$(0).visible = false;
  jiesuan.$(1).visible = false;
  jiesuan.isClick = false;
}
