import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Card, Tabs, Table, Radio, DatePicker, Tooltip, Menu, Dropdown } from 'antd';
import numeral from 'numeral';
import {
  ChartCard, yuan, MiniArea, MiniBar, MiniProgress, Field, Bar, Pie, TimelineChart,
} from '../../components/Charts';
import Trend from '../../components/Trend';
import NumberInfo from '../../components/NumberInfo';
import { getTimeDistance } from '../../utils/utils';

import styles from './Analysis.less';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `工专路 ${i} 号店`,
    total: 323234,
  });
}

@connect(state => ({
  chart: state.chart,
}))
export default class Analysis extends Component {
  state = {
    loading: true,
    salesType: 'all',
    currentTabKey: '',
    rangePickerValue: [],
    pieValue:[],
  }
  componentWillMount() {
    this.setState({
      pieValue:[
        {'x':'DeepLearning','y':4},
        {'x':'Tensorflow-Cluster','y':7},
        {'x':'Spark','y':6},
        {'x':'Centos','y':8},
        {'x':'Spark-Cluster','y':2},
      ]
    })
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'chart/fetch',
    }).then(() => this.setState({ loading: false }));
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
  }

  handleChangeSalesType = (e) => {
    this.setState({
      salesType: e.target.value,
    });
  }

  handleTabChange = (key) => {
    this.setState({
      currentTabKey: key,
    });
  }

  handleRangePickerChange = (rangePickerValue) => {
    this.setState({
      rangePickerValue,
    });

    this.props.dispatch({
      type: 'chart/fetchSalesData',
    });
  }

  selectDate = (type) => {
    this.setState({
      rangePickerValue: getTimeDistance(type),
    });

    this.props.dispatch({
      type: 'chart/fetchSalesData',
    });
  }

  isActive(type) {
    const { rangePickerValue } = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return;
    }
    if (rangePickerValue[0].isSame(value[0], 'day') && rangePickerValue[1].isSame(value[1], 'day')) {
      return styles.currentDate;
    }
  }

  render() {
    const {  salesType, loading } = this.state;
    const { chart } = this.props;
    const {
      visitData,
      searchData,
      salesTypeData,
      salesTypeDataOnline,
      salesTypeDataOffline,
    } = chart;

    const salesPieData = salesType === 'all' ?
      salesTypeData
      :
      (salesType === 'online' ? salesTypeDataOnline : salesTypeDataOffline);


    const columns = [
      {
        title: '应用名',
        dataIndex: 'index',
        key: 'index',
        render: text => <a href="/">{text}</a>,
      },
      {
        title: '运行状态',
        dataIndex: 'keyword',
        key: 'keyword',
      },
      {
        title: '创建时间',
        dataIndex: 'count',
        key: 'count',
        sorter: (a, b) => a.count - b.count,
        className: styles.alignRight,
      },
      {
        title: '机时',
        dataIndex: 'range',
        key: 'range',
        sorter: (a, b) => a.range - b.range,
        className: styles.alignRight,
      },
    ];

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 24 },
    };
    return (
      <div>
        <Row gutter={24}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="应用总数"
              action={<Tooltip title="您所创建的所有实例应用"><Icon type="info-circle-o" /></Tooltip>}
              total="23个"
              footer={<Field label="今日创建：" value="1个" />}
              contentHeight={46}
            >
              <MiniBar
                height={46}
                data={visitData}
              />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="总机时"
              action={<Tooltip title="使用所有实例运行时间总和"><Icon type="info-circle-o" /></Tooltip>}
              total="103小时"
              footer={<Field label="今日机时：" value='1小时30分钟' />}
              contentHeight={46}
            >
              <MiniArea
                color="#975FE4"
                height={46}
                data={visitData}
              />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="运行实例"
              action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
              total='5个'
              footer={<Field label="今日运行" value='2个' />}
              contentHeight={46}
            >
              <MiniBar
                height={46}
                data={visitData}
              />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="周机时"
              total="10小时"
              footer={
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                  <Trend flag="up" style={{ marginRight: 16 }}>
                    周同比<span className={styles.trendText}>12%</span>
                  </Trend>
                </div>
              }
              contentHeight={46}
            >
              <MiniProgress percent={46} strokeWidth={8} target={78} color="#13C2C2" />
            </ChartCard>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              bordered={false}
              title="应用列表"
              style={{ marginTop: 24 }}
            >
              <Table
                rowKey={record => record.index}
                columns={columns}
                dataSource={searchData}
                pagination={{
                  style: { marginBottom: 27 },
                  pageSize: 5,
                }}
              />
            </Card>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              className={styles.salesCard}
              bordered={false}
              title="应用类别占比"
              bodyStyle={{ padding: 24 }}
              style={{ marginTop: 24, minHeight: 509 }}
            >
              <h4 style={{ marginTop: 8, marginBottom: 32 }}/>
              <Pie
                hasLegend
                subTitle="应用类别"
                total='23个'
                data={this.state.pieValue}
                height={248}
                lineWidth={4}
              />
            </Card>
          </Col>
        </Row>

      </div>
    );
  }
}
