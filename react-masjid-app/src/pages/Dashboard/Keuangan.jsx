import { useState } from "react";
import styled from "styled-components";
import Edit from "../../images/icons8-edit-48.png";
import Delete from "../../images/icons8-delete-48.png";
import AddButton from "../../components/Button/addButton";
import ResetFilter from "../../components/Button/resetFilter";
import Pagination from "../../components/Pagination";
import { useNavigate } from "react-router-dom";

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

const dataKeuangan = [
  {
    id: 1,
    detail: "file.csv",
    tanggal: "18 Februari 2024",
    pendapatan: "Rp5.000.000",
    pengeluaran: "Rp4.500.000",
    balance: "Rp55.000.000",
  },
  {
    id: 2,
    detail: "file.csv",
    tanggal: "18 Maret 2025",
    pendapatan: "Rp5.000.000",
    pengeluaran: "Rp4.500.000",
    balance: "Rp55.000.000",
  },
  {
    id: 3,
    detail: "file.csv",
    tanggal: "18 April 2025",
    pendapatan: "Rp5.000.000",
    pengeluaran: "Rp4.500.000",
    balance: "Rp55.000.000",
  },
  {
    id: 4,
    detail: "file.csv",
    tanggal: "18 Mei 2025",
    pendapatan: "Rp5.000.000",
    pengeluaran: "Rp4.500.000",
    balance: "Rp55.000.000",
  },
];
export default function Keuangan() {
  const navigate = useNavigate();
  const [bulanDipilih, setBulanDipilih] = useState("");
  const [tahunDipilih, setTahunDipilih] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

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
            <AddButton
              label="Buat Laporan"
              onClick={() => navigate("/buat-laporan")}
            />
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
                <th>Tindakan</th>
              </tr>
            </thead>
            <tbody>
              {filterData.map((item, index) => (
                <tr key={item.id}>
                  <td style={{ textAlign: "center" }}>{index + 1}</td>
                  <td>{item.detail}</td>
                  <td>{item.tanggal}</td>
                  <td>{item.pendapatan}</td>
                  <td>{item.pengeluaran}</td>
                  <td>{item.balance}</td>
                  <td>
                    <div className="action">
                      <button>
                        <img src={Edit} alt="" />
                      </button>
                      <button>
                        <img src={Delete} alt="" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
