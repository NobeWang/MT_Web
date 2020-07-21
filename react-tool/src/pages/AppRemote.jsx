import React from 'react';
const electron = window.electron;

/**
 * remote 模块提供了一种在渲染进程（网页）和主进程之间进行进程间通讯（IPC）的简便途
 * ipcRenderer 模块是一个 EventEmitter 类的实例. 它提供了有限的方法，你可以从渲染进程向主进程发送同步或异步消息. 也可以收到主进程的相应
 * Electron中, 与GUI相关的模块（如 dialog, menu 等)只存在于主进程，而不在渲染进程中 
 * 为了能从渲染进程中使用它们，需要用ipc模块来给主进程发送进程间消息
 * 使用 remote 模块，可以调用主进程对象的方法，而无需显式地发送进程间消息
 */

const foo = electron.remote.require('./src/main/fileUtilPM');
const main= electron.remote.require('./main');
class AppRemote extends React.Component{
    onSelectFile=()=>{
        let add = main.add;
        let max = main.max;
        let m = max(10, 20);
        console.log("max in main  "+m);
        let p = add(10, 20);
        console.log("add in main  "+p);

        let selectFile = foo.selectFile;
        selectFile();
    }

    onReadFile=()=>{
        let rootPath = main.rootPath;
        console.log("rootPath     "+rootPath);

        let readMeFile = foo.readMeFile;
        readMeFile(rootPath+"\\README.md");
    }


    render(){
        return(
            <div className="login">
                <div className="main">
                   <p><button onClick={ this.onSelectFile }>主进程选择文件</button></p>
                   <p><button onClick={ this.onReadFile }>主进程读取文件</button></p>
                </div>
            </div>
        )
    }
}

export default AppRemote;