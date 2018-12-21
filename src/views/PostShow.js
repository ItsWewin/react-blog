import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { Row, Col, Icon, Modal } from 'antd';
const confirm = Modal.confirm;
import Index from '../layouts/Index';
import { Link } from 'react-router-dom';
import * as HttpHandler from '../conserns/HttpHandler';
import Style from '../layouts/post_show_area.scss';
import createHistory from "history/createBrowserHistory";
const history = createHistory({basename: "/", forceRefresh: true});

class PostShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      load_succeed: false,
      article_id: this.props.match.params.id,
      article: {category_id: this.props.match.params.category_id},
      access_token: sessionStorage.getItem('access_token'),
      can_manage: false,
    }
  }

  callback = (data) => {
    if(data['status'] === 1) {
      this.setState({load_succeed: true, can_manage: data['can_manage'], article: data['article']});
    }
  }

  componentWillMount(){
    const url = `api/articles/${this.state.article_id}?access_token=${this.state.access_token}`;
    HttpHandler.GetHandler(url, this.callback);
  }

  deleteCallback = (data) => {
    if(data['status'] === 1) {
      history.push('/');
    }
  }

  showDeleteConfirm = () => {
    confirm({
      title: '确定删除当前文章？',
      content: '删除后将不会恢复，请谨慎操作',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        const url = `api/articles/${this.state.article_id}?access_token=${this.state.access_token}`;
        HttpHandler.DeleteHandler(url, this.deleteCallback);
      }
    });
  }

  render() {
    const article_show = this.state.load_succeed
    ? <Row>
        <div className='title'>
          {this.state.article.title}
          {
            this.state.can_manage &&
            <span>
              <Link to={`/psot_edit/${this.state.article_id}`} className='post-edit'>
                <Icon type="edit" />
              </Link>
              <a onClick={this.showDeleteConfirm} className="post-delete">
                <Icon type="delete"></Icon>
              </a>
            </span>
          }
        </div>
        <div className='content'><ReactMarkdown source={this.state.article.content}/></div>
      </Row>
    : <Row>
        <div>加载中....</div>
      </Row>

    return(
      <Index>
        <Row>
          <Col span={4}></Col>
          <Col span={12} className="post-show-area">
            {article_show}
          </Col>
          <Col span={6}>
          </Col>
          <Col span={2}></Col>
        </Row>
      </Index>
    )
  }
}

export default PostShow;
