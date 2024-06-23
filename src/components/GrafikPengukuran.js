import { Card, Container, Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line, getElementsAtEvent } from "react-chartjs-2";
import { Chart, LineElement, LinearScale, CategoryScale, PointElement } from 'chart.js';

Chart.register(LineElement, LinearScale, CategoryScale, PointElement);

function DataPengukuran() {
  return (
    <Container>
      <div className="container">
        <DataTabel />
      </div>
    </Container>
  );
}

export default DataPengukuran;

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
    <Container>
      <Row className="justify-content-md-center mt-4">
        <div className="containergrafik">
          <LineChart/>
        </div>
      </Row>
    </Container>
  );
}

const LineChart = () => {
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




// Kelembapan data
const dataKelembapanTanah = {
    labels: sensorData.map((data, index) => index + 1),
    datasets: [
      {
        label: 'Kelembapan Tanah',
        data: sensorData.map((data) => data.kelembapan_tanah || 0),
        fill: false,
        backgroundColor: '#85ADD7',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };
// PHtanah
  const dataPHtanah = {
    labels: sensorData.map((data, index) => index + 1),
    datasets: [
      {
        label: 'pH Tanah',
        data: sensorData.map((data) => data.pH_tanah || 0),
        fill: false,
        backgroundColor: '#FEC045',
        borderColor: 'rgba(254, 192, 69, 0.2)',
      },
    ],
  };
// Temperature
  const dataTemperature = {
    labels: sensorData.map((data, index) => index + 1),
    datasets: [
      {
        label: 'Temperature',
        data: sensorData.map((data) => data.temperature || 0),
        fill: false,
        backgroundColor: '#F43B4C',
        borderColor: 'rgba(255, 255, 0, 0.2)',
      },
    ],
  };
// Humidity
  const dataHumidity = {
    labels: sensorData.map((data, index) => index + 1),
    datasets: [
      {
        label: 'Humidity',
        data: sensorData.map((data) => data.humidity || 0),
        fill: false,
        backgroundColor: '#228A2D',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      y: {
        type: 'linear',
        beginAtZero: true,
        ticks: {
          font: {
            size: 14,
          },
        },
      },
      x: {
        ticks: {
          callback: function(value, index, values) {
            const data = sensorData[index];
            return data ? new Date(data.createdAt).toLocaleDateString() : '';
          },
          font: {
            size: 14,
          },
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          font: {
            size: 14,
          },
        },
      },
    },
    elements: {
      point: {
        radius: 2,
      },
    },
    onClick: (event, elements) => {
        if (elements.length > 0) {
          const index = elements[0].index;
          const data = sensorData[index];
          alert(`Kelembapan: ${data.kelembapan_tanah}\nTanggal: ${new Date(data.createdAt).toLocaleString()}`);
          alert(`PH Tanah: ${data.pH_tanah}\nTanggal: ${new Date(data.createdAt).toLocaleString()}`);
          alert(`Temperature: ${data.temperature}\nTanggal: ${new Date(data.createdAt).toLocaleString()}`);
          alert(`Humidity: ${data.humidity}\nTanggal: ${new Date(data.createdAt).toLocaleString()}`);
        }
      }
  };


  

  return (
    <Container>
      <Row>
        <Col>
        <Card>
            <Card.Header>Grafik Kelembapan</Card.Header>
            <Card.Body>
              <Line data={dataKelembapanTanah} options={options} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
          <Card.Header>Grafik PH Tanah</Card.Header>
            <Card.Body>
              <Line data={dataPHtanah} options={options} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
          <Card.Header>Grafik Temperature</Card.Header>
            <Card.Body>
              <Line data={dataTemperature} options={options} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
            <Card.Header>Grafik Humidity</Card.Header>
              <Line data={dataHumidity} options={options} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    
  );
};
