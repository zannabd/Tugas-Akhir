import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AddButton from "../../components/Button/addButton";
import edit from "../../images/icons8-edit-48.png";
import hapus from "../../images/icons8-delete-48.png";
import Pagination from "../../components/Pagination";
import search from "../../images/icons8-search-50.png";
import { useNavigate } from "react-router-dom";
import ResetFilter from "../../components/Button/resetFilter";
import {
  doc,
  getDocs,
  deleteDoc,
  collection,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

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
    min-width: 100%;
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
    min-width: 100%;
  }
  .galeri-wrap {
    display: flex;
    justify-content: center;
  }
  .galeri {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: center;
    margin: 1rem;
  }
  .galeri-item {
    background-color: #53a548;
    padding: 8px;
    color: #fff;
    min-width: 250px;
    max-width: 250px;
    border-radius: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  .galeri-item img {
    width: 100%;
    max-height: 300px;
    object-fit: cover;
    border-radius: 20px;
    margin-bottom: 10px;
    display: block;
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
    .galeri {
      gap: 10px;
      justify-content: space-around;
    }
  }
  @media (min-width: 1024px) {
    width: 1060px;
    .galeri {
      gap: 10px;
      justify-content: space-around;
    }
  }
`;

export default function Dokumentasi({ isAdmin = true }) {
  const navigate = useNavigate();
  const [selectedDataDelete, setSelectedDataDelete] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [images, setImages] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const rowsPerPage = 16;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "dokumentasi"));
        const docs = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .sort((a, b) => {
            const timeA = a.createdAt?.seconds || 0;
            const timeB = b.createdAt?.seconds || 0;
            return timeB - timeA;
          });

        setImages(docs);
      } catch (error) {
        console.error("Gagal mengambil data dokumentasi:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      // Cek dokumen yang ingin dihapus
      console.log("ID yang dikirim untuk dihapus:", id);
      const docRef = doc(db, "dokumentasi", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Dokumen ditemukan, melanjutkan penghapusan");

        // Hapus dokumen jika ditemukan
        await deleteDoc(docRef);

        console.log(
          `Dokumentasi dengan ID ${id} berhasil dihapus dari Firestore`
        );
        setAlertMessage("Dokumentasi berhasil dihapus!");
        setAlertType("success");
        setTimeout(() => {
          setImages((prev) => prev.filter((item) => item.id !== id));
          setSelectedDataDelete(null);
          setAlertMessage("");
          setAlertType("");
        }, 2000);
      } else {
        console.log("Dokumen tidak ditemukan!");
        setAlertMessage("Dokumentasi tidak ditemukan!");
        setAlertType("danger");
      }
    } catch (error) {
      console.error("Error deleting data from Firestore:", error);
      setAlertMessage("Gagal menghapus dokumentasi. Silakan coba lagi.");
      setAlertType("danger");

      setTimeout(() => {
        setAlertMessage("");
        setAlertType("");
      }, 2000);
    }
  };

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
      {alertMessage && (
        <div
          className={`alert alert-${alertType}`}
          role="alert"
          style={{
            display: "flex",
            position: "absolute",
            zIndex: "100",
            justifyContent: "center",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {alertMessage}
        </div>
      )}
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
            {isAdmin && (
              <AddButton
                label="Upload Dokumentasi"
                onClick={() => navigate("/form-dokumentasi")}
              />
            )}
          </div>
        </div>
        <div className="galeri-container">
          <div className="galeri-wrap">
            <div className="galeri">
              {currentImages.length > 0 ? (
                currentImages.map((item) => (
                  <div key={item.id} className="galeri-item">
                    <img
                      src={
                        item.image && item.image !== ""
                          ? item.image
                          : "path/to/default-image.jpg"
                      }
                      alt={`Dokumentasi ${item.kegiatan}`}
                    />
                    <div className="caption">
                      <p>
                        <strong>{item.kegiatan}</strong>
                      </p>
                      <p>{item.keterangan}</p>
                      {isAdmin && (
                        <div className="action">
                          <button
                            onClick={() =>
                              navigate("/form-dokumentasi", {
                                state: { dokumentasi: item },
                              })
                            }
                          >
                            <img src={edit} alt="" />
                          </button>
                          <button onClick={() => setSelectedDataDelete(item)}>
                            <img src={hapus} alt="" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ padding: "1rem" }}>Tidak ada hasil ditemukan.</p>
              )}
            </div>
          </div>
        </div>
        {selectedDataDelete && (
          <div
            className="modal fade show"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
            tabIndex="-1"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Konfirmasi Hapus</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setSelectedDataDelete(null)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>
                    Apakah kamu yakin ingin menghapus kegiatan{" "}
                    <strong>{selectedDataDelete.nama}</strong>?
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setSelectedDataDelete(null)}
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={async () => {
                      await handleDelete(selectedDataDelete.id);
                      setSelectedDataDelete(null);
                    }}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </StyledDokumentasi>
  );
}
