import styled from "styled-components";
import { useEffect, useState } from "react";

const StyledPrayerWidget = styled.div`
  position: absolute;
  top: 5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  background-color: #d9d9d9;
  text-align: center;
  border-radius: 20px;
  padding: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  .judul h5 {
    margin-bottom: 10px;
    font-size: 1.2rem;
    color: #333;
  }

  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 10px;
  }

  .contain {
    background: white;
    padding: 8px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  h6 {
    font-size: 0.9rem;
    color: #555;
  }

  h4 {
    font-size: 1.1rem;
    font-weight: bold;
    color: #333;
  }

  @media (min-width: 768px) {
    width: 70%;
  }

  @media (min-width: 1024px) {
    width: 50%;
  }
`;

export default function PrayerWidget() {
  const [prayerTimes, setPrayerTimes] = useState({});
  const [locationError, setLocationError] = useState("");

  useEffect(() => {
    const fetchPrayerTimes = async (lat, lon) => {
      try {
        const res = await fetch(
          `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=99&methodSettings=19.5,0.3,18.7,0.1,0.1`
        );
        const data = await res.json();
        setPrayerTimes(data.data.timings);
      } catch (err) {
        console.error("Gagal fetch jadwal:", err);
        setLocationError("Gagal memuat jadwal sholat.");
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          fetchPrayerTimes(latitude, longitude);
        },
        (err) => {
          console.warn("Lokasi ditolak:", err.message);
          setLocationError("Gunakan lokasi default: Jakarta");
          fetchPrayerTimes(-6.2, 106.8); // fallback Jakarta
        }
      );
    } else {
      setLocationError("Browser tidak mendukung lokasi.");
    }
  }, []);

  const labels = {
    Fajr: "Subuh",
    Sunrise: "Syuruq",
    Dhuhr: "Dzuhur",
    Asr: "Ashar",
    Maghrib: "Maghrib",
    Isha: "Isya",
  };

  return (
    <StyledPrayerWidget>
      <div className="judul">
        <h5>Jadwal Sholat</h5>
        {locationError && (
          <p style={{ fontSize: "0.9rem", color: "red" }}>{locationError}</p>
        )}
      </div>
      <div className="container">
        {Object.entries(labels).map(([key, label]) => (
          <div className="contain" key={key}>
            <h6>{label}</h6>
            <h4>{prayerTimes[key] || "--:--"}</h4>
          </div>
        ))}
      </div>
    </StyledPrayerWidget>
  );
}
