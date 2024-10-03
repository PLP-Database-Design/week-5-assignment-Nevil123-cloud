// importing dependencies
const express = require('express')
const app = express()
const mysql = require('mysql2');
const dotenv = require('dotenv');

// configure environment variables
dotenv.config();

// creating connection object
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

// Test database connection
db.connect(error => {
    if (error) {
      console.error('Error connecting to the database:', error);
      return;
    }
    console.log('Successfully connected to the database.');
  });
  

// Middleware to parse JSON bodies
app.use(express.json());

// Question 1 goes here
// 1. Retrieve all patients
app.get('/api/patients', (req, res) => {
    const query = `
      SELECT patient_id, first_name, last_name, date_of_birth 
      FROM patients
    `;
    
    db.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching patients:', error);
        res.status(500).json({ error: 'Error fetching patients' });
        return;
      }
      res.json(results);
    });
  });

// Question 2 goes here
// 2. Retrieve all providers
app.get('/api/providers', (req, res) => {
    const query = `
      SELECT first_name, last_name, provider_specialty 
      FROM providers
    `;
    
    db.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching providers:', error);
        res.status(500).json({ error: 'Error fetching providers' });
        return;
      }
      res.json(results);
    });
  });

// Question 3 goes here
// 3. Filter patients by First Name
app.get('/api/patients/by-name/:firstName', (req, res) => {
    const firstName = req.params.firstName;
    const query = `
      SELECT * FROM patients 
      WHERE first_name = ?
    `;
    
    db.query(query, [firstName], (error, results) => {
      if (error) {
        console.error('Error fetching patients by name:', error);
        res.status(500).json({ error: 'Error fetching patients by name' });
        return;
      }
      res.json(results);
    });
  });

// Question 4 goes here
// 4. Retrieve all providers by their specialty
app.get('/api/providers/by-specialty/:specialty', (req, res) => {
    const specialty = req.params.specialty;
    const query = `
      SELECT * FROM providers 
      WHERE provider_specialty = ?
    `;
    
    db.query(query, [specialty], (error, results) => {
      if (error) {
        console.error('Error fetching providers by specialty:', error);
        res.status(500).json({ error: 'Error fetching providers by specialty' });
        return;
      }
      res.json(results);
    });
  });


// listen to the server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`server is runnig on http://localhost:${PORT}`)
})