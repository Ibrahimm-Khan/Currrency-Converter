const dropdowns = document.querySelectorAll(".dropdown select");
const input = document.querySelector("input");
let msg = document.querySelector(".msg");
let btn = document.querySelector("button");

for (let select of dropdowns) {
  for (code in countryList) {
    let newOpt = document.createElement("option");
    newOpt.innerHTML = code;
    newOpt.value = code;
    select.appendChild(newOpt);
  }
  select.addEventListener("change", (element) => {
    let selectedCountry = element.target.value;
    let selectElem = element.target;
    let currCode = countryList[selectedCountry];
    let img = selectElem.parentElement.querySelector("img");
    let newSrc = `https://flagsapi.com/${currCode}/flat/64.png`;
    img.src = newSrc;
  });
}

btn.addEventListener("click", (event) => {
  event.preventDefault();
  let amount = input.value;
  console.log(amount);
  let fromCurrency = dropdowns[0].value;
  let toCurrency = dropdowns[1].value;
  if (amount == "" || isNaN(amount)) {
    alert("Amount must be numbers , Please check your input!");
  } else {
    CurrencyCoverter(amount, fromCurrency, toCurrency);
  }
});

async function CurrencyCoverter(amount, fromCurrency, toCurrency) {
  const response = await fetch(
    `https://open.er-api.com/v6/latest/${fromCurrency}`
  );
  const data = await response.json();
  console.log(data);
  const rate = data.rates[toCurrency];
  const converted = amount * rate;
  console.log(
    `${amount} ${fromCurrency} = ${converted.toFixed(2)} ${toCurrency}`
  );
  msg.innerHTML = `${amount} ${fromCurrency} = ${converted.toFixed(
    0
  )} ${toCurrency}`;
}
