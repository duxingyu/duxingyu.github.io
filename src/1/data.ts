let book = [
  {
    imgs: {
      zhuma: {x: 238, y: 234},
      zhuma_1: {x: 238, y: 234, hide: true},
      zhu3: {x: 637, y: 255},
      zhu3_1: {x: 637, y: 255, hide: true},
      zhu2: {x: 850, y: 192},
      zhu2_1: {x: 850, y: 192, hide: true},
      zhu1: {x: 1009, y: 307},
      zhu1_1: {x: 1009, y: 307, hide: true},
      zhuozi: {x: 270, y: 293},
      zhuma_hua: {x: 230, y: 137, hide: true},
      zhu1_hua: {x: 1100, y: 234, hide: true},
      zhu2_hua: {x: 831, y: 187, hide: true},
      zhu3_hua: {x: 551, y: 195, hide: true},
    },
    pangbais: [
      {
        pos: {x: 297, y: 10},
        size: [
          {x0: 42, x: 266, ta: 3468, tb: 6234},
          {x: 556, ta: 6971, tb: 9329},
          {x0: 612, x: 727, ta: 9795, tb: 10871},
          {x: 967, ta: 11492, tb: 13754}
        ]
      },
      {
        pos: {x: 208, y: 75},
        size: [
          {x: 142, ta: 13754, tb: 15167},
          {x: 513, ta: 15932, tb: 20232, expand: true}
        ]
      }
    ],
    sounds: {
      pangbai: [3468, 20232],
      zhuma: [883, 4707],
      zhu1: [1500, 2143],
      zhu2: [1675, 2332],
      zhu3: [506, 1659]
    },
    expand1() {
      thingSpeak('zhuma', {changeThing: 'zhuma_1'});
      proxyTimeout(thingSpeak, 4200, 'zhu1', {changeThing: 'zhu1_1'});
      proxyTimeout(thingSpeak, 5400, 'zhu2', {changeThing: 'zhu2_1'});
      proxyTimeout(thingSpeak, 6600, 'zhu3', {changeThing: 'zhu3_1'});
    }
  },
  {
    imgs: {
      caodui: {x: 204, y: 110},
      daocaofang: {x: 200, y: 120, hide: true},
      zhu3: {x: 910, y: 266},
      zhu3_1: {x: 910, y: 266, hide: true},
      // zhu1: {x: 770, y: 302},
      zhu1_1: {x: 770, y: 302},
      zhu2: {x: 1049, y: 300},
      zhu2_1: {x: 1049, y: 300, hide: true},
      zhu1_hua: {x: 608, y: 240, hide: true},
      zhu1_hua2: {x: 608, y: 240, hide: true},
    },
    pangbais: [
      {
        pos: {x: 297, y: 10},
        size: [
          // {x: 392, ta: 21963, tb: 26853, expand: true},
          {x: 392, ta: 21963, tb: 26853},
          {x: 601, ta: 28441, tb: 29831},
          {x0: 659, x: 852, ta: 30116, tb: 32109},
          {x: 973, ta: 32846, tb: 33934},
        ]
      },
      {
        pos: {x: 208, y: 88},
        size: [
          {x: 116, ta: 33934, tb: 34989, expand: true},
        ]
      }
    ],
    sounds: {
      // pangbai: [[21963, 26853], [28441, 34989]],
      pangbai: [[21963, 34989]],
      zhu1: [2600, 4817],
      zhu1bu: [337, 2648]
    },
    // expand1() {
    //   thingSpeak('zhu1', {hide: true});
    //   proxyTimeout(imgsTras, 2000, 'zhu1', 'zhu1_1');
    //   proxyTimeout(imgsTras, 3000, 'caodui', 'daocaofang', 1500);
    //   proxyTimeout(() => {
    //     // sound.pangbai.play('p2_2');
    //     // pangbaiPlay(0, 1);
    //     thingSpeak('zhu1_1', {hua: 'zhu1_hua2', soundname: 'zhu1bu'});
    //     imgsTras('zhu2', 'zhu2_1');
    //     imgsTras('zhu3', 'zhu3_1', 1000);
    //   }, 5300);
    // },
    expand1() {
      thingSpeak('zhu1_1', {hua: 'zhu1_hua2', soundname: 'zhu1bu'});
      imgsTras('zhu2', 'zhu2_1');
      imgsTras('zhu3', 'zhu3_1', 1000);
    },
    expand2() {
      proxyTimeout(imgsTras, 4890, 'caodui', 'daocaofang', 1500);
    }
  },
  {
    imgs: {
      mutou: {x: 267, y: 315},
      muwu: {x: 360, y: 60, hide: true},
      zhu2: {x: 840, y: 335},
      zhu2_1: {x: 840, y: 308, hide: true},
      zhu3: {x: 1046, y: 328},
      zhu3_1: {x: 1046, y: 328, hide: true},
      zhu2_hua: {x: 680, y: 235, hide: true},
      zhu2_hua2: {x: 856, y: 258, hide: true},
    },
    pangbais: [
      {
        pos: {x:297, y: 10},
        size: [
          // {x0: 42, x: 466, ta: 36207, tb: 40685, expand: true},
          {x0: 48, x: 484, ta: 36207, tb: 40685},
          {x: 794, ta: 41743, tb: 44349},
          {x: 917, ta: 45079, tb: 45982}
        ]
      },
      {
        pos: {x: 208, y: 88},
        size: [
          {x: 136, ta: 45982, tb: 47612, expand: true}
        ]
      }
    ],
    sounds: {
      // pangbai: [[36207, 40685], [41743, 47612]],
      pangbai: [[36207, 47612]],
      zhu2: [3183, 5783],
      zhu2bu: [597, 3328]
    },
    // expand1() {
    //   thingSpeak('zhu2', {hide: true}),
    //   proxyTimeout(imgsTras, 2700, 'mutou', 'muwu', 1500);
    //   proxyTimeout(() => {
    //     imgsTras('zhu3', 'zhu3_1', 1000);
    //     thingSpeak('zhu2', {soundname: 'zhu2bu', hua: 'zhu2_hua2', changeThing: 'zhu2_1'});
    //     // sound.pangbai.play('p3_2');
    //     // pangbaiPlay(0, 1);
    //   }, 4200);
    // },
    expand1() {
      // imgsTras('zhu2', 'zhu2_1');
      imgsTras('zhu3', 'zhu3_1', 1000);
      thingSpeak('zhu2', {soundname: 'zhu2bu', hua: 'zhu2_hua2', changeThing: 'zhu2_1'});
    },
    expand2() {
      proxyTimeout(imgsTras, 4478, 'mutou', 'muwu', 1500);
    }
  },
  {
    imgs: {
      qiang: {x: 659, y: 266},
      fangzi: {x: 656, y: 110, hide: true},
      zhu3: {x: 569, y: 345},
      zhu3_1: {x: 557, y: 345, hide: true},
      zhu3_hua: {x: 345, y: 280, hide: true},
      zhu3_hua2: {x: 480, y: 280, hide: true}
    },
    pangbais: [
      {
        pos: {x: 297, y: 10},
        size: [
          // {x0: 48, x: 381, expand: true, ta: 49031, tb: 52192},
          {x0: 48, x: 381, ta: 49031, tb: 52192},
          {x: 542, ta: 53192, tb: 54495},
          {x: 754, ta: 54958, tb: 56837},
          {x: 957, ta: 57364, tb: 59136}
        ]
      },
      {
        pos: {x: 208, y: 75},
        size: [
          {x: 313, expand: true, ta: 59136, tb: 62175}
        ]
      }
    ],
    sounds: {
      // pangbai: [[49031, 52192], [53192, 62175]],
      pangbai: [[49031, 62175]],
      zhu3: [3073, 5763],
      zhu3bu: [305, 2527]
    },
    // expand1() {
    //   thingSpeak('zhu3', {
    //     hide: true,
    //     callback() {
    //       imgsTras('qiang', 'fangzi', 1500, () => {
    //         // sound.pangbai.play('p4_2');
    //         // pangbaiPlay(0, 1);
    //         thingSpeak('zhu3', {hua: 'zhu3_hua2', soundname: 'zhu3bu', changeThing: 'zhu3_1'});
    //       });
    //     }
    //   });
    // },
    expand1() {
      thingSpeak('zhu3', {hua: 'zhu3_hua2', soundname: 'zhu3bu', changeThing: 'zhu3_1'});
    },
    expand2() {
      proxyTimeout(imgsTras, 3160, 'qiang', 'fangzi', 1500);
    }
  },
  {
    imgs: {
      pao3: {x: 702, y: 321},
      pao1: {x: 907, y: 313},
      pao2: {x: 835, y: 393},
      lang: {x: 240, y: 190},
      lang_1: {x: 240, y: 190, hide: true},
      lang_hua: {x: 470, y: 168, hide: true}
    },
    pangbais: [
      {
        pos: {x: 297, y: 10},
        size: [
          {x: 326, ta: 64434, tb: 67672},
          {x: 460, ta: 68000, tb: 69230},
          {x: 824, ta: 69848, tb: 72417},
          {x: 948, ta: 73290, tb: 74516}
        ]
      },
      {
        pos: {x: 208, y: 88},
        size: [
          {x: 333, ta: 74516, tb: 77707},
          {x: 808, expand: true, ta: 79290, tb: 83305}
        ]
      }
    ],
    sounds: {
      pangbai: [64434, 83305],
      lang: [802, 5837]
    },
    expand1() {
      thingSpeak('lang', {changeThing: 'lang_1'});
    }
  },
  {
    imgs: {
      zhu1: {x: 808, y: 340},
      zhu1_1: {x: 808, y: 340, hide: true},
      zhu1_hua: {x: 610, y: 160, hide: true},
      lang: {x: 320, y: 210}
    },
    pangbais: [
      {
        pos: {x: 297, y: 10},
        size: [
          {x0: 47, x: 300, ta: 84955, tb: 87347},
          {x: 527, ta: 87908, tb: 89396},
          {x: 711, ta: 90286, tb: 91766},
          {x: 965, ta: 92500, tb: 95363}
        ]
      },
      {
        pos: {x: 208, y: 75},
        size: [
          {x: 33, ta: 95363, tb: 95768},
          {x: 194, expand: true, ta: 96280, tb: 98200}
        ]
      }
    ],
    sounds: {
      pangbai: [84955, 98200],
      zhu1: [5734, 8074]
    },
    expand1() {
      thingSpeak('zhu1', {changeThing: 'zhu1_1'});
    }
  },
  {
    pangbaibu: true,
    imgs: {
      lang: {x: 533, y: 154},
      zhu1: {x: 180, y: 296},
      zhu1_1: {x: 180, y: 296, hide: true},
      zhu2: {x: 898, y: 315},
      zhu2_1: {x: 898, y: 315, hide: true},
      zhu1_hua: {x: 460, y: 300, hide: true},
      zhu2_hua: {x: 736, y: 237, hide: true}
    },
    pangbais: [
      {
        pos: {x: 297, y: 10},
        size: [
          {x: 284, ta: 852, tb: 3591},
          {x: 447, ta: 4357, tb: 5463},
          {x: 522, ta: 6240, tb: 6842},
          {x: 720, ta: 7250, tb: 8845},
          {x: 895, ta: 9556, tb: 11308}
        ]
      },
      {
        pos: {x: 208, y: 75},
        size: [
          {x: 233, expand: true, ta: 11308, tb: 12982}
        ]
      }
    ],
    sounds: {
      pangbaibu: [852, 12982],
      zhu1: [9074, 11708],
      zhu2: [7100, 10418],
    },
    expand1() {
      thingSpeak('zhu2', {
        changeThing: 'zhu2_1',
        callback() {
          thingSpeak('zhu1', {changeThing: 'zhu1_1'})
        }
      })
    }
  },
  {
    pangbaibu: true,
    imgs: {
      lang: {x: 152, y: 185},
      zhu1: {x: 890, y: 238},
      zhu2: {x: 890, y: 371}
    },
    pangbais: [
      {
        pos: {x: 297, y: 10},
        size: [
          {x: 316, ta: 14109, tb: 16828},
          {x: 394, ta: 17535, tb: 18056},
          {x0: 452, x: 616, ta: 18261, tb: 20189},
          {x: 830, ta: 20835, tb: 23102}
        ]
      }
    ],
    sounds: {
      pangbaibu: [14109, 23102]
    }
  },
  {
    pangbaibu: true,
    imgs: {
      lang: {x: 268, y: 150},
      lang_1: {x: 268, y: 150, hide: true},
      zhu2: {x: 776, y: 235},
      zhu2_1: {x: 776, y: 235, hide: true},
      zhu1: {x: 720, y: 368},
      zhu1_1: {x: 720, y: 368, hide: true},
      suduxian: {x: 0, y: 0},
      lang_hua: {x: 286, y: 413, hide: true},
      zhu12_hua: {x: 938, y: 174, hide: true}
    },
    pangbais: [
      {
        pos: {x: 297, y: 10},
        size: [
          {x0: 45, x: 543, ta: 23989, tb: 28932},
          {x: 616, ta: 29690, tb: 30258},
          {x: 897, expand: true, ta: 30512, tb: 33811}
        ]
      }
    ],
    sounds: {
      pangbaibu: [23989, 33811],
      lang: [6719, 9909],
      zhu12he: [200, 1973]
    },
    expand1() {
      thingSpeak('lang', {
        callback() {
          thingSpeak('zhu2', {soundname: 'none', changeThing: 'zhu2_1'});
          thingSpeak('zhu1', {soundname: 'zhu12he', hua: 'zhu12_hua', changeThing: 'zhu1_1', callback() {
            tweens.clear();
          }});
        }
      })
    }
  },
  {
    pangbaibu: true,
    imgs: {
      lang: {x: 650, y: 280},
      zhu1: {x: 626, y: 418},
      zhu2: {x: 494, y: 413},
      zhu3: {x: 700, y: 433}
    },
    pangbais: [
      {
        pos: {x: 297, y: 10},
        size: [
          {x: 353, ta: 34524, tb: 38361},
          {x: 774, ta: 38922, tb: 41944}
        ]
      }
    ],
    sounds: {
      pangbaibu: [34524, 41944]
    }
  },
  {
    pangbaibu: true,
    imgs: {
      lang: {x: 290, y: 210},
      lang_1: {x: 570, y: 185, hide: true},
      zhu1: {x: 890, y: 228},
      zhu3: {x: 1060, y: 270},
      zhu3_1: {x: 1060, y: 270, hide: true},
      zhu2: {x: 900, y: 357},
      fangkuang: {x: 669, y: 0},
      lang_hua: {x: 350, y: 157, hide: true},
      zhu3_hua: {x: 804, y: 165, hide: true}
    },
    pangbais: [
      {
        pos: {x: 297, y: 10},
        size: [
          {x0: 44, x: 350, ta: 43263, tb: 46168},
          {x: 539, ta: 46800, tb: 48458},
          {x: 855, expand: true, ta: 49475, tb: 52554}
        ]
      }
    ],
    sounds: {
      pangbaibu: [43263, 52554],
      lang: [10530, 13420],
      zhu3: [7230, 11229]
    },
    expand1() {
      thingSpeak('lang', {changeThing: 'lang_1', callback() {
        thingSpeak('zhu3', {changeThing: 'zhu3_1'});
      }});
    }
  },
  {
    pangbaibu: true,
    imgs: {
      lang: {x: 400, y: 150},
      lang_1: {x: 636, y: 150, hide: true},
      lang_hua: {x: 824, y: 157, hide: true}
    },
    pangbais: [
      {
        pos: {x: 297, y: 10},
        size: [
          {x0: 44, x: 313, ta: 54000, tb: 56845},
          {x: 644, ta: 57814, tb: 60467},
          {x: 964, ta: 61076, tb: 63319}
        ]
      },
      {
        pos: {x: 208, y: 88},
        size: [
          {x: 140, ta: 63319, tb: 64503, expand: true}
        ]
      }
    ],
    sounds: {
      pangbaibu: [54000, 64503],
      langbu: [1620, 5708]
    },
    expand1() {
      thingSpeak('lang', {soundname: 'langbu', changeThing: 'lang_1'})
    }
  },
  {
    pangbaibu: true,
    imgs: {
      shaokai: {x: 541, y: 0},
      lang: {x: 650, y: 220, hide: true},
      yancongqian: {x: 541, y: 0, hide: true},
      zhu3: {x: 414, y: 373},
      zhu3_1: {x: 414, y: 373, hide: true},
      zhu2: {x: 881, y: 392},
      zhu1: {x: 1000, y: 420},
      lang_hua: {x: 688, y: 150, hide: true},
      zhu3_hua: {x: 225, y: 278, hide: true}
    },
    pangbais: [
      {
        pos: {x: 297, y: 10},
        size: [
          {x: 318, ta: 65261, tb: 67607},
          {x: 737, ta: 68368, tb: 71217},
          {x: 974, ta: 71720, tb: 74016}
        ]
      },
      {
        pos: {x: 208, y: 88},
        size: [
          {x: 115, expand: true, ta: 74016, tb: 74930}
        ]
      }
    ],
    sounds: {
      pangbaibu: [65261, 74930],
      zhu3: [11595, 13925],
      lang: [14100, 16625]
    },
    expand1() {
      $('.sprite13.lang').show();
      $('.sprite13.yancongqian').show();
      proxyTimeout(thingSpeak, 800, 'lang', {callback() {
        thingSpeak('zhu3', {changeThing: 'zhu3_1'})
      }})
    }
  },
  {
    imgs: {
      zhu2: {x: 810, y: 340},
      zhu1: {x: 990, y: 344},
      zhu3: {x: 925, y: 348},
      lang: {x: 384, y: 300}
    },
    pangbais: [
      {
        pos: {x: 297, y: 10},
        size: [
          {x0: 50, x: 313, ta: 154664, tb: 157367},
          {x: 520, ta: 157781, tb: 159619},
          {x: 947, ta: 160343, tb: 163698}
        ]
      }
    ],
    sounds: {
      pangbai: [154664, 163698]
    }
  },
  {
    pangbaibu: true,
    imgs: {
      zhuma: {x: 466, y: 197},
      zhuma_1: {x: 466, y: 197, hide: true},
      zhu3: {x: 320, y: 320},
      zhu2: {x: 762, y: 245},
      zhu2_1: {x: 770, y: 300, hide: true},
      zhu1: {x: 973, y: 280},
      zhu1_1: {x: 973, y: 280, hide: true},
      zhuma_hua: {x: 380, y: 136, hide: true},
      zhu2_hua: {x: 820, y: 194, hide: true},
      zhu1_hua: {x: 1060, y: 220, hide: true}
    },
    pangbais: [
      {
        pos: {x: 297, y: 20},
        size: [
          {x: 575, ta: 77474, tb: 83091},
          {x: 964, ta: 83823, tb: 88068}
        ]
      },
      {
        pos: {x: 208, y: 78},
        size: [
          {x: 87, ta: 88068, tb: 89029},
          {x: 300, ta: 89566, tb: 91204},
          {x: 387, ta: 92016, tb: 92398},
          {x: 760, ta: 92786, tb: 95928},
          {x: 999, ta: 96415, tb: 98766, expand: true}
        ]
      }
    ],
    sounds: {
      pangbaibu: [77474, 98766],
      zhuma: [6280, 7900],
      zhu2: [11403, 13000],
      zhu1: [13058, 14434]
    },
    expand1() {
      thingSpeak('zhu1', {changeThing: 'zhu1_1', callback() {
        proxyTimeout(thingSpeak, 200, 'zhu2', {changeThing: 'zhu2_1', callback() {
          proxyTimeout(thingSpeak, 200, 'zhuma', {changeThing: 'zhuma_1', callback() {
            proxyTimeout(() => jiesuan.appear(1), 1000);
          }})
        }})
      }})
    }
  }
];
let bookSounds = ['pangbai', 'zhuma', 'zhu1', 'zhu2', 'zhu3', 'zhu1bu', 'zhu2bu', 'zhu3bu', 'lang', 'pangbaibu', 'zhu12he', 'langbu', 'title'];
let quesOks = [1, 2, 1, 1, 2];