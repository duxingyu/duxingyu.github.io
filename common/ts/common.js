function isSp(e){return void 0!==e.interactive}function isSpine(e){return void 0!==e.spineData}function isArr(e){return _.isArr(e)}var isPortrait=document.body.clientWidth<document.body.clientHeight;function setWrapSize(){var e=document.body.clientWidth,t=document.body.clientHeight;isPortrait&&(e=document.body.clientHeight,t=document.body.clientWidth);var a,i,n,s,o=$("#wrapper"),r=e/t;r<=1.34?(a=1.3*e,n=0,s=-.15*e,device="ipad"):1.34<r&&r<1.8?(s=-.15*e,n=-((a=1.3*e)*1664/2880-t)/2):1.8<=r&&(n=-.15*t,s=-((a=1.3*t*2880/1664)-e)/2),i=832*a/1440;var c=document.documentElement.clientWidth,h=document.documentElement.clientHeight;isPortrait?($("body").css({width:h+"px",height:c+"px",transformOrigin:c/2+"px "+c/2+"px",transform:"rotate(90deg)"}),gameStyle={width:i+"px",height:a+"px",transform:"rotate(-90deg)",transformOrigin:i/2+"px "+i/2+"px"},$("#game").css(gameStyle),$("#jiesuan").css({width:i+"px",height:a+"px",transform:"rotate(-90deg)",transformOrigin:i/2+"px "+i/2+"px"}),$("#video video").css({width:"100vh",height:"100vw"}),$("#loading").css({width:"100vh",height:"100vw"})):($("#video video").css({width:"100vw",height:"100vh"}),$("#loading").css({width:"100vw",height:"100vh"})),o.css({width:a+"px",top:n+"px",left:s+"px",height:i+"px"})}function scaleAnim(e,t){void 0===t&&(t={});var a=t.animTime?t.animTime:250,i=t.scale1?t.scale1:1,n=t.scale2?t.scale2:.9,s={scale:i},o=new Tween(s).to({scale:n},a).onUpdate(r).onComplete(function(){t.one?t.callback&&t.callback(o):o=new Tween(s).to({scale:i},a).onUpdate(r).onComplete(function(){t.callback&&t.callback(o)}).start()}).start();function r(){isSp(e)?e.scale.set(s.scale,s.scale):e.css("transform","scale("+s.scale+")")}tweens.add(o)}function addSounds(e,a){void 0===a&&(a="/music/"),e.forEach(function(e){var t=Linkpre+a+e+".mp3";sound[e]=new Howl({src:t,onplayerror:function(){sound[e].once("unlock",function(){sound[e].play()})}}),sound[e].name=e})}var Game=function(){function e(e){void 0===e&&(e={}),this.path=Linkpre+"common",this.loaded=!1;var t=e.width,a=e.height;t=t||1440,a=a||832,this.renderer=PIXI.autoDetectRenderer(t,a,{transparent:!0,autoResize:!0}),this.resource={},this.stage=new PIXI.Container,this.stage.interactive=!0,e.path&&(this.path=Linkpre+e.path),this.loaded=!1}return e.prototype.$=function(e){return"number"==typeof e?this.stage.getChildAt(e):this.stage.getChildByName(e)},e.prototype.loadResource=function(n,e,t){var s=this;void 0===e&&(e="");var a=[],o=[],i={};for(var r in n)n.hasOwnProperty(r)&&(n[r].resname||a.push(r));for(var r in n)if(n[r].datas)for(var c=n[r].datas,h=0;h<c.length;h++){var d=c[h];i[""+r+(h+1)]={resname:r,type:n[r].type,path:n[r].path,data:_.clone(n[r].data?n[r].data:{})},i[""+r+(h+1)].data.name=""+r+(h+1),Object.assign(i[""+r+(h+1)].data,d)}else i[r]=n[r],i[r].resname=i[r].resname?i[r].resname:r;a.forEach(function(e){var t,a=n[e],i=a.path?a.path:s.path;"spine"==a.type?t=i+"/spine/"+e+"/"+e+".json":"texture"==a.type?t=i+"/"+e+".json":"image"==a.type&&(t=i+"/images/"+e+".png"),o.push({name:e,url:t})}),this.setup(o,i,e,t)},e.prototype.setup=function(e,i,n,s){var o=this;function r(e,t,a){var i,n=e.data?e.data:{},s=n.stage?n.stage:t;if("spine"==e.type?i=new PIXI.spine.Spine(a[e.resname].spineData):"image"==e.type?i=new PIXI.Sprite(a[e.resname].texture):"texture"==e.type&&(i=new PIXI.Sprite(PIXI.utils.TextureCache[e.resname+".png"])),i.name=n.name?n.name:e.resname,n.x=n.x?n.x:0,n.y=n.y?n.y:0,n.width&&(i.width=n.width),n.height&&(i.height=n.height),i.position.set(n.x,n.y),n.alpha&&(i.alpha=n.alpha),void 0!==n.visible&&(i.visible=n.visible),n.interactive&&(i.interactive=!0),n.rotation&&(i.rotation=n.rotation),n.scale&&(isArr(n.scale)?i.scale.set(n.scale[0],n.scale[1]):i.scale.set(n.scale,n.scale)),isSpine(i)){var o=n.anim;o&&i.state.setAnimation(0,o.name,o.loop),n.mix&&(i.state.data.defaultMix=.5),n.timeScale&&(i.state.timeScale=n.timeScale),n.skin&&i.skeleton.setSkinByName(n.skin),n.flipX&&(i.skeleton.scaleX=-1),n.flipY&&(i.skeleton.scaleY=-1)}else n.anchor&&(isArr(n.anchor)?i.anchor.set(n.anchor[0],n.anchor[1]):i.anchor.set(n.anchor));return n.callback&&n.callback(i),s&&s.addChild(i),i}PIXI.loader.add(e).load(function(e,t){for(var a in i)r(i[a],n,t);o.loaded=!0,s&&s()})},e.prototype.proxyLoad=function(){this.load(),this.soundEvent(),this.load=null,this.soundEvent=null},e}();function proxyTimeout(e,t){for(var a=[],i=2;i<arguments.length;i++)a[i-2]=arguments[i];var n=setTimeout.apply(null,Array.prototype.slice.call(arguments));return timers.push(n),n}function hitTest(e,t){var a,i,n,s,o,r,c,h,d,l;return!1,o=e.x+e.width/2,r=e.y+e.height/2,d=t.x+t.width/2,l=t.y+t.height/2,c=e.width/2,h=e.height/2,n=o-d,s=r-l,a=c+t.width/2,i=h+t.height/2,Math.abs(n)<a&&Math.abs(s)<i}function transitionShow(e,t,a){var i=0,n=1;a?e.css({opacity:0,display:"flex"}):(i=1,n=0);var s={opacity:i},o=new Tween(s).to({opacity:n},t).onUpdate(function(){return e.css("opacity",s.opacity)}).onComplete(function(){a||(e.hide(),e.css("opacity",1))}).start();tweens.add(o)}function rendererResize(e){var t=e.stage;t.rotation=Math.PI/2,t.x=832,e.renderer.view.style="width:1440px;height:832px;",e.renderer.resize(832,1440)}TWEEN.Group.prototype.clear=function(){var t=this._tweens;Object.keys(this._tweens).forEach(function(e){return t[e].stop()}),this.removeAll()},$.fn.isShow=function(){return"none"!==this.css("display")};
//# sourceMappingURL=common.js.map
