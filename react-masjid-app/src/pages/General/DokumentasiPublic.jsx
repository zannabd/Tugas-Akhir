import React from "react";
import styled from "styled-components";

const StyledDokumentasi = styled.div`
  margin: 5.3rem 10px;
  .desc {
    border: 1px solid grey;
    padding: 16px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 15px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    align-items: center;
  }
  .judul {
    color: #4c934c;
    font-weight: 700;
  }
  .galeri-container {
    margin-top: 1rem;
    border: 1px solid grey;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  .galeri {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    margin: 1rem;
  }
  .galeri-item {
    background-color: #53a548;
    padding: 8px;
    color: #fff;
    border-radius: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  @media (min-width: 768px) {
  }
  @media (min-width: 1024px) {
    width: 1060px;
  }
`;
const images = [
  {
    id: 1,
    src: "https://picsum.photos/300/200?random=1",
    kegiatan: "Kajian Subuh",
    keterangan: "Bersama Ust. Ahmad",
  },
  {
    id: 2,
    src: "https://picsum.photos/300/200?random=2",
    kegiatan: "Santunan Anak Yatim",
    keterangan: "Ramadhan 1446H",
  },
  {
    id: 3,
    src: "https://picsum.photos/300/200?random=3",
    kegiatan: "Buka Puasa Bersama",
    keterangan: "30 Maret 2025",
  },
  // Tambahkan lebih banyak gambar jika perlu
];

export default function DokumentasiPublic() {
  return (
    <StyledDokumentasi>
      <div className="galeri-wrapper">
        <div className="desc">
          <h3 className="judul">{images.length} Total Galeri Kegiatan</h3>
        </div>
        <div className="galeri-container">
          <div className="galeri">
            {images.map((item) => (
              <div key={item.id} className="galeri-item">
                <img src={item.src} alt={`Dokumentasi ${item.kegiatan}`} />
                <div className="caption">
                  <p>
                    <strong>{item.kegiatan}</strong>
                  </p>
                  <p>{item.keterangan}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StyledDokumentasi>
  );
}
