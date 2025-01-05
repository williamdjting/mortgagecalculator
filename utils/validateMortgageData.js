// utils/validator.js
function validateMortgageData(
    property_price_num,
    down_payment_num,
    interest_rate_num,
    amortization_period_num,
    payment_schedule_num,
    res
  ) {
    // property price validation
    if (
      !property_price_num ||
      isNaN(property_price_num) ||
      property_price_num < 1
    ) {
      return res.status(400).json({
        error:
          "Property price must be a positive number, must exists and must be a Number equal or greater than $1 dollars",
      });
    }
  
    // down payment validation
    if (isNaN(down_payment_num) || down_payment_num < 0) {
      return res.status(400).json({
        error: `Down payment must exist and cannot be less than $0 dollars`,
      });
    }

    // in BC, the minimum down payment required for a home purchase varies based on the property's price: 
    // for homes priced at $500,000 or less, a 5% down payment is required; for homes priced between $500,000 and $1 million, 
    // the down payment is 5% of the first $500,000, plus 10% of the portion above $500,000; and for homes priced at $1 million or more, a 20% down payment is required.

  
    // down payment based on property price logic
    if (property_price_num <= 500000) {
      const minDownPayment = property_price_num * 0.05;
      if (down_payment_num < minDownPayment) {
        return res.status(400).json({
          error: `Down payment must be at least 5% of the property price ($${minDownPayment.toFixed(2)})`,
        });
      }
    } else if (property_price_num <= 1000000) {
      const minDownPayment =
        500000 * 0.05 + (property_price_num - 500000) * 0.10;
      if (down_payment_num < minDownPayment) {
        return res.status(400).json({
          error: `Down payment must be at least 5% of the first $500,000 and 10% of the portion above $500,000. Minimum required is $${minDownPayment.toFixed(2)}`,
        });
      }
    } else {
      const minDownPayment = property_price_num * 0.20;
      if (down_payment_num < minDownPayment) {
        return res.status(400).json({
          error: `Down payment must be at least 20% of the property price ($${minDownPayment.toFixed(2)})`,
        });
      }
    }
  
    if (down_payment_num >= property_price_num) {
      return res.status(400).json({
        error: "Down payment cannot be equal or exceed property price",
      });
    }
  
    // interest rate validation
    if (
      !interest_rate_num ||
      isNaN(interest_rate_num) ||
      interest_rate_num <= 0 ||
      interest_rate_num > 20
    ) {
      return res.status(400).json({
        error: "Interest rate must be a positive number greater than 0 and below 20.",
      });
    }
  
    // amortization period validation
    if (
      !amortization_period_num ||
      isNaN(amortization_period_num) ||
      amortization_period_num <= 0 ||
      amortization_period_num > 30 ||
      ![5, 10, 15, 20, 25, 30].includes(amortization_period_num)
    ) {
      return res.status(400).json({
        error: "Amortization period must be a positive integer (5,10,15,20,25,30).",
      });
    }
  
    // payment schedule validation
    if (
      !payment_schedule_num ||
      isNaN(payment_schedule_num) ||
      payment_schedule_num <= 0 ||
      ![12, 26, 13].includes(payment_schedule_num)
    ) {
      return res.status(400).json({
        error: "Payment schedule must be a positive integer (12, 26, 13).",
      });
    }
  
    return true; 
  }
  
  module.exports = { validateMortgageData };
  