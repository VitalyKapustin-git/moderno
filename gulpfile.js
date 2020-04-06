let gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    autorefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin');

    // Method
gulp.task('sass', function(){
    return gulp.src('app/scss/style.scss')
            .pipe(sass({outputStyle: 'compressed'}))
            .pipe(rename({suffix : '.min'}))
            .pipe(autorefixer({
                browsers: ['last 8 versions']
            }))
            .pipe(gulp.dest('app/css'))
            .pipe(browserSync.reload({stream: true}))
});

gulp.task('style', function(){
    return gulp.src([
        'node_modules/slick-carousel/slick/slick.css',
        'node_modules/normalize.css/normalize.css'
    ])

        .pipe(concat('libs.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('app/css'))
});

gulp.task('script', function(){
    return gulp.src([
        'node_modules/slick-carousel/slick/slick.js'
    ])

        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
});

gulp.task('html', function(){
    return gulp.src('app/*.html')
            .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function(){
    return gulp.src('app/js/*.js')
            .pipe(browserSync.reload({stream: true}))
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
});

gulp.task('watch', function(){
    gulp.watch('app/scss/style.scss', gulp.parallel('sass'));
    gulp.watch('app/*.html', gulp.parallel('html'));
    gulp.watch('app/js/*.js', gulp.parallel('js'));
});

gulp.task('default', gulp.parallel('style', 'script', 'sass', 'watch', 'browser-sync'));