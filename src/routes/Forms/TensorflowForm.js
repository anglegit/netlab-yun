import React, { PureComponent } from 'react';
import { Card, Button, Form, Switch, Col, Row, DatePicker, TimePicker, Input, Select, Slider,Radio } from 'antd';
import { connect } from 'dva';
import FooterToolbar from '../../components/FooterToolbar';
import styles from './style.less';
const RadioGroup = Radio.Group;
const { Option } = Select;
const { RangePicker } = DatePicker;
const marks = {
  0: '0M',
  1024: '1G',
  2048: '2G',
  4096: '4G',
  10240:'10G'};
const fieldLabels = {
  name: '仓库名',
  url: '仓库域名',
  owner: '仓库管理员',
  approver: '审批人',
  dateRange: '生效日期',
  type: '仓库类型',
  name2: '任务名',
  url2: '任务描述',
  owner2: '执行人',
  approver2: '责任人',
  dateRange2: '生效日期',
  type2: '任务类型',
};

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

export default  class AdvancedForm extends PureComponent {
  state = {
    cpu: 1,
  }
  validate = () => {

  }
  onChangeCPU = (e) => {
    this.setState({
      cpu: e.target.value,
    });
  }
  onChangeGPU = () => {

  }

  render() {
    return (
      <div>
        <Card title="Tensorflow 应用创建" className={styles.card} bordered={false}>
          <Form hideRequiredMark>
            <Row gutter={16} type="flex" justify="space-around" align="middle">
              <Col lg={12} md={20} sm={24}>
                <Form.Item {...formItemLayout}
                           label="实例名称">
                    <Input placeholder="请输入实例名称" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} type="flex" justify="space-around" align="middle">
              <Col lg={12} md={20} sm={24}>
                <Form.Item {...formItemLayout}
                           label="CPU核数">
                  <RadioGroup onChange={this.onChangeCPU} value={this.state.cpu}>
                    <Radio value={1}>1核</Radio>
                    <Radio value={2}>2核</Radio>
                    <Radio value={3}>3核</Radio>
                    <Radio value={4}>4核</Radio>
                  </RadioGroup>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} type="flex" justify="space-around" align="middle">
              <Col lg={12} md={20} sm={24}>
                <Form.Item {...formItemLayout}
                           label="GPU">
                  <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked={false} onChange={this.onChangeGPU} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} type="flex" justify="space-around" align="middle">
              <Col lg={12} md={20} sm={24}>
                <Form.Item {...formItemLayout}
                           label="内存配额">
                  <Slider max={10240} marks={marks} defaultValue={0} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title="任务管理" className={styles.card} bordered={false}>
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.name2}>
                    <Input placeholder="请输入" />
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.url2}>
                    <Input placeholder="请输入" />
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.owner2}>
                    <Select placeholder="请选择管理员">
                      <Option value="xiao">付晓晓</Option>
                      <Option value="mao">周毛毛</Option>
                    </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.approver2}>
                    <Select placeholder="请选择审批员">
                      <Option value="xiao">付晓晓</Option>
                      <Option value="mao">周毛毛</Option>
                    </Select>
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.dateRange2}>
                    <TimePicker
                      placeholder="提醒时间"
                      style={{ width: '100%' }}
                      getPopupContainer={trigger => trigger.parentNode}
                    />
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.type2}>
                    <Select placeholder="请选择仓库类型">
                      <Option value="private">私密</Option>
                      <Option value="public">公开</Option>
                    </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <FooterToolbar>

          <Button type="primary" onClick={this.validate} >
            提交
          </Button>
        </FooterToolbar>
      </div>
    );
  }
}

