var gulp = require('gulp'),
	minifyCSS = require('gulp-minify-css'),
	serve = require('gulp-serve'),
	browserSync = require('browser-sync').create(),
	compass = require('gulp-compass');

gulp.task('compass',function(){
	gulp.src('app/src/stylesheets/main.scss')
		.pipe(compass({
			css:'app/public/css',
			sass:'app/src/stylesheets',
			image:'app/public/images'
		}))
		.on('error',function(error){
			console.log(error);
			this.emit('end');
		})
		.pipe(minifyCSS())
		.pipe(gulp.dest('app/publi/temp'))
		.pipe(browserSync.stream());
});

gulp.task('serve',['compass'],function(){
	browserSync.init({
		notify:false,
		port:9000,
		server:'./app/public'
	});

	gulp.watch('./app/src/stylesheets/*.scss',['compass']);
	gulp.watch('app/public/*.html').on('change',browserSync.reload);
});

gulp.task('default',['serve']);