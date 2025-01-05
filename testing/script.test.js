const path = require('path');
const fs = require('fs');

describe('Form Validation Tests', () => {
  let html;

  beforeAll(() => {
    // read the HTML content before each test
    html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8');
    
    // extract html from ../index.html
    document.documentElement.innerHTML = html;


    // mock the alert function to prevent the actual alert popup during tests
    global.alert = jest.fn();
  });

  test('valid inputs should not trigger alert', () => {
    
    document.getElementById('property_price').value = '500000';
    document.getElementById('down_payment').value = '100000';
    document.getElementById('interest_rate').value = '5';
    
 
    document.querySelector('input[name="amortization_period"][value="15"]').checked = true;
    

    document.querySelector('input[name="payment_schedule"][value="12"]').checked = true;


    document.getElementById('data-form').dispatchEvent(new Event('submit'));

    // no alert called because all inputs are present
    expect(global.alert).not.toHaveBeenCalled();
  });



  test('missing property price should trigger alert', () => {
  // this test fails... but it should tirgger the alert given the falsy values present


    // simulate missing property price
    document.getElementById('property_price').value = ''; 
    document.getElementById('down_payment').value = '100000';
    document.getElementById('interest_rate').value = '5';
    document.querySelector('input[name="amortization_period"][value="15"]').checked = true;
    document.querySelector('input[name="payment_schedule"][value="12"]').checked = true;

    document.getElementById('data-form').dispatchEvent(new Event('submit'));



     // Assert that alert was NOT called
    expect(global.alert).toHaveBeenCalled();
  });

  test('missing multiple fields should trigger alert', () => {
  // this test fails... but it should tirgger the alert given the falsy values present



    // simulate missing multiple fields
    document.getElementById('property_price').value = ''; 
    document.getElementById('down_payment').value = '';  
    document.getElementById('interest_rate').value = '5';
    document.querySelector('input[name="amortization_period"][value="15"]').checked = true;
    document.querySelector('input[name="payment_schedule"][value="12"]').checked = true;

    document.getElementById('data-form').dispatchEvent(new Event('submit'));


    // assert that alert was NOT called
    expect(global.alert).toHaveBeenCalled();
  });

  test('missing all fields should trigger alert', () => {
  // this test fails... but it should tirgger the alert given the falsy values present

    // simulate missing multiple fields
    document.getElementById('property_price').value = ''; 
    document.getElementById('down_payment').value = '';  
    document.getElementById('interest_rate').value = '';
    document.querySelector('input[name="amortization_period"][value="15"]').checked = false;
    document.querySelector('input[name="payment_schedule"][value="12"]').checked = false;

    document.getElementById('data-form').dispatchEvent(new Event('submit'));


    // assert that alert was NOT called
    expect(global.alert).toHaveBeenCalled();
  });


});
