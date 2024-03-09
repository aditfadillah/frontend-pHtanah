import { Card, Container, Row } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";

function TampilanHome() {
  return (
    <Container>
      <h1 className="judul text-center" style={{ color: 'black' }}>DATA PENGUKURAN</h1>
      <div className="tampilanhome mb-5">
        <DataTabel />
      </div>
    </Container>
  );
}

export default TampilanHome;

export function DataTabel() {
  const [sensorData, setSensorData] = useState([]);

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

  return (
    <Row className="justify-content-md-center">
      <div class="product-catagories-wrapper pt-3">
        <Container>
          <div class="product-catagory-wrap">
            <Container>
              <Card className="mb-3 catagory-card">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Kelembapan Tanah</th>
                      <th scope="col">Temperature</th>
                      <th scope="col">Humidity</th>
                      <th scope="col">pH Tanah</th>
                      <th scope="col">Tanggal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sensorData.map((data, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          {data.kelembapan_tanah !== null
                            ? data.kelembapan_tanah
                            : "NaN"}
                        </td>
                        <td>
                          {data.temperature !== null
                            ? data.temperature + " C"
                            : "NaN"}
                        </td>
                        <td>
                          {data.humidity !== null ? data.humidity : "NaN"}
                        </td>
                        <td>
                          {data.pH_tanah !== null ? data.pH_tanah : "NaN"}
                        </td>
                        <td>
                          {data.createdAt !== null
                            ? new Date(data.createdAt).toLocaleString()
                            : "NaN"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </Container>
          </div>
        </Container>
      </div>
    </Row>
  );
}