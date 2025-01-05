const { 
    cmhcCostCalculator30Year, cmhcCostCalculatorNot30Year,
} = require('../utils/CMHCvalidator');


describe('cmhcCostCalculator30Year', () => {
    test('calculates CMHC cost for 30-year amortization with a 5-9.99% down payment', () => {
        const property_price = 500000; 
        const down_payment = 30000; // 6% down payment

        const result = cmhcCostCalculator30Year(property_price, down_payment);

        // principal = 500000 - 30000 = 470000
        // CMHC cost = 0.042 * 470000 = 19740
        expect(result).toBeCloseTo(19740, 2); 

    });

    test('calculates CMHC cost for 30-year amortization with a 10-14.99% down payment', () => {
        const property_price = 500000; 
        const down_payment = 60000; // 12% down payment

        const result = cmhcCostCalculator30Year(property_price, down_payment);

        // principal = 500000 - 60000 = 440000
        // CMHC cost = 0.033 * 440000 = 14520
        expect(result).toBeCloseTo(14520, 2); 

    });
});


describe('cmhcCostCalculatorNot30Year', () => {
    test('calculates CMHC cost for non-30-year amortization with a 5-9.99% down payment', () => {
        const property_price = 500000; 
        const down_payment = 30000; // 6% down payment

        const result = cmhcCostCalculatorNot30Year(property_price, down_payment);

        // principal = 500000 - 30000 = 470000
        // CMHC cost = 0.04 * 470000 = 18800
        expect(result).toBeCloseTo(18800, 2); 

    });

    test('calculates CMHC cost for non-30-year amortization with a 10-14.99% down payment', () => {
        const property_price = 500000; 
        const down_payment = 60000; // 12% down payment

        const result = cmhcCostCalculatorNot30Year(property_price, down_payment);

        // principal = 500000 - 60000 = 440000
        // CMHC cost = 0.031 * 440000 = 13640
        expect(result).toBeCloseTo(13640, 2);
    });
});
