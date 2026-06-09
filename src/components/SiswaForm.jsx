import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FiSave, FiX } from 'react-icons/fi';

function SiswaForm({ onSubmit, onCancel, initialData }) {
  const [formData, setFormData] = useState({
    kode_siswa: '',
    nama_siswa: '',
    alamat_siswa: '',
    tanggal_lahir: '',
    jurusan: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        kode_siswa: initialData.kode_siswa,
        nama_siswa: initialData.nama_siswa,
        alamat_siswa: initialData.alamat_siswa || '',
        tanggal_lahir: initialData.tanggal_lahir,
        jurusan: initialData.jurusan
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mb-4">
      <Card className="shadow-lg border-0">
        <Card.Body>
          <Card.Title className="mb-4 fw-bold">
            {initialData ? '✏️ Edit Data Siswa' : '➕ Tambah Data Siswa Baru'}
          </Card.Title>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Kode Siswa *</Form.Label>
                  <Form.Control type="text" name="kode_siswa" value={formData.kode_siswa} onChange={handleChange} required placeholder="Contoh: SIS-001" className="shadow-sm" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Nama Lengkap *</Form.Label>
                  <Form.Control type="text" name="nama_siswa" value={formData.nama_siswa} onChange={handleChange} required placeholder="Masukkan nama lengkap" className="shadow-sm" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Tanggal Lahir *</Form.Label>
                  <Form.Control type="date" name="tanggal_lahir" value={formData.tanggal_lahir} onChange={handleChange} required className="shadow-sm" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Jurusan *</Form.Label>
                  <Form.Select name="jurusan" value={formData.jurusan} onChange={handleChange} required className="shadow-sm">
                    <option value="">Pilih Jurusan</option>
                    <option value="RPL">💻 Rekayasa Perangkat Lunak (RPL)</option>
                    <option value="TKJ">🌐 Teknik Komputer dan Jaringan (TKJ)</option>
                    <option value="MM">🎨 Multimedia (MM)</option>
                    <option value="BC">📺 Broadcast (BC)</option>
                    <option value="AKL">💰 Akuntansi (AKL)</option>
                    <option value="OTKP">📋 OTKP</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">Alamat</Form.Label>
              <Form.Control as="textarea" name="alamat_siswa" value={formData.alamat_siswa} onChange={handleChange} rows={3} placeholder="Masukkan alamat (opsional)" className="shadow-sm" />
            </Form.Group>
            <div className="d-flex gap-2">
              <Button variant="primary" type="submit" className="d-flex align-items-center gap-2 px-4"><FiSave /> {initialData ? 'Update' : 'Simpan'}</Button>
              <Button variant="secondary" type="button" onClick={onCancel} className="d-flex align-items-center gap-2"><FiX /> Batal</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </motion.div>
  );
}

export default SiswaForm;