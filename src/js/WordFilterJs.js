
    var data1;
    var data2;
    var qeInputValue;

    function qeInput() {
        var value = qeInputValue;
        //不能 输入非数字
        value = value.replace(/[^0-9]/g, "");
        value = sliceArr(value); //两位一组排成新数组
        // 去重
        Array.prototype.reArr = function () {
            var newArr = [];
            for (var i = 0; i < this.length; i++) {
                if (newArr.indexOf(this[i]) == -1) {
                    newArr.push(this[i]);
                }
            }
            return newArr;
        };
        value = value.reArr(); //数组去重
        let array = value;
        //每两位数字之间搁一个空格
        let result = [];
        for (let i = 0; i < value.length; i++) {
            result.push(" " + value[i]);
        }

        qeInputValue = result.join(""); //数组变成字符串
        // console.log(array)
    }


    // 处理数字
    export function dealNum(item) {
        // item = item.replace(/[^0-9]/g, ""); //不能 输入非数字
        // item = this.sliceArr(item); //两位一组排成新数组

        // var ssss = "aeedee-1ddeee";
        // var b = this.HasDigit(ssss);
        // console.log(b);

        // var ssss = "二-(1-羟基环己基)过氧化物[含量≤100%]";
        // var b = this.removes1(ssss);

        item = remove2(item);
        // console.log(item);

        var l = "\r\n";
        var items = item.split(l);
        var newItems = [];
        var s;
        for (var i = 0; i < items.length; i++) {
            s = items[i];

            s = removes1(s);

            if (-1 != s.indexOf("-")) {
                var arr = s.split("-");
                for (var j = 0; j < arr.length; j++) {
                    var ss = arr[j];
                    if (!HasDigit(ss)) {
                        if (newItems.indexOf(ss) == -1) {
                            newItems.push(ss);
                        }
                    }
                }
                continue;
            }

            if (newItems.indexOf(s) == -1) {
                newItems.push(s);
            }
        }

        data1 = newItems;

        // var outStr = newItems.join(l);

        // console.log(outStr);

        //每两位数字之间搁一个空格
        // let result = [];
        // for (let i = 0; i < item.length; i++) {
        //   result.push(" " + item[i]);
        // }

        // item = result.join(""); //数组变成字符串
        // return item;
        console.log(data1);
    }

    export function parseData2(str) {
        var p = /\，/g;
        str = str.replace(p, "、")
        var l = "\r\n";
        var items = str.split(l);
        var newItems = [];
        var s;
        for (var i = 0; i < items.length; i++) {
            s = items[i];
            var arr = s.split("、");
            for (var j = 0; j < arr.length; j++) {
                newItems.push(arr[j]);
            }
        }
        data2 = newItems;

        var p1 = /[a-zA-Z0-9]/;
        var p2 = /[一二三四五六七八九十]/;

        var datas = [];
        var word;
        for (var i = 0; i < data1.length; i++) {
            word = data1[i];
            if (-1 == datas.indexOf(word) && "" != word) {
                if (word.length == 1) {
                    if (p1.test(word)) {
                        continue;
                    }
                    if (p2.test(word)) {
                        continue;
                    }
                }
                datas.push(word);
            }
        }

        for (var i = 0; i < data2.length; i++) {
            word = data2[i];
            if (-1 == datas.indexOf(word) && "" != word) {
                if (word.length == 1) {
                    if (p1.test(word)) {
                        continue;
                    }
                    if (p2.test(word)) {
                        continue;
                    }
                }
                datas.push(word);
            }
        }

        var outStr = datas.join(l);
        console.log(outStr);
    }

    export function parseData3(str) {
        var l = "\r\n";
        var items = str.split(l);
        var m = items.length / 5;
        for (var i = 0; i < 5; i++) {
            var start = i * m;
            var end = (i + 1) * m;
            var arr = items.slice(start, end);
            var outStr = arr.join(",") + l;
            console.log(outStr);
        }
    }

    function remove2(content) {
        var p1 = /([0-9.]+)[ ]*%/g;//匹配百分比的正则表达式
        var p2 = /[＜＞≥≤]/g;//匹配所有的比较运算符
        var p3 = /含量/g;
        var p4 = /\[\]/g;

        var p5 = /\[/g;
        var p6 = /\]/g;
        var p7 = /\(/g;
        var p8 = /\)/g;
        var p9 = /\,/g;
        var p10 = /\，/g;
        var p11 = /\、/g;
        var b = p1.test(content);
        b = p2.test(content);
        b = p3.test(content);
        content = content.replace(p1, "")
        content = content.replace(p2, "")
        content = content.replace(p3, "")
        content = content.replace(p4, "")

        content = content.replace(p5, "-")
        content = content.replace(p6, "-")
        content = content.replace(p7, "-")
        content = content.replace(p8, "-")
        content = content.replace(p9, "-")
        content = content.replace(p10, "-")
        content = content.replace(p11, "-")
        return content;
    }

    //去除小括号
    function removes1(content) {
        var p2 = /\[.*\]/
        var p1 = /\(.*\)/
        var b = p1.test(content);
        while (b) {
            content = content.replace(p1, "")
            b = p1.test(content);
        }
        b = p2.test(content);
        while (b) {
            content = content.replace(p2, "")
            b = p2.test(content);
        }
        return content;
    }

    function HasDigit(content) {
        var flag = false;
        var p = /[0-9]+/;
        if (p.test(content)) {
            flag = true;
        }
        return flag;
    }
    //两位一组排成新数组
    function sliceArr(item) {
        let arr = [];
        if (item.length <= 1) {
            arr.push(item);
            return arr;
        }
        for (let i = 0; i < item.length; i++) {
            if (i % 2 === 0) {
                let str = "";
                str = item.charAt(i) + item.charAt(i + 1);
                arr.push(str);
            }
        }
        return arr;
    }


    // module.exports.dealNum = dealNum;
    // module.exports.parseData2 = parseData2;
    // module.exports.parseData3 = parseData3;