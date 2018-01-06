import React from 'react';

import { calculateApr } from '../../utils/apr';
import Group from './group';

class Apr extends Group {
  constructor(props) {
    super(props);

    this.state = { principle: 2000, interest: 0.15, compound: 12, term: 12, payment: 100 };
    this.updatePrinciple = this.updatePrinciple.bind(this);
    this.updateInterest = this.updateInterest.bind(this);
    this.updateTerm = this.updateTerm.bind(this);
    this.updatePayment = this.updatePayment.bind(this);
    this.updateCompound = this.updateCompound.bind(this);
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

  renderFields() {
    return (
      <div className="inputs">
        Principle: <input type="number" value={this.state.principle} onChange={this.updatePrinciple}/>
        APR: <input type="number" value={this.state.interest} onChange={this.updateInterest}/>
        Compounds/year (annual: 1, monthly: 12, etc ): <input type="number" value={this.state.compounds} onChange={this.updateCompounds}/>
        Term (in years): <input type="number" value={this.state.term} onChange={this.updateTerm}/>
        Payment (monthly): <input type="number" value={this.state.payment} onChange={this.updatePayment}/>
      </div>
    );
  }

  renderResults() {
    const results = this.calculateResult();

    return (
      <div className="outputs">
        <br />Total paid: {results.totalPaid}
        <br />Principle paid: {results.principlePaid}, or: {results.principlePaidPercent}% of total payment
        <br />Interest paid: {results.interestPaid}, or: {results.interestPaidPercent}% of total payment
        <br />Remaining Principle: {results.remainingPrinciple}, or: {results.remainingPrinciplePercent}%
        <br />
      </div>
    );
  }
}

export default Apr;
