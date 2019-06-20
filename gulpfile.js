

let gulp = require('gulp'),//基础库
    htmlmin = require('gulp-htmlmin'),//html压缩
    uglify = require('gulp-uglify'),// 获取 uglify 模块（用于压缩 JS）
    cleanCSS = require('gulp-clean-css'),// 获取 cleancss 模块（用于压缩 CSS）
    imagemin = require('gulp-imagemin'),//图片压缩
    rename = require("gulp-rename");//重命名文件

let htmls=()=>{
  var options = {
    removeComments: true,//清除HTML注释
    collapseWhitespace: true,//压缩HTML
    collapseBooleanAttributes: false,//省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: false,//删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
    minifyJS: true,//压缩页面JS
    minifyCSS: true//压缩页面CSS
  };
  console.log('压缩html文件');
  return gulp.src('./views/*.html')
    .pipe(htmlmin(options))
    .pipe(gulp.dest('./views_gulp'))
};
let styles=()=>{
  console.log('压缩css文件');
  return gulp.src('./public/stylesheets/*.css')
    .pipe(rename({suffix: '.min'}))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./public/stylesheets'))
};
let scripts=()=>{
  console.log('压缩js文件');
  return gulp.src('./public/javascripts/*.js')
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify({
      mangle: {except: ['require' ,'exports' ,'module' ,'$']},//类型：Boolean 默认：true 是否修改变量名
      compress: true,//类型：Boolean 默认：true 是否完全压缩
      preserveComments: 'false' //保留所有注释
    }))
    .pipe(gulp.dest('./public/javascripts'))
};
let images=()=>{
  console.log('压缩image文件');
  return gulp.src('./public/images/*.{png,jpg,gif,ico}')
    .pipe(imagemin())
    .pipe(gulp.dest('./public/images'))
};
gulp.task('default', gulp.parallel(styles,htmls,scripts, images,(done) => done()));
/*gulp.task('build', gulp.parallel('styles', 'scripts', 'images', function () {
  // Build the website.
}));*/

/*
// 1、复制单个文件
gulp.task('copyHtml',function () {
  return gulp.src('./src/public/login.html').pipe(gulp.dest("dist/public"))
});
// 2、复制多个文件
gulp.task('copyAllHtml',function () {
  return gulp.src("./src/public/!*.html").pipe(gulp.dest('dist/public'));
});
// 3、复制指定文件
// [指定的文件已，指定的文件2]
gulp.task('copy2Js',function () {
  return gulp.src(["./src/public/js/ajax.js",'dist/public/js/classPage.js'])
    .pipe(gulp.dest("dist/public/js"))
});
// 4、某个文件
// ！排队的文件
gulp.task("copyNoJs",function () {
  return gulp.src(['./src/public/js/!*.js','!./src/public/js/Classroom.js'])
    .pipe(gulp.dest('dist/public/js'))
});
// 5、复制多个后缀名的图片
// {选项一，选项二}
gulp.task("copyImage",function () {
  return gulp.src('./src/public/img/!*.{png,jpg,bmp,jpeg,gif}')
    .pipe(gulp.dest('dist/public/img'))
});
// 6、执行多个任务
// gulp.task('任务名称',[任务依赖的模块],回调函数)
// 依赖任务之间没有顺序之分，异步执行
// 依赖任务之间完成后，在执行当前的回调函数
gulp.task('build',['copyAllHtml','copyNoJs','copyImage'],function () {
  console.log('编译成功')
});

// 7、Watch:监视文件的变化
gulp.task('myWatch',function () {
  gulp.watch('./src/public/login.html',['build'])
});

// 8、删除文件
gulp.task("del",function () {
  // del('./dist/public/img/!*.{jpg,png,jepg,gif}')
  // *：所有文件
  // **：所有文件夹
  del(['./dist/public/js/!*']);
  del(['./dist/!**!/!*']);
});

gulp.task('default',function () {
  gulp.start('serve')

});

// 9、压缩js文件
gulp.task('ysjs',function(){
  return gulp.src('./src/public/js/!*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./src/public/js'));


});

//10、 添加监听
gulp.task('watch_js',function(){
  return gulp.watch('./src/public/js/!*.js',['ysjs'])

});

//11、压缩css文件
gulp.task('css',function () {
  return gulp.src('./src/public/sass/!*.css')
    .pipe(css())
    .pipe(gulp.dest('./src/public/sass'))
});
//添加监听
gulp.task('jtCss',function () {
  return gulp.watch('./src/public/sass/!*.css',['css'])
});
//12、重命名css文件
gulp.task('reName',function () {
  return gulp.src('./src/public/sass/!*.css')
    .pipe(rename({suffix: '.css'}))
    .pipe(css())
    .pipe(gulp.dest('./src/public/sass'))
});　　*/
