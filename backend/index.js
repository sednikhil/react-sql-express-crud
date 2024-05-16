const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mysql2')
const cors = require('cors');


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Create MySQL connection
let connection = sql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password', 
  database: 'vahan'
});

connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  else console.log('Connected to the MySQL server.');
});

app.get('/', (req, res) => {
  res.redirect('/employees');
});
app.get('/employees', (req, res) => {
  connection.query('SELECT * FROM employees', function (err, rows, fields) {
    if (err) throw err
    res.json(rows);
  })
});



app.post('/add', (req, res) => {
  const { name, email, mobileNumber, dateOfBirth } = req.body;

  // Check if all required fields are present
  if (!name || !email || !mobileNumber || !dateOfBirth) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const q = "INSERT INTO employees (name, email, mobileNumber, dateOfBirth) VALUES (?, ?, ?, ?)";
  const values = [name, email, mobileNumber, dateOfBirth];
  
  connection.query(q, values, function (err, result) {
    if (err) {
      console.error('Error inserting employee:', err);
      return res.status(500).json({ error: 'Failed to add employee' });
    }
    console.log('Employee added successfully');
    res.status(201).json({ message: 'Employee added successfully', id: result.insertId });
  });
});

app.delete('/employees/:id', (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM employees WHERE id = ?', id, function (err, result) {
    if (err) {
      console.error('Error deleting employee:', err);
      return res.status(500).json({ error: 'Failed to delete employee' });
    }
    console.log('Employee deleted successfully');
    res.json({ message: 'Employee deleted successfully' });
  });
});

app.put('/employees/:id', (req, res) => {
  const id = req.params.id;
  const { name, email, mobileNumber, dateOfBirth } = req.body;

  // Check if all required fields are present
  if (!name || !email || !mobileNumber || !dateOfBirth) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const q = "UPDATE employees SET name = ?, email = ?, mobileNumber = ?, dateOfBirth = ? WHERE id = ?";
  const values = [name, email, mobileNumber, dateOfBirth, id];

  connection.query(q, values, function (err, result) {
    if (err) {
      console.error('Error updating employee:', err);
      return res.status(500).json({ error: 'Failed to update employee' });
    }
    console.log('Employee updated successfully');
    res.json({ message: 'Employee updated successfully' });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
