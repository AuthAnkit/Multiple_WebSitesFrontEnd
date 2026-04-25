const API_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

let coinsData = [];

function fetchDataUsingThen() {
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      coinsData = data;
      renderTable(coinsData);
    })
    .catch((error) => console.error("Error fetching data:", error));
}

async function fetchDataUsingAsync() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    coinsData = data;
    renderTable(coinsData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}


function renderTable(data) {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  data.forEach((coin) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td><img src="${coin.image}" width="30" /></td>
      <td>${coin.name}</td>
      <td>${coin.symbol.toUpperCase()}</td>
      <td>$${coin.current_price}</td>
      <td>${coin.total_volume}</td>
      <td>${coin.market_cap}</td>
      <td>${coin.price_change_percentage_24h.toFixed(2)}%</td>
    `;

    tableBody.appendChild(row);
  });
}

function searchCoin() {
  const input = document
    .getElementById("searchInput")
    .value.toLowerCase();

  const filteredData = coinsData.filter(
    (coin) =>
      coin.name.toLowerCase().includes(input) ||
      coin.symbol.toLowerCase().includes(input)
  );

  renderTable(filteredData);
}

function sortByMarketCap() {
  const sortedData = [...coinsData].sort(
    (a, b) => b.market_cap - a.market_cap
  );
  renderTable(sortedData);
}


function sortByPercentage() {
  const sortedData = [...coinsData].sort(
    (a, b) =>
      b.price_change_percentage_24h -
      a.price_change_percentage_24h
  );
  renderTable(sortedData);
}


fetchDataUsingAsync();
// fetchDataUsingThen(); // optional
