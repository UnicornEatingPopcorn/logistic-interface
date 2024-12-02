import renderTable from "./renderTable.js"

const apiUrl = 'http://localhost:3000/api/items';

export default async function fetchData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    renderTable(data.cargoList);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
