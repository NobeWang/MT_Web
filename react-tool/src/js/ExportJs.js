'use strict'


    // 通常exports方式使用方法是：
    // exports.[function name] = [function name]
    // moudle.exports方式使用方法是：
    // moudle.exports = [function name]
    // 这样使用两者根本区别是
    // **exports **返回的是模块函数
    // **module.exports **返回的是模块对象本身，返回的是一个类
    // 使用上的区别是
    // exports的方法可以直接调用
    // module.exports需要new对象之后才可以调用
    // module.exports对象内容就是一个[Function]，在javascript里面是一个类
    // 使用这样的好处是exports只能对外暴露单个函数，但是module.exports却能暴露一个类

    // require: node 和 es6 都支持的引入
    // export / import : 只有es6 支持的导出引入
    // module.exports / exports: 只有 node 支持的导出



//导出变量
export const a = 'pamars a';  
 
 //导出方法
export const dogSay = function(){ 
    console.log('wang wang');
}
 
 //导出方法第二种
function catSay(){
   console.log('miao miao'); 
}
export { catSay };

export function babySay(){
    console.log("mama");
}
 

//export default导出
const m = 10000;
export default m; 
//export defult const m = 100;// 这里不能写这种格式。
