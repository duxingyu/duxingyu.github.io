(function() {
	const menu = document.getElementById('menu');

	/**
	 * 自定义右键菜单：
	 * 1.参数menu：自定义菜单节点
	 * 2. init()：菜单初始化 
	 * 2. enContextmenu()：显示菜单
	 * 3. disContextmenu()：隐藏菜单
	 */
	class CustomContextmenu {
		constructor(menu) {
			this.menu = menu;
		}
		init() {
			document.addEventListener('contextmenu', this.enContextmenu.bind(this), false);
			document.addEventListener('click', this.disContextmenu.bind(this), false);
			document.addEventListener('mousewheel', this.disContextmenu.bind(this), false);
			this.menu.addEventListener('click', e => e.stopPropagation(), false);
		}
		enContextmenu(e) {
			let menu = this.menu;
			menu.style.display = 'block';
			let oW = menu.getBoundingClientRect().width;
			let oH = menu.getBoundingClientRect().height;

			if (e.clientX + oW > document.documentElement.clientWidth) {
				menu.style.left = (document.body.scrollLeft ? document.body.scrollLeft : document.documentElement.scrollLeft) + document.documentElement.clientWidth - oW + 'px';
			} else {
				menu.style.left = e.pageX + 'px';
			}

			if (e.clientY + oH > document.documentElement.clientHeight) {
				menu.style.top = e.pageY - oH + 'px';
			} else {
				menu.style.top = e.pageY + 'px';
			}

			e.preventDefault();
		}
		disContextmenu() {
			this.menu.style.display = 'none';
		}
	}
	let customMenu = new CustomContextmenu(menu);
	customMenu.init();
})();
