import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";


function DataPengukuran() {
  return (
    <Container>
      <div className="containerdata">
        <DataTabel />
      </div>
    </Container>
  );
}

export default DataPengukuran;

export function DataTabel() {
  const [sensorData, setSensorData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filterType, setFilterType] = useState("");
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://server-phtanah.vercel.app/api/data/getDataAll"
        );
        setSensorData(response.data);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };
  
    fetchData();
  
    const interval = setInterval(fetchData, 1000);
  
    return () => clearInterval(interval);
  }, []);
  

  useEffect(() => {
    let filtered = sensorData;

    if (selectedDate) {
      filtered = filtered.filter(
        (data) =>
          new Date(data.createdAt).toLocaleDateString() ===
          selectedDate.toLocaleDateString()
      );
    }

    if (filterType && filterValue) {
      if (filterType === "kelembapan_tanah") {
        const numericFilterValue = Number(filterValue);
        filtered = filtered.filter((data) => {
          const numericValue = Number(data[filterType]);
          return numericValue === numericFilterValue;
        });
      } else {
        filtered = filtered.filter((data) => {
          const value = data[filterType]?.toString() || "";
          return value.startsWith(filterValue);
        });
      }
    }

    setFilteredData(filtered);
  }, [selectedDate, filterType, filterValue, sensorData]);

  const handleDateChange = (e) => {
    const dateValue = e.target.value;
    if (dateValue) {
      setSelectedDate(new Date(dateValue));
    } else {
      setSelectedDate(null);
    }
  };

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleFilterValueChange = (e) => {
    setFilterValue(e.target.value);
  };

  const handleClearFilters = () => {
    setSelectedDate(null);
    setFilterType("");
    setFilterValue("");
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-4">
        <div className="containerdata">
          <div className="table-container">
            <Card>
              <Card.Header>Data Pengukuran</Card.Header>
              <Card.Body>
                <Form>
                  <Row >
                    <Col lg={3} style={{ padding: '0',left: '15px' }}>
                      <Form.Control
                        type="date"
                        value={selectedDate ? selectedDate.toISOString().substr(0, 10) : ""}
                        onChange={handleDateChange}
                        style={{ borderRadius: '5px 0px 0px 5px'}}
                      />
                    </Col>
                    <Col lg={3} style={{ padding: '0'}}>
                      <Form.Control
                        as="select"
                        value={filterType}
                        onChange={handleFilterTypeChange}
                        style={{ borderRadius: '0px', paddingLeft: '30px', backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'%23333\' width=\'18px\' height=\'18px\'%3E%3Cpath d=\'M7 10l5 5 5-5H7z\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center' }}
                      >
                        <option value="kategori">Kategori</option>
                        <option value="kelembapan_tanah">Kelembapan Tanah</option>
                        <option value="temperature">Temperature</option>
                        <option value="humidity">Humidity</option>
                        <option value="pH_tanah">pH Tanah</option>
                      </Form.Control>
                    </Col>
                    <Col lg={3} style={{ padding: '0' }}>
                      {filterType ? (
                        <Form.Control
                          type="text"
                          placeholder="Masukkan value"
                          value={filterValue}
                          onChange={handleFilterValueChange}
                          style={{ borderRadius: '0px 5px 5px 0px'}}
                        />
                      ) : (
                        <Form.Control
                          type="text"
                          placeholder="Pilih Filter"
                          value={filterValue}
                          onChange={handleFilterValueChange}
                          readOnly
                          style={{ borderRadius: '0px 5px 5px 0px' , backgroundColor:'rgba(0,0,0,.03)'}}
                        />
                      )}
                    </Col>
                    <Col>
                      <Button onClick={handleClearFilters}>Clear</Button>
                    </Col>
                  </Row>
                </Form>
                <div style={{ marginBottom: '20px' }}></div> {/* Baris Pemisah */}
                {/* Tabel Data Pengukuran */}
                <div className="table-scrollable">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Kelembapan Tanah</th>
                        <th>Temperature</th>
                        <th>Humidity</th>
                        <th>pH Tanah</th>
                        <th>Tanggal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((data, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{data.kelembapan_tanah || "NaN"} %</td>
                          <td>{data.temperature ? `${data.temperature} C` : "NaN"}</td>
                          <td>{data.humidity || "NaN"} %</td>
                          <td>{data.pH_tanah || "NaN"}</td>
                          <td>{data.createdAt ? new Date(data.createdAt).toLocaleString() : "NaN"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </Row>
    </Container>
  );
}
