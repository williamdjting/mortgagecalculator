# BC Mortgage Calculation API

- **Instructions for use**

    - Install Node, Express, and all other dependencies via `npm i`.

    - To boot up the backend server, use `node index.js`.
      - The server will be available on `localhost:3000`.

    - To boot up the client server, install Node.js HTTP Server using `npm install -g http-server` and then start the client server using `http-server .`.

    - The server will be available on one of these IPs:
      - `localhost:8080`
      - `http://127.0.0.1:8080`
      - `http://192.168.1.137:8080`
      - `http://192.168.1.104:8080`
      - `http://169.254.134.151:8080`

    - This will serve the `index.html` as the web form of the API.

    - Interact with the web form to generate the results of your calculation given the inputs.

    - Enjoy!

- **Notes** 
    - `localhost:8080` works reliably so preference is to use this.

    - Inputs are:
      -  property price
      -  down payment
      - annual interest rate
      -  amortization period (5 year increments between 5 and 30 years)
      - payment schedule (accelerated bi-weekly, bi-weekly, monthly)

    - Expected Outputs are: 
      - payment per payment schedule
      - an error if the inputs are not valid. This includes cases where the down payment is not large enough.

    - I have kept the console.logs present on client and server side for ease of review.

    - No GET routes were created as there is nothing to get from the server / database nor was saving or storing of data mentioned in the requirements.

    - Front End is served by the HTTP Server and not a GET route.

- **To run test suite** 
    - decided to use JEST as the testing framework. to begin, install `npm install --save-dev jest`.

    - to send HTTP requests to express API during testing, install `npm install --save-dev supertest`.

    - to run all the tests, please use `npm test`.