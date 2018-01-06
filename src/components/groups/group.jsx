import React, { Component } from 'react';

// base class for the other groups to inherit
class Group extends Component {
  formatCurrency(val) {
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
    return `${value}%`;
  }

  render() {
    const closeGroup = this.closeGroup.bind(this);

    return (
      <div className="group">
        <span className="close" onClick={closeGroup}>X</span>
        {this.renderFields()}
        {this.renderResults()}
      </div>
    );
  }
}

export default Group;
