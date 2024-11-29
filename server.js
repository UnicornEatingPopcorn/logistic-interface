import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
const app = express();
const port = 3000;

app.use(express.json());

app.use(express.static('public'));

const __filename = fileURLToPath(import.meta.url); // Get the file path
const __dirname = path.dirname(__filename); // Get the directory name

app.get('/api/items', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'db.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read db.json' });
    }
    res.json(JSON.parse(data));
  });
});

app.post('/api/items', (req, res) => {
  const updatedItems = req.body.cargoList; // Extract the array from cargoList

  if (!Array.isArray(updatedItems)) {
    return res.status(400).json({ error: 'cargoList must be an array' });
  }

  const filePath = path.join(__dirname, 'data', 'db.json');

  // Read the current db.json file
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read db.json' });
    }

    let dbData;
    try {
      dbData = JSON.parse(data);
    } catch (parseError) {
      return res.status(500).json({ error: 'Failed to parse db.json' });
    }

    // Update the cargoList in db.json
    dbData.cargoList = updatedItems;

    // Write the updated data back to the file
    fs.writeFile(filePath, JSON.stringify(dbData, null, 2), 'utf8', (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to update db.json' });
      }
      res.json({ message: 'Data updated successfully' });
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
