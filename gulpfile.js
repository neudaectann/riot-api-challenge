var gulp        = require("gulp"),
    minifyHTML  = require("gulp-minify-html");
    browserSync = require("browser-sync");

// gulp config - defines paths for html, css, etc.
var config = {
    paths:{
        html:{
            src: ["application/**/*.html"],
            dest: "build"
        },
    }
}

// Minify HTML task.
// It get all .html files from application directory and store them into build directory after minification
gulp.task("html", function() {
    return gulp.src(config.paths.html.src)
                .pipe(minifyHTML())
                .pipe(gulp.dest(config.paths.html.dest))
                .pipe(browserSync.reload({stream: true}));
});

gulp.task("browser-sync", function() {
    browserSync({
        server: {
            baseDir: "./build"
        }
    })
})

// build task
gulp.task("build", ["html"]);

// default gulp task
gulp.task("default", ["build", "browser-sync"], function() {
    gulp.watch(config.paths.html.src, ["html", browserSync.reload]);
});
