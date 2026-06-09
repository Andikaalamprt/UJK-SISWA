import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Helper untuk query
const query = async (text, params) => {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
};

// Inisialisasi tabel (akan jalan sekali saat pertama kali)
const initTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS siswa (
      id SERIAL PRIMARY KEY,
      kode_siswa VARCHAR(50) UNIQUE NOT NULL,
      nama_siswa VARCHAR(100) NOT NULL,
      alamat_siswa TEXT,
      tanggal_lahir DATE NOT NULL,
      jurusan VARCHAR(50) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  try {
    await query(createTableQuery);
    console.log('Table ready');
  } catch (error) {
    console.error('Table error:', error);
  }
};

// Panggil init
initTable();

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { method, query: queryParams, body } = req;
  const id = queryParams.id;

  try {
    // GET all siswa
    if (method === 'GET' && !id) {
      const result = await query('SELECT * FROM siswa ORDER BY id DESC');
      return res.status(200).json(result.rows);
    }

    // GET siswa by ID
    if (method === 'GET' && id) {
      const result = await query('SELECT * FROM siswa WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Siswa not found' });
      }
      return res.status(200).json(result.rows[0]);
    }

    // POST - Create siswa
    if (method === 'POST') {
      const { kode_siswa, nama_siswa, alamat_siswa, tanggal_lahir, jurusan } = body;
      
      if (!kode_siswa || !nama_siswa || !tanggal_lahir || !jurusan) {
        return res.status(400).json({ error: 'Field wajib diisi' });
      }

      try {
        const result = await query(
          `INSERT INTO siswa (kode_siswa, nama_siswa, alamat_siswa, tanggal_lahir, jurusan) 
           VALUES ($1, $2, $3, $4, $5) RETURNING *`,
          [kode_siswa, nama_siswa, alamat_siswa || '', tanggal_lahir, jurusan]
        );
        return res.status(201).json(result.rows[0]);
      } catch (error) {
        if (error.code === '23505') {
          return res.status(400).json({ error: 'Kode siswa sudah terdaftar' });
        }
        throw error;
      }
    }

    // PUT - Update siswa
    if (method === 'PUT' && id) {
      const { kode_siswa, nama_siswa, alamat_siswa, tanggal_lahir, jurusan } = body;
      
      const result = await query(
        `UPDATE siswa SET kode_siswa = $1, nama_siswa = $2, alamat_siswa = $3, tanggal_lahir = $4, jurusan = $5 
         WHERE id = $6 RETURNING *`,
        [kode_siswa, nama_siswa, alamat_siswa || '', tanggal_lahir, jurusan, id]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Siswa not found' });
      }
      return res.status(200).json(result.rows[0]);
    }

    // DELETE - Hapus siswa
    if (method === 'DELETE' && id) {
      const result = await query('DELETE FROM siswa WHERE id = $1', [id]);
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Siswa not found' });
      }
      return res.status(204).send();
    }

    // Method not allowed
    return res.status(405).json({ error: 'Method not allowed' });
    
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
}