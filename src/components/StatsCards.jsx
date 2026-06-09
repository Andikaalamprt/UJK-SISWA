import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaUsers, FaUserGraduate, FaChartLine, FaCalendarAlt } from 'react-icons/fa';

const StatsCards = ({ totalSiswa }) => {
  const stats = [
    { title: 'Total Siswa', value: totalSiswa, icon: <FaUsers size={30} />, color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { title: 'Jurusan Aktif', value: '6', icon: <FaUserGraduate size={30} />, color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { title: 'Rata-rata Usia', value: '17', icon: <FaCalendarAlt size={30} />, color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', suffix: 'thn' },
    { title: 'Kehadiran', value: '95', icon: <FaChartLine size={30} />, color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', suffix: '%' }
  ];

  return (
    <Row className="mb-4">
      {stats.map((stat, index) => (
        <Col md={6} lg={3} key={index} className="mb-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-0 shadow-lg hover-lift">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-2">{stat.title}</h6>
                    <h2 className="mb-0 fw-bold">
                      {stat.value}
                      {stat.suffix && <small className="fs-6 text-muted"> {stat.suffix}</small>}
                    </h2>
                  </div>
                  <div style={{ background: stat.color, padding: '12px', borderRadius: '15px', color: 'white' }}>
                    {stat.icon}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      ))}
    </Row>
  );
};

export default StatsCards;