var gulp=require('gulp');
var $=require('gulp-load-plugins')();

//js
gulp.task('js',function(){
    gulp.src('app/js/*.js')
        .pipe($.concat('all.js'))
        .pipe($.uglify())
        .pipe($.rename('all.min.js'))
        .pipe(gulp.dest('dist/js'))
})

//css
gulp.task('css',function(){
    gulp.src('app/css/*.less')
        .pipe($.less())
        .pipe($.concat('all.css'))
        .pipe($.cleanCss())
        .pipe($.rename('all.min.css'))
        .pipe(gulp.dest('dist/css'))
})

//img
gulp.task('img',function(){
    gulp.src('app/images/*.{jpg,png,gif}')
        .pipe(gulp.dest('dist/imgs'))
})

//html
gulp.task('html',function(){
    var target=gulp.src('app/index.html');
    var source=gulp.src(['dist/css/all.min.css','dist/js/all.min.js']);
     target.pipe($.inject(source,{ignorePath:'dist',addRootSlash:false}))  //ignorePath忽略路径  addRootSlash忽略 /
        .pipe($.minifyHtml())
        .pipe(gulp.dest('dist/'))
        .pipe($.connect.reload()); //通知浏览器刷新
})

//启动静态服务器
gulp.task('serve',function(){
    $.connect.server({
        root:'./dist',  //文件目录
        port:8080,  //端口号
        livereload:true //启用实时刷新
    })
})

//监听
gulp.task('watch',function(){
    gulp.watch('app/*.html',['html'])
})


gulp.task('default', ['js', 'css', 'img','html', 'serve', 'watch']);
