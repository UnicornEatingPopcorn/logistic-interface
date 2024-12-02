import renderTable from "./renderTable.js"

export default function submitForm() {
  document.getElementById('cargoForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/items');
      const data = await response.json();
      const cargoList = data.cargoList;

      let nextId = 1;
      if (cargoList.length > 0) {
        const maxId = Math.max(
          ...cargoList.map((item) => parseInt(item.id.replace('CARGO', '')))
        );
        nextId = maxId + 1;
      }
      const newId = `CARGO${String(nextId).padStart(3, '0')}`;

      const name = document.getElementById('name').value;
      const status = document.getElementById('status').value;
      const origin = document.getElementById('origin').value;
      const destination = document.getElementById('destination').value;
      const departureDate = document.getElementById('departureDate').value;

      const newCargoItem = {
        id: newId,
        name: name,
        status: status,
        origin: origin,
        destination: destination,
        departureDate: departureDate,
      };

      cargoList.push(newCargoItem);

      const updateResponse = await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cargoList }),
      });

      if (updateResponse.ok) {
        alert('Cargo item added successfully!');
        renderTable(cargoList);
        e.target.reset();
      } else {
        alert('Failed to update the server.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding the cargo item.');
    }
  });
}
