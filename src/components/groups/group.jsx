import React, { Component } from 'react';

import { removePaymentFromLoan } from '../../stores/loan-store';

// base class for the other groups to inherit
class Group extends Component {
  fields = [];

  constructor(props) {
    super(props);

    this.renderPayment = this.renderPayment.bind(this);
  }

  addField(title, stateProp, onChange, step) {
    this.fields.push({
      title,
      getValue: () => this.state[stateProp],
      onChange,
      step
    });
  }

  closeGroup() {
    this.props.onClose(this.props.id);
  }

  formatCurrency(val) {
    if (!val) {
      return '$0.00';
    }
    const value = val.toString();
    if (value.length <= 2) {
      return value;
    }

    const [ dollars, cents ] = value.split('.');
    const base = dollars.length % 3;

    let displayDollars = dollars.substr(0, base);
    for (let i = 0; (i) * 3 < dollars.length - base; i++) {
      const comma = base !== 0 || i !== 0 ? ',' : '';
      displayDollars += comma + dollars.substr(base + (i * 3), base + ((i + 1) * 3));
    }

    const centsDisplay = cents ? '.' + (parseInt(cents.substr(0, 2), 10) / 100).toFixed(2).substr(2) : '';

    return `$${displayDollars}${centsDisplay}`;
  }

  formatPercent(value) {
    if (!value) {
      return '0.00%'
    }
    return `${value}%`;
  }

  renderFields() {
    return (
      <table>
        <tbody>
        {this.fields.map((f, i) => (
          <tr key={i}>
            <td>{f.title}:</td>
            <td><input value={f.getValue()} onChange={f.onChange} type="number" step={f.step || 1}/></td>
          </tr>
        ))}
        </tbody>
      </table>
    );
  }

  // TODO: move all this additional payment stuff to own component
  removePayment(paymentId, loanId) {
    removePaymentFromLoan(paymentId, loanId);
  }

  renderPayment(p, i) {
    return (
      <div key={i} className="additionalPayment">
        <button onClick={this.removePayment.bind(null, p.id, this.props.id)}>Remove</button>
        <span>month: {p.paymentNumber}, lump sum: {p.amount}</span>
      </div>
    );
  }

  renderAdditionalPayments() {
    const payments = this.props.payments || [];
    return payments.length ? (
      <div>
        <h3>Lump Payments</h3>
        {payments.map(this.renderPayment)}
      </div>
    ) : <span></span>;
  }

  render() {
    const closeGroup = this.closeGroup.bind(this);

    return (
      <div className="group">
        <span className="close" onClick={closeGroup}>X</span>
        {this.renderFields()}
        {this.renderAdditionalPayments()}
        {this.renderResults()}
      </div>
    );
  }
}

export default Group;
