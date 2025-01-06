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

// const { validateMortgageData } = require("../utils/validateMortgageData");

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

  // property_price will be entered in a range by user, cannot be below 1 dollar
  // down_payment will be entered in a range by user, cannot exceed property_price, must be 5% of property price
  // interest_rate entered by user, in 0.01 increments, capped at 20 on client side, this is historical range for mortgages
  // original_principle is property_price - down_payment
  // number_of_payments is amortization_period * payment_schedule

  // 2. ERROR/TYPE CHECKING

  // <---  isValid code block is not being used, validation is below  --->
  // const isValid = validateMortgageData(
  //   property_price_num,
  //   down_payment_num,
  //   interest_rate_num,
  //   amortization_period_num,
  //   payment_schedule_num,
  //   res
  // );

  // if (!isValid) {
  //   // If validation fails, stop the rest of the code from executing.
  //   console.log("Validation failed. Returning early.");
  //   return; // Exiting early to avoid further code execution.
  // }
  // <---  isValid code block is not being used, validation is below  --->

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

  // down payment based on above requirements
  if (property_price_num <= 500000) {
    const minDownPayment = property_price_num * 0.05;
    if (down_payment_num < minDownPayment) {
      return res.status(400).json({
        error: `Down payment must be at least 5% of the property price ($${minDownPayment.toFixed(
          2
        )})`,
      });
    }
  } else if (property_price_num <= 1000000) {
    const minDownPayment = 500000 * 0.05 + (property_price_num - 500000) * 0.1;
    if (down_payment_num < minDownPayment) {
      return res.status(400).json({
        error: `Down payment must be at least 5% of the first $500,000 and 10% of the portion above $500,000. Minimum required is $${minDownPayment.toFixed(
          2
        )}`,
      });
    }
  } else {
    const minDownPayment = property_price_num * 0.2;
    if (down_payment_num < minDownPayment) {
      return res.status(400).json({
        error: `Down payment must be at least 20% of the property price ($${minDownPayment.toFixed(
          2
        )})`,
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
      error:
        "Interest rate must be a positive number greater than 0 and below 20.",
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
      error:
        "Amortization period must be a positive integer (5,10,15,20,25,30).",
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

  // 3. CMHC COST CALCULATION
  let original_principle;

  let cmhcCost = 0;

  if (
    amortization_period_num == 30 &&
    down_payment_num / property_price_num < 0.2
  ) {
    // calculate the addition of CMHC price for 30 year amortization / first time home buyer

    cmhcCost = cmhcCostCalculator30Year(property_price_num, down_payment_num);
    if (cmhcCost === undefined) {
      console.log("Error: CMHC cost is undefined for 30-year calculation.");
      return res.status(400).json({
        error: "Error calculating CMHC cost for 30-year amortization.",
      });
    }

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

    if (cmhcCost === undefined) {
      console.log("Error: CMHC cost is undefined for non-30-year calculation.");
      return res.status(400).json({
        error: "Error calculating CMHC cost for non-30-year amortization.",
      });
    }

    original_principle = property_price_num - down_payment_num + cmhcCost;
  } else {
    original_principle = property_price_num - down_payment_num + cmhcCost;
  }

  // 4. MORTGAGE PAYMENT CALCULATION

  console.log("original principle in basic.js", original_principle);

  const number_of_payments = amortization_period_num * payment_schedule_num;

  let result;

  if (payment_schedule_num == 13) {
    // 5. ACCELERATED BIWEEKLY PAYMENT CALCULATION
    result = mortgagePaymentPerPaymentScheduleCalculatorAccelerated(
      original_principle,
      interest_rate_num,
      amortization_period_num
    );
  } else if (payment_schedule_num == 12 || payment_schedule_num == 26) {
    // 5. NOT ACCELERATED BIWEEKLY PAYMENT CALCULATION
    result = mortgagePaymentPerPaymentScheduleCalculator(
      original_principle,
      interest_rate_num,
      payment_schedule_num,
      number_of_payments
    );
  }

  // ensure result is valid before proceeding with response
  if (isNaN(result)) {
    console.log("Error: Mortgage payment calculation returned NaN.");
    return res.status(400).json({
      error:
        "There was an issue calculating the mortgage payment. Please check the input values.",
    });
  }

  // 6. MORTGAGE PAYMENT RESPONSE
  try {
    // calculate the mortgage payment
    const response = {
      result: result,
      message: `Mortgage payment per payment schedule is ${result}`,
    };

    console.log("response.message inside basic.js", response.message);

    // return the result
    return res.status(200).json(response);
  } catch (error) {
    // handle unexpected errors in the calculation
    return res.status(500).json({
      error: "An error occurred while calculating the mortgage payment.",
    });
  }
});

module.exports = router;
