const fs = require("fs");
const path = require("path");
/**
 * Created by RockeyCai on 16/2/22.
 * 创建文件夹帮助类
 */

//递归创建目录 异步方法
function mkdirs(dirname, callback) {
    fs.exists(dirname, function (exists) {
        if (exists) {
            callback();
        } else {
            //console.log(path.dirname(dirname));
            mkdirs(path.dirname(dirname), function () {
                fs.mkdir(dirname, callback);
            });
        }
    });
}

//递归创建目录 同步方法
function mkdirsSync(dirname) {
    //console.log(dirname);
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}

module.exports.modifyFilename = function modifyFilename(pth, modifier) {
    if (arguments.length !== 2) {
        throw new Error('`path` and `modifier` required');
    }

    if (Array.isArray(pth)) {
        return pth.map(function (el) {
            return modifyFilename(el, modifier);
        });
    }

    var ext = path.extname(pth);
    return path.join(path.dirname(pth), modifier(path.basename(pth, ext), ext));
};

module.exports.mkdirs = mkdirs;

module.exports.mkdirsSync = mkdirsSync;
module.exports.getFileList = getFileList;
module.exports.getExtName = getExtName;
module.exports.getTypeExtName = getTypeExtName;
module.exports.deleteFolder = deleteFolder;
//调用
//mkdirsSync("./aa/bb/cc" , null);
//mkdirs("./aa/bb/cc", function (ee) {
//    console.log(ee)
//});

//遍历文件夹，获取所有文件夹里面的文件信息
/*
 * @param path 路径
 *
 */
function getFileList(path, excludes = null) {
    var fileList = [];
    var exists = fs.existsSync(path);
    if (exists) {
        readFile(path, fileList, excludes);
    }
    return fileList;
}

//遍历读取文件
function readFile(path, fileList, excludes) {
    files = fs.readdirSync(path);//需要用到同步读取
    files.forEach(function (file) {
        if (!excludes || excludes.indexOf(file) < 0) {
            var states = fs.statSync(path + '/' + file);
            if (states.isDirectory()) {
                readFile(path + '/' + file, fileList, excludes);
            }
            else {
                //创建一个对象保存信息
                var info = {};
                info.size = states.size;//文件大小，以字节为单位
                info.name = file;//文件名
                info.path = path + '/' + file; //文件绝对路径
                fileList.push(info);
            }
        }
    });
}

function getExtName(fileName) {
    var extIndex = fileName.lastIndexOf('.');
    if (extIndex > -1) {
        return fileName.slice(extIndex);
    }
    return '';
}

function getTypeExtName(fileName) {
    var extName = '';
    var extIndex = fileName.lastIndexOf('.');
    if (extIndex > -1) {
        extName = fileName.slice(extIndex) + extName;
        fileName = fileName.substring(0, extIndex);
        extIndex = fileName.lastIndexOf('.');
        if (extIndex > -1) {
            extName = fileName.slice(extIndex) + extName;
        }
    }
    return extName;
}

function deleteFolder(path) {
    var files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) { // recurse             
                deleteFolder(curPath);
            }
            else { // delete file    
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};
