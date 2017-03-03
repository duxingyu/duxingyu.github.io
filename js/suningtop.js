function jsonp(link) {
  const sc = document.createElement('script');
  sc.src = `${link}&_=${+new Date}`;
  document.body.appendChild(sc);
}
jsonp('https://ds.suning.cn/ds/hotkeywords/0--showHotkeywords.xjsonp?callback=showHotkeywords');

function showHotkeywords(data) {
  document.getElementById('serach_key').innerHTML = data.html;
  document.querySelector('#serach_inp input').placeholder = document.getElementById('searchDefaultKeyword').value;
}

function getHotkey() {
  jsonp('https://ds.suning.cn/ds/searchHotkeywords/0-searchHotkeywords.jsonp?callback=searchHotkeywords');
  this.removeEventListener('focus', getHotkey, false);
}
document.getElementById('Serach').addEventListener('focus', getHotkey, false);

function searchHotkeywords(data) {
  const oDl = document.getElementById('hot_list');
  let ohtml = '';
  data.forEach((val) => {
    ohtml += `<dd><a href="https://www.serach.suning.com/${val.urlKeyword}/">${val.keyword}</a></dd>`;
  });
  oDl.innerHTML += ohtml;
}
