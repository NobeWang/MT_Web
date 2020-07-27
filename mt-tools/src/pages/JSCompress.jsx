import React, { Component } from 'react'
const electron = window.electron;
let fsfile = require('../js/gulpfileaaaa');
const dialog = electron.remote.dialog;

let jsReleasePath;//
let assetsPath;//
let outPublicPath;//
let webFileName="web";//
let versionFileName="ver";//
let needAddPackage;//



class JSCompress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                    p1:"",
                    p2:"",
                    p3:"",
                    p4:webFileName,
                    p5:versionFileName,
                    p6:""
                };

        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.handleChange4 = this.handleChange4.bind(this);
        this.handleChange5 = this.handleChange5.bind(this);
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

    render() {
        let t = this;
        return (
            <div className="filefDiv">
                <div className="filefDiv-content">
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

                </div>
                <div className="fileDivs-content">
                    <button onClick={t.onpublic}>选择文件</button>
                </div>
            </div>
        )
    }
}


export default JSCompress

