/**
 * 这个是主进程里的程序
 * 这里是运行在nodejs模块下的代码，可以直接调用nodejs函数，例如fs等模块
 */

const electron = require('electron');
var {dialog}=require('electron');

const fs = require("fs");
const path = require("path");

function readMeFile(filePath)
{
    readTextFile(filePath, (data)=>{
        console.log(data);
    });
}

function selectFile(){
    dialog.showOpenDialog({
        properties: ['openFile']
    }).then(result => {
        console.log("选择的文件路径======================》》》：" + result.filePaths);
        let paths = result.filePaths;
        if (paths && paths.length > 0) {
            let path = paths[0];
            readTextFile(path, (data)=>{
                console.log(data);
            });
        }
    }).catch(err => {
        console.log(err);
    })
}

// /**
//  * 读取文件数据
//  * @param {} path 
//  */
function readTextFile(path, res){
    // 读取文件内容
    if(!path){
        console.error("file path error");
        res(null);
        return;
    }
    fs.readFile(path, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            res(null);
            return;
        } else {
            res(data);
            return;
        }
    })
}

module.exports.selectFile = selectFile;
module.exports.readMeFile = readMeFile;


