const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');

const autoprefix = require('gulp-autoprefixer');
const minifyCSS = require('gulp-minify-css');
const concat = require('gulp-concat');

const uglify = require('gulp-uglify');
const del = require('del');

const zip = require('gulp-zip');

gulp.task('view', () => {
    gulp.src('src/views/*.html')
        .pipe(gulp.dest('build/views/'));
});

gulp.task('styles', () => {
    gulp.src(['src/css/*.css'])
    .pipe(concat('styles.css'))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.reload({
        stream: true
     }))
});

gulp.task('js', () => {
    gulp.src('src/js/*.js')
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/'));
});

gulp.task('imagemin', () => {
    var img_src = 'src/img/*.+(png|jpg|gif)', img_dest = 'build/images';

    gulp.src(img_src)
        .pipe(changed(img_dest))
        .pipe(imagemin())
        .pipe(gulp.dest(img_dest));
});

gulp.task('fonts', function() {
    return gulp.src('src/font-awesome/*/**.*')
        .pipe(gulp.dest('build/fonts'));
});

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: './build'
        }
    });
});

gulp.task('watch', () => {
gulp.watch('src/views/*.html').on("change", reload);
gulp.watch('src/css/*.css').on("change", reload);
gulp.watch('src/js/*.js').on("change", reload);
gulp.watch("./*.html").on("change", reload);
});

gulp.task('zip', () =>
    gulp.src('build/*')
    .pipe(zip('archive.zip'))
    .pipe(gulp.dest('dist'))
);



// gulp.task('browser-sync', function () {
//     browserSync.init({
//         server: {
//             baseDir: './'
//         }
//     });
// });

// gulp.task('watch', function () {
//     gulp.watch('*.html', reload);
//     gulp.watch('css/*.css', reload);
//     gulp.watch('js/*.js', reload);
// });

gulp.task('default', ['view', 'styles', 'js', 'imagemin', 'fonts', 'browser-sync', 'watch']);
