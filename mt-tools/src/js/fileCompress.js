// var gp = require('gulp');//gulp模块工具不能在electron代码里面调用

var fs = require("fs");
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

    // var code = "function add(first, second) { return first + second; }";
    // var result = UglifyJS.minify(code);
    // console.log(result.error); // runtime error, or `undefined` if no error
    // console.log(result.code);  // minified output: function add(n,d){return n+d}
}

function mergeJs(){
}

module.exports.configFilePaths = configFilePaths;
module.exports.mergeJs = mergeJs;

