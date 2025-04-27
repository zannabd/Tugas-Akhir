import { useEffect, useState } from "react";
import styled from "styled-components";
import Edit from "../../images/icons8-edit-48.png";
import Delete from "../../images/icons8-delete-48.png";
import AddButton from "../../components/Button/addButton";
import ResetFilter from "../../components/Button/resetFilter";
import Pagination from "../../components/Pagination";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

const StyledKeuangan = styled.div`
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
  h4 {
    color: #4c934c;
    font-weight: 700;
  }
  .filtered {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
  }
  .filtered select {
    border: 1.5px solid #4c934c;
    border-radius: 20px;
    height: 30px;
    padding: 0px 5px;
    display: flex;
    align-items: center;
    outline: none;
    background-color: #fff;
    transition: border-color 0.2s ease;

    &:focus {
      border-color: #4c934c;
      box-shadow: 0 0 0 2px rgba(83, 165, 72, 0.2);
    }
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
    padding: 8px;
    white-space: nowrap;
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
// Fungsi format Rupiah
const formatRupiah = (num) => {
  if (isNaN(num)) return "Rp 0"; // Jika num bukan angka, tampilkan Rp 0
  const numStr = num.toString(); // Ubah angka menjadi string
  return "Rp " + numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export default function Keuangan({ isAdmin = true }) {
  const [dataKeuangan, setDataKeuangan] = useState([]);
  const [selectedDataDelete, setSelectedDataDelete] = useState(null);
  const navigate = useNavigate();
  const [bulanDipilih, setBulanDipilih] = useState("");
  const [tahunDipilih, setTahunDipilih] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    const fetchKeuangan = async () => {
      try {
        const snapshot = await getDocs(collection(db, "keuangan"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // Sort dari tanggal/bulan terbaru
        const sortedData = data.sort((a, b) => {
          const dateA = new Date(a.tanggal);
          const dateB = new Date(b.tanggal);
          return dateB - dateA; // Terbaru duluan
        });
        setDataKeuangan(data);
      } catch (error) {
        console.error("Error mengambil data:", error);
      }
    };

    fetchKeuangan();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "keuangan", id));
      setAlertMessage("Data berhasil dihapus!"); // Menampilkan pesan alert
      setAlertType("success");
      setDataKeuangan((prev) => prev.filter((item) => item.id !== id));
      setSelectedDataDelete(null);
      setTimeout(() => {
        setAlertMessage("");
        setAlertType("");
      }, 2000);
    } catch (error) {
      setAlertMessage("Terjadi kesalahan, gagal menghapus data.");
      setAlertType("error");
      console.error("Error deleting data:", error);
    }
  };

  // Ambil semua tahun unik dari data
  const tahunUnik = [
    ...new Set(
      dataKeuangan.map((item) => new Date(item.tanggal).getFullYear())
    ),
  ];
  const filterData = dataKeuangan.filter((item) => {
    const tanggal = new Date(item.tanggal);
    const bulan = tanggal.getMonth(); // 0–11
    const tahun = tanggal.getFullYear();

    const cocokBulan = bulanDipilih === "" || bulan === parseInt(bulanDipilih);
    const cocokTahun = tahunDipilih === "" || tahun === parseInt(tahunDipilih);

    return cocokBulan && cocokTahun;
  });

  const totalPages = Math.ceil(filterData.length / rowsPerPage);

  const handleReset = () => {
    setBulanDipilih("");
    setTahunDipilih("");
  };

  return (
    <StyledKeuangan>
      <>
        {alertMessage && (
          <div
            className={`alert alert-${alertType}`}
            role="alert"
            style={{
              display: "block",
              position: "fixed",
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
          <h4>{dataKeuangan.length} Total Laporan</h4>
          <div className="filtered">
            <select
              id="bulan"
              value={bulanDipilih}
              onChange={(e) => setBulanDipilih(e.target.value)}
            >
              <option value="" disabled selected>
                Bulan
              </option>
              <option value="0">Januari</option>
              <option value="1">Februari</option>
              <option value="2">Maret</option>
              <option value="3">April</option>
              <option value="4">Mei</option>
              <option value="5">Juni</option>
              <option value="6">Juli</option>
              <option value="7">Agustus</option>
              <option value="8">September</option>
              <option value="9">Oktober</option>
              <option value="10">November</option>
              <option value="11">Desember</option>
            </select>
            <select
              id="tahun"
              value={tahunDipilih}
              onChange={(e) => setTahunDipilih(e.target.value)}
            >
              <option value="">Tahun</option>
              {tahunUnik.map((tahun) => (
                <option key={tahun} value={tahun}>
                  {tahun}
                </option>
              ))}
            </select>
            <ResetFilter onReset={handleReset} />
            {isAdmin && (
              <AddButton
                label="Buat Laporan"
                onClick={() => navigate("/form-laporan")}
              />
            )}
          </div>
        </div>
        <div className="tabel">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Detail</th>
                <th>Tanggal</th>
                <th>Pendapatan</th>
                <th>Pengeluahan</th>
                <th>Saldo Total</th>
                {isAdmin && <th>Tindakan</th>}
              </tr>
            </thead>
            <tbody>
              {filterData.map((item, index) => (
                <tr key={item.id}>
                  <td style={{ textAlign: "center" }}>{index + 1}</td>
                  <td>{item.detail}</td>
                  <td>{item.tanggal}</td>
                  <td>
                    {item.pendapatan ? formatRupiah(item.pendapatan) : "Rp 0"}
                  </td>
                  <td>
                    {item.pengeluaran ? formatRupiah(item.pengeluaran) : "Rp 0"}
                  </td>
                  <td>
                    {item.saldoTotal ? formatRupiah(item.saldoTotal) : "Rp 0"}
                  </td>

                  {isAdmin && (
                    <td>
                      <div className="action">
                        <button
                          onClick={() =>
                            navigate("/form-laporan", {
                              state: { keuangan: item },
                            })
                          }
                        >
                          <img src={Edit} alt="Edit" />
                        </button>
                        <button onClick={() => setSelectedDataDelete(item)}>
                          <img src={Delete} alt="Delete" />
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
                      Apakah kamu yakin ingin menghapus laporan{" "}
                      <strong>{selectedDataDelete.tanggal}</strong>?
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
                      onClick={() => handleDelete(selectedDataDelete.id)}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </>
    </StyledKeuangan>
  );
}
