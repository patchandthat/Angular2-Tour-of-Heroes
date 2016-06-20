/// <binding BeforeBuild='clean-app' AfterBuild='copy-styles, copy-templates' Clean='clean, copy-scripts' />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require("gulp");
var watch = require("gulp-watch");
var clean = require("gulp-clean");

var dirs = {
    scriptRoot: "./wwwroot/scripts/",
    stylesRoot: "./wwwroot/css/"
}

var styles = [
    "styles.css"
];

var scripts = [
    { src: "node_modules/es6-shim/es6-shim.min.js", dest: dirs.scriptRoot },
    { src: "node_modules/zone.js/dist/zone.js", dest: dirs.scriptRoot },
    { src: "node_modules/systemjs/dist/system-polyfills.js", dest: dirs.scriptRoot  },
    { src: "node_modules/systemjs/dist/system.src.js", dest: dirs.scriptRoot },
    { src: "node_modules/reflect-metadata/Reflect.js", dest: dirs.scriptRoot },
    { src: "node_modules/jquery/dist/jquery.*js", dest: dirs.scriptRoot },
    { src: "node_modules/bootstrap/dist/js/bootstrap*.js", dest: dirs.scriptRoot },
    { src: "./systemjs.config.js", dest: dirs.scriptRoot },
    { src: "node_modules/rxjs/**/*.js", dest: dirs.scriptRoot + "rxjs" },
    { src: "node_modules/angular2-in-memory-web-api/*.js", dest: dirs.scriptRoot + "angular2-in-memory-web-api" },
    { src: "node_modules/@angular/**/*.js", dest: dirs.scriptRoot + "@angular" }
];

gulp.task("clean",
    function() {
        gulp.src(dirs.scriptRoot)
            .pipe(clean());
        gulp.src(dirs.stylesRoot)
            .pipe(clean());
    });

gulp.task("clean-app",
    () => {
        gulp.src("./wwwroot/app")
            .pipe(clean());
    });

gulp.task("copy-scripts",
    function () {
        scripts.forEach(function(s) {
            gulp.src(s.src)
                .pipe(gulp.dest(s.dest));
        });
    });

gulp.task("copy-styles",
    function () {
        gulp.src(styles)
            .pipe(gulp.dest(dirs.stylesRoot));
    });

gulp.task("copy-templates",
    () => {
        gulp.src(["./App/*.html", "./App/*.css"])
            .pipe(gulp.dest("./wwwroot/app"));
    });