const { 
    mortgagePaymentPerPaymentScheduleCalculator,
    mortgagePaymentPerPaymentScheduleCalculatorAccelerated,
    mortgagePaymentPerPaymentScheduleCalculatorAcceleratedMonthly,
    mortgagePaymentPerPaymentScheduleCalculatorAcceleratedBiweekly,
    mortgagePaymentPerPaymentScheduleCalculatorAcceleratedAdditionalPayment
} = require('../utils/calculator');

describe('mortgagePaymentPerPaymentScheduleCalculator', () => {
    test('calculates monthly mortgage payment correctly', () => {
        const original_principle = 100000;
        const interest_rate_num = 5;
        const payment_schedule_num = 12;
        const number_of_payments = 360; 

        const result = mortgagePaymentPerPaymentScheduleCalculator(
            original_principle, interest_rate_num, payment_schedule_num, number_of_payments
        );

        expect(result).toBeCloseTo(536.82, 2); 
    });

    test('calculates mortgage payment with 0.01 interest rate', () => {
        const original_principle = 500000;
        const interest_rate_num = 0.01;
        const payment_schedule_num = 25;
        const number_of_payments = 650; 

        const result = mortgagePaymentPerPaymentScheduleCalculator(
            original_principle, interest_rate_num, payment_schedule_num, number_of_payments
        );

        expect(result).toBe(770.23); // does not include CMHC cost
    });


});

describe('mortgagePaymentPerPaymentScheduleCalculatorAcceleratedMonthly', () => {
    test('calculates monthly payment for accelerated monthly schedule', () => {
        const original_principle = 100000;
        const interest_rate_num = 5;
        const amortization_period_num = 30; 

        const result = mortgagePaymentPerPaymentScheduleCalculatorAcceleratedMonthly(
            original_principle, interest_rate_num, amortization_period_num
        );

        expect(result).toBeCloseTo(536.82, 2); 
    });
});

describe('mortgagePaymentPerPaymentScheduleCalculatorAcceleratedBiweekly', () => {
    test('calculates biweekly payment for accelerated biweekly schedule', () => {
        const original_principle = 100000;
        const interest_rate_num = 5;
        const amortization_period_num = 30; 
        const result = mortgagePaymentPerPaymentScheduleCalculatorAcceleratedBiweekly(
            original_principle, interest_rate_num, amortization_period_num
        );

        expect(result).toBeGreaterThanOrEqual(245); // lower bound
        expect(result).toBeLessThanOrEqual(250.); // upper bound

    });
});

describe('mortgagePaymentPerPaymentScheduleCalculatorAcceleratedAdditionalPayment', () => {
    test('calculates additional payment for accelerated plan', () => {
        const original_principle = 100000;
        const interest_rate_num = 5;
        const amortization_period_num = 30; 

        // calculate amounts with both helper function calculations
        const monthlyPayment = mortgagePaymentPerPaymentScheduleCalculatorAcceleratedMonthly(
            original_principle, interest_rate_num, amortization_period_num
        );

        const expectedAdditionalPayment = monthlyPayment / 26;

        const result = mortgagePaymentPerPaymentScheduleCalculatorAcceleratedAdditionalPayment(
            original_principle, interest_rate_num, amortization_period_num
        );

        // assert that the calculated additional payment matches the expected value
        expect(result).toBeCloseTo(expectedAdditionalPayment, 2); 
    });
});

describe('mortgagePaymentPerPaymentScheduleCalculatorAccelerated', () => {
    test('calculates total accelerated payment for accelerated plan', () => {
        const original_principle = 100000;
        const interest_rate_num = 5;
        const amortization_period_num = 30; 

        const biweeklyPayment = mortgagePaymentPerPaymentScheduleCalculatorAcceleratedBiweekly(
            original_principle, interest_rate_num, amortization_period_num
        );

        const additionalPayment = mortgagePaymentPerPaymentScheduleCalculatorAcceleratedAdditionalPayment(
            original_principle, interest_rate_num, amortization_period_num
        );

        const expectedTotalAcceleratedPayment = biweeklyPayment + additionalPayment;

        const result = mortgagePaymentPerPaymentScheduleCalculatorAccelerated(
            original_principle, interest_rate_num, amortization_period_num
        );

        // assert that mortgagePaymentPerPaymentScheduleCalculatorAccelerated function matches the sum of the two helpers 
        // (mortgagePaymentPerPaymentScheduleCalculatorAcceleratedBiweekly + mortgagePaymentPerPaymentScheduleCalculatorAcceleratedAdditionalPayment)
        expect(result).toBeCloseTo(expectedTotalAcceleratedPayment, 2); 
    });
});
