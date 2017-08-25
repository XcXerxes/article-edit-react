import React from 'react';
import App from '../App';
import Home from '../contains/Home'
import Login from '../contains/Login'
import ViewArticle from '../contains/View-article'
import {
  HashRouter as Router,
  Route
} from 'react-router-dom' 

const Routes = ({match}) =>(
  <Router>
    <App>
      <Route exact path="/" component={Login}/>
      <Route path={match} component={Home}/>
      <Route path="/article/:id" component={ViewArticle}/>
    </App> 
  </Router>
)

export default Routes