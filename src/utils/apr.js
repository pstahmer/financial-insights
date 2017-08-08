const round = (n) => {
  return Math.round(n*100)/100;
};

// TODO: refactor to calculate how long until paid off? Seems questionable
// maybe one of each?
export const calculateApr = (principle, apr, period, lengthInYears, paymentPerYear) => {
  const initialPrinciple = principle;
  let billingPeriodsPerYear = 0;
  switch (period) {
    case 'd':
      billingPeriodsPerYear = 365;
      break;
    case 'm':
    default:
      billingPeriodsPerYear = 12;
      break;
    case 'y':
      billingPeriodsPerYear = 1;
      break;
  }
  const interestPerPeriod = apr / billingPeriodsPerYear;
  let totalPaid = 0;

  // TODO: confirm that this is building interest over the time, but not applying until EOY
  // loop monthly, push curVal's to array, evaluate interest off that each year?
  // variable compounding is problematic
  // currently applies interest annually, then removes total annual payment
  for (let i = 0; i < lengthInYears; i++) {
    principle *= Math.pow((1 + interestPerPeriod), billingPeriodsPerYear);
    principle -= paymentPerYear;
    totalPaid += paymentPerYear;
  }

  const principlePaid = round(initialPrinciple - principle);
  totalPaid = round(totalPaid);
  return {
    totalPaid: totalPaid,
    interestPaid: totalPaid - (principlePaid),
    interestPaidPercent: round((totalPaid - (principlePaid)) / totalPaid * 100),
    principlePaid: principlePaid,
    principlePaidPercent: round(principlePaid / totalPaid * 100),
    remainingPrinciple: principle,
    remainingPrinciplePercent: round(principle / initialPrinciple * 100)
  };
};

export const calculateApy = (principle, apr, period, lengthInYears, paymentPerYear) => {
  const initialPrinciple = principle;
  let billingPeriodsPerYear = 0;
  switch (period) {
    case 'd':
      billingPeriodsPerYear = 365;
      break;
    case 'm':
    default:
      billingPeriodsPerYear = 12;
      break;
    case 'y':
      billingPeriodsPerYear = 1;
      break;
  }
  const interestPerPeriod = apr / billingPeriodsPerYear;

  // TODO: compound per period, pay per month
  for (let i = 0; i < lengthInYears; i++) {
    principle *= Math.pow((1 + interestPerPeriod), billingPeriodsPerYear);
    principle -= paymentPerYear;
  }

  return {
    totalPaid: principle,
    percentIncrease: principle/initialPrinciple * 100
  };
};
