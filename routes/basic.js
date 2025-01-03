const express = require("express");
const router = express.Router();

const {
  mortgagePaymentPerPaymentScheduleCalculator,
} = require("../utils/calculator");

// mortgage payment route
router.post("/payment", (req, res) => {
  console.log("Request Body:", req.body); // Log the incoming request payload
  const {
    property_price,
    down_payment,
    interest_rate,
    amortization_period,
    payment_schedule,
  } = req.body;

  // parse each variable as a float for usage as number type
  const property_price_num = parseFloat(property_price);
  const down_payment_num = parseFloat(down_payment);
  const interest_rate_num = parseFloat(interest_rate);
  const amortization_period_num = parseFloat(amortization_period);
  const payment_schedule_num = parseFloat(payment_schedule);

  // property_price will be entered in a range by user
  // down_payment will be entered in a range by user, cannot exceed property_price
  // interest_rate from a data source or scraped
  // principal is property_price - down_payment
  // number_of_payments is amortization_period * payment_schedule

  // error checking
  if (
    !property_price_num ||
    isNaN(property_price_num) ||
    property_price_num <= 0
  ) {
    return res
      .status(400)
      .json({ error: "property_price must be a positive number." });
  }

  if (!down_payment_num || isNaN(down_payment_num) || down_payment_num <= 0) {
    return res
      .status(400)
      .json({ error: "down_payment must be a positive number." });
  }

  if (down_payment_num >= property_price_num) {
    return res
      .status(400)
      .json({ error: "down_payment cannot be equal or exceed property_price" });
  }

  if (
    !interest_rate_num ||
    isNaN(interest_rate_num) ||
    interest_rate_num <= 0 ||
    interest_rate_num > 100
  ) {
    return res.status(400).json({
      error: "Interest rate must be a positive number between 0 and 100.",
    });
  }

  if (
    !amortization_period_num ||
    isNaN(amortization_period_num) ||
    amortization_period_num <= 0 ||
    amortization_period_num > 30
  ) {
    return res
      .status(400)
      .json({ error: "amortization_period must be a positive integer." });
  }

  if (
    !payment_schedule_num ||
    isNaN(payment_schedule_num) ||
    payment_schedule_num <= 0
  ) {
    return res
      .status(400)
      .json({ error: "payment_schedule must be a positive integer." });
  }

  const principal = property_price_num - down_payment_num;

  const number_of_payments = amortization_period_num * payment_schedule_num;

  const result = mortgagePaymentPerPaymentScheduleCalculator(
    principal,
    interest_rate_num,
    number_of_payments
  );

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
