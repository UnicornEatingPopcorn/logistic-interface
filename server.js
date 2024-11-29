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
  const updatedItems = req.body; // Expecting an array of items

  const filePath = path.join(__dirname, 'data', 'db.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read db.json' });
    }

    let jsonData = JSON.parse(data);

    updatedItems.forEach(updatedItem => {
      const itemIndex = jsonData.cargoList.findIndex(item => item.id === updatedItem.id);

      if (itemIndex === -1) {
        console.log(`Item with id ${updatedItem.id} not found`);
      } else {
        jsonData.cargoList[itemIndex] = { ...jsonData.cargoList[itemIndex], ...updatedItem };
      }
    });

    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to update db.json' });
      }
      res.json({ message: 'Items updated successfully' });
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
