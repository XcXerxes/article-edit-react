import React,{Component} from 'react'
import  moment from 'moment'
import {Table} from 'antd'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

const {Column}  = Table
export default class ArticleTable extends Component{
  static propTypes = {
    title: PropTypes.string,
    dataIndex: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    hasFeedback: PropTypes.bool,
    className: PropTypes.string,
    key: PropTypes.string,
  }
  action = (text,record) =>{
    return (
      <span>
        <Link to={{pathname:`/article/${text.id}`}}>查看</Link>
        <span className="ant-divider" />
        <a href="#"  onClick={(event)=>this.deleteArticle(event,text)}>删除</a>
      </span>
    )
      
  }

  deleteArticle = (event,text)=>{
    event.preventDefault();
    this.props.deleteArticle(text.id,this.props.current)
  }

  render(){ 
    /*const {data} = this.props*/
    return (
      <Table {...this.props} rowKey={record => record.createDate} onChange={(pagination)=>this.props.tableChange(pagination)}
          scroll={{ x: '100%', y: 260 }}
        >
        <Column 
          title='文章标题'
          dataIndex="title"
          key="title"
          className="column-article"
          width='300px'
          fixed="left"
        />
        <Column 
          title='所属栏目'
          dataIndex="label"
          key="label"
          className="column-article"
          width='160px'
          fixed="left"
        />
        <Column 
          title='发布时间'
          key="createDate"
          className="column-article"
          render={(text,record)=> moment(text.createDate).format('YYYY-MM-DD HH:mm:ss')}
          fixed="left"
        />
        <Column 
          title='管理'
          key="action"
          className="column-article"
          render={this.action}
          fixed="left"
        />
        
      </Table>
    )
  }
}