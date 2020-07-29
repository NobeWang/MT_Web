import React, { Component } from 'react'
const electron = window.electron;
let fsfile = require('../js/fileCompress');
const dialog = electron.remote.dialog;
let fsUtil = require('../utils/FileUtil');
const main= electron.remote.require('./main');

let jsReleasePath;//
let assetsPath;//
let outPublicPath;//
let webFileName="web";//
let versionFileName="ver";//
let needAddPackage;//

let outCompressPath;
let compressFilePath;

let readData;

class JSCompress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                    p1:"",
                    p2:"",
                    p3:"",
                    p4:webFileName,
                    p5:versionFileName,
                    p6:outCompressPath,
                    p7:compressFilePath
                };

        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.handleChange4 = this.handleChange4.bind(this);
        this.handleChange5 = this.handleChange5.bind(this);
        this.handleChange6 = this.handleChange6.bind(this);
        this.handleChange7 = this.handleChange7.bind(this);
        this.onpublic = this.onpublic.bind(this);
      }
    selectReleaseFiles = () => {
        let t = this;
        dialog.showOpenDialog({
            properties: ['openDirectory']
        }).then(result => {
            let paths = result.filePaths;
            if (paths && paths.length > 0) {
                jsReleasePath = paths[0];
                t.setState({p1:jsReleasePath});
            }
        }).catch(err => {
            console.log(err);
        })
    }

    selectAssetsFiles = () => {
        let t = this;
        dialog.showOpenDialog({
            properties: ['openDirectory']
        }).then(result => {
            let paths = result.filePaths;
            if (paths && paths.length > 0) {
                assetsPath = paths[0];
                t.setState({p2:assetsPath});
            }
        }).catch(err => {
            console.log(err);
        })
    }
    selectOutFiles = () => {
        let t = this;
        dialog.showOpenDialog({
            properties: ['openDirectory']
        }).then(result => {
            let paths = result.filePaths;
            if (paths && paths.length > 0) {
                outPublicPath = paths[0];
                t.setState({p3:outPublicPath});
            }
        }).catch(err => {
            console.log(err);
        })
    }

    electCompressOutFiles = () => {
        let t = this;
        dialog.showOpenDialog({
            properties: ['openDirectory']
        }).then(result => {
            let paths = result.filePaths;
            if (paths && paths.length > 0) {
                outCompressPath = paths[0];
                t.setState({p6:outCompressPath});
            }
        }).catch(err => {
            console.log(err);
        })
    }

    handleChange1(event) {
        jsReleasePath = event.target.value
        this.setState({p1: jsReleasePath});
    }
    handleChange2(event) {
        assetsPath = event.target.value
        this.setState({p2: assetsPath});
    }
    handleChange3(event) {
        outPublicPath = event.target.value
        this.setState({p3: outPublicPath});
    }
    handleChange4(event) {
        webFileName = event.target.value
        this.setState({p4: webFileName});
    }
    handleChange5(event) {
        versionFileName = event.target.value
        this.setState({p5: versionFileName});
    }
    handleChange6(event) {
        outCompressPath = event.target.value
        this.setState({p6: outCompressPath});
    }
    handleChange7(event) {
        compressFilePath = event.target.value
        this.setState({p7: compressFilePath});
    }


    checkParams(){
        console.log("jsReleasePath："+jsReleasePath);
        console.log("assetsPath"+assetsPath);
        console.log("outPublicPath"+outPublicPath);
        console.log("webFileName"+webFileName);
        console.log("versionFileName"+versionFileName);

        if(!jsReleasePath || jsReleasePath == ""){
            console.error("程序目录不能为空");
            return false;
        }
        if(!assetsPath || assetsPath == ""){
            console.error("资源目录不能为空");
            return false;
        }
        if(!outPublicPath || outPublicPath == ""){
            console.error("发布目录不能为空");
            return false;
        }
        if(!webFileName || webFileName == ""){
            console.error("打包目录不能为空");
            return false;
        }
        if(!versionFileName || versionFileName == ""){
            console.error("增量版本不能为空");
            return false;
        }
        return true;
    }

    onpublic(){
        let hasPath = this.checkParams();
        if(hasPath){
            fsfile.configFilePaths(jsReleasePath, assetsPath, outPublicPath, webFileName, versionFileName);
            fsfile.mergeJs();
        }
    }

    onCompressTest(){
        if(readData){
            let uglifyJsFile = main.uglifyJsFile;
            let res = uglifyJsFile(readData);
            let fspath = outPublicPath + "\\123.txt";
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
                compressFilePath = paths[0];
                console.log(compressFilePath);
                // t.setState({p7:compressFilePath});
                fsUtil.readTextFile(compressFilePath, (data)=>{
                    readData = data;
                });
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
                    <span>选择程序目录：</span>
                    <input type="text" placeholder="程序目录" value={t.state.p1} onChange={t.handleChange1}></input>
                    <button onClick={this.selectReleaseFiles}>浏览</button><br></br>
                    <span>选择资源目录：</span>
                    <input type="text" placeholder="资源目录" value={t.state.p2} onChange={t.handleChange2}></input>
                    <button onClick={this.selectAssetsFiles}>浏览</button><br></br>
                    <span>选择发布目录：</span>
                    <input type="text" placeholder="发布目录" value={t.state.p3} onChange={t.handleChange3}></input>
                    <button onClick={this.selectOutFiles}>浏览</button><br></br>
                    <span>版本打包目录：</span>
                    <input type="text" value={t.state.p4} onChange={t.handleChange4}></input><br></br>
                    <span>版本增量目录：</span>
                    <input type="text" value={t.state.p5} onChange={t.handleChange5}></input><br></br>
                    <button onClick={t.onpublic}>发布项目</button><br></br>
                </p>
                <p>
                    <span>选择压缩文件：</span>
                    <input type="text" placeholder="选择文件" value={t.state.p7} onChange={t.handleChange7}></input>
                    <button onClick={this.selectCompressFile}>浏览</button><br></br>
                    <span>压缩输出文件：</span>
                    <input type="text" placeholder="选择文件" value={t.state.p6} onChange={t.handleChange6}></input>
                    <button onClick={this.electCompressOutFiles}>浏览</button><br></br>

                    <button onClick={t.onCompressTest}>压缩测试</button>
                </p>
            </div>
        )
    }
}


export default JSCompress

