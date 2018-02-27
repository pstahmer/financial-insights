import { GROUP_NAMES } from '../common/constants';

// GENERIC STORE LOGIC
// todo: extract these to a store generator, have generator import all stores,
// run all these kinds of things to separate the concerns
const components = [];

const registerComponent = (component) => {
  components.push(component);
};
const unregisterComponent = (component) => {
  const index = components.indexOf(component);
  components.splice(index, 1);
};

// STORE-SPECIFIC LOGIC
/*
  loan model: {
    id: number
    type: GROUPNAMES.*
    additionalPayments: []
  }
*/
let i = 0;
let j = 0;
const state = {
  loans: []
};
const updateComponents = () => {
  components.forEach((c) => c.update(state));
}

const addLoan = (loan) => {
  state.loans.push({
    id: ++i,
    type: loan,
    additionalPayments: []
  });
  updateComponents();
};

const deleteLoan = (id) => {
  state.loans = state.loans.filter(l => l.id !== id);
  updateComponents();
}

const addPaymentToLoan = (payment, loanId) => {
  const loan = state.loans.find(l => l.id === loanId);
  loan.additionalPayments.push({ id: ++j, ...payment });
  updateComponents();
}

const removePaymentFromLoan = (paymentId, loanId) => {
//   state.loans.find(l => l.id === loanId).;
  updateComponents();
}

export {
  addLoan, deleteLoan, addPaymentToLoan, removePaymentFromLoan,
  registerComponent, unregisterComponent, updateComponents
};
