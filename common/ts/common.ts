/// <reference path="../../lib/pixi-spine.d.ts" />
/// <reference path="../../lib/howler.d.ts" />
/// <reference path="../../lib/tween.d.ts" />
/// <reference path="../../lib/index.d.ts" />
/// <reference path="../../lib/axios.d.ts" />
/** pixi精灵 */
type sp = PIXI.Sprite | PIXI.spine.Spine;
/** pixi精灵对象属性，用于精灵初始化 */
interface spriteObj {
  /** 横坐标 */
  x?: number,
  /** 纵坐标 */
  y?: number,
  width?: number,
  height?: number,
  /** 是否可见 */
  visible?: boolean,
  /** 资源路径，如：‘./common’ */
  path?: string,
  /** 是否为spine */
  spine?: boolean,
  /** 资源地址，自动生成，不需要传 */
  url?: string,
  /** 资源名, 默认为属性名，如果重复则为属性名 + 1,2,3... */
  name?: string,
  /** 是否可交互 */
  interactive?: boolean,
  /** 旋转 */
  rotation?: number,
  /** 锚点，数组[x, y]， 数字x=y */
  anchor?: number[] | number,
  /** 透明度 0-1 */
  alpha?: number,
  /** 左右翻转 */
  flipX?: boolean,
  /** 上下翻转 */
  flipY?: boolean,
  /** 缩放，数组[x, y]， 数字x=y */
  scale?: number[] | number,
  /** 舞台 */
  stage?: PIXI.Container,
  /** spine动画 */
  anim?: {
    /** 动画名 */
    name: string,
    /** 是否循环 */
    loop: boolean
  },
  /** spine动画速度，默认为1 */
  timeScale?: number,
  /** spine皮肤名 */
  skin?: string,
  /** spine动画混合时间，默认为0 */
  mix?: number,
  /** 回调 */
  callback?: (sp: sp) => void
};
interface resObj {
  /** 资源名 */
  resname?: string;
  path?: string;
  type: 'spine' | 'image' | 'texture';
  data?: spriteObj;
  datas?: spriteObj[];
}
/** 碰撞检测参数 */
interface hitSp {
  x: number,
  y: number,
  width: number,
  height: number
};
/** 是否为pixi精灵 */
function isSp(element: any): element is sp {
  return (<sp>element).interactive !== undefined;
}
/** 是否为spine */
function isSpine(sp: sp): sp is PIXI.spine.Spine {
  return (<PIXI.spine.Spine>sp).spineData !== undefined;
}
/** 是否为数组 */
function isArr(val: any): val is any[] {
  return _.isArr(val);
}
const isPortrait = document.body.clientWidth < document.body.clientHeight; 
/**
 * 适配屏幕尺寸
 */
function setWrapSize(){
  let clientWidth = document.body.clientWidth;
  let clientHeight = document.body.clientHeight;
  if (isPortrait) {
    clientWidth = document.body.clientHeight;
    clientHeight = document.body.clientWidth;
  }
  const wrapper = $('#wrapper');
  let size = clientWidth / clientHeight;
  let width: number,height: number, top: number,left: number;
  // if (size >= 1.33 && size <= 1.34) {
  if (size <= 1.34) {
    width = 1.3 * clientWidth;
    top = 0;
    left = - 0.15 * clientWidth;
    device = 'ipad';
  } else if (size > 1.34 &&　size < 1.8) {
    width = 1.3 * clientWidth;
    left = - 0.15 * clientWidth;
    top = -(1.3 * clientWidth * 1664 / 2880 - clientHeight ) / 2;
  } else if (size >= 1.8) {
    top = - 0.15 * clientHeight;
    width = 1.3 * clientHeight * 2880 / 1664;
    left = -(width - clientWidth) / 2;
  }
  height = 832 * width / 1440;
  let cw = document.documentElement.clientWidth;
  let ch = document.documentElement.clientHeight;
  if (isPortrait) {
    $('body').css({
      width: ch + 'px',
      height: cw + 'px',
      transformOrigin: `${cw/2}px ${cw/2}px`,
      transform: 'rotate(90deg)'
    });
    gameStyle = {
      width: height + 'px',
      height: width + 'px',
      transform: 'rotate(-90deg)',
      transformOrigin: `${height/2}px ${height/2}px`
    }
    $('#game').css(gameStyle)
    // $('#game').css({
    //   width: height + 'px',
    //   height: width + 'px',
    //   transform: 'rotate(-90deg)',
    //   transformOrigin: `${height/2}px ${height/2}px`
    // });
    $('#jiesuan').css({
      width: height + 'px',
      height: width + 'px',
      transform: 'rotate(-90deg)',
      transformOrigin: `${height/2}px ${height/2}px`
    });
    $('#video video').css({
      width: '100vh',
      height: '100vw'
    })
    $('#loading').css({
      width: '100vh',
      height: '100vw'
    })
  } else {
    $('#video video').css({
      width: '100vw',
      height: '100vh'
    })
    $('#loading').css({
      width: '100vw',
      height: '100vh'
    })
  }
  wrapper.css({
    width: width + 'px',
    top: top + 'px',
    left: left + 'px',
    height: height + 'px'
  });
}
/**
 * 缩放动画
 * @param {*} ele 需要缩放动画的元素
 * @param {Object} data 缩放动画配置
 * @param {Number} data.animTime 单个动画时间
 * @param {Number} data.scale1
 * @param {Number} data.scale2
 * @param {Function} data.callback 回调函数
 * @param {Boolean} data.one 只执行scale1 => scale2
 */
function scaleAnim(ele: ZeptoCollection | sp, data: { 
  callback?: (tween: TWEEN.Tween) => void; 
  animTime?: number; 
  scale1?: number; 
  scale2?: number; 
  one?: boolean; 
} = {}) {
  let animTime = data.animTime ? data.animTime : 250;
  let scale1 = data.scale1 ? data.scale1 : 1;
  let scale2 = data.scale2 ? data.scale2 : 0.9;
  let coords = { scale: scale1 };
  let tween = new Tween(coords)
    .to({ scale: scale2 }, animTime)
    .onUpdate(setup).onComplete(() => {
      if (data.one) {
        if (data.callback) {
          data.callback(tween);
        }
        return;
      }
      tween = new Tween(coords)
      .to({ scale: scale1 }, animTime)
      .onUpdate(setup).onComplete(() => {
        if (data.callback) {
          data.callback(tween);
        }
      }).start();
    }).start();
    tweens.add(tween);
  function setup() {
    if (isSp(ele)) {
      ele.scale.set(coords.scale, coords.scale);
    } else {
      ele.css('transform', 'scale(' + coords.scale + ')');
    }
  }
}

/**
 * 添加音乐
 * @param {String[]} sounds 语音名字数组
 * @param {String} path 语音路径
 */
function addSounds(sounds: string[], path: string = '/music/') {
  sounds.forEach((name: string) => {
    let src = Linkpre + path + name + '.mp3';
    sound[name] = new Howl({
      src: src,
      onplayerror() {
        sound[name].once('unlock', () => {
          sound[name].play();
        });
      }
    });
    sound[name]['name'] = name;
  });
}

/**
 * 游戏
 * @constructor
 * @param {Object} attrs 
 * @param {Number} attrs.width
 * @param {Number} attrs.height
 * @param {String} attrs.path 资源路径
 * @param {String} attrs.store 资源存储名 gameDatas[store]
 */
class Game {
  renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
  /** 资源对象数组 */
  resource: {[x: string]: resObj};
  /** 舞台 */
  stage: PIXI.Container;
  /** 资源路径 */
  path: string = `${Linkpre}common`;
  /** 是否加载完成 */
  loaded: boolean = false;
  /** 加载资源 */
  load: () => void;
  /** 游戏初始化 */
  init: () => void;
  /** 游戏开始 */
  start: () => void;
  /** 添加音乐及音乐事件 */
  soundEvent: () => void;
  /** 自定义添加舞台方法 */
  addStage: () => void;
  /** 资源加载完成后回调 */
  loadedCallback: () => void;
  constructor(attrs: { path?: string; height?: number; width?: number; style?: string; } = {}) {
    let width = attrs.width;
    let height = attrs.height;
    if (!width) width = 1440;
    if (!height) height = 832;
    // new PIXI.CanvasRenderer
    this.renderer = PIXI.autoDetectRenderer(width, height, { transparent: true, autoResize: true });
    this.resource = {};
    this.stage = new PIXI.Container();
    this.stage.interactive = true;
    if (attrs.path) this.path = Linkpre + attrs.path;
    this.loaded = false;
  }
  /**
   * 获取sprite
   * @param {String|Number} name sprite名
   * @returns {Object} sprite
   */
  $(name: string | number): sp {
    if (typeof name == 'number') {
      return this.stage.getChildAt(name);
    } else {
      return this.stage.getChildByName(name);
    }
  }
  loadResource(data: {[x: string]: resObj}, stage: '' | PIXI.Container  = '', callback?: () => void) {
    let resources: string[] = [];
    let urls: {name: string, url: string}[] = [];
    let obj: {[x: string]: any} = {};
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (!data[key].resname) {
          resources.push(key);
        }
      }
    }
    for (const key in data) {
      if (data[key].datas) {
        let arr = data[key].datas;
        for (let i = 0;i < arr.length;i++) {
          let onedata = arr[i];
          obj[`${key}${i+1}`] = {
            resname: key,
            type: data[key].type,
            path: data[key].path,
            data: _.clone(data[key].data ? data[key].data : {})
          };
          obj[`${key}${i+1}`].data.name = `${key}${i+1}`;
          Object.assign(obj[`${key}${i+1}`].data, onedata);
        }
      } else {
        obj[key] = data[key];
        obj[key].resname = obj[key].resname ? obj[key].resname : key;
      }
    }
    resources.forEach(val => {
      let sp: resObj = data[val];
      let path = sp.path ? sp.path : this.path;
      let url: string;
      if (sp.type == 'spine') {
        url = `${path}/spine/${val}/${val}.json`;
      } else if (sp.type == 'texture') {
        url = `${path}/${val}.json`;
      } else if (sp.type == 'image') {
        url = `${path}/images/${val}.png`;
      }
      urls.push({
        name: val,
        url: url,
      });
    });
    this.setup(urls, obj, stage, callback);
  }
    /**
   * 资源加载函数
   */
  private setup(urls: {name: string, url: string}[] | string[] | string, obj: any, stage: '' | PIXI.Container, callback: () => void) {
    PIXI.loader.add(urls).load((loader, resources) => {
      for (let attr in obj) {
        spriteSetup(obj[attr], stage, resources);
      }
      this.loaded = true;
      if (callback) callback();
    });
    function spriteSetup(resObj: resObj, stage: '' | PIXI.Container, resources: any ) {
      let sprite: sp;
      let data = resObj.data ? resObj.data : {};
      let appStage = data.stage ? data.stage : stage;
      if (resObj.type == 'spine') {
        sprite = new PIXI.spine.Spine(resources[resObj.resname].spineData);
      } else if (resObj.type == 'image') {
        sprite = new PIXI.Sprite(resources[resObj.resname].texture);
      } else if (resObj.type == 'texture') {
        sprite = new PIXI.Sprite(PIXI.utils.TextureCache[resObj.resname + '.png']);
      }
      sprite.name = data.name ? data.name : resObj.resname;
      data.x = data.x ? data.x : 0;
      data.y = data.y ? data.y : 0;
      if (data.width) sprite.width = data.width;
      if (data.height) sprite.height = data.height;
      sprite.position.set(data.x, data.y);

      if (data.alpha) sprite.alpha = data.alpha;
      if (data.visible !== undefined) sprite.visible = data.visible;
      if (data.interactive) sprite.interactive = true;
      if (data.rotation) sprite.rotation = data.rotation;

      if (data.scale) {
        if (isArr(data.scale)) {
          sprite.scale.set(data.scale[0], data.scale[1]);
        } else {
          sprite.scale.set(data.scale, data.scale);
        }
      }

      if (isSpine(sprite)) {
        let anim = data.anim;
        if (anim) {
          sprite.state.setAnimation(0, anim.name, anim.loop);
        }
        if (data.mix) {
          sprite.state.data.defaultMix = 0.5;
        }
        if (data.timeScale) sprite.state.timeScale = data.timeScale;
        if (data.skin) sprite.skeleton.setSkinByName(data.skin);
        if (data.flipX) sprite.skeleton.scaleX = -1;
        if (data.flipY) sprite.skeleton.scaleY = -1;
      } else {
        if (data.anchor) {
          if (isArr(data.anchor)) {
            sprite.anchor.set(data.anchor[0], data.anchor[1]);
          } else {
            sprite.anchor.set(data.anchor);
          }
        }
      }
    
      if (data.callback) data.callback(sprite);
      if (appStage) {
        appStage.addChild(sprite);
      }
      return sprite;
    }
  }
  /**
   * 代理加载
   */
  proxyLoad() {
    this.load();
    this.soundEvent();
    this.load = null;
    this.soundEvent = null;
  };
}

/**
 * setTimeout代理，参数同setTimeout
 * @param {Function} handler 
 * @param {Number} timeout 
 * @returns {Number} 
 */
function proxyTimeout(handler: TimerHandler, timeout?: number, ...arr): number {
  const timer = setTimeout.apply(null, Array.prototype.slice.call(arguments));
  timers.push(timer);
  return timer;
}
/** 清除tween */
TWEEN.Group.prototype.clear = function() {
  let _tweens = this._tweens;
  Object.keys(this._tweens).forEach(tween => _tweens[tween].stop());
  this.removeAll();
};

$.fn.isShow = function() {
  return this.css('display') !== 'none';
};

/**
 * 碰撞检测
 * @param r1 第一个元素
 * @param r2 第二个元素
 * @returns 是否碰撞
 */
function hitTest(r1: hitSp, r2: hitSp) {
  let hit: boolean, combinedHalfWidths: number, combinedHalfHeights: number, vx: number, vy: number, r1CenterX: number, r1CenterY: number, r1HalfWidth: number, r1HalfHeight: number, r2CenterX: number, r2CenterY: number, r2HalfWidth: number, r2HalfHeight: number;
  hit = false;

  //Find the center points of each sprite
  r1CenterX = r1.x + r1.width / 2;
  r1CenterY = r1.y + r1.height / 2;
  r2CenterX = r2.x + r2.width / 2;
  r2CenterY = r2.y + r2.height / 2;

  //Find the half-widths and half-heights of each sprite
  r1HalfWidth = r1.width / 2;
  r1HalfHeight = r1.height / 2;
  r2HalfWidth = r2.width / 2;
  r2HalfHeight = r2.height / 2;

  //Calculate the distance vector between the sprites
  vx = r1CenterX - r2CenterX;
  vy = r1CenterY - r2CenterY;

  //Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1HalfWidth + r2HalfWidth;
  combinedHalfHeights = r1HalfHeight + r2HalfHeight;

  //Check for a collision on the x axis
  if (Math.abs(vx) < combinedHalfWidths) {

    //A collision might be occuring. Check for a collision on the y axis
    if (Math.abs(vy) < combinedHalfHeights) {

      //There's definitely a collision happening
      hit = true;
    } else {

      //There's no collision on the y axis
      hit = false;
    }
  } else {

    //There's no collision on the x axis
    hit = false;
  }

  //`hit` will be either `true` or `false`
  return hit;
};

/**
 * 显示隐藏过渡动画
 * @param ele zepto元素
 * @param time 过渡时间
 * @param show 是否显示
 */
function transitionShow(ele: ZeptoCollection, time: number, show: boolean) {
  let opacity1 = 0;
  let opacity2 = 1;
  if (!show) {
    opacity1 = 1;
    opacity2 = 0;
  } else {
    ele.css({
      opacity: 0,
      display: 'flex'
    });
  }
  let coords = { opacity: opacity1 };
  let tween = new Tween(coords)
    .to({ opacity: opacity2 }, time)
    .onUpdate(() => ele.css('opacity', coords.opacity))
    .onComplete(() => {
      if (!show) {
        ele.hide();
        ele.css('opacity', 1);
      }
    }).start();
  tweens.add(tween);
}


function rendererResize(game){
  let stage = game.stage;
  let width = 1440;
  let height = 832;
  stage.rotation = Math.PI/2;
  stage.x = height;
  game.renderer.view.style = `width:${width}px;height:${height}px;`;
  game.renderer.resize(height,width);
}