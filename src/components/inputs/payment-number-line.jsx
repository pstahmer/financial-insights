import React, { Component } from 'react';
import './payment-number-line.css';
import { addPaymentToLoan } from '../../stores/loan-store';

class PaymentNumberLine extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lineValue: 0,
      inputValue: 0,
      additionalPayments: []
    };
    this.onLineChange = this.onLineChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.addPayment = this.addPayment.bind(this);
  }

  getPayments() {
    return this.state.additionalPayments;
  }

  onLineChange(event) {
    this.setState({ lineValue: event.target.value });
  }

  onInputChange(event) {
    this.setState({ inputValue: event.target.value });
  }

  addPayment() {
    const { additionalPayments, inputValue, lineValue } = this.state;
    addPaymentToLoan(
      {
        paymentNumber: parseInt(lineValue),
        amount: parseInt(inputValue, 10)
      },
      this.props.id
    );
  }

  render() {
    const { max } = this.props;
    const { lineValue, inputValue } = this.state;
    return (
      <div className="payment-number-line">
        <div>
          Payment amount: <input type="number" value={inputValue} onChange={this.onInputChange}/>
          <button onClick={this.addPayment}>Add Payment</button>
        </div>
        <div>
          Payment month: <input type="range" min="0" max={max} value={lineValue} onChange={this.onLineChange} />
          <br />
          <span className="month-value">{lineValue}</span>
        </div>
      </div>
    );
  }
}

export default PaymentNumberLine;
