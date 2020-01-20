interface Recorder {
  buffers: unknown;
  /**
   * 请求打开录音资源，如果浏览器不支持录音、用户拒绝麦克风权限、或者非安全环境（非https、file等）将会调用fail；打开后需要调用close来关闭，因为浏览器或设备的系统可能会显示正在录音。
   */
  open: (success?: () => void,fail?: (errMsg: Error,isUserNotAllow: boolean) => void) => void;
  /**开始录音，需先调用open；最佳实践为：每次调用start前都调用一次open以达到最佳的兼容性，录音stop后调用close进行关闭。 */
  start: () => void;
  /**
   * 结束录音并返回录音数据blob对象
   * @param {Function} success(blob, duration) 录音成功回调
   * @param {Function} fail(errMsg)：录音出错回调
   * @param {Boolean} autoClose 是否自动调用close，默认为false不调用
   */
  stop: (success?: (blob: Blob, duration: number) => void, fail?: (errMsg: Error) => void, autoClose?: boolean) => void;
  /** 关闭释放录音资源 */
  close: (success?: () => void) => void;
  /** 暂停录音 */
  pause: () => void;
  /** 恢复继续录音 */
  resume: () => void;
  /** 模拟一段录音数据，后面可以调用stop进行编码。需提供pcm数据[Int16,...]，和pcm数据的采样率。 */
  mock: (pcmData: any, pcmSampleRate: number) => void;
}

declare function Recorder(set?: { type?: string, bitRate?: number, sampleRate?: number, bufferSize?: number, onProcess?: () => void;
}): Recorder;
/** 录音 https://github.com/xiangyuecn/Recorder */
declare namespace Recorder {
  /** 判断浏览器是否支持录音，随时可以调用。注意：仅仅是检测浏览器支持情况，不会判断和调起用户授权（rec.open()会判断用户授权），不会判断是否支持特定格式录音。 */
  const Support: () => boolean;
  /** 由于Recorder持有的录音资源是全局唯一的，可通过此方法检测是否有Recorder已调用过open打开了录音功能。 */
  const IsOpen: () => boolean;
  /** 对pcm数据的采样率进行转换。 */
  const SampleData: (pcmDatas,pcmSampleRate,newSampleRate,prevChunkInfo) => unknown;
}
/** 工具函数 */
declare namespace _ {
  /** 对指定对象进行浅复制。 */
  const clone: (obj: object) => object;
  /** 深复制。 */
  const deepClone: (obj: object) => object;
  /** 检查值是否是数组类型。 */
  const isArr: (val: any) => boolean;
  /** 检查值是否是类数组对象。 */
  const isArrLike: (val: any) => boolean;
  /** 检查值是否是 DOM 元素。 */
  const isEl: (val: any) => boolean;
  /** 检查值是否是函数。 */
  const isFn: (val: any) => boolean;
  /** 检测值是否是数字类型。 */
  const isNum: (val: any) => boolean;
  /** 检查值是否是对象。 */
  const isObj: (val: any) => boolean;
  /** 检查值是否是 undefined。 */
  const isUndef: (val: any) => boolean;
  /** 返回包含对象自身可遍历所有键名的数组。 */
  const keys: (val: object) => string[];
  /** 安卓或ios */
  const detectOs: () => 'android' | 'ios' | 'windows' | 'linux';
  /** uuid */
  const uuid: () => string;
  /** 随机数 */
  const random: (min: number, max: number, floating?: boolean) => number;
  namespace Url {
    interface IUrl {
      protocol: string;
      auth: string;
      hostname: string;
      hash: string;
      query: any;
      port: string;
      pathname: string;
      slashes: boolean;
    }
  }
  class Url {
    protocol: string;
    auth: string;
    hostname: string;
    hash: string;
    query: {[x: string]: string};
    port: string;
    pathname: string;
    slashes: boolean;
    constructor(url?: string);
    setQuery(name: string, value: string): Url;
    setQuery(query: { [name: string]: string }): Url;
    rmQuery(name: string | string[]): Url;
    toString(): string;
    static parse(url: string): Url.IUrl;
    static stringify(object: Url.IUrl): string;
  }
}

interface ZeptoCollection {
  /** 元素是否显示 */
  isShow: () => boolean;
}

interface ObjectConstructor {
  assign(...objects: Object[]): Object;
}

/** 微信 */
declare namespace wx {
  /** 小程序 */
  const miniProgram: {
    postMessage(data: {[x: string]: any}): void;
    navigateBack(): void;
  }
}

/** swiper过度动画 */
interface SwiperTransition {
  // 过渡动画名称，目前提供了 5 种过渡动画
  name?: 'slide' | 'rotate' | 'flip' | 'card' | 'fade';
  // 过渡动画时长，单位为 ms
  duration?: Number;
  // 只允许滑动方向 1: 后向，-1: 前向，0:双向禁止滑动，默认为 undefined，即不限制任何方向的滑动
  direction?: 1 | -1 | 0;
}

declare class Swiper {
  constructor(options: {
    container?: Element;
    data?: { content: string; transition?: SwiperTransition }[];
    keepDefaultClasses?: string[];
    isVertical?: boolean;
  });
  transition: SwiperTransition;
  sideLength: number;
  swipeTo(toIndex: number, transition?: SwiperTransition): void;
  swipePrev(transition?: SwiperTransition): void;
  swipeNext(transition?: SwiperTransition): void;
  getCurrentIndex(): number;
  on(eventName: 'swipeStart' | 'swipeMoving' | 'swipeChanged' | 'swipeRestore' | 'swipeRestored' | 'activePageChanged' | 'destroy', listener: (event) => void ): void;
  off(eventName: 'swipeStart' | 'swipeMoving' | 'swipeChanged' | 'swipeRestore' | 'swipeRestored' | 'activePageChanged' | 'destroy', listener: (event) => void ): void;
}

declare namespace MMD {
  class VideoPlayer {
    src: string;
    paused: boolean;
    muted: boolean;
    currentTime: number;
    currentTimeAndPlay: number;
    currentTimeAndPause: number;
    constructor(options: {
      videoElement: Element;
      src: string;
      loop?: boolean;
      muted?: boolean;
      poster?: string;
      tryMultipleVideoPlayAtTheSameTime?: boolean;
      timesParam?: {name: string, time: number}[];
      onTimes?(name?: string): void;
      onStart(): void;
      onEnd(): void;
    });
    play(): void;
    pause(): void;
  }
}