import React, { Component } from 'react'

import {dealNum, parseData2, parseData3} from '../js/WordFilterJs'

class WordFilter extends React.Component {
    jsReadFiles = (files) => {
        console.log("选择一个文件路径======================》》》：" + files);

        var file = files.target.files[0];

        console.log(file.type)
        var reader = new FileReader();//new一个FileReader实例
        if (/text+/.test(file.type)) {//判断文件类型，是不是text类型
            reader.onload = function () {
                console.log(this.result)
            }
            reader.readAsText(file);
        } else if (/image+/.test(file.type)) {//判断文件是不是imgage类型
            reader.onload = function () {
                console.log(this.result)
            }
            reader.readAsDataURL(file);
        }

    }

    loadFile1 = (files) => {
        var file = files.target.files[0];
        const reader = new FileReader();
        reader.onload = function () {
            dealNum(this.result);
        }
        reader.readAsText(file);
    }
    loadFile2 = (files) => {
        var file = files.target.files[0];
        const reader = new FileReader();
        reader.onload = function () {
            parseData2(this.result);
        }
        reader.readAsText(file);
    }
    loadFile3 = (files) => {
        var file = files.target.files[0];
        const reader = new FileReader();
        reader.onload = function () {
            parseData3(this.result);
        }
        reader.readAsText(file);
    }

    render() {
        return (
            <div>
                <p>屏蔽字库解析</p>
                <div>屏蔽字库自动导出</div>
                <input type="file" id="file" onChange={this.loadFile1.bind(this)}/>
                <input type="file" id="file" onChange={this.loadFile2.bind(this)}/>
                <input type="file" id="file" onChange={this.loadFile3.bind(this)}/>
            </div>
        )
    }
}


export default WordFilter
