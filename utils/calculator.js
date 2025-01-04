function mortgagePaymentPerPaymentScheduleCalculator(principal, interest_rate, payment_schedule_num, number_of_payments) {
    // P = principal
    // r = interest rate (per period)
    // n = number of payments

    // rate is the interest rate / 100, assuming the entered value is a whole number between 0 and 100
    const rate = ( interest_rate / 100 ) / payment_schedule_num;

    // creates the (1 + r) value
    const onePlusRate = 1 + rate;

    // to the power of n
    const onePlusRateSquaredByN = onePlusRate ** number_of_payments;

    // the formula's numerator
    const numerator = rate * onePlusRateSquaredByN;

    // the formula's denominator
    const denominator = onePlusRateSquaredByN - 1;

    // the calculation of the mortgage payments per schedule
    const mortgagePaymentPerPaymentSchedule = principal * (numerator / denominator) ;

    console.log("monthly interest rate", rate);
    console.log("onePlusRate", onePlusRate);
    console.log("onePlusRateSquaredByN", onePlusRateSquaredByN);
    console.log("numerator", numerator);
    console.log("denominator", denominator);
    console.log("calculator.js - mortgagePaymentPerPaymentSchedule", mortgagePaymentPerPaymentSchedule);

    const roundedReturnValue = mortgagePaymentPerPaymentSchedule.toFixed(2); // round to two decimal

    return Number(roundedReturnValue);
}

module.exports = { mortgagePaymentPerPaymentScheduleCalculator };

