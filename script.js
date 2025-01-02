document
  .getElementById("data-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // prevent page reload

    // get input values
    const principal = document.getElementById("principal").value;
    const interest_rate = document.getElementById("interest_rate").value;
    const number_of_payments =
      document.getElementById("number_of_payments").value;
    const amortization_period = document.getElementById(
      "amortization_period"
    ).value;
    const payment_schedule = document.getElementById("payment_schedule").value;

    // validate input on client side
    if (
      !principal ||
      !interest_rate ||
      !number_of_payments ||
      !amortization_period ||
      !payment_schedule
    ) {
      alert("Numbers are required.");
      return;
    }

    try {
      // send data to backend
      const response = await fetch("http://localhost:3000/basic/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          principal: principal,
          interest_rate: interest_rate,
          number_of_payments: number_of_payments,
          amortization_period: amortization_period,
          payment_schedule: payment_schedule,
        }),
      });

      const result = await response.json();
      // surface response to client side
      // log the result to ensure the backend is returning the expected data
      console.log(result);

      // display the message and the result
      if (result.message && result.result !== undefined) {
        document.getElementById(
          "response-message"
        ).innerText = `${result.message}`;
      } else if (result.error) {
        // handle error response from the backend
        document.getElementById(
          "response-message"
        ).innerText = `Error: ${result.error}`;
      } else {
        document.getElementById("response-message").innerText =
          "Unexpected response format.";
      }
    } catch (error) {
      console.error("Error:", error);
      document.getElementById("response-message").innerText =
        "An error occurred.";
    }
  });
