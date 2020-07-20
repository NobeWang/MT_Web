import React, { Component } from 'react'
const PageGoBack = (porps) => {
    const onBackClick = () => {
        let curr = porps.history.location.pathname;
        console.log("a====================》》》："+curr);

        // let home = '/home';
        // let mine = '/mine';
        // let page1 = '/page1';
        // if(curr == page1){
        //   porps.history.replace(mine) // 上一次页面不存在
        // } else {
        //   porps.history.replace(home) // 上一次页面不存在
        // }

        porps.history.goBack();
    }
    return (
        <div>
            <p>this is PageGoBack</p>
            <button onClick={ onBackClick }>返回</button>
        </div>
    )
}
export default PageGoBack
