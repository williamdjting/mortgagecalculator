document
  .getElementById("data-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); 
    // prevent page reload

    // get input values
    const property_price = document.getElementById("property_price").value;
    const down_payment = document.getElementById("down_payment").value;
    const interest_rate = document.getElementById("interest_rate").value;

    const amortization_period = 
      document.querySelector('input[name="amortization_period"]:checked')?.value;

    const payment_schedule = document.querySelector(
      'input[name="payment_schedule"]:checked'
    )?.value;

    // validate input on client side
    if (
      !property_price ||
      !down_payment ||
      !interest_rate ||
      !amortization_period ||
      !payment_schedule
    ) {
      alert("Entries are required.");
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
          // turn string data type to number data type on client side
          property_price: Number(property_price),
          down_payment: Number(down_payment),
          interest_rate: Number(interest_rate),
          amortization_period: Number(amortization_period),
          payment_schedule: Number(payment_schedule),
        }),
      });

      const result = await response.json();
      // surface response to client side
      // log the result to ensure the backend is returning the expected data
      console.log("result in script.js", result);
      console.log("result.message in script.js", result.message);
      console.log("result.result in script.js", result.result);

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
