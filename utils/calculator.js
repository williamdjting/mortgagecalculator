function mortgagePaymentPerPaymentScheduleCalculator(original_principle, interest_rate_num, payment_schedule_num, number_of_payments) {
    // P = original_principle
    // r = interest rate (per period)
    // n = number of payments

    // rate is the interest rate / 100, assuming the entered value is a whole number between 0 and 100
    const rate = ( interest_rate_num / 100 ) / payment_schedule_num;

    // creates the (1 + r) value
    const onePlusRate = 1 + rate;

    // to the power of n
    const onePlusRateSquaredByN = onePlusRate ** number_of_payments;

    // the formula's numerator
    const numerator = rate * onePlusRateSquaredByN;

    // the formula's denominator
    const denominator = onePlusRateSquaredByN - 1;

    // the calculation of the mortgage payments per schedule
    const mortgagePaymentPerPaymentSchedule = original_principle * (numerator / denominator) ;

    console.log("monthly interest rate", rate);
    console.log("onePlusRate", onePlusRate);
    console.log("onePlusRateSquaredByN", onePlusRateSquaredByN);
    console.log("numerator", numerator);
    console.log("denominator", denominator);
    console.log("calculator.js - mortgagePaymentPerPaymentSchedule", mortgagePaymentPerPaymentSchedule);


    // M = roundedReturnValue
    const roundedReturnValue = mortgagePaymentPerPaymentSchedule.toFixed(2); // round to two decimal
    console.log("calculator.js - roundedReturnValue", roundedReturnValue);

    return Number(roundedReturnValue);
}


function mortgagePaymentPerPaymentScheduleCalculatorAcceleratedMonthly(original_principle, interest_rate_num, amortization_period_num) {
    // P = original_principle
    // r = interest rate (per period)
    // n = number of payments

    // rate is the interest rate / 100, assuming the entered value is a whole number between 0 and 100
    const rate = ( interest_rate_num / 100 ) / 12;

    // creates the (1 + r) value
    const onePlusRate = 1 + rate;

    const number_of_payments = (amortization_period_num * 12)

    // to the power of n
    const onePlusRateSquaredByN = onePlusRate ** number_of_payments;

    // the formula's numerator
    const numerator = rate * onePlusRateSquaredByN;

    // the formula's denominator
    const denominator = onePlusRateSquaredByN - 1;

    // the calculation of the mortgage payments per schedule
    const mortgagePaymentPerPaymentSchedule = original_principle * (numerator / denominator) ;


    // M = roundedReturnValueMonthly

    const roundedReturnValueMonthly = mortgagePaymentPerPaymentSchedule; // round to two decimal

    console.log("calculator.js - mortgagePaymentPerPaymentScheduleCalculatorAcceleratedMonthly", roundedReturnValueMonthly);


    return Number(roundedReturnValueMonthly);
}

function mortgagePaymentPerPaymentScheduleCalculatorAcceleratedBiweekly(original_principle, interest_rate_num, amortization_period_num) {
    // P = original_principle
    // r = interest rate (per period)
    // n = number of payments

    // rate is the interest rate / 100, assuming the entered value is a whole number between 0 and 100
    const rate = ( interest_rate_num / 100 ) / 26;

    // creates the (1 + r) value
    const onePlusRate = 1 + rate;

    const number_of_payments = (amortization_period_num * 26)

    // to the power of n
    const onePlusRateSquaredByN = onePlusRate ** number_of_payments;

    // the formula's numerator
    const numerator = rate * onePlusRateSquaredByN;

    // the formula's denominator
    const denominator = onePlusRateSquaredByN - 1;

    // the calculation of the mortgage payments per schedule
    const mortgagePaymentPerPaymentSchedule = original_principle * (numerator / denominator) ;


    // M = roundedReturnValueMonthly

    const roundedReturnValueMonthly = mortgagePaymentPerPaymentSchedule; // round to two decimal

    console.log("calculator.js - mortgagePaymentPerPaymentScheduleCalculatorAcceleratedBiweekly", roundedReturnValueMonthly);


    return Number(roundedReturnValueMonthly);
}


function mortgagePaymentPerPaymentScheduleCalculatorAcceleratedAdditionalPayment(original_principle, interest_rate_num, amortization_period_num) {
    

    const monthlyPayment = mortgagePaymentPerPaymentScheduleCalculatorAcceleratedMonthly(original_principle, interest_rate_num, amortization_period_num);

    const additionalPayment = monthlyPayment / 26;

    // M = roundedReturnValueAdditionalPayment

    const roundedReturnValueAdditionalPayment = additionalPayment; // round to two decimal

    console.log("calculator.js - roundedReturnValueAdditionalPayment", roundedReturnValueAdditionalPayment);


    return Number(roundedReturnValueAdditionalPayment);
}



function mortgagePaymentPerPaymentScheduleCalculatorAccelerated(original_principle, interest_rate_num, amortization_period_num) {

    const biweeklyPayment = mortgagePaymentPerPaymentScheduleCalculatorAcceleratedBiweekly(original_principle, interest_rate_num, amortization_period_num);

    const additionalPayment = mortgagePaymentPerPaymentScheduleCalculatorAcceleratedAdditionalPayment(original_principle, interest_rate_num, amortization_period_num);


    const acceleratedPaymentTotal = biweeklyPayment + additionalPayment;

    // M = roundedReturnValue

    const roundedReturnValue = acceleratedPaymentTotal.toFixed(2); // round to two decimal

    console.log("calculator.js - roundedRetumortgagePaymentPerPaymentScheduleCalculatorAcceleratedrnValue", roundedReturnValue);


    return Number(roundedReturnValue);
}


module.exports = { mortgagePaymentPerPaymentScheduleCalculator , mortgagePaymentPerPaymentScheduleCalculatorAccelerated,     mortgagePaymentPerPaymentScheduleCalculatorAcceleratedMonthly,
    mortgagePaymentPerPaymentScheduleCalculatorAcceleratedBiweekly,
    mortgagePaymentPerPaymentScheduleCalculatorAcceleratedAdditionalPayment};

