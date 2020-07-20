import React from 'react';
const electron = window.electron;
const fs = window.fs;

let fsfile = require('../utils/FileUtil');
/**
 * 这里是调用nodejs里的fs模块系统
 * 通过nodejs的fs模块来操作本地系统文件
 */
class FsFile extends React.Component {
    selectFiles = () => {

        console.log("fs=========》》》：" + fs);

        const dialog = electron.remote.dialog;
        dialog.showOpenDialog({
            properties: ['openFile', 'openDirectory', 'multiSelections']
        }).then(result => {
            console.log("选择的文件路径======================》》》：" + result.filePaths);
            let paths = result.filePaths;
            if (paths && paths.length > 0) {
                let path = paths[0];
                let files = fsfile.getFileList(path);
                if(files && files.length > 0){
                    for(var i = 0; i < files.length; i ++){
                        console.log(files[i]);
                    }
                }
            }
        }).catch(err => {
            console.log(err);
        })
    }

    selectFile = () => {
        console.log("fs=========》》》：" + fs);

        const dialog = electron.remote.dialog;
        dialog.showOpenDialog({
            properties: ['openFile']
        }).then(result => {
            console.log("选择的文件路径======================》》》：" + result.filePaths);
            let paths = result.filePaths;
            if (paths && paths.length > 0) {
                let path = paths[0];
                fsfile.readTextFile(path, (data)=>{
                    console.log(data);
                });
            }
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <div className="filefDiv">
                <div className="filefDiv-content">
                    <button onClick={this.selectFiles}>选择文件夹</button>
                </div>
                <div className="fileDivs-content">
                    <button onClick={this.selectFile}>选择文件</button>
                </div>
            </div>
        )
    }
}

export default FsFile;