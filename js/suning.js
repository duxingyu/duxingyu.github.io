jsonp('https://lib.suning.com/api/jsonp/cb/sortList_v5-threeSortLoad.jsonp?callback=threeSortLoad');
let allsort = null;

function threeSortLoad(data) {
  allsort = data.allsort;
}
/**
 * allsort
 * nodes(arr)：13, tag: 全部商品分类
 * nodes[0](obj)：modelFullCode：firstNav1
 * nodes[0].nodes: 13
 * nodes[0].nodes[0]：modelFullCode：first1NavName
 * tag: 0,1,2
 * nodes[0].nodes[1]: modelFullCode：first1Navbq
 * tag: 0-6, elementName：brief_nav, linkUrl,picUrl
 * nodes[0].nodes[2]: modelFullCode：first1_logo
 * tag: brand_img
 * nodes[0].nodes[3]: modelFullCode：first1_brands
 * tag: act_img
 * nodes[0].nodes[4]: modelFullCode：fir1_sec_1_list~9
 * nodes[0].tag/无tag: detail_nav:dd>a elementDesc: orange
 * tag: dt/无
 */
function getRootTop(node) {
  let oT = 0;
  do {
    oT += node.offsetTop;
    node = node.offsetParent;
  } while (node.tagName !== 'BODY');
  return oT;
}
const sortAll = document.getElementById('sort_all');
const sortDetail = document.getElementById('sort_detail');
const oT = getRootTop(sortDetail);
let aLi = sortAll.getElementsByTagName('li');
[...aLi].forEach((val, index) => {
  val.addEventListener('mouseenter', () => {
    val.classList.add('f848');
    sortDetail.style.visibility = 'visible';
    sortDetail.dataset.id = index;
    sortDetail.style.top = oT > window.scrollY ? '38px' : window.scrollY - oT + 38 + 'px';
    if (allsort) {
      getBriefNav(index);
      getBrandImg(index);
      getActImg(index);
      getDetailNav(index);
    }
  });
  val.addEventListener('mouseleave', () => {
    val.classList.remove('f848');
  })
});
sortAll.addEventListener('mouseleave', () => {
  sortDetail.style.visibility = 'hidden';
  [...aLi].forEach(v => v.className = '');
}, false);
sortDetail.addEventListener('mouseenter', function() {
  [...aLi].forEach(v => v.className = '');
  aLi[this.dataset.id].classList.add('f848');
}, false);

function getBriefNav(num) {
  const briefNav = document.getElementById('brief_nav').getElementsByTagName('ul')[0];
  let arr = allsort.nodes[num].nodes[1].tag;
  let oHtml = '';
  for (let i = 0; i < arr.length; i++) {
    oHtml += `<li><a href=${arr[i].linkUrl}>${arr[i].elementName}</a></li>`;
  }
  briefNav.innerHTML = oHtml;
}

function getBrandImg(num) {
  const brandImg = document.getElementById('brand_img');
  let arr = allsort.nodes[num].nodes[2].tag;
  let oHtml = '';
  for (let i = 0; i < arr.length; i++) {
    oHtml += `<a href=${arr[i].linkUrl}><img src=https://image.suning.cn${arr[i].picUrl}></a>`;
  }
  brandImg.innerHTML = oHtml;
}

function getActImg(num) {
  const actImg = document.getElementById('act_img');
  let arr = allsort.nodes[num].nodes[3].tag;
  let oHtml = '';
  for (let i = 0; i < arr.length; i++) {
    oHtml += `<a href=${arr[i].linkUrl}><img src=https://image.suning.cn${arr[i].picUrl}></a>`;
  }
  actImg.innerHTML = oHtml;
}

function getDetailNav(num) {
  const detailNav = document.getElementById('detail_nav');
  let arr = allsort.nodes[num].nodes;
  let oHtml = '';

  for (let i = 4; i < arr.length; i++) {
    if (!arr[i].tag) {
      continue;
    }
    let dtname = arr[i].tag[0];
    oHtml += `<dl class="clear"><dt><a href=${dtname.linkUrl}>${dtname.elementName}</a></dt><dd>`;
    let ddname = arr[i].nodes[0].tag;

    if (!arr[i].nodes[0].tag) {
      continue;
    }
    for (let j = 0; j < ddname.length; j++) {
      oHtml += `<a href=${ddname[j].linkUrl} class=${ddname[j].elementDesc}>${ddname[j].elementName}</a>`;
    }
    // console.log(arr[i].tag[0])
    oHtml += '</dd></dl>';
  }
  detailNav.innerHTML = oHtml;
}
// allsort.nodes[0].nodes[4].nodes[0].tag
let homepage = document.getElementById('home_page');
let oT1 = getRootTop(homepage);

function lazyload184362(data) {
  homepage.innerHTML = data.data.replace(/\<script type=\"text\/html\"\>(\W+.+\W+.+\W\W)\<\/script\>/g, '$1').replace(/(\/\/image)/g, 'https:$1');
  [...homepage.getElementsByTagName('img')].forEach(val => {
    if (!val.src) {
      val.src = val.getAttribute('lazy-src')
    }
  });
}

// 放心去喜欢

function lazyLoad1() {
  if (window.scrollY + 300 >= oT1) {
    jsonp('https://lib.suning.com/homepage/model/homepage1_184362_lazyload184362.json?callback=lazyload184362');
    window.removeEventListener('scroll', lazyLoad1, false);
    lazyLoad1 = null;
  }

}
window.addEventListener('scroll', lazyLoad1, false);

document.getElementById('home_page').baseURI = 'https:';

// 精选好货

function hhCb(data) {
  const jxhh = document.querySelector('#jxhh .content_list');
  const aLink = jxhh.getElementsByTagName('a');
  let d = data.sugGoods[0].skus;
  [...aLink].forEach((val, index) => {
    val.href = `https://news.suning.com/ditem.html?contentId=${d.contentId}`;
    val.children[0].innerHTML = d[index].txtDes;
    val.children[1].src = `https://image.suning.cn/uimg/b2c/qrqm/${d[index].vendorId}${d[index].sugGoodsCode}_200x200.jpg?ver=${d[index].picVersion}`;
  });
}
jsonp('https://tuijian.suning.com/recommend-portal/dyBase.jsonp?u=&c=148836310511822991&cityId=010&sceneIds=10-64&count=6&callback=hhCb');
// contentId: "8914086244"
// handwork: "5_10-64_14_A"
// picVersion: "2013"
// price: "3399.00"
// promotionId: "4867201"
// sugGoodsCode: "000000000124390823"
// sugType: ""
// txtDes: "海尔多门无霜冰箱"
// vendorId: "0000000000"
// //image.suning.cn/uimg/b2c/qrqm/0000000000000000000124390823_200x200.jpg?ver=2013
//news.suning.com/ditem.html?contentId=8914086244

// 为您推荐

jsonp('https://tuijian.suning.com/recommend-portal/recommendv2/biz.jsonp?&u=&c=148836310511822991&cityId=358&sceneIds=9-7&count=10&callback=recommandListSix');

function recommandListSix(data) {
  const wntj = document.getElementById('wntj').getElementsByTagName('ul')[0];
  let d = data.sugGoods[0].skus;
  let oHtml = '';

  for (let i = 0; i < 6; i++) {
    let di = d[i];
    let nam = di.sugGoodsName;
    let cod = di.sugGoodsCode;
    let dia = `<a href="https://product.suning.com/${di.vendorId}/${cod.substring(9)}.html?srcPoint=index3_none_rectopcnxh_1-1_p_0000000000_102878794_01A_4-2_0_A&src=index3_none_rectopcnxh_1-1_p_0000000000_102878794_01A_4-2_0_A" title="${nam}">`;
    oHtml +=
      `<li class="item">
        ${dia}
          <img alt="${nam}" src="https://image.suning.cn/uimg/b2c/newcatentries/${di.vendorId}-${cod}_1_160x160.jpg">
        </a>
        <p>${dia}${nam}</a></p>
        <span><i>￥</i><em>${di.price}</em></i></span>
      </li>`;
  }
  wntj.innerHTML = oHtml;
}

// F1 服装百货

jsonp('https://lib.suning.com/homepage/model/homepage1_184374_lazyload184374.json?callback=lazyload184374');

function lazyload184374(data) {
  const floor1 = document.getElementsByClassName('floor_main')[0];
  floor1.innerHTML += data.data;
  let aPic = floor1.getElementsByTagName('img');
  let aP = floor1.getElementsByTagName('p');
  [...aPic].forEach(val => {
    if (val.getAttribute('lazy-src')) {
      val.src = 'https:' + val.getAttribute('lazy-src');
    }
    if (val.getAttribute('d-src')) {
      val.src = 'https:' + val.getAttribute('d-src');
    }
  });
  for (let attr of aP) {
    if (attr.getAttribute('d-content')) {
      attr.innerHTML = attr.getAttribute('d-content');
    }
  }
}
jsonp('https://tuijian.suning.com/recommend-portal/recommendv2/biz.jsonp?&u=&c=148836310511822991&cityId=9252&sceneIds=12-14&count=48&callback=recommandAll');

function recommandAll(data) {
  const recommandList = document.getElementById('recommand_list');
  let d = data.sugGoods[0].skus;
  let oHtml = '';

  for (let i = 0; i < d.length; i++) {
    let di = d[i];
    let nam = di.sugGoodsName;
    let cod = di.sugGoodsCode;
    let dia = `<a href="https://product.suning.com/${di.vendorId}/${cod.substring(9)}.html?srcPoint=index3_none_recscnxh_1-47_p_0000000000_103637781_01A_6-1_0_A&src=index3_none_recscnxh_1-47_p_0000000000_103637781_01A_6-1_0_A" title="${nam}">`;
    oHtml +=
      `<li class="item${i%6+1}">
        ${dia}
          <img alt="${nam}" src="https://image.suning.cn/uimg/b2c/newcatentries/${di.vendorId}-${cod}_1_160x160.jpg">
        </a>
        <p>${dia}${nam}</a></p>
        <span class="price"><i>￥</i><em>${di.price}</em></i></span>`;
    oHtml += di.promotionType == '1' ? '<span class="cuxiao">大聚惠</span></li>' : '</li>';
  }
  recommandList.innerHTML = oHtml;
}
