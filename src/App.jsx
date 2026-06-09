import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import SiswaForm from './components/SiswaForm';
import SiswaList from './components/SiswaList';
import StatsCards from './components/StatsCards';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FiPlus } from 'react-icons/fi';

const API_URL = '/api/siswa';

function App() {
  const [siswa, setSiswa] = useState([]);
  const [editingSiswa, setEditingSiswa] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSiswa();
  }, []);

  const fetchSiswa = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setSiswa(response.data);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Gagal mengambil data siswa');
    } finally {
      setLoading(false);
    }
  };

  const addSiswa = async (siswaData) => {
    try {
      const response = await axios.post(API_URL, siswaData);
      setSiswa([response.data, ...siswa]);
      toast.success('Data siswa berhasil ditambahkan! 🎉');
      setShowForm(false);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Gagal menambahkan data');
    }
  };

  const updateSiswa = async (id, siswaData) => {
    try {
      const response = await axios.put(`${API_URL}?id=${id}`, siswaData);
      setSiswa(siswa.map(s => s.id === id ? response.data : s));
      toast.success('Data siswa berhasil diupdate! ✏️');
      setEditingSiswa(null);
      setShowForm(false);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Gagal mengupdate data');
    }
  };

  const deleteSiswa = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      try {
        await axios.delete(`${API_URL}?id=${id}`);
        setSiswa(siswa.filter(s => s.id !== id));
        toast.success('Data siswa berhasil dihapus! 🗑️');
      } catch (error) {
        toast.error('Gagal menghapus data');
      }
    }
  };

  const handleEdit = (siswa) => {
    setEditingSiswa(siswa);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingSiswa(null);
    setShowForm(false);
  };

  const filteredSiswa = siswa.filter(s => 
    s.kode_siswa?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.nama_siswa?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.jurusan?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Toaster position="top-right" />
      <Navbar />
      <Container className="mt-4 mb-5">
        <StatsCards totalSiswa={siswa.length} />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Row className="mb-4">
            <Col>
              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3">
                <h2 className="mb-0 fw-bold text-white">📋 Manajemen Data Siswa</h2>
                {!showForm && (
                  <Button 
                    variant="primary"
                    onClick={() => setShowForm(true)}
                    className="d-flex align-items-center gap-2"
                  >
                    <FiPlus /> Tambah Siswa
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </motion.div>
        
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SiswaForm
                onSubmit={editingSiswa ? (data) => updateSiswa(editingSiswa.id, data) : addSiswa}
                onCancel={handleCancel}
                initialData={editingSiswa}
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        {loading ? (
          <div className="text-center py-5">
            <div className="loading-spinner mx-auto mb-3"></div>
            <p className="text-white">Memuat data...</p>
          </div>
        ) : (
          <SiswaList
            siswa={filteredSiswa}
            onEdit={handleEdit}
            onDelete={deleteSiswa}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        )}
      </Container>
    </>
  );
}

export default App;