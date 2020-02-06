import React from "react";

import { Select } from "antd";
import SelectPlus from "../component/SelectPlus";
import From from "../component/Form";
import "antd/dist/antd.css";

const Option = Select.Option;

const children = [];

for (let i = 0; i < 10000; i++) {
  children.push(
    <Option value={i + "xx"} key={i}>
      {i}
    </Option>
  );
}

class App extends React.Component {
  onChange = v => console.log(v);
  onSearch = v => console.log(v);

  render() {
    return (
      <div className="App">
        <div style={{ width: 300 }}>
          SelectPlus:
          <SelectPlus
            showSearch
            allowClear
            // mode="multiple"
            onChange={this.onChange}
            onSearch={this.onSearch}
            style={{ width: 300 }}
          >
            {children}
          </SelectPlus>
        </div>
        <div style={{ width: 300 }}>
          Ant Select:
          <Select
            showSearch
            allowClear
            // mode="multiple"
            onChange={this.onChange}
            onSearch={this.onSearch}
            style={{ width: 300 }}
          >
            {children}
          </Select>
        </div>
        <From />
      </div>
    );
  }
}

export default App;
