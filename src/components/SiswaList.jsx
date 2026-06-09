import React from 'react';
import { Table, Button, Badge, Card, Form } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FiSearch, FiEdit2, FiTrash2 } from 'react-icons/fi';

function SiswaList({ siswa, onEdit, onDelete, searchTerm, setSearchTerm }) {
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  const getJurusanBadge = (jurusan) => {
    const colors = { 'RPL': 'primary', 'TKJ': 'success', 'MM': 'warning', 'BC': 'info', 'AKL': 'danger', 'OTKP': 'secondary' };
    return <Badge bg={colors[jurusan] || 'secondary'}>{jurusan}</Badge>;
  };

  const getAge = (birthDate) => {
    if (!birthDate) return '-';
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="shadow-lg border-0">
        <Card.Body>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
            <Card.Title className="mb-0 fw-bold">📊 Daftar Siswa</Card.Title>
            <div className="position-relative" style={{ width: '250px' }}>
              <FiSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
              <Form.Control type="text" placeholder="Cari siswa..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="ps-5" style={{ borderRadius: '25px' }} />
            </div>
          </div>
          {siswa.length === 0 ? (
            <div className="text-center py-5"><div style={{ fontSize: '64px' }}>📭</div><p className="text-muted mt-3">Belum ada data siswa</p></div>
          ) : (
            <div className="table-responsive">
              <Table hover className="align-middle">
                <thead className="table-light">
                  <tr><th>#</th><th>Kode</th><th>Nama</th><th>Tgl Lahir</th><th>Umur</th><th>Jurusan</th><th>Alamat</th><th>Aksi</th></tr>
                </thead>
                <tbody>
                  {siswa.map((siswa, index) => (
                    <motion.tr key={siswa.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}>
                      <td>{index + 1}</td>
                      <td><Badge bg="dark" className="px-2 py-1">{siswa.kode_siswa}</Badge></td>
                      <td className="fw-semibold">{siswa.nama_siswa}</td>
                      <td>{formatDate(siswa.tanggal_lahir)}</td>
                      <td>{getAge(siswa.tanggal_lahir)} tahun</td>
                      <td>{getJurusanBadge(siswa.jurusan)}</td>
                      <td><div style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{siswa.alamat_siswa || '-'}</div></td>
                      <td><div className="d-flex gap-2"><Button variant="outline-warning" size="sm" onClick={() => onEdit(siswa)} className="d-flex align-items-center gap-1"><FiEdit2 /> Edit</Button><Button variant="outline-danger" size="sm" onClick={() => onDelete(siswa.id)} className="d-flex align-items-center gap-1"><FiTrash2 /> Hapus</Button></div></td>
                    </motion.tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>
    </motion.div>
  );
}

export default SiswaList;