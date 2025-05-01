import { Card, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import calendar from "../../images/icons8-calendar-48.png";
import cash from "../../images/icons8-cash-in-hand-48.png";
import left from "../../images/left-arrow.png";
import right from "../../images/right-arrow.png";
import styled from "styled-components";
import { useRef } from "react";
import EditButton from "../../components/Button/editButton";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

const StyledDashboard = styled.div`
  /* CSS untuk Statistik Card */
  .stat-card {
    display: flex;
    align-items: center;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 16px;
    margin: 10px;
    border: 1px solid grey;
    justify-content: space-between; 
  }
  .stat-info {
    display: flex;
align-self: center;
  }
  .stat-icon {
    width: 35px;
    height: 35px;
    margin-right: 16px;
    display: flex;
    align-self: center;
  }

  .stat-content h4 {
    margin: 0;
    font-size: 14px;
    color: #555;
  }

  .stat-value {
    font-size: 20px;
    font-weight: bold;
    margin: 4px 0;
    color: #2e7d32;
  }
  .currentActivity {
    padding: 18px;
    margin: 10px;
    border: 1px solid grey;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
  }
  .currentActivity h3 {
    font-size: 20px;
    color: #555;
  }
  table {
    margin-top: 10px;
    width: 100%;
  }
  th {
    color: white;
    font-weight: 450;
    text-align: left;
    border: 1px solid black;
    padding: 8px;
    font-size: 13px;
    background-color: #53a548;
  }
  td {
    padding: 8px;
    font-size: 13px;
    text-align: left;
    border: 1px solid black;
  }
  .dokumentasi {
    padding: 18px;
    margin: 10px;
    border: 1px solid grey;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    overflow: hidden;
  }
  .gallery {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    gap: 16px;
    padding: 20px;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .card-image {
    border: 1px solid grey;
    padding: 8px;
    flex: 0 0 auto;
    scroll-snap-align: start;
    max-width: 300px;
  }
  .button {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    pointer-events: none;
  }
  .dokumentasi .button button {
    border: none;
    background: transparent;
    cursor: pointer;
    pointer-events: auto;
    border-radius: 50%;
  }
  .button img {
    width: 35px;
  }
  @media (min-width: 768px) {
    .card1 {
      display: flex;
      justify-content: space-between;
    }
    .stat-card {
      width: 500px;
    }
    table {
      width: 100%;
    }
  }
  @media (min-width: 1024px) {
  max-width: 89%;
    .card1 {
      display: flex;
      justify-content: space-between;
    }
    .stat-card {
      width: 500px;
  }
`;
export default function Dashboard() {
  const [totalKegiatan, setTotalKegiatan] = useState(0);
  const [totalSaldo, setTotalSaldo] = useState(0);
  const [kegiatanTerbaru, setKegiatanTerbaru] = useState([]);
  const [images, setImages] = useState([1, 2, 3, 4]);

  useEffect(() => {
    // ngambil data jumlah kegiatan dari Firestore
    const getKegiatanData = async () => {
      const kegiatanSnapshot = await getDocs(collection(db, "kegiatan"));
      setTotalKegiatan(kegiatanSnapshot.size); // Jumlah dokumen kegiatan
    };

    // ngambil saldo terakhir dari Firestore
    const getSaldoData = async () => {
      const q = query(
        collection(db, "keuangan"),
        orderBy("tanggal", "desc"),
        limit(1)
      );

      const saldoSnapshot = await getDocs(q);
      if (!saldoSnapshot.empty) {
        const latestData = saldoSnapshot.docs[0].data();
        setTotalSaldo(latestData.saldoTotal || 0); // Ambil saldo total
      }
    };
    // ngambil kegiata terdekat
    const getKegiatanTerbaru = async () => {
      const q = query(
        collection(db, "kegiatan"),
        orderBy("tanggal", "desc"),
        limit(2)
      );
      const snapshot = await getDocs(q);
      const kegiatanData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setKegiatanTerbaru(kegiatanData);
    };

    getKegiatanData();
    getSaldoData();
    getKegiatanTerbaru();
  }, []);

  const geser = useRef(null);

  const handleGeser = (direction) => {
    const geserContainer = geser.current;
    if (geserContainer) {
      const geserAmount = 300;
      geserContainer.scrollBy({
        left: direction === "left" ? -geserAmount : geserAmount,
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "dokumentasi"));
        const docs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setImages(docs);
      } catch (error) {
        console.error("Gagal mengambil data dokumentasi:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <StyledDashboard>
      <>
        <div className="card1">
          <div className="stat-card">
            <div className="stat-info">
              <img className="stat-icon" src={calendar}></img>
              <div className="stat-content">
                <h4>Total Kegiatan</h4>
                <p className="stat-value">{totalKegiatan} Kegiatan</p>
                {/* <p className="stat-subtitle">+2 minggu ini</p> */}
              </div>
            </div>
            <div className="edit-button">
              <EditButton to={"/kegiatan"} />
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-info">
              <img className="stat-icon" src={cash}></img>
              <div className="stat-content">
                <h4>Total Saldo</h4>
                <p className="stat-value" src={cash}>
                  Rp. {totalSaldo.toLocaleString()}
                </p>
                {/* <p className="stat-subtitle">+2 minggu ini</p> */}
              </div>
            </div>
            <div className="edit-button">
              <EditButton to={"/keuangan"} />
            </div>
          </div>
        </div>
        <div className="currentActivity">
          <div
            className="stat-info"
            style={{ justifyContent: "space-between" }}
          >
            <h3>Kegiatan Terbaru</h3>
            <div className="edit-button">
              <EditButton to={"/kegiatan"} />
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Nama Kegiatan</th>
                <th>Tanggal</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {kegiatanTerbaru.map((kegiatan, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{kegiatan.nama}</td>
                  <td>{new Date(kegiatan.tanggal).toLocaleDateString()}</td>
                  <td>{kegiatan.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="dokumentasi">
          <div
            className="stat-info"
            style={{ justifyContent: "space-between" }}
          >
            <h3>Dokumentasi Kegiatan</h3>
            <div className="edit-button">
              <EditButton to={"/dokumentasi"} />
            </div>
          </div>
          <div className="gallery" ref={geser}>
            {images
              .slice(-4)
              .reverse()
              .map((item) => (
                <div key={item.id} className="card-image">
                  <img
                    key={item}
                    src={item.image || "path/to/default-image.jpg"}
                    alt={`Gambar ${item}`}
                    style={{
                      width: "100%",
                      maxHeight: "250px",
                      objectFit: "cover",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  />
                  <div className="keterangan">
                    <p>Kegiatan: {item.kegiatan}</p>
                    <p>Keterangan: {item.keterangan}</p>
                  </div>
                </div>
              ))}
          </div>
          <div className="button">
            <button onClick={() => handleGeser("left")} className="left">
              <img src={left} alt="kiri" />
            </button>
            <button onClick={() => handleGeser("right")} className="right">
              <img src={right} alt="" />
            </button>
          </div>
        </div>
      </>
    </StyledDashboard>
  );
}
