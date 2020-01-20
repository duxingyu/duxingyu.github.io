let sound: {[x: string]: Howl} = {};
type timers = {
  /** 清理定时器 */
  clear: () => void; 
}
let chLevel = 0;
let bookNum = 1;
let Linkpre;
let bookSlideData = null;
let recorder = Recorder();
let recorderIndex = 0;
let handtipShow = false;
let timers = new Array() as Array<number> & timers;
// 清理定时器 
timers.clear = function() {
  this.forEach((timer: number) => clearTimeout(timer));
  this.length = 0;
};
let queue = new createjs.LoadQueue(true, './src/1/ch1/');
function preloadImgs() {
  let manifest = [];
  for (let i = 0;i < book.length;i++) {
    manifest.push(`${i+1}/bg.png`);
    manifest.push(`${i+1}/texture.png`);
  }
  manifest.push('https://mytianh5.oss-cn-beijing.aliyuncs.com/readingClass/1/video/expand.mp4', 'https://mytianh5.oss-cn-beijing.aliyuncs.com/readingClass/1/video/book.mp4')
  queue.on("complete", handleComplete, this);
  queue.loadManifest(manifest);
  function handleComplete() {
    console.log('complete');
  }
}
preloadImgs();
let video1 = new MMD.VideoPlayer({
  videoElement: $('video')[0],
  src: 'https://mytianh5.oss-cn-beijing.aliyuncs.com/readingClass/expandtitle.mp4',
  onStart() {
    video2.src = 'https://mytianh5.oss-cn-beijing.aliyuncs.com/readingClass/1/video/expand.mp4';
    video2.play();
    video2.muted = true;
    setTimeout(() => {
      video2.pause();
      video2.muted = false;
    }, 0); 
  },
  onEnd() {
    $('#video').show();
    $('#expand video').hide();
    video2.currentTimeAndPlay = 0;
  }
})
let video2 = new MMD.VideoPlayer({
  videoElement: $('video')[1],
  src: 'https://mytianh5.oss-cn-beijing.aliyuncs.com/readingClass/1/video/book.mp4',
  onStart() {},
  onEnd() {
    if (video2.src.indexOf('book') != -1) {
      jiesuan.appear(1);
    } else {
      jiesuan.appear(2);
    }
  }
})
let gameStyle = null;
let tweens = TWEEN;
let Tween = TWEEN.Tween;
let thingTweens = {
  shake: null
};
let scales = null;
let device = '';
let animates = {
  _add: (attr: string) => {
    animates[attr] = () => {
      let game = window[attr];
      if (game) {
        game.renderer.render(game.stage);
      }
    };
  },
  _remove: (attr?: string | string[]) => {
    let arr = [];
    if (!attr) {
      for (const key in animates) {
        if (key.indexOf('_') == -1) arr.push(key);
      }
    } else {
      arr = isArr(attr) ? attr : [attr];
    }
    arr.map(val => delete animates[val]);
  },
};
let listIsClick = false;
let swiper: Swiper = null;
let swiperData = null;
let swiperStep = 0;
let quesIndex = 0;

setWrapSize();
function animate(time?: number) {
  requestAnimationFrame(animate);
  TWEEN.update(time);
  for (const attr in animates) {
    const animation = animates[attr];
    if (animation && attr.indexOf('_') == -1) animation();
  }
}
animate();

function clearAll() {
  timers.clear();
  tweens.clear();
  stopSound();
  recorder.close();
  sound.maimai.off('end');
  video1.pause();
  video2.pause();
}
function stopSound(music?: string) {
  for (let attr in sound) {
    if (attr.indexOf(music) !== 0) {
      sound[attr].stop();
    }
  }
}

function addBookSounds() {
  let sprites = {};
  bookSounds.forEach(sound => sprites[sound] = {});
  book.forEach((val, page) => {
    for (const key in val.sounds) {
      if (isArr(val.sounds[key][0])) {
        let arr: number[] = val.sounds[key];
        for (let i = 0;i < arr.length;i++) {
          sprites[key][`p${page+1}_${i+1}`] = [arr[i][0], arr[i][1] - arr[i][0]];
        }
      } else {
        let arr = val.sounds[key];
        sprites[key][`p${page+1}`] = [arr[0], arr[1] - arr[0]];
      }
    }
  });
  for (const key in sprites) {
    sound[key] = new Howl({
      src: `./src/1/music/${key}.mp3`,
      sprite: sprites[key],
      onplayerror() {
        sound[key].once('unlock', () => {
          sound[key].play();
        });
      }
    });
  }
}
addBookSounds();
addBookSlideData();

function pangbaiPlay(lineIndex: number, sentenceIndex: number) {
  let datas = swiperData.pangbais;
  let data = datas[lineIndex].size[sentenceIndex];
  let coords = { w: 0 };
  let allWidth = datas[lineIndex].size[datas[lineIndex].size.length-1].x;
  if (data.x0) {
    coords.w = data.x0;
  } else if (datas[lineIndex].size[sentenceIndex-1]) {
    coords.w = datas[lineIndex].size[sentenceIndex-1].x;
  }
  let tween = new Tween(coords)
    .to({ w: data.x }, data.tb - data.ta)
    .onUpdate(() => {
      $(`.slide${bookNum} .pangbaia.pangbai${lineIndex+1}`).css({
        width: `${allWidth - coords.w}px`,
        left: coords.w + datas[lineIndex].pos.x + 'px'
      })
      $(`.slide${bookNum} .pangbai${lineIndex+1}b`).css('width', coords.w + 'px')
    }).onComplete(() => {
      let duration = 0;
      let aIndex = lineIndex;
      let bIndex = sentenceIndex;
      if (datas[lineIndex].size[sentenceIndex+1]) {
        bIndex = sentenceIndex + 1;
        duration = datas[lineIndex].size[sentenceIndex+1].ta - data.tb;
      } else if (datas[lineIndex+1]) {
        aIndex = lineIndex + 1;
        bIndex = 0;
        duration = datas[lineIndex+1].size[0].ta - data.tb;
      } else {
        $('.arrow').show();
        if (data.expand) {
          expandShow();
        }
        return;
      }
      if (data.expand) {
        $('.arrow').show();
        expandShow();
        return;
      }
      proxyTimeout(function() {
        pangbaiPlay(aIndex, bIndex);
      }, duration);
    }).start();
  tweens.add(tween);
}

/** 阅读拓展按钮显示 */
function expandShow() {
  swiperStep++;
  $('.expandbtn').eq(bookNum-1).show();
  if (!handtipShow && (bookNum == 1)) {
    handtipShow = true;
    $('#handtip').show();
    let coords = {x: 15, y: 72};
    let tween = new Tween(coords)
      .to({ x: 7, y: 64 }, 500)
      .onUpdate(() => {
        $('#handtip').css({
          left: coords.x + '%',
          top: coords.y + '%'
        });
      }).onComplete(() => {
        setTimeout(() => $('#handtip').hide(), 500);
      }).start();
    tweens.add(tween);
  }
}
$('#home').css('transform', `scale(${parseFloat($('#wrapper').css('width'))/1440}, ${parseFloat($('#wrapper').css('height'))/832})`)
/** 进入关卡 */
function enterLevel() {
  clearAll();
  jiesuan.hide();
  listIsClick = false;
  scales = `scale(${parseFloat($('#wrapper').css('width'))/1440}, ${parseFloat($('#wrapper').css('height'))/832})`;
  $('#home').hide();
  $('#chs').show();
  $('.ch').hide();
  $(`.ch${chLevel}`).show();
  let audio = sound.maimai;
  if (chLevel != 4) {
    if (chLevel == 1) {
      sound.title.play();
    } else {
      audio.play(`card${chLevel}`);
    }
    titles.appear();
  }
  if (chLevel == 1) {
    $('#book .fengmian').show();
    if (swiper) {
      $('#book .swiper').hide();
      return;
    }
    swiper = new Swiper({
      container: $('#book .swiper')[0],
      isVertical: false,
      keepDefaultClasses: ['expandbtn', 'laba', 'arrow'],
      data: bookSlideData
    });
    swiperData = book[0];
    swiper.on('swipeChanged', () => {
      $('.arrow').hide();
      bookSlidePlay();
      if (swiper.getCurrentIndex() == 0) {
        $('.prev').addClass('disable');
      } else {
        $('.prev').removeClass('disable');
      }
      if (swiper.getCurrentIndex() == $('.slide').length - 1) {
        $('.next').addClass('disable');
      } else {
        $('.next').removeClass('disable');
      }
    });
    $('.slide .wrap').css({
      top: $('#wrapper').css('top'),
      left: $('#wrapper').css('left'),
      transform: scales
    });
    $('.fengmian').css({
      top: $('#wrapper').css('top'),
      left: $('#wrapper').css('left'),
      transform: scales
    });
    $('#book .swiper').hide();
  } else if (chLevel == 2) {
    $('#ques .bg').show();
    $('#ques .wrap').css('transform', scales);
    quesIndex = 0;
    proxyTimeout(() => {
      quesAppend();
      titles.hide();
      $('#ques .bg').hide();
    }, 2000);
  } else if (chLevel == 3) {
    $('#record .bg').show();
    $('#record .recordplaybtn').hide();
    $('#record .wrap').css('transform', scales);
    recorder.open();
    recorderIndex = 0;
    proxyTimeout(() => {
      recordAsk();
      titles.hide();
    }, 2000);
  } else {
    video1.currentTimeAndPause = 0;
    $('#expand video').show();
    video1.play();
  }
}

/** 绘本初始化播放 */
function bookSlidePlay() {
  bookNum = swiper.getCurrentIndex() + 1;
  swiperData = book[bookNum-1];
  swiperStep = 0;
  if (listIsClick) return;
  $(`.slide${bookNum} .imgs`).children().remove();
  $(`.slide${bookNum} .imgs`).html(bookSlideData[bookNum-1].imgs);
  $(`.slide${bookNum} .pangbaia`).css({width: '', left: ''});
  $(`.slide${bookNum} .pangbaib`).css({width: ''});
  $(`.slide${bookNum} .expandbtn`).hide();
  clearAll();
  let pangbai = sound[swiperData.pangbaibu ? 'pangbaibu' : 'pangbai'];
  pangbai.play(pangbai._sprite[`p${bookNum}`] ? `p${bookNum}` : `p${bookNum}_1`);
  pangbaiPlay(0, 0);
  if (swiperData.expand2) {
    swiperData.expand2();
  }
}

(function() {
  // 一级界面关卡点击
  $('.chlist div').click(function() {
    let that = $(this);
    if (listIsClick || that.hasClass('filter')) return;
    listIsClick = true;
    sound.sfx_dianji.play();
    chLevel = that.index() + 1;
    scaleAnim(that, {callback() {
      $('#video').hide();
      enterLevel();
    }});
  });
  // 返回按钮点击
  $('#return').click(() => {
    if (listIsClick) return;
    listIsClick = true;
    clearAll();
    scaleAnim($('#return'), {
      callback() {
        titles.hide();
        $('#video').hide();
        jiesuan.hide();
        if (swiper) {
          swiper.swipeTo(0, {name: 'slide', duration: 0});
        }
        listIsClick = false;
        if ($('#chs').isShow()) {
          $('#chs').hide();
          $('#chs .ch').hide();
          $('#home').show();
        } else {
          wx.miniProgram.navigateBack();
        }
      }
    })
  })
  $('#book').on('click', '.expandbtn', () => {
    $('.expandbtn').eq(bookNum-1).hide();
    swiperData[`expand${swiperStep}`]();
  });
  $('#book').on('click', '.laba', () => {
    clearAll();
    bookSlidePlay();
  })
  $('#book .arrow').click(function() {
    if ($(this).hasClass('disable')) {
      return;
    }
    if ($(this).hasClass('prev')) {
      swiper.swipePrev();
    } else {
      swiper.swipeNext();
    }
  })
  $('#book .bookmode').click(function() {
    swiper.transition = {name: 'slide', duration: 500};
    if (isPortrait) {
      swiper.sideLength = document.body.clientWidth;
    }
    if (isPortrait) {
      $('#book .swiper').css({
        width: '100vh',
        height: '100vw'
      })
    }
    scaleAnim($(this), {
      callback() {
        titles.hide();
        $('#book .swiper').show();
        $('#book .fengmian').hide();
        bookSlidePlay();
      }
    })
  });
  $('#book .videomode').click(function() {
    video2.currentTime = 0;
    video2.src = 'https://mytianh5.oss-cn-beijing.aliyuncs.com/readingClass/1/video/book.mp4';
    video2.muted = true;
    video2.play();
    setTimeout(() => {
      video2.pause();
      video2.muted = false;
    }, 0);
    scaleAnim($(this), {
      callback() {
        titles.hide();
        $('#video').show();
        $('#book .fengmian').hide();
        video2.play();
      }
    })
  })
  $('#ques .ansbox').click(function() {
    if ($(this).children('.ui').isShow()) {
      return;
    }
    stopSound();
    if ($(this).hasClass('ok')) {
      scaleAnim($(this));
      sound.yes.play();
      sound.sfx_zhengque.play();
      $(this).children('.ui').removeClass('uicuo').addClass('uidui');
      proxyTimeout(function() {
        if (quesOks[quesIndex]) {
          quesAppend();
        } else {
          jiesuan.appear(2);
        }
      }, 1000);
    } else {
      $(this).children('.ui').removeClass('uidui').addClass('uicuo');
      ansBoxShake($(this))
      sound.no.play();
      sound.sfx_cuowu.play();
    }
    $(this).children('.ui').show();
  });
  $('#record .recordbtn').on('touchstart', function() {
    $(this).addClass('filter');
    recorder.start();
  })
  $('#record .recordbtn').on('touchend', function() {
    $(this).removeClass('filter');
    recorder.stop(function(blob, duration) {
      recorder.close();
      $('#record .recordbtn').hide();
      recorderPlay(blob);
    }, function() {
      $('#record .recordbtn').hide();
      proxyTimeout(() => {
        $('#record .recordplaybtn').show();
      }, 1000);
    });
  })
  $('#record .recordplaybtn').click(function() {
    let audio = sound[`recorder${recorderIndex+1}`];
    scaleAnim($(this), {callback() {
      if (audio) {
        audio.play();
        audio.once('end', () => {
          $('#record .recordplaybtn').hide();
          recorderIndex++;
          if (recorderIndex == 2) {
            jiesuan.appear(2);
          } else {
            recordAsk();
          }
        })
      } else {
        proxyTimeout(() => {
          $('#record .recordplaybtn').hide();
          recorderIndex++;
          if (recorderIndex == 2) {
            jiesuan.appear(2);
          } else {
            recordAsk();
          }
        }, 2000);
      }
    }})
  })
})();

function recordAsk() {
  let scene = `scene${recorderIndex+1}`;
  $('#record .scene').removeClass('scene1 scene2');
  $('#record .scene').addClass(scene);
  $('#record .quescont').removeClass('scene1ques scene2ques');
  $('#record .quescont').addClass(scene + 'ques');
  sound.maimai.play(`record${recorderIndex+1}`);
  sound.maimai.once('end', function() {
    $('#record .recordbtn').show();
  })
  $('#record .bg').hide();
}

function recorderPlay(blob: Blob) {
  let reader = new FileReader();
  reader.onload = function(event) {
    let txt = event.target.result;
    sound[`recorder${recorderIndex+1}`] = new Howl({
      src: <string>txt,
      onend() {
        console.log('end');
      },
      onload() {
        $('#record .recordplaybtn').show();
      }
    });
  };
  reader.readAsDataURL(blob);
}

(function soundEvent() {
  addSounds(['sfx_dianji', 'sfx_btn_in', 'svo_win', 'sfx_win', 'sfx_star_in', 'sfx_zhengque', 'sfx_cuowu', 'yes', 'no', 'sfx_sahua'], 'common/music/');
})();

window.onload=function () {
  document.addEventListener('touchstart',function (event) {
    if(event.touches.length>1){
      event.preventDefault();
    }
  });
  var lastTouchEnd=0;
  document.addEventListener('touchend',function (event) {
    var now=(new Date()).getTime();
    if(now-lastTouchEnd<=300){
      event.preventDefault();
    }
    lastTouchEnd=now;
  },false);
  document.addEventListener('gesturestart', function (event) {
    event.preventDefault();
  });
}
document.body.addEventListener('touchmove', e => e.preventDefault(), { passive: false });

/** 人物说话缩放 */
function animThingScale(ele: ZeptoCollection) {
  let coords = { scale: 1 };
  let tween = new Tween(coords)
    .to({ scale: 1.1 }, 700)
    .repeat(Infinity).yoyo(true)
    .onUpdate(() => ele.css('transform', 'scale(' + coords.scale + ')')).start();
  tweens.add(tween);
  return tween;
}

/** 对话缩放 */
function animSpeakBoxScale(ele: ZeptoCollection, hide?: boolean) {
  let start = {scale: hide ? 1 : 0};
  let end = {scale: hide ? 0 : 1};
  if (!hide) {
    ele.show();
  }
  let tween = new Tween(start)
    .to(end, 500)
    .onUpdate(() => ele.css('transform', 'scale(' + start.scale + ')')).start();
  tweens.add(tween);
  return tween;
}

/** 人物抖动 */
function animThingShake(ele: ZeptoCollection) {
  ele.show();
  let coords = { rotate: 3 };
  let tween = new Tween(coords)
    .to({ rotate: -3 }, 500)
    .repeat(Infinity).yoyo(true)
    .onUpdate(() => ele.css('transform', 'rotate(' + coords.rotate + 'deg)')).start();
  tweens.add(tween);
  thingTweens.shake = tween;
  return tween;
}

function ansBoxShake(ele: ZeptoCollection) {
  ele.addClass('no');
  let coords = {rotate: 2};
  let tween = new Tween(coords)
    .to({ rotate: -2 }, 100)
    .repeat(6).yoyo(true)
    .onUpdate(() => ele.css('transform', 'rotate(' + coords.rotate + 'deg)')).onComplete(() => {
      tween = new Tween(coords)
        .to({ rotate: 0 }, 50)
        .onUpdate(() => ele.css('transform', 'rotate(' + coords.rotate + 'deg)')).onComplete(() => ele.removeClass('no')).start();
    }).start();
  tweens.add(tween);
  thingTweens.shake = tween;
}
// 09bb07
// 9B2B2AFA3635
/**
 * 人物讲话抖动，对话框显示，对话播放
 * @param thing 需要讲话的人物
 * @param options 
 */
function thingSpeak(thing: string, options: {hua?: string, soundname?: string, soundSprite?: string, changeThing?: string, callback?: () => void, hide?: boolean} = {}) {
  let thingEle = $(`.sprite${bookNum}.${thing}`);
  const huaEle = $(`.sprite${bookNum}.${options.hua ? options.hua : (thing + '_hua')}`);
  const huaSound = sound[options.soundname ? options.soundname : thing];
  const sprite = options.soundSprite ? options.soundSprite : `p${bookNum}`;
  if (options.changeThing) {
    thingEle = $(`.sprite${bookNum}.${options.changeThing}`);
    imgsTras(thing, options.changeThing);
    proxyTimeout(anim, 800);
  } else {
    anim();
  }
  function anim() {
    animThingShake(thingEle);
    if (huaEle.length) {
      animSpeakBoxScale(huaEle);
    }
    if (options.soundname == 'none') {
      return;
    }
    huaSound.play(sprite);
    huaSound.once('end', () => {
      thingTweens.shake.stop();
      if (options.hide) animSpeakBoxScale(huaEle, true);
      if (options.callback) options.callback();
    });
  }
}

/** */
function imgsTras(class1: string, class2: string, traitionTime: number = 800, callback?: () => void) {
  let coords = { opacity: 1 };
  let ele1 = $(`.slide${bookNum} .${class1}`);
  let ele2 = $(`.slide${bookNum} .${class2}`);
  ele1.css('opacity', 1);
  ele1.show();
  ele2.css('opacity', 0);
  ele2.show();
  let tween = new Tween(coords)
    .to({ opacity: 0 }, traitionTime)
    // .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate(() => {
      ele1.css('opacity', coords.opacity);
      ele2.css('opacity', 1 - coords.opacity);
    }).onComplete(() => {
      if (callback) callback();
    }).start();
  tweens.add(tween);
  return tween;
}

/** */
function addBookSlideData() {
  let slides = [];
  for (let i = 0;i < book.length;i++) {
    let content = '';
    let imgUrlPre = `./src/${bookNum}/ch1/`;
    let imgsHtml = '';
    let pangbaiHtml = '';
    for (const key in book[i].imgs) {
      const data = book[i].imgs[key];
      imgsHtml += `<div class="${key} sprite${i+1}" style="left: ${data.x}px;top: ${data.y}px;display: ${data.hide ? 'none' : 'block'};"></div>`;
    }
    for (let j = 0;j < book[i].pangbais.length;j++) {
      let pos = book[i].pangbais[j].pos;
      pangbaiHtml += `
        <div class="pangbai${j+1} pangbaia" style="top:${pos.y}px;left:${pos.x}px;">
          <div class="pangbai${j+1}a sprite${i+1}"></div>
        </div>
        <div class="pangbai${j+1} pangbaib pangbai${j+1}b sprite${i+1}"  style="top:${pos.y}px;left:${pos.x}px;"></div>
      `
    }
    content += 
    `<div class="wrap slide${i+1}">
      <img src="${imgUrlPre}${i+1}/bg.png" class="bg">
      <div class="laba"></div>
      <div class="expandbtn"></div>
      <div class="imgs">${imgsHtml}</div>
      <div class="pangbai">${pangbaiHtml}</div>
    </div>`;
    slides.push({content, imgs: imgsHtml});
  }
  bookSlideData = slides;
}

function quesAppend() {
  $('.ansbox').removeClass('ok no');
  $(`.ansbox${quesOks[quesIndex]}`).addClass('ok');
  $('.ansbox .spriteq').remove();
  $('.queswrap .spriteq').remove();
  $('.ansbox').eq(0).append(`<div class="spriteq ans${quesIndex+1}1"></div>`);
  $('.ansbox').eq(1).append(`<div class="spriteq ans${quesIndex+1}2"></div>`);
  $('.queswrap').append(`<div class="spriteq ques${quesIndex+1}"></div>`);
  $('.ui').hide();
  quesIndex++;
  sound.maimai.off('end');
  sound.maimai.play(`ques${quesIndex}`);
  sound.maimai.once('end', () => {
    proxyTimeout(() => {
      sound.maimai.play(`ans${quesIndex}1`);
      scaleAnim($('.ansbox1'), {scale2: 1.08,animTime: 350});
    }, 700);
    sound.maimai.once('end', () => {
      proxyTimeout(() => {
        sound.maimai.play(`ans${quesIndex}2`);
        scaleAnim($('.ansbox2'), {scale2: 1.08,animTime: 350});
      }, 700);
    });
  });
}

(function() {
  let data = {
    card1: [2300, 3564],
    card2: [4650, 6000],
    card3: [6800, 8333],
    card4: [9200, 10538],
    ques1: [19354, 21988],
    ans11: [22505, 23469],
    ans12: [24000, 25000],
    ques2: [26000, 29829],
    ans21: [30569, 31636],
    ans22: [32067, 33252],
    ques3: [35000, 39200],
    ans31: [39937, 40482],
    ans32: [41000, 42000],
    ques4: [42800, 44800],
    ans41: [45490, 46555],
    ans42: [47137, 48955],
    ques5: [50130, 53246],
    ans51: [54200, 55000],
    ans52: [56875, 57783],
    record1: [59273, 66335],
    record2: [67643, 74855]
  };
  let sprite = {};
  for (let key in data) {
    sprite[key] = [data[key][0], data[key][1] - data[key][0]];
  }
  sound.maimai = new Howl({
    src: `./src/1/music/maimai.mp3`,
    sprite,
    onplayerror() {
      sound.maimai.once('unlock', () => {
        // sound.maimai.play();
      });
    }
  });
})();

interface titles {
  appear(): void;
  hide(): void;
}
let titles = new Game() as Game & titles;
titles.resource = {
  card1: {
    type: 'spine',
    path: './src/1/',
    data: {x: 720, y: 415, visible: false, mix: 0.3}
  },
  card2: {
    type: 'spine',
    data: {x: 720, y: 420, visible: false, mix: 0.3}
  },
  card3: {
    type: 'spine',
    data: {x: 720, y: 410, visible: false, mix: 0.3}
  },
}
titles.load = function() {
  this.load = null;
  titles.loadResource(titles.resource, titles.stage, () => {
    jiesuan.load();
  });
  $('#titles').append(titles.renderer.view);
}
titles.appear = function() {
  $('#titles').show();
  $('#titles').css('height', chLevel == 1 ? '60%' : '100%');
  animates._add('titles');
  let card = <PIXI.spine.Spine>titles.$(`card${chLevel}`);
  // card.lastTime = 0;
  card.visible = true;
  card.state.setAnimation(0, 'idle', false);
  card.state.addAnimation(0, 'idle2', true, 0);
}
titles.hide = function() {
  $('#titles').hide();
  if (titles.$(`card${chLevel}`)) {
    titles.$(`card${chLevel}`).visible = false;
  }
  animates._remove('titles');
}
titles.load();