import React from 'react';
import Home from './pages/Home'
import JSCompress from './pages/JSCompress'
import JsUglifyJS from './pages/JsUglifyJS'

import {
  HashRouter  as Router,
  Route,
  Link
} from "react-router-dom";

function LinkPage(){
  return (<div>
            <ul>
                <li><Link to='/home'>工具说明</Link></li>
                <li><Link to='/jscompress'>文件压缩</Link></li>
                <li><Link to='/jsuglify'>压缩测试</Link></li>
              </ul>
          </div>)
}

function App() {
  return (
    <div className="App">
      <Router>
        <LinkPage></LinkPage>
        <Route path='/home' component={Home}></Route>
        <Route path='/jscompress' component={JSCompress}></Route>
        <Route path='/jsuglify' component={JsUglifyJS}></Route>
      </Router>
    </div>
  );
}
export default App;
