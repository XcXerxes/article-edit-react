import React, { Component } from 'react';
//import Home from './contains/Home'
//import Login from './contains/Login'
import 'antd/dist/antd.css'; 
import './assets/css/reset.css';
import './assets/css/App.css';
import "../node_modules/react-quill/dist/quill.snow.css" 
class App extends Component {
  render() {
    return (
      <div className="App">
        {this.props.children}
      </div>
    );
  }
}

export default App;
