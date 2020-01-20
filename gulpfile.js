var gulp = require('gulp');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');

var tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', function() {
  return gulp.src('./**/*.ts', {
    ignore: ['node_modules/**/*.ts', 'lib']
  })
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .pipe(uglify())
    .pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: './' }))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', gulp.series('scripts', function() {
  gulp.watch(['common/ts/*.ts', 'src/**/*.ts'], gulp.series('scripts'));
}));

gulp.task('concat', function() {
  return gulp.src(['./lib/jweixin-1.3.2.js', './lib/pixi.min.js', './lib/pixi-spine.min.js', './lib/Tween.min.js', './lib/videoplayer.min.js', './lib/swiperp.js', './lib/howler.core.min.js', './lib/recorder-core.js', './lib/mp3.js', './lib/util.js'])
    .pipe(concat('allp.js'))
    .pipe(gulp.dest('./lib/'));
});

gulp.task('webserver',()=>{
	gulp.src('./')//以哪个文件夹作为根服务器
	.pipe(webserver({
		livereload: {
			enable: true,
			filter: function(fileName) {
				if (fileName.match(/[.map]$/)) {
					return false;
				} else {
					return true;
				}
			}
		},//热部署，是否可以自动刷新
//		https:true,//默认是http 需要与请求接口协议一致
		port: 5500,//端口
		host: '127.0.0.1',//域名
		proxies:[
			{
				source:'/clazz',//随便起，相当于你要请求接口的替换名 ajax请求时就用这个名字
				target:'http://mytian.dyndns.org:7777/clazz/' //要请求的接口
			},
			{
				source:'/myt_market',
				target:'http://mytian.dyndns.org:83/myt_market/'
			}
		]
	}))
});

gulp.task('mytask', gulp.parallel('watch', 'webserver'));