const express = require('express');
const router = express.Router();


const { mortgagePaymentPerPaymentScheduleCalculator } = require('../utils/calculator');


// mortgage payment route
router.post('/payment', (req, res) => {
    console.log("Request Body:", req.body); // Log the incoming request payload
    const { principal, interest_rate, number_of_payments, amortization_period, payment_schedule } = req.body;


    // error checking
    if (!principal || isNaN(principal) || principal <= 0) {
        return res.status(400).json({ error: "Principal must be a positive number." });
    }

    if (!interest_rate || isNaN(interest_rate) || interest_rate <= 0 || interest_rate > 100) {
        return res.status(400).json({ error: "Interest rate must be a positive number between 0 and 100." });
    }

    if (!number_of_payments || isNaN(number_of_payments) || number_of_payments <= 0 || !Number.isInteger(+number_of_payments)) {
        return res.status(400).json({ error: "Number of payments must be a positive integer." });
    }

    const result = mortgagePaymentPerPaymentScheduleCalculator(principal, interest_rate, number_of_payments);


    try {
        // calculate the mortgage payment
        const response = {
            message: `Mortgage payment calculation is ${result}`
        };

        // return the result
        res.json(response);
        
    } catch (error) {
        // handle unexpected errors in the calculation
        res.status(500).json({ error: "An error occurred while calculating the mortgage payment." });
    }
});



module.exports = router;



