var gulp        = require("gulp"),
    minifyHTML  = require("gulp-minify-html"),
    sass        = require("gulp-ruby-sass"),
    // imagemin    = require("gulp-imagemin"),
    browserSync = require("browser-sync");

// gulp config - defines paths for html, css, etc.
//
var config = {
    paths:{
        html:{
            src: "application/**/*.html",
            dest: "build/"
        },
        bower:{
            src: "bower_components/**/*.*",
            dest: "build/bower_components/"
        },
        sass:{
            src: "application/scss/",
            srcWatch: "application/scss/*.scss",
            dest: "build/css/"
        },
        js:{
            src: "application/js/*.js",
            dest: "build/js/"
        },
        img:{
            src: "application/img/**/*",
            dest: "build/img/"
        }
    }
}

// task for sass compile
// gulp-ruby-sass: 1.x
//
gulp.task("sass", function(){
    return sass(config.paths.sass.src, {
                    style: "compressed",
                    emitCompileError: true
                })
                .on("error", function(err) {
                    sass.logError(err);
                    process.exit(1);
                })
                .pipe(gulp.dest(config.paths.sass.dest))
                .pipe(browserSync.reload({stream: true}));
})

// Minify HTML task.
// It get all .html files from application directory and store them into build directory after minification
//
gulp.task("html", function() {
    return gulp.src(config.paths.html.src)
                .pipe(minifyHTML())
                .pipe(gulp.dest(config.paths.html.dest))
                .pipe(browserSync.reload({stream: true}));
});

// copy bower dependencies to build output folder
//
gulp.task("bower-copy", function() {
    return gulp.src(config.paths.bower.src).pipe(gulp.dest(config.paths.bower.dest));
});

// compress images
//
gulp.task("img-compress", function() {
    return gulp.src(config.paths.img.src)
                //.pipe(imagemin())
                .pipe(gulp.dest(config.paths.img.dest));
});

// BrowserSync task for livereload functionality
//
gulp.task("browser-sync", function() {
    browserSync({
        server: {
            baseDir: "./build"
        }
    })
})

// build task - compile sass, minify html/javascript, copy bower dependencies
//
gulp.task("build", ["sass", "html", "img-compress"]);

// serve task - runs loval server environment
//
gulp.task("serve", ["build", "browser-sync"], function() {
    gulp.watch(config.paths.bower.src, ["bower_copy"]);
    gulp.watch(config.paths.html.src, ["html", browserSync.reload]);
    gulp.watch(config.paths.sass.srcWatch, ["sass", browserSync.reload]);
});

// TODO: deploy task - copy all files from ./build to remote server via ssh
