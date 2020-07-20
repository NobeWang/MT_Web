import React, { Component } from 'react'
import MineDemo from './MineDemo'
import { withRouter } from 'react-router-dom'
class Mine extends React.Component{
    constructor(props){
        super(props)
    }
    clockebacl() {
        console.log(this.props)
        // porps.history.push('/home')  //上一次页面存在
        // this.props.history.replace('/home') // 上一次页面不存在
    }
    render() {
        return (
            <div>
                <p>this is Mine页面</p>
                <div onClick={ this.clockebacl.bind(this) }>Mine回到页面</div>
                <br></br>
                <MineDemo />
            </div>
        )
    }
}
export default Mine
