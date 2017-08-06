const round = (n) => {
  return Math.round(n*100)/100;
};

const calculateBasePayment = (principle, monthlyRate, term) => {
  let monthlyTerm = Math.pow((1 + monthlyRate), term);
  let basePayment = (monthlyRate * principle * monthlyTerm) / ( monthlyTerm - 1 );

  return basePayment;
};

const calculatePayments = (principle, monthlyRate, term, additionalPrinciple) => {
  let payments = [];
  let currentPrinciple = principle;
  const basePayment = calculateBasePayment(principle, monthlyRate, term);

  for (let year = 0; year < 30 && currentPrinciple > 0; year++) {
    for (let month = 0; month < 12 && currentPrinciple > 0; month++) {
      let currentInterestPayment = round(monthlyRate * currentPrinciple);
      let currentPrinciplePayment = round(basePayment - currentInterestPayment + additionalPrinciple || 0);
      currentPrinciple -= currentPrinciplePayment;

      payments.push({
        principle: currentPrinciplePayment,
        interest: currentInterestPayment
      });
    }
  }

  return payments;
};

export const getValues = (principle, monthlyRate, term, additionalPrinciple) => {
  let payments = calculatePayments(principle, monthlyRate, term, additionalPrinciple);
  let totalPrinciple = 0;
  let totalInterest = 0;

  payments.forEach((p) => {
    totalPrinciple += p.principle;
    totalInterest += p.interest;
  });

  let originalTotalInterest = 0;
  if (additionalPrinciple) {
    let originalPayments = calculatePayments(principle, monthlyRate, term, 0);
    originalPayments.forEach((p) => {
      originalTotalInterest += p.interest;
    });
  }
  const basePayment = round(calculateBasePayment(principle, monthlyRate, term));

  return {
    basePayment: basePayment,
    additionalPrinciple: additionalPrinciple,
    additionalPrinciplePercent: round(additionalPrinciple/basePayment*100),
    interestReducedBy: round(originalTotalInterest - totalInterest),
    interestReducedByPercent: round((1 - totalInterest/originalTotalInterest)*100),
    termReducedBy: term - payments.length,
    termReducedByPercent: round((1 - payments.length/term)*100),
    totalInterest: round(totalInterest),
    totalPrinciple: round(totalPrinciple),
    total: round(totalPrinciple + totalInterest),
    paymentMonthCount: payments.length,
    paymentYearCount: round(payments.length / 12)
  };
};
