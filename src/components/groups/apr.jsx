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
    this.addField('Compounds/year (annual: 1, monthly: 12, etc )', 'compound', this.updateCompound, 1);
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
      <div className="outputs">
        <br />Total paid: {this.formatCurrency(results.totalPaid)}
        <br />Principle paid: {this.formatCurrency(results.principlePaid)}, or: {this.formatPercent(results.principlePaidPercent)} of total payment
        <br />Interest paid: {this.formatCurrency(results.interestPaid)}, or: {this.formatPercent(results.interestPaidPercent)} of total payment
        <br />Remaining Principle: {this.formatCurrency(results.remainingPrinciple)}, or: {this.formatPercent(results.remainingPrinciplePercent)}
        <br />
      </div>
    );
  }
}

export default Apr;
