import React, { Component } from 'react'
import ArticleMenu from './Article-menu'
import ArticleHeader from './Article-header'
import PropTypes from 'prop-types'
import routes from '../router/routes'
import { Spin } from 'antd'
import {
  Route
} from 'react-router-dom'

class App extends Component {
  static propTypes = {
    className: PropTypes.string
  };

  constructor(args) {
    super(args)
    this.state = {
      spingLoading: true
    }
  }
  componentDidMount() {
    this.setState({ spingLoading: false })
  }
  render() {
    return (
      <Spin tip="加载中..." spinning={this.state.spingLoading}>
        <ArticleHeader history={this.props.history} />
        <ArticleMenu history={this.props.history}/>

        <div className="article-content">
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.main}
            />
          ))}
        </div>
      </Spin>
    )
  }
}

export default App;
