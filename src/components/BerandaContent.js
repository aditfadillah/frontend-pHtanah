import React, { useState, useEffect } from "react";
import axios from "axios";
import '../content.css';


const Content = () => {
    const [sensorData, setSensorData] = useState([]);
    const [dataMasuk, setDataMasuk] = useState(0);
    const [dataTerbaru, setDataTerbaru] = useState(null);
    
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "https://server-phtanah.vercel.app/api/data/getDataAll"
          );
          const sortedData = response.data.sort((a, b) => b.createdAt - a.createdAt); 
          setSensorData(sortedData); 
          setDataMasuk(response.data.length); 
          setDataTerbaru(sortedData.length > 0 ? sortedData[0] : null);  
        } catch (error) {
          console.error("Error fetching sensor data:", error);
        }
      };
  
      fetchData();
  
      const updateData = () => {
        fetchData();
    };

    const interval = setInterval(updateData, 1000);
  
      return () => clearInterval(interval);
    }, []);
  
    const latestData = sensorData.length > 0 ? sensorData[0] : null;             {/* variabel untuk data terbaru */}

    
    {/* ini variabel renderData*/}
    const renderData = (data, index) => (                                        
      <div className="Group19" key={index}>
        <div className="Rectangle3"></div>
        <div className="Group24">
          <div className="Rectangle4"></div>
          <div className="Group11">
            <img className="icon1" src="/kelembapan.svg" alt="Icon 1" />
            <div className="KelembapanTanah">Kelembapan Tanah</div>
            <div className="value1">{latestData.kelembapan_tanah || "NaN"}</div> {/* ini tampilan data terbaru kelembapan tanah*/}
            
          </div>
        </div>
        <div className="Group23">
          <div className="Rectangle5"></div>
          <div className="Group16">
            <img className="icon2" src="/temperature.svg" alt="Icon 2" />
            <div className="Temperature">Temperature</div>
              <div className="value2">{latestData.temperature ? `${latestData.temperature} C` : "NaN"}</div>         {/* ini tampilan data terbaru temperature tanah*/}
          </div>
        </div>
        <div className="Group22">
          <div className="Rectangle7"></div>
          <div className="Group17">
            <div className="PhTanah">Ph Tanah</div>
            <img className="icon3" src="/ph.svg" alt="Icon 3" />
            <div className="value3">{latestData.pH_tanah || "NaN"}</div>     {/* ini tampilan data terbaru ph tanah*/}
          </div>
        </div>
        <div className="Group21">
          <div className="Rectangle6"></div>
          <div className="Group18">
            <div className="Humidity">Humidity</div>
            <div className="value4">{latestData.humidity || "NaN"}</div>     {/* ini tampilan data terbaru humidity tanah*/}
            <img className="icon4" src="/humidity.svg" alt="Icon 4" />
          </div>
        </div>
        <div className="Ellipse1"></div>
        <div className="GroupEclipse">
          <img className="icon5" src="/masuk.svg" alt="Icon 5" />
          <div className="DataMasuk">Data Masuk</div>
          <div className="value5">{dataMasuk}</div>                          {/* ini tampilan jumlah data masuk*/}
        </div>
        <div className="DataTerbaru">Data Terbaru</div>
        <div className="DataIniMerupakanHasilPengukuranPhTanahBerdasarkanInputanTerakhir">Data ini merupakan hasil pengukuran Ph Tanah berdasarkan inputan terakhir {dataTerbaru && new Date(dataTerbaru.createdAt).toLocaleString()}</div>        {/* ini tampilan data terbaru menurut tgl*/}
      </div>
    );
  
    return (
      <div className="content">
        <div className="forcontent">
          <div className="SelamatDatang">Selamat Datang</div>
          <div className="TinjauanTerkiniTanahPengukuranDanAnalisis">Tinjauan Terkini Tanah: Pengukuran dan Analisis</div>
          {sensorData.map(renderData)}                             {/* memanggil semua data dari var renderData*/}
        </div>
      </div>
    );
  }
  
  export default Content;

  