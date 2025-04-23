import React, { useState } from "react";
import styled from "styled-components";
import AddButton from "../../components/Button/addButton";
import edit from "../../images/icons8-edit-48.png";
import hapus from "../../images/icons8-delete-48.png";
import Pagination from "../../components/Pagination";
import search from "../../images/icons8-search-50.png";
import { useNavigate } from "react-router-dom";
import ResetFilter from "../../components/Button/resetFilter";

const StyledDokumentasi = styled.div`
  margin: 10px;
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
  .filter {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
  }
  .search-container .search {
    background-color: #ffffff;
    border: none;
  }
  .search-container {
    position: relative;
  }
  .search-container input {
    border: 1.5px solid #4c934c;
    height: 30px;
    border-radius: 20px;
    outline: none;
    transition: border-color 0.2s ease;

    &:focus {
      border-color: #4c934c;
      box-shadow: 0 0 0 2px rgba(83, 165, 72, 0.2);
    }
  }
  .search img {
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
    width: 25px;
    height: 25px;
    pointer-events: none;
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
  .action {
    display: flex;
    justify-content: center;
  }
  .action button {
    background: none;
    border: none;
  }
  .action button img {
    width: 30px;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.1);
    }
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
    keterangan: "Kumpulan warga van gogh",
  },
  // Tambahkan lebih banyak gambar jika perlu
];

export default function Dokumentasi() {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 16;

  const filteredImages = images.filter(
    (item) =>
      item.kegiatan.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.keterangan.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const totalPages = Math.ceil(filteredImages.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentImages = filteredImages.slice(indexOfFirstRow, indexOfLastRow);

  const handleReset = () => {
    setSearchKeyword("");
  };
  return (
    <StyledDokumentasi>
      <div className="galeri-wrapper">
        <div className="desc">
          <h3 className="judul">{images.length} Total Galeri Kegiatan</h3>
          <div className="filter">
            <div className="search-container">
              <input
                type="text"
                placeholder="Cari..."
                value={searchKeyword}
                onChange={(e) => {
                  setSearchKeyword(e.target.value);
                  setCurrentPage(1);
                }}
              />
              <button className="search">
                <img src={search} alt="" />
              </button>
            </div>
            <ResetFilter onReset={handleReset} />

            <AddButton
              label="Upload Dokumentasi"
              onClick={() => navigate("/form-dokumentasi")}
            />
          </div>
        </div>
        <div className="galeri-container">
          <div className="galeri">
            {currentImages.length > 0 ? (
              currentImages.map((item) => (
                <div key={item.id} className="galeri-item">
                  <img src={item.src} alt={`Dokumentasi ${item.kegiatan}`} />
                  <div className="caption">
                    <p>
                      <strong>{item.kegiatan}</strong>
                    </p>
                    <p>{item.keterangan}</p>
                    <div className="action">
                      <button>
                        <img src={edit} alt="" />
                      </button>
                      <button>
                        <img src={hapus} alt="" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ padding: "1rem" }}>Tidak ada hasil ditemukan.</p>
            )}
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </StyledDokumentasi>
  );
}
