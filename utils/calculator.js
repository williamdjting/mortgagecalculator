function mortgagePaymentPerPaymentScheduleCalculator(principal, interest_rate, number_of_payments) {
    // P = principal
    // r = interest rate (per period)
    // n = number of payments

    // Convert interest_rate from percentage to decimal
    // make payments monthly
    const rate = ( interest_rate / 100 ) / 12;

    const onePlusR = 1 + rate;

    const onePlusRSquaredByN = onePlusR ** number_of_payments;

    const numerator = rate * onePlusRSquaredByN;

    const denominator = onePlusRSquaredByN - 1;

    const mortgagePaymentPerPaymentSchedule = (principal * numerator) / denominator;

    console.log("rate", rate);
    console.log("onePlusR", onePlusR);
    console.log("onePlusRSquaredByN", onePlusRSquaredByN);
    console.log("numerator", numerator);
    console.log("denominator", denominator);
    console.log("calculator.js - mortgagePaymentPerPaymentSchedule", mortgagePaymentPerPaymentSchedule);

    return mortgagePaymentPerPaymentSchedule;
}

module.exports = { mortgagePaymentPerPaymentScheduleCalculator };

