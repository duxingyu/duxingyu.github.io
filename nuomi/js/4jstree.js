/**
 * 根据传入的数据生成相应的节点树并返回
 * 参数nodes：数据
 * 参数frag：无需填写，父节点/文档片段
 * 生成文件树结构：
 * <div>                 // wrap
 *   <h3>文件夹名</h3>    // folderName
 *   <div>               // fileFolder
 *    <p>文件名</p>       // file
 *   </div>
 * </div>   
 */
function fn(nodes, frag) {
	// 初始为文档片段，之后为父节点即文件夹
	frag = frag || document.createDocumentFragment();

	for (let i = 0; i < nodes.length; i++) {
		// 根据数据是否有children属性判断文件夹或文件
		if (!('children' in nodes[i])) {
			let file = document.createElement('p');
			file.innerText = nodes[i].name;
			frag.appendChild(file);
		} else {
			let wrap = document.createElement('div');
			let folderName = document.createElement('h3');
			folderName.innerText = nodes[i].name;
			div.appendChild(folderName);
			let fileFolder = document.createElement('div');
			fn(nodes[i].children, fileFolder);
			div.appendChild(fileFolder);
			frag.appendChild(wrap);
		}
	}
	// 将文件夹进行折叠
	let h3 = frag.querySelectorAll('h3');
	for (let i = 0; i < h3.length; i++) {
		h3[i].nextElementSibling.classList.add('active');
	}
	return frag;
}

// 数据
var nodes = [{
	name: "文件夹1",
	children: [{
		name: "文件11"
	}, {
		name: "文件12"
	}]
}, {
	name: "文件夹2",
	children: [{
		name: "文件夹21",
		children: [{
			name: "文件211"
		}, {
			name: "文件212"
		}]
	}, {
		name: "文件夹22",
		children: [{
			name: "文件夹221",
			children: [{
				name: "文件2211"
			}, {
				name: "文件2212"
			}]
		}, {
			name: "文件222"
		}]
	}]
}, {
	name: "文件夹3",
	children: []
}];

document.body.appendChild(fn(nodes));
var h3 = document.getElementsByTagName('h3');
for (let i = 0; i < h3.length; i++) {
	h3[i].onclick = function() {
		this.classList.toggle('fold');
		this.nextElementSibling.classList.toggle('active');
	}
}
