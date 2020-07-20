import React from 'react';
import Home from './pages/Home'
import Mine from './pages/Mine'
import PageGoBack from './pages/PageGoBack'
import FilePage from './pages/FilePage'
import JSCallPage from './pages/JsPage'
import JSCallPage2 from './pages/JsPage2'
import WordFilter from './pages/WordFilter'
import AppIpc from './pages/AppIpc'

import {
  HashRouter  as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function LinkPage(){
  return (<div>
            <ul>
                <li><Link to='/home'>Home页面</Link></li>
                <li><Link to='/mine'>Mine页面</Link></li>
                <li><Link to='/pageback'>PageGoBack页面</Link></li>
                <li><Link to='/filepage'>本地文件操作页面</Link></li>
                <li><Link to='/jspage'>JS调用页面</Link></li>
                <li><Link to='/jspage2'>JS调用页面2</Link></li>
                <li><Link to='/wordfilter'>屏蔽字库</Link></li>
                <li><Link to='/appipc'>进程交互</Link></li>
              </ul>
          </div>)
}

function App() {
  return (
    <div className="App">
      <Router>
        <LinkPage></LinkPage>
        <Route path='/home' component={Home}></Route>
        <Route path='/mine' component={Mine} ></Route>
        <Route path='/pageback' component={PageGoBack} ></Route>
        <Route path='/filepage' component={FilePage} ></Route>
        <Route path='/jspage' component={JSCallPage} ></Route>
        <Route path='/jspage2' component={JSCallPage2} ></Route>
        <Route path='/wordfilter' component={WordFilter} ></Route>
        <Route path='/appipc' component={AppIpc} ></Route>
      </Router>
    </div>
  );
}
export default App;
