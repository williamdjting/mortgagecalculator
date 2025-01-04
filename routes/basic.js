const express = require("express");
const router = express.Router();

const {
  mortgagePaymentPerPaymentScheduleCalculator,
  mortgagePaymentPerPaymentScheduleCalculatorAccelerated,
} = require("../utils/calculator");

const {
  cmhcCostCalculator30Year,
  cmhcCostCalculatorNot30Year,
} = require("../utils/CMHCvalidator");

// mortgage payment route
router.post("/payment", (req, res) => {
  console.log("Request Body:", req.body);
  // 1. RETRIEVE INFORMATION FROM FRONT END
  // log the incoming request payload
  const {
    property_price,
    down_payment,
    interest_rate,
    amortization_period,
    payment_schedule,
  } = req.body;

  // parse each variable as a Number for usage as number type on server side (already did on client side)
  const property_price_num = Number(property_price);
  const down_payment_num = Number(down_payment);
  const interest_rate_num = Number(interest_rate);
  const amortization_period_num = Number(amortization_period);
  const payment_schedule_num = Number(payment_schedule);

  // property_price will be entered in a range by user
  // down_payment will be entered in a range by user, cannot exceed property_price
  // interest_rate from a data source or scraped
  // original_principle is property_price - down_payment
  // number_of_payments is amortization_period * payment_schedule

  // 2. ERROR/TYPE CHECKING 
  if (
    !property_price_num ||
    isNaN(property_price_num) ||
    property_price_num <= 0
  ) {
    return res.status(400).json({
      error:
        "property_price must be a positive number, must exists and must be a Number",
    });
  }

  if (!down_payment_num || isNaN(down_payment_num) || down_payment_num < 0) {
    return res.status(400).json({
      error:
        "down_payment must be a positive number, must exists and must be a Number",
    });
  }


  if (down_payment_num < (property_price_num * 0.05)) {
    return res.status(400).json({
      error:
        `Down payment must be at least 5% of the property price. Minimum down payment required of 5% of property price}`,
    });
  }

  if (down_payment_num >= property_price_num) {
    return res.status(400).json({
      error:
        "down_payment cannot be equal or exceed property_price, must exists and must be a Number",
    });
  }

  if (
    !interest_rate_num ||
    isNaN(interest_rate_num) ||
    interest_rate_num <= 0 ||
    interest_rate_num > 100
  ) {
    return res.status(400).json({
      error:
        "Interest rate must be a positive number between 0 and 100, must exists and must be a Number",
    });
  }

  if (
    !amortization_period_num ||
    isNaN(amortization_period_num) ||
    amortization_period_num <= 0 ||
    amortization_period_num > 30
  ) {
    return res.status(400).json({
      error:
        "amortization_period must be a positive integer between 0 and 30, must exists and must be a Number",
    });
  }

  if (
    !payment_schedule_num ||
    isNaN(payment_schedule_num) ||
    payment_schedule_num <= 0
  ) {
    return res.status(400).json({
      error:
        "payment_schedule must be a positive integer, must exists and must be a Number",
    });
  }

  // 3. CMHC COST CALCULATION
  let original_principle;

  let cmhcCost = 0;

  if (
    amortization_period_num == 30 &&
    down_payment_num / property_price_num < 0.2
  ) {
    // calculate the addition of CMHC price for 30 year amortization / first time home buyer

    cmhcCost = cmhcCostCalculator30Year(property_price_num, down_payment_num);

    original_principle = property_price_num - down_payment_num + cmhcCost;
  } else if (
    (amortization_period_num == 5 ||
      amortization_period_num == 10 ||
      amortization_period_num == 15 ||
      amortization_period_num == 20 ||
      amortization_period_num == 25) &&
    down_payment_num / property_price_num < 0.2
  ) {
    // calculate the addition of CMHC price for 5,10,15,20,25 year amortization

    cmhcCost = cmhcCostCalculatorNot30Year(
      property_price_num,
      down_payment_num
    );

    original_principle = property_price_num - down_payment_num + cmhcCost;
  } else if (
    down_payment_num / property_price_num >= 0.2 &&
    down_payment_num / property_price_num <= 1
  ) {
    original_principle = property_price_num - down_payment_num + cmhcCost;
  } else {
    original_principle = property_price_num - down_payment_num + cmhcCost;
  }

  // 4. MORTGAGE PAYMENT CALCULATION

  console.log("original principle in basic.js", original_principle);

  const number_of_payments = amortization_period_num * payment_schedule_num;

  let result;

  if (payment_schedule_num == 13) {

    // 5. ACCELERATED PAYMENT CALCULATION
    result = mortgagePaymentPerPaymentScheduleCalculatorAccelerated(
      original_principle,
      interest_rate_num,
      amortization_period_num
    );
  } else if (payment_schedule_num == 12 || payment_schedule_num == 26) {
    result = mortgagePaymentPerPaymentScheduleCalculator(
      original_principle,
      interest_rate_num,
      payment_schedule_num,
      number_of_payments
    )};


  // 6. MORTGAGE PAYMENT RESPONSE
  try {
    // calculate the mortgage payment
    const response = {
      result: result,
      message: `Mortgage payment calculation is ${result}`,
    };

    console.log("response.message inside basic.js", response.message);

    // return the result
    res.json(response);
  } catch (error) {
    // handle unexpected errors in the calculation
    res.status(500).json({
      error: "An error occurred while calculating the mortgage payment.",
    });
  }
});

module.exports = router;
