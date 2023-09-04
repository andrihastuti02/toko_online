const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const produkRoutes = require('./routes/produk');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'online'
});

connection.connect();

app.use('/produk', produkRoutes);

app.listen(5000, () => {
  console.log('Server started on port 5000');
});