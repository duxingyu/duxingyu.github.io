window.onload = function() {
	var oBtn = document.getElementById('btn1');
	var oUl = document.getElementById('list');
	oBtn.onclick = function() {
		ajax('ajax_text.txt?t=' + new Date().getTime(), function(str) {
			var arr = eval(str);
			for (var i = 0; i < arr.length; i++) {
				var aLi = document.createElement('li');
				aLi.innerHTML = '亿+' + arr[i].a + '水电费+' + arr[i].b;
				oUl.appendChild(aLi);
			}
		}, function() {
			alert('失败');
		})
	};
};

function ajax(url, fnSecc, fnFaild) {
	if (window.XMLHttpRequest) {
		var oAjax = new XMLHttpRequest();
	} else {
		var oAjax = new ActiveXObject("Microsoft.XMLHTTP");
	}
	oAjax.open('GET', url, true);
	oAjax.send();
	oAjax.onreadystatechange = function() {
		if (oAjax.readyState == 4) {
			if (oAjax.status == 200) {
				fnSecc(oAjax.responseText);
			} else {
				if (fnFaild) fnFaild(oAjax.status);
			}
		}
	}
}
