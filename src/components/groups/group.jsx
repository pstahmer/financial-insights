import { Component } from 'react';

// base class for the other groups to inherit
class Group extends Component {
  formatCurrency(val) {
    const value = val.toString();
    if (value.length <= 2) {
      return value;
    }

    const [ dollars, cents ] = value.split('.');
    console.log(value, dollars, cents);
    // 123456789 123,456,789   %3=0
    // 12345678   12,345,678   %3=2
    // 1234567     1,234,567   %3=1
    const base = dollars.length % 3;
    let displayDollars = dollars.substr(0, base);
    for (let i = 0; (i) * 3 < dollars.length - base; i++) {
      const comma = base !== 0 || i !== 0 ? ',' : '';
      displayDollars += comma + dollars.substr(base + (i * 3), base + ((i + 1) * 3));
    }

    const centsDisplay = cents ? '.' + (parseInt(cents, 10) / 100).toFixed(2).substr(2) : '';

    return `$${displayDollars}${centsDisplay}`;
  }

  formatPercent(value) {
    return `${value}%`;
  }
}

export default Group;
