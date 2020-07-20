import React, { Component } from 'react'

/**
 * 本地文件操作
 * 这里调用的是react里面的FileReader
 */
class FilePage extends React.Component {
    selectFile() {
        console.log("选择一个文件路径======================》》》：");
    }

    jsReadFiles = (files) => {
        console.log("选择一个文件路径======================》》》："+files);

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

    render() {
        return (
            <div>
                <p>this is file selected</p>
                <div>选择一个本地文件</div>
                <input type="file" id="file" onChange={this.jsReadFiles.bind(this)} />
            </div>
        )
    }
}


export default FilePage

