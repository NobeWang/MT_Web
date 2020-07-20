var PI = Math.PI;

var getLength = function (r) {
  return 2 * r * PI;
};

function getCircleArea(r){
    return r * r * PI;
}

// export function drawCircle(){
// }

// export const m = 100;

//文件中用了module.exports之后，就不能再用export导出函数或者变量了，两者不能共存
//如上面两个注释打开后就会报错


module.exports.PI = PI;
module.exports.getLength = getLength;
module.exports.getCircleArea = getCircleArea;
