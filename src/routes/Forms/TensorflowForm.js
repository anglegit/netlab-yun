import React, { PureComponent } from 'react';
import { Card, Button, Form, Switch, Col, Row, Input, Slider,Radio } from 'antd';
import FooterToolbar from '../../components/FooterToolbar';
import styles from './style.less';
const RadioGroup = Radio.Group;

const marks = {
  0: '0G',
  1024: '1G',
  2048: '2G',
  4096: '4G',
  6144: '6G',
  8182: '8G',
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
    gpu:1,
    gpuopen:true
  }
  validate = () => {

  }
  onChangeCPU = (e) => {
    this.setState({
      cpu: e.target.value,
    });
  }
  onChangeGPU = (e) => {
    this.setState({
      gpu: e.target.value,
    });
  }
  onOpenGPU = (e) => {
    if(e){
      this.setState({
        gpuopen:false
      })
    }
    if(!e){
      this.setState({
        gpuopen:true
      })
    }

   console.log(e)
  }

  render() {
    open = this.state.gpuopen?null:<Row gutter={16} type="flex" justify="space-around" align="middle">
      <Col lg={12} md={20} sm={24}>
        <Form.Item {...formItemLayout}
                   label="GPU核数">
          <RadioGroup onChange={this.onChangeGPU} value={this.state.gpu}>
            <Radio value={1}>1核</Radio>
            <Radio value={2}>2核</Radio>
            <Radio value={3}>3核</Radio>
            <Radio value={4}>4核</Radio>
          </RadioGroup>
        </Form.Item>
      </Col>
    </Row>
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
                           label="启用GPU">
                  <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked={false} onChange={this.onOpenGPU} />
                </Form.Item>
              </Col>
            </Row>
            {open}
            <Row gutter={16} type="flex" justify="space-around" align="middle">
              <Col lg={12} md={20} sm={24}>
                <Form.Item {...formItemLayout}
                           label="内存配额">
                  <Slider max={10240} marks={marks} defaultValue={1024} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title="应用说明" className={styles.card} bordered={false}>
          <p>jupyter 默认密码 jupyter</p>
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

