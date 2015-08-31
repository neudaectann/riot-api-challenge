var gulp        = require("gulp"),
    minifyHTML  = require("gulp-minify-html"),
    sass        = require("gulp-ruby-sass"),
    plumber     = require("gulp-plumber"),
    uglify      = require("gulp-uglify"),
    prefix      = require("gulp-autoprefixer"),
    imagemin    = require("gulp-imagemin"),
    bowerFiles	= require("main-bower-files"),
    browserSync = require("browser-sync"),
    size        = require('gulp-size'),
    jshint      = require('gulp-jshint'),
    stylish     = require('jshint-stylish'),
    gulpIgnore  = require('gulp-ignore');

// gulp config - defines paths for html, css, etc.
var config = {
    paths: {
        html:{
            src: "application/**/*.html",
            destDev: "build/dev/",
            destProd: "build/prod/"
        },
        bower:{
            src: "bower_components/**/*.*",
            destDev: "build/dev/bower_components/",
            destProd: "build/prod/bower_components/"
        },
        sass:{
            src: "application/scss/",
            srcWatch: "application/scss/*.scss",
            destDev: "build/dev/css/",
            destProd: "build/prod/css/"
        },
        js:{
            src: "application/js/*.js",
            destDev: "build/dev/js/",
            destProd: "build/prod/js/"
        },
        img:{
            src: "application/img/*.*",
            destDev: "build/dev/img/",
            destProd: "build/prod/img/"
        }
    }
}

// ----------------------------------------------------------------------------------------------------------------------------
// gulp tasks for development
// ----------------------------------------------------------------------------------------------------------------------------

// sass
gulp.task("sass-dev", function() {
    return sass(config.paths.sass.src, {
                    style: "expanded",
                })
                .pipe(plumber())
                .pipe(prefix("last 2 versions"))
                .pipe(size({showFiles: true}))
                .pipe(gulp.dest(config.paths.sass.destDev))
                .pipe(browserSync.reload({stream: true}));
});

gulp.task("js-hint-dev", function() {
    return gulp.src(config.paths.js.src)
                .pipe(gulpIgnore.exclude(/snap.svg-min\.js/))
                .pipe(gulpIgnore.exclude(/modernizr.custom\.js/))
                .pipe(gulpIgnore.exclude(/presentation\.js/))
                .pipe(jshint())
                .pipe(jshint.reporter(stylish));
});

// java script
gulp.task("js-dev", function() {
    return gulp.src(config.paths.js.src)
                .pipe(plumber())
                .pipe(size({showFiles: true}))
                .pipe(gulp.dest(config.paths.js.destDev))
                .pipe(browserSync.reload({stream: true}));
});

// html
gulp.task("html-dev", function() {
    return gulp.src(config.paths.html.src)
                .pipe(size({showFiles: true}))
                .pipe(gulp.dest(config.paths.html.destDev))
                .pipe(browserSync.reload({stream: true}));
});

// bower
gulp.task("bower-dev", function() {
	return gulp.src(bowerFiles(), { base: "bower_components/"})
                .pipe(size({showFiles: true}))
    			.pipe(gulp.dest(config.paths.bower.destDev));
});

// images
gulp.task("img-dev", function() {
    return gulp.src(config.paths.img.src)
                .pipe(size({showFiles: true}))
                .pipe(gulp.dest(config.paths.img.destDev))
                .pipe(browserSync.reload({stream: true}));
});

// browser sync
gulp.task("browser-sync", function() {
    browserSync({
        server: {
            baseDir: "./build/dev"
        }
    })
});

// ----------------------------------------------------------------------------------------------------------------------------
// gulp tasks for production
// ----------------------------------------------------------------------------------------------------------------------------

// sass
gulp.task("sass-prod", function() {
    return sass(config.paths.sass.src, {
                    style: "compressed",
                })
                .pipe(plumber())
                .pipe(prefix("last 2 versions"))
                .pipe(size({showFiles: true}))
                .pipe(gulp.dest(config.paths.sass.destProd));
});

// java script
gulp.task("js-prod", function() {
    return gulp.src(config.paths.js.src)
                .pipe(uglify())
                .pipe(size({showFiles: true}))
                .pipe(gulp.dest(config.paths.js.destProd));
});

// html
gulp.task("html-prod", function() {
    return gulp.src(config.paths.html.src)
                .pipe(minifyHTML())
                .pipe(size({showFiles: true}))
                .pipe(gulp.dest(config.paths.html.destProd));
});

// bower
gulp.task("bower-prod", function() {
    //return gulp.src(config.paths.bower.src).pipe(gulp.dest(config.paths.bower.destProd));
    return gulp.src(bowerFiles(), { base: "bower_components/"})
    			.pipe(uglify())
                .pipe(size({pretty: true}))
    			.pipe(gulp.dest(config.paths.bower.destProd));
});

// images
gulp.task("img-prod", function() {
    return gulp.src(config.paths.img.src)
                .pipe(imagemin())
                .pipe(size({showFiles: true}))
                .pipe(gulp.dest(config.paths.img.destProd));
});

// ----------------------------------------------------------------------------------------------------------------------------
// serve, build-dev, build-prod tasks
// ----------------------------------------------------------------------------------------------------------------------------

// dev build task - compile sass, copy html/javascript, copy images, copy bower dependencies
gulp.task("build:dev", ["bower-dev", "js-hint-dev", "js-dev", "html-dev", "img-dev", "sass-dev"]);

// production build
gulp.task("build:prod", ["bower-prod", "js-prod", "html-prod", "img-prod", "sass-prod"]);

// serve task - runs loval server environment
gulp.task("serve", ["build:dev", "browser-sync"], function() {
    gulp.watch(config.paths.html.src, ["html-dev", browserSync.reload]);
    gulp.watch(config.paths.sass.srcWatch, ["sass-dev", browserSync.reload]);
    gulp.watch(config.paths.js.src, ["js-copy-dev", browserSync.reload]);
    gulp.watch(config.paths.img.src, ["img-copy-dev", browserSync.reload]);
});