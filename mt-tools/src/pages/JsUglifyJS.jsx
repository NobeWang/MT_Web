import React, { Component } from 'react'
const electron = window.electron;
const dialog = electron.remote.dialog;
let fsUtil = require('../utils/FileUtil');
const main = electron.remote.require('./main');


let compressFiles = {};//选择要压缩的文件路径
let compressDatas = {};//保存所有需要压缩的文件数据
let compressNames = [];//保存所有需要压缩的文件名称
let outCompressedFileName = "test.js";//压缩后输出的文件名称
let outCompressedFilePath = "";//压缩后的文件输出目录

class JsUglifyJS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            p1: "",
            p2: "",
            p3: "",
            p4: "",
            p5: "",
            outFileName:outCompressedFileName,
            outFilePath:outCompressedFilePath
        };
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.handleChange4 = this.handleChange4.bind(this);
        this.handleChange5 = this.handleChange5.bind(this);
        this.handleChange6 = this.handleChange6.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
    }

    componentDidMount(){
        compressFiles = {};
        compressDatas = {};
        compressNames = [];
        outCompressedFileName = "test.js";
        outCompressedFilePath = "";
    }

    //可以通过一个对象（key为文件名，value为代码）来同时最小化多个文件
    onCompressTest() {
        if (compressNames.length >= 2 && outCompressedFilePath) {
            let uglifyJsFile = main.uglifyJsFile;
            let len = compressNames.length;
            let fileName;
            let fileData;
            var code = {};
            // JSON.stringify()
            for(var i = 0; i < len; i ++){
                fileName = compressNames[i];
                fileData = compressDatas[fileName];

                code[fileName] = fileData;
            }
            let res = uglifyJsFile(code);
            let fspath = outCompressedFilePath + "\\" + outCompressedFileName;
            fsUtil.writeFile(fspath, res);
        }
    }

    selectCompressFile = () => {
        let t = this;
        const dialog = electron.remote.dialog;
        dialog.showOpenDialog({
            properties: ['openFile']
        }).then(result => {
            let paths = result.filePaths;
            if (paths && paths.length > 0) {
                t.readFileData(paths[0]);
            }
        }).catch(err => {
            console.log(err);
        })
    }

    readFileData(path) {
        if (!path) {
            return;
        }
        let fileName;
        let filePath;
        let dirs;
        if (-1 != path.indexOf("/")) {
            dirs = path.split("/");
        } else {
            dirs = path.split("\\");
        }
        if (!dirs || dirs.length == 0) {
            return;
        }
        let len = dirs.length;
        fileName = dirs[len - 1];
        compressFiles[fileName] = path;
        if (-1 == compressNames.indexOf(fileName)) {
            compressNames.push(fileName);
        }
        if (!fileName) {
            return;
        }

        fsUtil.readTextFile(path, (data) => {
            compressDatas[fileName] = data;
        });

        len = compressNames.length;
        for (var i = 0; i < len; i++) {
            fileName = compressNames[i];
            filePath = compressFiles[fileName];
            switch (i) {
                case 0:
                    this.setState({ p1: filePath });
                    break;
                case 1:
                    this.setState({ p2: filePath });
                    break;
                case 2:
                    this.setState({ p3: filePath });
                    break;
                case 3:
                    this.setState({ p4: filePath });
                    break;
                case 4:
                    this.setState({ p5: filePath });
                    break;
            }

        }
    }

    onNameChange(event){
        outCompressedFileName = event.target.value
        this.setState({outFileName: outCompressedFileName});
    }
    handleChange1(event) {
        let path = event.target.value
        this.setState({p1: path});
    }
    handleChange2(event) {
        let path = event.target.value
        this.setState({p2: path});
    }
    handleChange3(event) {
        let path = event.target.value
        this.setState({p3: path});
    }
    handleChange4(event) {
        let path = event.target.value
        this.setState({p4: path});
    }
    handleChange5(event) {
        let path = event.target.value
        this.setState({p5: path});
    }
    handleChange6(event) {
        let path = event.target.value
        outCompressedFilePath = path;
        this.setState({outFilePath: outCompressedFilePath});
    }

    electCompressOutFiles = () => {
        let t = this;
        dialog.showOpenDialog({
            properties: ['openDirectory']
        }).then(result => {
            let paths = result.filePaths;
            if (paths && paths.length > 0) {
                outCompressedFilePath = paths[0];
                t.setState({outFilePath:outCompressedFilePath});
            }
        }).catch(err => {
            console.log(err);
        })
    }


    render() {
        let t = this;
        return (
            <div className="filefDiv">
                <p>
                    <span>选择压缩文件：</span>
                    <input type="text" placeholder="选择文件【必选】" value={this.state.p1} onChange={t.handleChange1}></input>
                    <button onClick={this.selectCompressFile}>浏览</button><br></br>
                    <span>选择压缩文件：</span>
                    <input type="text" placeholder="选择文件【必选】" value={t.state.p2} onChange={t.handleChange2}></input>
                    <button onClick={this.selectCompressFile}>浏览</button><br></br>
                    <span>选择压缩文件：</span>
                    <input type="text" placeholder="选择文件【可选】" value={t.state.p3} onChange={t.handleChange3}></input>
                    <button onClick={this.selectCompressFile}>浏览</button><br></br>
                    <span>选择压缩文件：</span>
                    <input type="text" placeholder="选择文件【可选】" value={t.state.p4} onChange={t.handleChange4}></input>
                    <button onClick={this.selectCompressFile}>浏览</button><br></br>
                    <span>选择压缩文件：</span>
                    <input type="text" placeholder="选择文件【可选】" value={t.state.p5} onChange={t.handleChange5}></input>
                    <button onClick={this.selectCompressFile}>浏览</button><br></br>
                    <span>压缩输出目录：</span>
                    <input type="text" placeholder="选择文件【必选】" value={t.state.outFilePath} onChange={t.handleChange6}></input>
                    <button onClick={this.electCompressOutFiles}>浏览</button><br></br>
                </p>
                <p>
                    <span>压缩后文件名称：</span>
                    <input type="text" placeholder="输出文件" value={t.state.outFileName} onChange={t.onNameChange}></input><br></br>
                    <button onClick={t.onCompressTest}>压缩测试</button>
                </p>
            </div>
        )
    }
}


export default JsUglifyJS

