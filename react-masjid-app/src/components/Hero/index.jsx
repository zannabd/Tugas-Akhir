import masjid from "../../images/masjid-ilustrasi.png";
import styled from "styled-components";
import left from "../../images/left-arrow.png";
import right from "../../images/right-arrow.png";
import { useState, useEffect } from "react";

const haditsList = [
  {
    kategori: "Sholat Berjamaah",
    teks: "Rasulullah shallallahu ‘alaihi wa sallam bersabda, 'Shalat berjamaah lebih utama dibandingkan shalat sendirian dengan dua puluh tujuh derajat.' (HR. Bukhari & Muslim)",
  },
  {
    kategori: "Sholat Berjamaah",
    teks: "Barang siapa yang pergi ke masjid pada pagi dan petang hari, maka Allah akan menyediakan baginya tempat di surga setiap kali ia pergi dan pulang. (HR. Bukhari dan Muslim)",
  },
  {
    kategori: "Infaq & Shodaqoh",
    teks: "Rasulullah shallallahu ‘alaihi wa sallam bersabda, 'Sedekah itu dapat menghapus dosa sebagaimana air memadamkan api.' (HR. Tirmidzi)",
  },
  {
    kategori: "Infaq & Shodaqoh",
    teks: "Tangan di atas lebih baik daripada tangan di bawah. (HR. Bukhari & Muslim)",
  },
];

const StyledHero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 70px;
  background-color: #f8f5e4;

  /* Warna hijau di atas hero */
  .top-section {
    width: 100%;
    height: 150px;
    background-color: #53a548;
  }

  .container {
    display: flex;
    flex-direction: column-reverse; /* Default: teks di atas gambar */
    align-items: center;
    justify-content: center;
    background-color: #f8f5e4;
    padding: 2rem;
    margin-top: 5rem;
    gap: 1.5rem;
  }

  .left img {
    width: 90%;
    max-width: 350px; /* Maksimum ukuran gambar */
    height: auto;
  }

  .right {
    max-width: 600px;
    padding: 1rem 1rem;
    background-color: rgba(76, 147, 76, 0.8);
    border-radius: 20px;
  }
  .right p {
    font-style: italic;
  }
  .buttons {
    display: flex;
    justify-content: space-between;
  }
  .buttons button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }
  .buttons button img {
    width: 35px;
  }

  @media (min-width: 768px) {
    .top-section {
      height: 80px;
    }
    .container {
      flex-direction: row;
      justify-content: space-evenly;
      text-align: left;
    }

    .left,
    .right {
      flex: 1;
    }

    .right p {
      font-size: 1.1rem;
      text-align: center;
      font-style: italic;
    }
  }

  @media (min-width: 1024px) {
    .top-section {
      height: 80px;
    }

    .left img {
      max-width: 500px; /* Gambar lebih besar di layar besar */
    }

    .right p {
      font-size: 1.2rem;
      text-align: center;
      font-style: italic;
    }
  }
`;

export default function Hero() {
  const [index, setIndex] = useState(0);

  const nextHadits = () => {
    setIndex((prevIndex) => (prevIndex + 1) % haditsList.length);
  };

  const prevHadits = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? haditsList.length - 1 : prevIndex - 1
    );
  };

  // Auto next setiap 7 detik
  useEffect(() => {
    const interval = setInterval(nextHadits, 7000);
    return () => clearInterval(interval); // Cleanup interval saat komponen unmount
  }, []);

  return (
    <StyledHero>
      <div className="top-section"></div> {/* Efek hijau di atas */}
      <div className="container" id="home">
        <div className="left">
          <img src={masjid} alt="Ilustrasi Masjid" />
        </div>
        <div className="right">
          <div className="hadits-container">
            <p className="kategori">{haditsList[index].kategori}</p>
            <p>{haditsList[index].teks}</p>
          </div>
          <div className="buttons">
            <button onClick={prevHadits}>
              <img src={left} alt="" />
            </button>
            <button onClick={nextHadits}>
              <img src={right} alt="" />
            </button>
          </div>
        </div>
      </div>
    </StyledHero>
  );
}
