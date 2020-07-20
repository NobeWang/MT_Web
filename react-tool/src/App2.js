import {BrowserRouter as Router, Route, Link, NavLink, Switch, Redirect} from 'react-router-dom';
import React, { Component, Fragment } from 'react'

class App2 extends Component {
  static defaultProps = {
    params: '哈哈'
  }
  constructor(props) {
    super(props)
    this.state = {}
  }
  // 继承这个react的基类，才能有render()
  render() {
    return (
      <Fragment>
        <Router>  
            <p><Link to="/about/page1">page1</Link></p>
            <p><Link to="/about/page2">page2</Link></p>
            <p><NavLink className="menu-link" activeClassName="active" exact activeStyle={{color: '#fff'}} to='/home'>首页</NavLink></p>
            <p><NavLink activeClassName={'active'} activeClassName="active"  to="/about">跳转到about</NavLink></p>
            <Switch>
              <Redirect from="/" to="/home" exact></Redirect>
              <Route path="/home" exact component={() => <div>This is HOME page</div>}/>
              <Route path="/about" component={() => <div>{this.props.children}</div>}>
                  <Switch>
                      <Redirect from="/about" to="/about/page1" exact></Redirect>

                      <Route path="/about/page1" exact component={() => <div>this is about-page-1 hello</div>}/>
                      <Route path="/about/page2" exact component={() => <div>this is about-page-2 world</div>}/>
                  </Switch>
              </Route>
            </Switch>
        </Router>
      </Fragment>
    )
  }
}
export default App2;