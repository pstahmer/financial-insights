import React, { Component } from 'react';

import Mortgage from './mortgage';
import Apr from './apr';
import AddLoanCard from '../cards/add-loan-card';
import './groups.css';

const GROUP_NAMES = {
  MORTGAGE: 'mortgage',
  APR: 'apr'
};

const GROUP_NAMES_ARRAY = [
  GROUP_NAMES.MORTGAGE,
  GROUP_NAMES.APR
];

class Groups extends Component {
  constructor(props) {
    super(props);

    this.state = { groups: [] };
    this.addGroup = this.addGroup.bind(this);
    this.getGroup = this.getGroup.bind(this);
    this.removeGroup = this.removeGroup.bind(this);
  }

  addGroup(name) {
    this.setState({groups: this.state.groups.concat(name)});
  }

  getGroup(groupName, i) {
    switch (groupName) {
      case GROUP_NAMES.MORTGAGE:
        return (<Mortgage key={i} onClose={this.removeGroup} />);
      case GROUP_NAMES.APR:
        return (<Apr key={i} onClose={this.removeGroup} />);
      default:
        return null;
    }
  }

  removeGroup(groupName) {
    // TODO: If you have duplicates this will remove them.
    // correct when extracting to reducer
    this.setState({groups: this.state.groups.filter(g => g !== groupName)});
  }

  renderOption(n, i) {
    return (<option value={n} key={i}>{n}</option>);
  }

  render() {
    return (
      <div className="groups-container">
        <div className="selector">
          {GROUP_NAMES_ARRAY.map((n, i) =>
            <AddLoanCard key={i} text={n} click={this.addGroup.bind(null, n)} />)}
        </div>
        <div className="groups">
          {this.state.groups.map(this.getGroup)}
        </div>
      </div>
    );
  }
}


export default Groups;
