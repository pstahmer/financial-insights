import React from 'react';

import PaymentNumberLine from '../inputs/payment-number-line';
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
    const { principle, interest, term, extra } = this.state;
    const { payments } = this.props;
    if (principle && interest && term) {
      return getValues(principle, interest / 12, term, extra, payments);
    }
    return {};
  }

  renderResults() {
    const results = this.calculateResult();

    return (
      <div>
        <h3>Results</h3>
        <table className="outputs">
          <tbody>
            <tr><td>Base payment: </td><td>{this.formatCurrency(results.basePayment)}</td></tr>
            <tr><td>Payment increased by:</td><td> {this.formatCurrency(results.additionalPrinciple)}</td><td>or {this.formatPercent(results.additionalPrinciplePercent)}</td><td></td></tr>
            <tr><td>Interest reduced by:</td><td> {this.formatCurrency(results.interestReducedBy)}</td><td>or {this.formatPercent(results.interestReducedByPercent)}</td></tr>
            <tr><td>Term reduced by:</td><td> {results.termReducedBy} months</td><td>or {this.formatPercent(results.termReducedByPercent)}</td></tr>
            <tr><td>Total interest paid:</td><td> {this.formatCurrency(results.totalInterest)}</td></tr>
            <tr><td>Total principle paid:</td><td> {this.formatCurrency(results.totalPrinciple)}</td></tr>
            <tr><td>Total paid: </td><td>{this.formatCurrency(results.total)}</td></tr>
            <tr><td>Total Number of payments:</td><td> {results.paymentMonthCount} months</td><td colSpan="2">or {results.paymentYearCount} years</td></tr>
          </tbody>
        </table>
        <PaymentNumberLine id={this.props.id} max={results.paymentMonthCount} />
      </div>
    );
  }
}

export default Mortgage;
