const apiUrl = 'http://localhost:3000/api/items';

export default async function updateData(updatedList) {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedList),
    });

    if (!response.ok) {
      throw new Error('Failed to update data on the server');
    }

    const result = await response.json();
    console.log('Data update response:', result);
  } catch (error) {
    console.error('Error updating data:', error);
  }
}
