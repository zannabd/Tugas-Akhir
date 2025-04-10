import React, { useRef } from "react";
import left from "../../images/left-arrow.png";
import right from "../../images/right-arrow.png";

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

export default function Dokumentasi() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 300;
    if (container) {
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="galeri-wrapper">
      <h3 className="judul">Galeri Dokumentasi Kegiatan</h3>
      <div className="galeri-container">
        <button className="nav-button left" onClick={() => scroll("left")}>
          <img src={left} alt="Left" />
        </button>

        <div className="galeri-scroll" ref={scrollRef}>
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

        <button className="nav-button right" onClick={() => scroll("right")}>
          <img src={right} alt="Right" />
        </button>
      </div>
    </div>
  );
}
