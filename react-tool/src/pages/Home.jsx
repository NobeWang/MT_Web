import React, { Component } from 'react'
import { Prompt } from 'react-router-dom'
export default class Home extends Component {
    constructor(porps){
        super(porps)
        console.log(porps);
        this.state = {
            name:''
        }
    }
    chinfgh(e) {
        this.setState({
            name: e.target.value
        })
    }
    render() {
        return (
            <div>
                <p>this is home页面</p>
                <Prompt 
                    when = { !!this.state.name }
                    message = { '确定要离开吗？'}
                />
                <input type="text" value={this.state.name} onChange={this.chinfgh.bind(this)}/>
            </div>
        )
    }
}
