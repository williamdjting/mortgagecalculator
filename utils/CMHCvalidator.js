function cmhcCostCalculator30Year(property_price_num, down_payment_num) {
  // this function accounts 30 year amortization that a first time home buyer declares
  // https://www.ratehub.ca/cmhc-insurance-british-columbia
  // Note: your amortization period must be 25 years or less, or up to 30 years 
  // if you are a first-time home buyer, or purchasing a newly-constructed home.
  // Those who are eligible for a 30-year amortization while having an insured mortgage
  // must add 20 basis points to their default insurance premium.
  // For example, those who've made a down payment of 5 - 9.99% would have a premium of 4.2%.

  const principal = property_price_num - down_payment_num;

  let cmhcCost;

  if (
    down_payment_num / property_price_num < 0.1 &&
    down_payment_num / property_price_num >= 0.05
  ) {
    cmhcCost = 0.042 * principal;
  }

  if (
    down_payment_num / property_price_num >= 0.1 &&
    down_payment_num / property_price_num < 0.15
  ) {
    cmhcCost = 0.033 * principal;
  }

  if (
    down_payment_num / property_price_num >= 0.15 &&
    down_payment_num / property_price_num < 0.2
  ) {
    cmhcCost = 0.03 * principal;
  }

  if (
    down_payment_num / property_price_num >= 0.2 &&
    down_payment_num / property_price_num < 1
  ) {
    cmhcCost = 0;
  }

  console.log("chmcCostCalculator30Year", cmhcCost);

  return Number(cmhcCost);
}

function cmhcCostCalculatorNot30Year(property_price_num, down_payment_num) {
  // this function is for 5,10,15,20,25 year amortization period selections (base table)
  // https://www.ratehub.ca/cmhc-insurance-british-columbia
  // Note: your amortization period must be 25 years or less, or up to 30 years 
  // if you are a first-time home buyer, or purchasing a newly-constructed home.


  const principal = property_price_num - down_payment_num;

  let cmhcCost;

  if (
    down_payment_num / property_price_num < 0.1 &&
    down_payment_num / property_price_num >= 0.05
  ) {
    cmhcCost = 0.04 * principal;
  }

  if (
    down_payment_num / property_price_num >= 0.1 &&
    down_payment_num / property_price_num < 0.15
  ) {
    cmhcCost = 0.031 * principal;
  }

  if (
    down_payment_num / property_price_num >= 0.15 &&
    down_payment_num / property_price_num < 0.2
  ) {
    cmhcCost = 0.028 * principal;
  }

  if (
    down_payment_num / property_price_num >= 0.2 &&
    down_payment_num / property_price_num < 1
  ) {
    cmhcCost = 0;
  }

  console.log("cmhcCostCalculatorNot30Year", cmhcCost);

  return Number(cmhcCost);
}

module.exports = { cmhcCostCalculator30Year, cmhcCostCalculatorNot30Year };
