import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Card, List, Input } from 'antd';

import { Link } from 'dva/router'

import styles from './CoverCardList.less';


/* eslint react/no-array-index-key: 0 */
@Form.create()
@connect(state => ({
  list: state.list,
}))
export default class instancelist extends PureComponent {
  componentWillMount() {
      this.setState({
      list: [{
        title: 'tensorflow',
        cover: 'https://gw.alipayobjects.com/zos/rmsportal/HrxcVbrKnCJOZvtzSqjN.png',
        subDescription: '深度学习框架',
      },
        {
          title: 'tensorflow-cluster',
          cover: 'https://gw.alipayobjects.com/zos/rmsportal/alaPpKWajEbIYEUvvVNf.png',
          subDescription: '深度学习分布式',
        }],
      loading: false,
    })
  }
  clickCard = (value)=>{
    console.log(value)
  }
  handleTabChange = (key) => {
  }

  render() {
    const { list, loading } = this.state;

    const cardList = list ? (
      <List
        rowKey="id"
        loading={loading}
        grid={{ gutter: 24, lg: 4, md: 3, sm: 2, xs: 1 }}
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Link to="/form/advanced-form">
            <Card
              hoverable
              className={styles.card}
              cover={<img alt={item.title} src={item.cover} />}
            >
              <Card.Meta
                title={item.title}
                description={item.subDescription}
              />
            </Card>
            </Link>
          </List.Item>
        )}
      />
    ) : null;

    return (
          <div className={styles.cardList} style={{height:'86%'}}>
            {cardList}
          </div>
    );
  }
}
