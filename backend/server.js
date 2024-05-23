const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// MySQL connection setup
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Balderdash2004@',
    database: 'my_form_data'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database');
});

// Endpoint to fetch a row by ID
app.get('/api/data/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM responses WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send(err);
    } else {
      res.json(results[0]); // Assuming id is unique, so results[0] will be the row
      console.log('Data fetched:', results[0]);
    }
  });
});

// Endpoint to simulate processing and return 0 or 1 randomly
app.post('/api/process', (req, res) => {
  const result = Math.random() > 0.5 ? 1 : 0;
  res.json({ result });
});

// Endpoint to update field9 by ID
app.put('/api/update-field9/:id', (req, res) => {
  const { id } = req.params;
  const { field9 } = req.body;
  connection.query('UPDATE responses SET field9 = ? WHERE id = ?', [field9, id], (err, results) => {
    if (err) {
      console.error('Error updating field9:', err);
      res.status(500).send(err);
    } else {
      res.send('Field 9 updated successfully');
      console.log('Field 9 updated:', { id, field9 });
    }
  });
});

// Endpoint to fetch all data
app.get('/api/data', (req, res) => {
  connection.query('SELECT * FROM responses', (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send(err);
    } else {
      res.json(results);
      console.log('Data fetched:', results);
    }
  });
});

// Endpoint to fetch all data (second version)
app.get('/api/data2', (req, res) => {
  connection.query('SELECT * FROM responses', (err, results) => {
    if (err) {
      console.error('Error fetching data2:', err);
      res.status(500).send(err);
    } else {
      res.json(results);
      console.log('Data2 fetched:', results);
    }
  });
});

// Endpoint to get the count of entries
app.get('/api/count', (req, res) => {
  connection.query('SELECT COUNT(*) AS count FROM responses', (err, results) => {
    if (err) {
      console.error('Error fetching count:', err);
      res.status(500).send(err);
    } else {
      res.json({ count: results[0].count });
      console.log('Count fetched:', results[0].count);
    }
  });
});

// Endpoint to get the count of entries (second version)
app.get('/api/count2', (req, res) => {
  connection.query('SELECT COUNT(*) AS count FROM responses', (err, results) => {
    if (err) {
      console.error('Error fetching count2:', err);
      res.status(500).send(err);
    } else {
      res.json({ count: results[0].count });
      console.log('Count2 fetched:', results[0].count);
    }
  });
});


// Endpoint to get the count of entries where field9 = 1
app.get('/api/likelycount', (req, res) => {
  connection.query('SELECT COUNT(*) AS likelycount FROM responses WHERE field9 = 1', (err, results) => {
    if (err) {
      console.error('Error fetching likelycount:', err);
      res.status(500).send(err);
    } else {
      res.json({ likelycount: results[0].likelycount });
      console.log('Likelycount fetched:', results[0].likelycount);
    }
  });
});

// Endpoint to get the count of entries where field9 = 0
app.get('/api/notlikelycount', (req, res) => {
  connection.query('SELECT COUNT(*) AS notlikelycount FROM responses WHERE field9 = 0', (err, results) => {
    if (err) {
      console.error('Error fetching notlikelycount:', err);
      res.status(500).send(err);
    } else {
      res.json({ notlikelycount: results[0].notlikelycount });
      console.log('NotLikelycount fetched:', results[0].notlikelycount);
    }
  });
});


// DELETE endpoint to clear all data from the database except specific IDs
app.delete('/api/data', (req, res) => {
  console.log('Received DELETE request to /api/data');
  connection.query("DELETE FROM responses WHERE id NOT IN (?, ?, ?, ?, ?)", [1, 2, 3, 4, 5], (err, results) => {
    if (err) {
      console.error('Error executing delete query:', err);
      res.status(500).send({ error: 'Internal Server Error' });
    } else {
      res.send('All entries except IDs 1, 2, 3, 4, and 5 deleted.');
      console.log('Entries deleted except IDs 1, 2, 3, 4, and 5');
    }
  });
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});