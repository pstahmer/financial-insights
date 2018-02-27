import React, { Component } from 'react';

import Mortgage from './mortgage';
import Apr from './apr';
import AddLoanCard from '../cards/add-loan-card';
import { GROUP_NAMES } from '../../common/constants';
import './groups.css';

import { addLoan, deleteLoan, registerComponent, unregisterComponent } from '../../stores/loan-store';

const GROUP_NAMES_ARRAY = [
  GROUP_NAMES.MORTGAGE,
  GROUP_NAMES.APR
];

class Groups extends Component {
  constructor(props) {
    super(props);
    registerComponent(this);

    this.state = { groups: [] };
    this.update = this.update.bind(this);
    this.addGroup = this.addGroup.bind(this);
    this.getGroup = this.getGroup.bind(this);
    this.removeGroup = this.removeGroup.bind(this);
  }

  componentWillUnmount() {
    unregisterComponent(this);
  }

  // when loan store updates, set our state
  update(state) {
    this.setState({ groups: state.loans })
  }

  addGroup(name) {
    addLoan(name)
  }

  getGroup(group, i) {
    switch (group.type) {
      case GROUP_NAMES.MORTGAGE:
        return (<Mortgage
          key={group.id}
          id={group.id}
          onClose={this.removeGroup}
          payments={group.additionalPayments}
        />);
      case GROUP_NAMES.APR:
        return (<Apr
          key={group.id}
          id={group.id}
          onClose={this.removeGroup}
          payments={group.additionalPayments}
        />);
      default:
        return null;
    }
  }

  removeGroup(id) {
    deleteLoan(id);
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
          {this.state.groups.reverse().map(this.getGroup)}
        </div>
      </div>
    );
  }
}


export default Groups;
