document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('cargoForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      // Fetch existing data from the server
      const response = await fetch('/api/items');
      const data = await response.json();
      const cargoList = data.cargoList;

      // Generate a new ID
      let nextId = 1; // Default ID if the list is empty
      if (cargoList.length > 0) {
        // Find the maximum numeric part of the IDs
        const maxId = Math.max(
          ...cargoList.map((item) => parseInt(item.id.replace('CARGO', '')))
        );
        nextId = maxId + 1;
      }
      const newId = `CARGO${String(nextId).padStart(3, '0')}`; // Format as CARGO003, CARGO004, etc.

      // Extract values from the form
      const name = document.getElementById('name').value;
      const status = document.getElementById('status').value;
      const origin = document.getElementById('origin').value;
      const destination = document.getElementById('destination').value;
      const departureDate = document.getElementById('departureDate').value;

      // Create a new cargo item
      const newCargoItem = {
        id: newId,
        name: name,
        status: status,
        origin: origin,
        destination: destination,
        departureDate: departureDate,
      };

      // Add the new item to the cargo list
      cargoList.push(newCargoItem);

      // Update the server with the new data
      const updateResponse = await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cargoList }), // Post the updated data
      });

      if (updateResponse.ok) {
        alert('Cargo item added successfully!');
        // Optionally clear the form
        e.target.reset();
      } else {
        alert('Failed to update the server.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding the cargo item.');
    }
  });
})
