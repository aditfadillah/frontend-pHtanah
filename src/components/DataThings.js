import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

function DataThings() {
  return (
    <Container>
      <div className="containerdata">
        <DataThingsTabel />
      </div>
    </Container>
  );
}

export default DataThings;

export function DataThingsTabel() {
  const [sensorData, setSensorData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filterType, setFilterType] = useState("");
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // "http://localhost:5000/api/things/getThings"
          "https://server-phtanah.vercel.app/api/things/getThings"
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
          new Date(data.created_at).toLocaleDateString() ===
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
              <Card.Header>Data Things</Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col lg={3} style={{ padding: "0", left: "15px" }}>
                      <Form.Control
                        type="date"
                        value={
                          selectedDate
                            ? selectedDate.toISOString().substr(0, 10)
                            : ""
                        }
                        onChange={handleDateChange}
                        style={{ borderRadius: "5px 0px 0px 5px" }}
                      />
                    </Col>
                    <Col lg={3} style={{ padding: "0" }}>
                      <Form.Control
                        as="select"
                        value={filterType}
                        onChange={handleFilterTypeChange}
                        style={{
                          borderRadius: "0px",
                          paddingLeft: "30px",
                          backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23333' width='18px' height='18px'%3E%3Cpath d='M7 10l5 5 5-5H7z'/%3E%3C/svg%3E\")",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 8px center",
                        }}
                      >
                        <option value="kategori">Kategori</option>
                        <option value="kelembapan_tanah">
                          Kelembapan Tanah
                        </option>
                        <option value="field2">Temperature</option>
                        <option value="field3">Humidity</option>
                        <option value="field4">pH Tanah</option>
                      </Form.Control>
                    </Col>
                    <Col lg={3} style={{ padding: "0" }}>
                      {filterType ? (
                        <Form.Control
                          type="text"
                          placeholder="Masukkan value"
                          value={filterValue}
                          onChange={handleFilterValueChange}
                          style={{ borderRadius: "0px 5px 5px 0px" }}
                        />
                      ) : (
                        <Form.Control
                          type="text"
                          placeholder="Pilih Filter"
                          value={filterValue}
                          onChange={handleFilterValueChange}
                          readOnly
                          style={{
                            borderRadius: "0px 5px 5px 0px",
                            backgroundColor: "rgba(0,0,0,.03)",
                          }}
                        />
                      )}
                    </Col>
                    <Col>
                      <Button onClick={handleClearFilters}>Clear</Button>
                    </Col>
                  </Row>
                </Form>
                <div style={{ marginBottom: "20px" }}></div>{" "}
                {/* Baris Pemisah */}
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
                          <td>{data.field1 || "NaN"} %</td>
                          <td>
                            {data.field2 ? `${data.field2} C` : "NaN"}
                          </td>
                          <td>{data.field3 || "NaN"} %</td>
                          <td>{data.field4 || "NaN"}</td>
                          <td>
                            {data.created_at
                              ? new Date(data.created_at).toLocaleString()
                              : "NaN"}
                          </td>
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