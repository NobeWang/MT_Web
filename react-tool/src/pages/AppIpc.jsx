import React from 'react';
const electron = window.electron;
const {ipcRenderer} = electron;

/**
 * 在main.js主进程中是没有window对象，所以不能像其他web程序一样把全局变量存储在window里面进行传递
 * window只存在于web页面，即react应用程序的渲染界面中，例如以下输出window对象是存在的
 * 所以通过window对象来实现electron主进程与react页面渲染进程之间的通讯是行不通的
 * 
 * electron主进程能够通过nodejs操作系统文件，但是在react页面渲染进程里无法实现
 * 
 * ipcRenderer 模块是一个 EventEmitter 类的实例. 它提供了有限的方法，你可以从渲染进程向主进程发送同步或异步消息. 也可以收到主进程的相应
 */
class AppIpc extends React.Component{
    closeWindow=()=>{
        window.close();
    }
    minWindow=()=>{
        // ipcRenderer.send("min","minWindow");
        //在渲染进程中是有window对象的
        console.log("渲染进程或者是web页面中的window对象=============================》》》："+window);
        console.log("===============================》》》：发送min消息"+window);

        
        console.log("渲染进程或者是web页面中的electron对象=============================》》》："+electron);
        
        ipcRenderer.send("min","minWindow");
    }


    render(){
        return(
            <div className="login">
                <div className="top">
                    <div className="top-right">
                    <button onClick={ this.closeWindow }>关闭界面</button>
                    </div>
                    <div className="top-center">
                        云直播
                    </div>
                </div>
                <div className="main">
                    <div className="main-content">
                    <button onClick={ this.minWindow }>缩小界面</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AppIpc;