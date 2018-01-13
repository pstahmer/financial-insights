import React from 'react';

import Group from './group';
import { getValues } from '../../utils/additional-mortgage-calc';

class Mortgage extends Group {
  constructor(props) {
    super(props);

    this.state = { principle: 200000, interest: 0.04, term: 360, extra: 100 };
    this.updatePrinciple = this.updatePrinciple.bind(this);
    this.updateInterest = this.updateInterest.bind(this);
    this.updateTerm = this.updateTerm.bind(this);
    this.updateExtra = this.updateExtra.bind(this);

    this.addField('Principle', 'principle', this.updatePrinciple, 1000);
    this.addField('Interest', 'interest', this.updateInterest, .01);
    this.addField('Term (in months)', 'term', this.updateTerm, 1);
    this.addField('Extra payment', 'extra', this.updateExtra, 10);
  }

  updatePrinciple(event) {
    this.setState({ principle: parseInt(event.target.value, 10) });
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

  closeGroup() {
    this.props.onClose('mortgage');
  }

  renderResults() {
    const results = this.calculateResult();

    return (
      <div className="outputs">
        <br />Base payment: {this.formatCurrency(results.basePayment)}
        <br />Payment increased by: {this.formatCurrency(results.additionalPrinciple)}, or: {this.formatPercent(results.additionalPrinciplePercent)}
        <br />Interest reduced by: {this.formatCurrency(results.interestReducedBy)}, or: {this.formatPercent(results.interestReducedByPercent)}
        <br />Term reduced by: {results.termReducedBy} months, or: {this.formatPercent(results.termReducedByPercent)}
        <br />Total interest paid: {this.formatCurrency(results.totalInterest)}
        <br />Total principle paid: {this.formatCurrency(results.totalPrinciple)}
        <br />Total paid: {this.formatCurrency(results.total)}
        <br />Number of payments: {results.paymentMonthCount}, over {results.paymentYearCount} years
        <br />
      </div>
    );
  }
}

export default Mortgage;
