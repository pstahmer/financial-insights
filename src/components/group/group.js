import React, { Component } from 'react';

import { getValues } from '../../utils/additional-mortgage-calc';
import './group.css';

class Group extends Component {
  constructor(props) {
    super(props);

    this.state = { principle: 200000, interest: 0.04, term: 360, extra: 100 };
    this.updatePrinciple = this.updatePrinciple.bind(this);
    this.updateInterest = this.updateInterest.bind(this);
    this.updateTerm = this.updateTerm.bind(this);
    this.updateExtra = this.updateExtra.bind(this);
  }

  updatePrinciple(event) {
    this.setState({principle: parseInt(event.target.value, 10)});
  }

  updateInterest(event) {
    this.setState({interest: parseFloat(event.target.value)});
  }

  updateTerm(event) {
    this.setState({term: parseInt(event.target.value, 10)});
  }

  updateExtra(event) {
    this.setState({extra: parseFloat(event.target.value)});
  }

  calculateResult() {
    const { principle, interest, term, extra } = this.state
    if (principle && interest && term && extra) {
      return getValues(principle, interest / 12, term, extra);
    }
    return {};
  }

  render() {
    const results = this.calculateResult();
    return (
      <div className="group">
        <div className="inputs">
          Principle: <input type="number" value={this.state.principle} onChange={this.updatePrinciple}/>
          Interest: <input type="number" value={this.state.interest} onChange={this.updateInterest}/>
          Term (in months): <input type="number" value={this.state.term} onChange={this.updateTerm}/>
          Extra payment: <input type="number" value={this.state.extra} onChange={this.updateExtra}/>
        </div>
        <div className="outputs">
          <br />Base payment: {results.basePayment}
          <br />Payment increased by: {results.additionalPrinciple}, or: {results.additionalPrinciplePercent}%
          <br />Interest reduced by: {results.interestReducedBy}, or: {results.interestReducedByPercent}%
          <br />Term reduced by: {results.termReducedBy} months, or: {results.termReducedByPercent}%
          <br />Total interest paid: {results.totalInterest}
          <br />Total principle paid: {results.totalPrinciple}
          <br />Total paid: {results.total}
          <br />Number of payments: {results.paymentMonthCount} over {results.paymentYearCount} years
          <br />
        </div>
      </div>
    );
  }
}


export default Group;
