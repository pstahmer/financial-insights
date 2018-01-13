import React from 'react';

import { calculateApr } from '../../utils/apr';
import Group from './group';

class Apr extends Group {
  constructor(props) {
    super(props);

    this.state = { principle: 2000, interest: 0.15, compound: 12, term: 12, payment: 100 };
    this.updatePrinciple = this.updatePrinciple.bind(this);
    this.updateInterest = this.updateInterest.bind(this);
    this.updateCompound = this.updateCompound.bind(this);
    this.updateTerm = this.updateTerm.bind(this);
    this.updatePayment = this.updatePayment.bind(this);

    this.addField('Principle', 'principle', this.updatePrinciple, 100);
    this.addField('APR', 'interest', this.updateInterest, .01);
    this.addField('Term (in years)', 'term', this.updateTerm, 1);
    this.addField('Payment (monthly)', 'payment', this.updatePayment, 10);
    // TODO: Make a m/y/d dropdown
    this.addField('Compounds/year', 'compound', this.updateCompound, 1);
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

  updatePayment(event) {
    this.setState({payment: parseFloat(event.target.value)});
  }

  updateCompound(event) {
    this.setState({compound: parseFloat(event.target.value)});
  }

  calculateResult() {
    const { principle, interest, term, payment, compound } = this.state;
    if (principle && interest && term && payment && compound) {
      return calculateApr(principle, interest, compound, term/12, payment * 12);
    }
    return {};
  }

  closeGroup() {
    this.props.onClose('apr');
  }

  renderResults() {
    const results = this.calculateResult();

    return (
      <div>
        <h3>Results</h3>
        <table className="outputs">
          <tbody>
            <tr><td>Total paid:</td><td>{this.formatCurrency(results.totalPaid)}</td></tr>
            <tr><td>Principle paid:</td><td>{this.formatCurrency(results.principlePaid)}</td><td>or {this.formatPercent(results.principlePaidPercent)} of total payment</td></tr>
            <tr><td>Interest paid:</td><td>{this.formatCurrency(results.interestPaid)}</td><td>or {this.formatPercent(results.interestPaidPercent)} of total payment</td></tr>
            <tr><td>Remaining Principle:</td><td>{this.formatCurrency(results.remainingPrinciple)}</td><td>or {this.formatPercent(results.remainingPrinciplePercent)}</td></tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Apr;
