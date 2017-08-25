import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import PropTypes from 'prop-types'
import {
  Link
} from 'react-router-dom'

export default class ArticleMenu extends Component {
  static propTypes = {
    theme: PropTypes.string,
    defaultOpenKeys: PropTypes.array,
    selectedKeys: PropTypes.array,
    className: PropTypes.string,
    mode: PropTypes.string,
  };
  constructor(args) {
    super(args)
    this.state = {
      current: 'home',
      openKeys: []
    }
  }
  clickHandler = (e) => {
    this.setState({
      current: e.key,
    });
  }


  articleClick = (e) => {
    const { history } = this.props
    if (e.target.hash.replace('#', '') === history.location.pathname) {
      return false
    }
  }
  issueClick = (e) => {
    const { history } = this.props
    if (e.target.hash.replace('#', '') === history.location.pathname) {
      return false
    }
  }

  onOpenChange = (openKeys) => {
    const state = this.state;
    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    this.setState({ openKeys: nextOpenKeys });
  }
  render() {
    return (
      <Menu
        style={{ width: 210, height: '100%' }}
        theme="dark"
        defaultOpenKeys={[this.state.current]}
        selectedKeys={[this.state.current]}
        mode="inline"
        onClick={this.clickHandler}
      >
        <Menu.Item key="home">
          <Link to="/article" onClick={this.articleClick}><Icon type="home" />文章列表</Link>
        </Menu.Item>
        <Menu.Item key="issue">
          <Link to="/issue" onClick={this.issueClick}><Icon type="exception" />发布文章</Link>
        </Menu.Item>
      </Menu>
    )
  }
}