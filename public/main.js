const tableContent = document.getElementById('table-content');
const apiUrl = 'http://localhost:3000/api/items';

async function fetchData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    renderTable(data.cargoList);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

async function updateData(updatedList) {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedList),
    });

    const result = await response.json();
    console.log('Data update response:', result);
  } catch (error) {
    console.error('Error updating data:', error);
  }
}

function renderTable(cargoList) {
  const itemsHtml = cargoList
    .map(item => {
      let statusClass = getStatusClass(item.status);

      return `
        <tr>
          <th id="${item.id}" scope="row">${item.id}</th>
          <td>${item.name}</td>
          <td>
            <div class="dropdown">
              <button class="btn ${statusClass} dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">${item.status}</button>
              <div class="dropdown-menu">
                <button class="dropdown-item btn btn-success" data-value="В пути">В пути</button>
                <button class="dropdown-item btn btn-warning" data-value="Ожидает отправки">Ожидает отправки</button>
                <button class="dropdown-item btn btn-danger" data-value="Доставлен">Доставлен</button>
              </div>
            </div>
          </td>
          <td>${item.origin}</td>
          <td>${item.destination}</td>
          <td>${item.departureDate}</td>
        </tr>
      `;
    })
    .join('');

  tableContent.innerHTML = itemsHtml;

  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener("click", () => {
      toggle.closest(".dropdown").querySelector(".dropdown-menu").classList.add("show");
    })
  })

  const dropdownItems = document.querySelectorAll('.dropdown-item');
  dropdownItems.forEach(item => {
    item.addEventListener('click', function() {
      const newValue = this.getAttribute('data-value');
      const dropdownButton = this.closest('.dropdown').querySelector('.dropdown-toggle');
      const dropdownMenu = this.closest('.dropdown').querySelector('.dropdown-menu');
      const itemId = this.closest('tr').querySelector('th').id;

      dropdownButton.textContent = newValue;
      dropdownButton.classList.remove("btn-primary", "btn-warning", "btn-success", "btn-secondary");
      dropdownButton.classList.add(getStatusClass(newValue));

      const updatedList = cargoList.map(item => {
        if (item.id === itemId) {
          item.status = newValue;
        }
        return item;
      });

      dropdownMenu.classList.remove("show")
      updateData(updatedList);
    });
  })
}

function getStatusClass(status) {
  switch (status) {
    case "В пути":
      return "btn-primary";
    case "Ожидает отправки":
      return "btn-warning";
    case "Доставлен":
      return "btn-success";
    default:
      return "btn-secondary";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});
