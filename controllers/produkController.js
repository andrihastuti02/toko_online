const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'online'
});

exports.getAllProduk = (req, res) => {
  const sql = 'SELECT * FROM produk';

  pool.query(sql, (err, results) => {
    if (err) {
      console.error('Error getting products:', err);
      res.status(500).json({ error: 'Error getting products' });
      return;
    }

    res.send(results);
  });
};

exports.getProdukById = (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM produk WHERE id = ?';

  pool.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error getting product by ID:', err);
      res.status(500).json({ error: 'Error getting product by ID' });
      return;
    }

    if (result.length === 0) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.send(result[0]);
    }
  });
};

exports.createProduk = (req, res) => {
  const { judul, jenis_buku } = req.body;

  if (!judul || !jenis_buku ) {
    res.status(400).json({ error: 'Semua field harus diisi' });
    return;
  }

  const sql = 'INSERT INTO produk (judul, jenis_buku) VALUES (?, ?, ?)';

  pool.query(sql, [judul, jenis_buku], (err, result) => {
    if (err) {
      console.error('Error creating product:', err);
      res.status(500).json({ error: 'Error creating product' });
      return;
    }

    res.json(result);
  });
};

exports.updateProduk = (req, res) => {
  const id = req.params.id;
  const { judul, jenis_buku } = req.body;

  if (!judul || !jenis_buku) {
    res.status(400).json({ error: 'Semua field harus diisi' });
    return;
  }

  const sql = 'UPDATE produk SET judul = ?, jenis_buku = ? WHERE id = ?';

  pool.query(sql, [judul, jenis_buku, id], (err, result) => {
    if (err) {
      console.error('Error updating product:', err);
      res.status(500).json({ error: 'Error updating product' });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json(result);
    }
  });
};

exports.deleteProduk = (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM produk WHERE id = ?';

  pool.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting product:', err);
      res.status(500).json({ error: 'Error deleting product' });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json(result);
    }
  });
};