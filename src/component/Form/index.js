import React, { Component } from 'react';
import { Input, Button } from 'antd';

function FormCreate(Comp) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.options = {};
      this.state = {};
    }

    // 接管输入事件
    handleChange = e => {
      const { name, value } = e.target;
      // 数据受控
      this.setState({ [name]: value }, () => {
        // 数据变更后校验
        this.validateField(name);
      });
    };

    validateField = field => {
      // 获取校验规则
      const rules = this.options[field].rules; 
      // 只要有任何⼀一项校验失败就返回true跳出，对返回值取反表示校验失败
      // eslint-disable-next-line
      const ret = !rules.some(rule => { 
        if (rule.required) {
          // 这里只校验必填项，其他校验规则可以使用成熟的第三方库来实现
          if (!this.state[field]) {
            this.setState({
              // 错误信息设置
              [field + "Message"]: rule.message 
            });
            return true; // 若校验失败，返回true }
          }
        }
      });
      // 若校验成功，清除错误信息
      if (ret) this.setState({ [field + "Message"]: "" });
      return ret;
    };
                              
    validateFields = cb => {
      const results = Object.keys(this.options).map(field => 
        this.validateField(field)
      );
      // 校验结果中每一项都要求true
      const result = results.every(v => v === true);
      cb && cb(result, this.state);
    };

    // 返回包装输⼊控件的⾼高阶组件，代理其事件处理
    getFieldDecorator = (field, options) => {
      this.options[field] = options;
      return InputComp => (
        <div>
          {
            React.cloneElement(InputComp, {
              name: field,
              value: this.state[field] || "",
              // 接管控件 onChange 事件
              onChange: this.handleChange 
            })
          }
          {/* 错误提示 */}
          {
            this.state[field + "Message"] && (
              <p style={{ color: "red" }}> {this.state[field + "Message"]}</p>
            )
          }
        </div>
      );
    };

    render() {
      return (
        <Comp
          {...this.props}
          validateFields={this.validateFields}
          getFieldDecorator={this.getFieldDecorator}
        />
      );
    }
  };
}

class LoginForm extends Component {
  handleSubmit = () => {
    this.props.validateFields((err, value) => {
      console.log({err, value})
    });
  };
  render() {
    const { getFieldDecorator } = this.props;
    return (
      <div>
        <div>
          {getFieldDecorator("userName", {
            rules: [{ required: true, message: "请输入用户名" }]
          })(<Input type="text" style={{ width: 300 }} />)}
        </div>
        <div>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "请输入密码" }]
          })(<Input type="password" style={{ width: 300 }} />)}
        </div>
        <div>
          <Button onClick={this.handleSubmit} type="primary">登录</Button>
        </div>
      </div>
    );
  }
}
const WidthForm = FormCreate(LoginForm);

export default WidthForm;
