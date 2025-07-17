const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // To parse JSON

let dataStore = {}; // In-memory store
let idCounter = 1;   // ID auto-increment

// POST - Create
app.post('/data', (req, res) => {
  const id = idCounter++;
  dataStore[id] = req.body;
  res.send({ message: 'Data stored', id, data: req.body });
});

// GET - Read
app.get('/data/:id', (req, res) => {
  const id = req.params.id;
  if (dataStore[id]) {
    res.send({ id, data: dataStore[id] });
  } else {
    res.status(404).send({ error: 'Data not found' });
  }
});

// GET - Get all data
app.get('/data', (req, res) => {
  res.send({ data: dataStore });
});


// PUT - Update
app.put('/data/:id', (req, res) => {
  const id = req.params.id;
  if (dataStore[id]) {
    dataStore[id] = req.body;
    res.send({ message: 'Data updated', id, data: dataStore[id] });
  } else {
    res.status(404).send({ error: 'Data not found' });
  }
});

// DELETE - Remove
app.delete('/data/:id', (req, res) => {
  const id = req.params.id;
  if (dataStore[id]) {
    delete dataStore[id];
    res.send({ message: 'Data deleted', id });
  } else {
    res.status(404).send({ error: 'Data not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
