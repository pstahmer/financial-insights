import React from 'react';
import './add-loan-card.css';

const AddLoanCard = ({text, click}) => (
  <span className="add-loan-card" onClick={click}>
    {text}
  </span>
);

export default AddLoanCard;
