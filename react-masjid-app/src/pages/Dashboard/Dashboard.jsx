import { Card, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import calendar from "../../images/icons8-calendar-48.png";
import cash from "../../images/icons8-cash-in-hand-48.png";
import left from "../../images/left-arrow.png";
import right from "../../images/right-arrow.png";
import styled from "styled-components";
import { useRef } from "react";

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
  }

  .stat-icon {
    width: 35px;
    height: 35px;
    margin-right: 16px;
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

  .button button:hover {
    background-color: rgba(142, 137, 137, 0.2);
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
  const images = [1, 2, 3, 4];
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
  return (
    <StyledDashboard>
      <>
        <div className="card1">
          <div class="stat-card">
            <img class="stat-icon" src={calendar}></img>
            <div class="stat-content">
              <h4>Total Kegiatan</h4>
              <p class="stat-value">12 Kegiatan</p>
              {/* <p class="stat-subtitle">+2 minggu ini</p> */}
            </div>
          </div>
          <div class="stat-card">
            <img class="stat-icon" src={cash}></img>
            <div class="stat-content">
              <h4>Total Saldo</h4>
              <p class="stat-value" src={cash}>
                Rp.60.000.000
              </p>
              {/* <p class="stat-subtitle">+2 minggu ini</p> */}
            </div>
          </div>
        </div>
        <div className="currentActivity">
          <h3>Kegiatan Terbaru</h3>
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
              <tr>
                <td>1</td>
                <td>Kajian Sabtu</td>
                <td>13 Mei 2025</td>
                <td>Mendatang</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="dokumentasi">
          <h3>Dokumentasi Kegiatan</h3>
          <div className="gallery" ref={geser}>
            {images.map((i) => (
              <div key={i} className="card-image">
                <img
                  key={i}
                  src={`https://picsum.photos/250/180?random=${1}`}
                  alt={`Gambar ${i}`}
                />
                <div className="keterangan">
                  <p>Kegiatan: </p>
                  <p>Keterangan:</p>
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
