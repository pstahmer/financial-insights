import React, { Component } from 'react';

import Mortgage from './mortgage';
import './groups.css';

const GROUP_NAMES = {
  MORTGAGE: 'mortgage'
};

const GROUP_NAMES_ARRAY = [
  GROUP_NAMES.MORTGAGE
];

class Groups extends Component {
  constructor(props) {
    super(props);

    this.state = { groups: [] };
    this.addGroup = this.addGroup.bind(this);
    this.getGroup = this.getGroup.bind(this);
  }

  addGroup(event) {
    this.setState({groups: this.state.groups.concat(event.target.value)});
    this.refs.select.value = null;
  }

  getGroup(groupName, i) {
    switch (groupName) {
      case GROUP_NAMES.MORTGAGE:
        return (<Mortgage key={i} />);
      default:
        return null;
    }
  }

  renderOption(n, i) {
    return (<option value={n} key={i}>{n}</option>);
  }

  render() {
    return (
      <div className="groups-container">
        <div className="groups">
          {this.state.groups.map(this.getGroup)}
        </div>
        <div className="selector">
          <select ref="select" onChange={this.addGroup}>
            <option value="null">Select a type of loan</option>
            {GROUP_NAMES_ARRAY.map(this.renderOption)}
          </select>
        </div>
      </div>
    );
  }
}


export default Groups;
