import styled from "styled-components";
import Edit from "../../images/icons8-edit-48.png";
import Delete from "../../images/icons8-delete-48.png";
// import add from "../../images/icons8-add-50.png";
import search from "../../images/icons8-search-50.png";
import { useState } from "react";
import AddButton from "../../components/Button/addButton";
import ResetFilter from "../../components/Button/resetFilter";
import Pagination from "../../components/Pagination";
import { useNavigate } from "react-router-dom";
import Keuangan from "./Keuangan";
import { useEffect } from "react";
import {
  collection,
  getDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";

const StyledKegiatan = styled.div`
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
  h4 {
    color: #4c934c;
    font-weight: 700;
  }
  .filtered {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
  }
  .dropdown select {
    border: 1.5px solid #4c934c;
    height: 30px;
    border-radius: 20px;
    padding: 0px 5px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    outline: none;
    transition: border-color 0.2s ease;
    &:focus {
      border-color: #4c934c;
      box-shadow: 0 0 0 2px rgba(83, 165, 72, 0.2);
    }
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
  .tabel {
    border: 1px solid grey;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-top: 15px;
    padding: 16px;
    overflow-x: auto;
    width: 100%;
    -webkit-overflow-scrolling: touch;
  }
  table {
    min-width: 600px;
  }
  th {
    background-color: #53a548;
    color: white;
    padding: 10px;
  }
  td {
    padding: 5px;
  }
  .status {
    border-radius: 50px;
    padding: 3px;
    text-align: center;
    align-self: center;
    margin: 5px 0px;
  }
  .action {
    display: flex;
    justify-content: end;
  }
  .action button {
    border: none;
    background-color: #ffffff;
  }
  img {
    width: 30px;
  }
  @media (min-width: 768px) {
    table {
      width: 100%;
    }
  }
  @media (min-width: 1024px) {
    max-width: 100%;
    .desc {
      width: 1055px;
    }
    table {
      width: 100%;
    }
  }
`;
export default function Kegiatan({ isAdmin = true }) {
  const [kegiatanList, setKegiatanList] = useState([]);
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedDataDelete, setSelectedDataDelete] = useState(null);
  const [data, setData] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "kegiatan"),
      (querySnapshot) => {
        const kegiatanData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setKegiatanList(kegiatanData);
      },
      (error) => {
        console.error("Error fetching kegiatan:", error);
      }
    );

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    try {
      const docRef = doc(db, "kegiatan", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // Hapus dokumen jika ditemukan
        await deleteDoc(docRef);
        setAlertMessage("Kegiatan berhasil dihapus!");
        setAlertType("success");
        setTimeout(() => {
          setKegiatanList((prev) => prev.filter((item) => item.id !== id));
          setSelectedDataDelete(null);
          setAlertMessage("");
          setAlertType("");
        }, 2000);
      } else {
        console.log("Dokumen tidak ditemukan!");
        setAlertMessage("Kegiatan tidak ditemukan!");
        setAlertType("danger");
      }
    } catch (error) {
      console.error("Error deleting data from Firestore:", error);
      setAlertMessage("Gagal menghapus kegiatan. Silakan coba lagi.");
      setAlertType("danger");

      setTimeout(() => {
        setAlertMessage("");
        setAlertType("");
      }, 2000);
    }
  };
  // Filter search n status
  const filteredData = kegiatanList.filter((item) => {
    const keywordMatch = item.nama
      .toLowerCase()
      .includes(searchKeyword.toLowerCase());
    const statusMatch = statusFilter ? item.status === statusFilter : true;
    return keywordMatch && statusMatch;
  });

  // Sort tanggal
  const sortedKegiatan = [...filteredData].sort((a, b) => {
    const dateA = new Date(`${a.tanggal}T${a.waktu || "00:00"}`);
    const dateB = new Date(`${b.tanggal}T${b.waktu || "00:00"}`);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortedKegiatan.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(sortedKegiatan.length / rowsPerPage);

  const handleReset = () => {
    setSearchKeyword("");
    setStatusFilter("");
  };

  const handleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <StyledKegiatan>
      <>
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
        <div className="desc">
          <h4>{filteredData.length} Total Kegiatan</h4>
          <div className="filtered">
            <div className="search-container">
              <input
                type="text"
                placeholder="Cari Kegiatan..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <button className="search">
                <img src={search} alt="" />
              </button>
            </div>
            <div className="dropdown">
              <select
                name=""
                id=""
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">Status</option>
                <option value="Mendatang">Mendatang</option>
                <option value="Selesai">Selesai</option>
                <option value="Dibatalkan">Dibatalkan</option>
              </select>
            </div>
            <ResetFilter onReset={handleReset} />
            {isAdmin && (
              <AddButton
                label="Tambah Kegiatan"
                onClick={() => navigate("/form-kegiatan")}
              />
            )}
          </div>
        </div>
        <div className="tabel">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Nama Kegiatan</th>
                <th onClick={handleSort}>
                  Tanggal {sortOrder === "asc" ? "↑" : "↓"}
                </th>
                <th>Waktu</th>
                <th>Lokasi</th>
                <th>Status</th>
                {isAdmin && <th>Tindakan</th>}
              </tr>
            </thead>
            <tbody>
              {currentRows.map((item, index) => (
                <tr key={item.id}>
                  <td style={{ textAlign: "center" }}>
                    {indexOfFirstRow + index + 1}
                  </td>
                  <td>{item.nama}</td>
                  <td>{item.tanggal || "-"}</td>
                  <td>{item.waktu || "-"}</td>
                  <td>{item.lokasi || "-"}</td>
                  <td>
                    <div
                      className="status"
                      style={{
                        backgroundColor:
                          item.status === "Mendatang"
                            ? "#EEE82C"
                            : item.status === "Selesai"
                            ? "#53A548"
                            : "#B22222",
                        color:
                          item.status === "Mendatang" ? "#000000" : "#ffffff",
                      }}
                    >
                      {item.status}
                    </div>
                  </td>
                  {isAdmin && (
                    <td>
                      <div className="action">
                        <button
                          onClick={() =>
                            navigate("/form-kegiatan", {
                              state: { kegiatan: item },
                            })
                          }
                        >
                          <img src={Edit} alt="Edit" />
                        </button>
                        <button onClick={() => setSelectedDataDelete(item)}>
                          <img src={Delete} alt="" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
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
        </div>
        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </>
    </StyledKegiatan>
  );
}
