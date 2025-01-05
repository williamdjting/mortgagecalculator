const request = require("supertest");
const app = require("../index"); // import the Express app

describe("POST /basic/payment", () => {
  it("should return a status code of 200 and the correct result and succeed", async () => {
    // mock req.body
    const property_price = 500000;
    const down_payment = 50000;
    const interest_rate = 5;
    const amortization_period = 25;
    const payment_schedule = 12;

    // expected result, correct value
    const expectedResult = 2712.21;

    // send the POST request
    const response = await request(app)
      .post("/basic/payment")
      .send({
        property_price: Number(property_price),
        down_payment: Number(down_payment),
        interest_rate: Number(interest_rate),
        amortization_period: Number(amortization_period),
        payment_schedule: Number(payment_schedule),
      });


    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("result");
    expect(response.body.result).toBeCloseTo(expectedResult, 2);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toContain(
      `Mortgage payment per payment schedule is ${expectedResult}`
    );
  });

  it("should return a status code of 200 and the incorrect result and fail", async () => {
    // mock req.body
    const property_price = 500000; 
    const down_payment = 50000;
    const interest_rate = 5;
    const amortization_period = 25;
    const payment_schedule = 12;

    // incorrect value
    const expectedResult = 2800.21;

    // send the POST request
    const response = await request(app)
      .post("/basic/payment")
      .send({
        property_price: Number(property_price),
        down_payment: Number(down_payment),
        interest_rate: Number(interest_rate),
        amortization_period: Number(amortization_period),
        payment_schedule: Number(payment_schedule),
      });


    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("result");
    expect(response.body.result).toBeCloseTo(expectedResult, 2); // fail case
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toContain(
      `Mortgage payment per payment schedule is ${expectedResult}`
    ); // fail case
  });
});
