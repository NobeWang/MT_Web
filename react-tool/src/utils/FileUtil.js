const fs = window.fs;
const path = window.path;
/**
 * 创建文件夹帮助类
 */

let files;
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

/**
 * 读取文件数据
 * 调用 fs.readFile() 方法来读取文件
 * fs.readFile('读取文件的路径','文件编码格式','回调函数')
 * 在读取文件的时候，如果传递了编码格式，那么回调函数中的 data默认就会转换为 字符串，否则data 参数的数据是一个 Buffer 对象，里面保存的就是一个一个的字节(理解为字节数组)
 * 把 Buffer 对象转换为字符串，调用 toString() 方法
 */
function readTextFile(path, res) {
    fs.readFile(path, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            res(null);
        } else {
            res(data);
        }
    })
}

/**
 * 调用 fs.writeFile() 进行文件写入
 * fs.writeFile() 是异步方法
 * fs.writeFile('写入文件的路径','要写入的数据','文档编码格式','回调函数')
 * 1. fs.writeFile('文件路径'，'要写入的内容'，['编码']，'回调函数');
 * 2. 写入的时候如果没有这个文件，会自动创建这个文件
 * 3. 如果被写入的文件已存在内容，那么写入的话，会覆盖之前的内容
 * 4. 写入数据的类型必须是字符串或buffer二进制数据，对象等数据写入后，接收的是数据类型
 * 5. 编码部分一般省略即可，或填写'utf-8'
 * 6. 回调函数中，只有err一个参数，写入错误即可判断调用
 * 7. fs.writeFileSync()同步版本
 * @param {*} path 要写入的文件路径
 * @param {*} data 要写入的数据，默认写入数据使用utf-8编码
 */
function writeFile(path, data) {
    fs.writeFile(path, data, 'utf8', (err) => {
        //如果 err===null,表示文件写入
        //只要 err 里面不是null，就表示写入文件失败了！
        if (err) {
            console.log('写入文件出错拉！具体错误：' + err)
        } else {
            console.log('ok');
        }
    });
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
module.exports.readTextFile = readTextFile;
module.exports.writeFile = writeFile;

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
    var delfiles = [];
    if (fs.existsSync(path)) {
        delfiles = fs.readdirSync(path);
        delfiles.forEach(function (file, index) {
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
