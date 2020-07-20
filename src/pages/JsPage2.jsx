import React, { Component } from 'react'

import {a, dogSay, catSay, babySay} from '../js/ExportJs'; //导出了 export 方法 
import m from '../js/ExportJs';  //导出了 export default 

 
// var mathUtil = require('../js/ExportMoudle');


//使用这种导入方式的时候ExportJs中不能加任何export function aaa的函数导出声明
import * as mathUtil from "../js/ExportMoudle"

/**
 * react调用外部js文件
 */
class JSCallPage extends React.Component {
    excuteJs1() {
        console.log(a);
        dogSay();
        catSay();
        babySay();
        console.log(m);

        
        console.log(mathUtil.PI);
        console.log("周长："+mathUtil.getLength(100));
        console.log("面积："+mathUtil.getCircleArea(100));

        // console.log(testModule.m); // undefined , 因为  as 导出是 把 零散的 export 聚集在一起作为一个对象，而export default 是导出为 default属性。
        // console.log(testModule.default); // 100
    }

    render() {
        return (
            <div>
                <p>js文件的导出与导入</p>
                <div>import * as xxx from</div>
                <button onClick={ this.excuteJs1 }>调用外部js函数</button>
            </div>
        )
    }
}


export default JSCallPage
