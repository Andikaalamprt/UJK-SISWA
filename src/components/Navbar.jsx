import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaGraduationCap } from 'react-icons/fa';

function NavBar() {
  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-lg">
        <Container>
          <Navbar.Brand href="#" className="d-flex align-items-center gap-2">
            <FaGraduationCap size={30} />
            <div>
              <span className="fw-bold fs-4">SISWA</span>
              <span className="text-primary fw-bold fs-4">.Manager</span>
              <p className="mb-0 small text-muted">Sistem Informasi Manajemen Siswa</p>
            </div>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </motion.div>
  );
}

export default NavBar;