// var gp = require('gulp');

// var concat = require('gulp-concat');
// var uglify = require('gulp-uglify');
var fs = require("fs");
// var del = require('del');
// var minimist = require('minimist');


let jsReleasePath;//
let assetsPath;//
let outPublicPath;//
let webFileName="web";//
let versionFileName="ver";//

function configFilePaths(p1, p2, p3, p4, p5){
    jsReleasePath = p1;
    assetsPath = p2;
    outPublicPath = p3;
    webFileName = p4;
    versionFileName = p5;
    console.log(p1, p2, p3, p4, p5);
}

function mergeJs(){
    // console.log("=============="+ concat, uglify, fs, del, minimist);
    // var gp = require('gulp');
    var uglify = require('gulp-uglify');
}

module.exports.configFilePaths = configFilePaths;
module.exports.mergeJs = mergeJs;

