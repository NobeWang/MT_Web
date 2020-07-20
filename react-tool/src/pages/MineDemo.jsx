import React, { Component } from 'react'
import { withRouter } from "react-router-dom"; // 不调取这个this.props为空对象
class MineDemo extends Component {
    constructor(props) {
        super(props);
        console.log(this)
    }
    sssss() {
        console.log(this.props)
        this.props.history.push('/home')
    }

    render() {
        return (
            <div>
                this is MineDemo
                <div onClick={ this.sssss.bind(this) }>回到home</div>
            </div>
        )
    }
}

export default withRouter(MineDemo)
// export default MineDemo
