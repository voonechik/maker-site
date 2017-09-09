var gulp 				 	 = require('gulp'),
		sass 				 	 = require('gulp-sass'), 					// Sass
		autoprefixer 	 = require('gulp-autoprefixer'),  // Автопрефиксер(вендорные префиксы для кроссбраузерности)
		cleanCSS 		 	 = require('gulp-clean-css'),			// Сжатие css
		uglify 			 	 = require('gulp-uglifyjs'),			// Сжатие js
		concat 			 	 = require('gulp-concat'),				// Конкатенация файлов
		browserSync  	 = require('browser-sync'),				// Browser-sync(reload, tunnel)
		rename 			 	 = require('gulp-rename'), 				// Переименование файлов
		del 				 	 = require('del'),								// Удаление dist
		cache 			 	 = require('gulp-cache'),					// Кэш
		htmlhint 		 	 = require('gulp-htmlhint'),			// Проверка синтаксиса HTML
		gutil					 = require('gulp-util'),					// Deploy проекта по ftp
		ftp						 = require('vinyl-ftp');					// Deploy проекта по ftp

gulp.task('sass', function() {
	return gulp.src('app/sass/main.sass')
	.pipe(sass())
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
	.pipe(cleanCSS())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('minify-css', function() {
	return gulp.src([
		'app/libs/bootstrap-grid.min.css',
		'app/css/main.min.css'
	])
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
	.pipe(cleanCSS())
	.pipe(concat('main-dist.css'))
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/css'));
});

gulp.task('minify-libs', function() {
	return gulp.src([
		'app/libs/jquery-3.2.1.min.js',
		'app/libs/smooth-scroll.min.js',
		'app/js/common.js'
	])
	.pipe(concat('libs.js'))
	.pipe(uglify())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/js'));
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
		/*tunnel: true,
		tunnel: test*/
	});
});


gulp.task('clean', function() {
	return del.sync('dist');
});

gulp.task('clear', function() {
	return cache.clearAll();
});

gulp.task('htmlhint', function() {
	return gulp.src('app/*.html')
	.pipe(htmlhint())
	.pipe(htmlhint.reporter())
	.pipe(htmlhint.failReporter({suppress: true}));
});

gulp.task( 'deploy', function () {

    var conn = ftp.create( {
        host:     'files.000webhost.com',
        user:     'igoorak',
        password: 'bujjhfr565',
        parallel: 10,
        log:      gutil.log
    } );

    var globs = [
        'app/js/libs.min.js'
    ];

    return gulp.src( globs, {buffer: false } )
        .pipe( conn.dest( '/public_html' ) );

} );

gulp.task('watch', ['browser-sync', 'htmlhint', 'sass'], function() {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*', browserSync.reload);
	gulp.watch('app/libs/**/*', browserSync.reload);
});

gulp.task('build', ['clean'], function() {

	var buildCSS = gulp.src(['app/css/main-dist.min.css'])
	.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'));

	var buildImg = gulp.src('app/img/**/*')
	.pipe(gulp.dest('dist/img'));

	var buildJS = gulp.src('app/js/libs.min.js')
	.pipe(gulp.dest('dist/js'));

	var buildHTML = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'));

	var buildApacheConfig = gulp.src('app/ht.access')
	.pipe(gulp.dest('dist'));

});

gulp.task('default', ['watch']);
