import './style.css'
import { editHandler, handleDropdownValue } from './handlingEvents.js'
import 'bootstrap/dist/css/bootstrap.min.css';

export default async function fetchAndDisplayItems() {
  const tableContent = document.getElementById("table-content");

  try {
    const response = await fetch("src/db.json");
    if (!response.ok) {
      throw new Error("Failed to fetch items.");
    }

    const data = await response.json();

    const itemsHtml = data.cargoList
      .map((item) => {
        let statusClass = "btn-secondary"; // Default class

        switch (item.status) {
          case "В пути":
            statusClass = "btn-primary";
            break;

          case "Ожидает отправки":
            statusClass = "btn-warning";
            break;

          case "Доставлен":
            statusClass = "btn-success";
            break;
        }

        return `
          <tr id=${item.id}>
            <th scope="row">${item.id}</th>
            <td>${item.name}</td>
            <td>
              <div class="dropdown">
                <button class="btn ${statusClass} dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">${item.status}</button>
                <div class="dropdown-menu">
                  <button class="dropdown-item btn btn-primary" data-value="В пути">В пути</button>
                  <button class="dropdown-item btn btn-warning" data-value="Ожидает отправки">Ожидает отправки</button>
                  <button class="dropdown-item btn btn-success" data-value="Доставлен">Доставлен</button>
                </div>
              </div>
            </td>
            <td>${item.origin}</td>
            <td>${item.destination}</td>
            <td>${item.departureDate}</td>
            <td>
              <button class="btn btn-danger" data-id=${item.id}>
                Edit
              </button>
            </td>
          </tr>
        `;
      });

    tableContent.innerHTML = itemsHtml;
    editHandler();
    handleDropdownValue();
  } catch (error) {
    console.error("Error:", error);
    tableContent.textContent = "Failed to load items.";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchAndDisplayItems();
});
