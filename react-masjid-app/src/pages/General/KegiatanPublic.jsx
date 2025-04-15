import styled from "styled-components";
import Edit from "../../images/icons8-edit-48.png";
import Delete from "../../images/icons8-delete-48.png";
// import add from "../../images/icons8-add-50.png";
import search from "../../images/icons8-search-50.png";
import { useState } from "react";
import AddButton from "../../components/Button/addButton";
import ResetFilter from "../../components/Button/resetFilter";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const StyledKegiatan = styled.div`
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
  .pagination {
    display: flex;
    justify-content: center;
  }
  .pagination .handle-pagination {
    border: none;
    background-color: #4c934c;
    color: white;
  }
  @media (min-width: 768px) {
    table {
      width: 100%;
    }
  }
  @media (min-width: 1024px) {
    margin: 5.5rem 1rem;
    max-width: 100%;
    .desc {
      width: 1250px;
    }
    table {
      width: 100%;
    }
  }
`;
export default function KegiatanPublic() {
  const kegiatanList = [
    {
      id: 1,
      nama: "Kajian Sabtu",
      tanggal: "13 Mei 2025",
      lokasi: "Masjid",
      status: "Mendatang",
    },
    {
      id: 2,
      nama: "Pengajian Akbar",
      tanggal: "5 April 2025",
      lokasi: "Masjid",
      status: "Selesai",
    },
    {
      id: 3,
      nama: "Santunan Anak Yatim",
      tanggal: "1 April 2025",
      lokasi: "Masjid",
      status: "Selesai",
    },
    {
      id: 4,
      nama: "Buka Puasa Bersama",
      tanggal: "29 Maret 2025",
      lokasi: "Masjid",
      status: "Dibatalkan",
    },
    {
      id: 6,
      nama: "Kegiatan Sosial",
      tanggal: "20 April 2025",
      lokasi: "Lapangan",
      status: "Mendatang",
    },
    {
      id: 7,
      nama: "Kegiatan Sosial",
      tanggal: "20 April 2025",
      lokasi: "Lapangan",
      status: "Mendatang",
    },
    {
      id: 8,
      nama: "Kegiatan Sosial",
      tanggal: "20 April 2025",
      lokasi: "Lapangan",
      status: "Mendatang",
    },
    {
      id: 9,
      nama: "Kegiatan Sosial",
      tanggal: "20 April 2025",
      lokasi: "Lapangan",
      status: "Mendatang",
    },
    {
      id: 10,
      nama: "Kegiatan Sosial",
      tanggal: "20 April 2025",
      lokasi: "Lapangan",
      status: "Mendatang",
    },
    {
      id: 11,
      nama: "Kegiatan Sosial",
      tanggal: "20 April 2025",
      lokasi: "Lapangan",
      status: "Dibatalkan",
    },
    {
      id: 12,
      nama: "Kegiatan Sosial",
      tanggal: "20 April 2025",
      lokasi: "Lapangan",
      status: "Mendatang",
    },
    {
      id: 13,
      nama: "Kegiatan Sosial",
      tanggal: "20 April 2025",
      lokasi: "Lapangan",
      status: "Dibatalkan",
    },
    {
      id: 14,
      nama: "Kegiatan Sosial",
      tanggal: "20 April 2025",
      lokasi: "Lapangan",
      status: "Mendatang",
    },
    {
      id: 15,
      nama: "Kegiatan Sosial",
      tanggal: "20 April 2025",
      lokasi: "Lapangan",
      status: "Mendatang",
    },
    {
      id: 16,
      nama: "Kegiatan Sosial",
      tanggal: "20 April 2025",
      lokasi: "Lapangan",
      status: "Mendatang",
    },
    {
      id: 17,
      nama: "Kegiatan Sosial",
      tanggal: "20 April 2025",
      lokasi: "Lapangan",
      status: "Mendatang",
    },
    {
      id: 18,
      nama: "Kegiatan Sosial",
      tanggal: "20 April 2025",
      lokasi: "Lapangan",
      status: "Mendatang",
    },
  ];

  const [statusFilter, setStatusFilter] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Filter berdasar search + status
  const filteredData = kegiatanList.filter((item) => {
    const keywordMatch = item.nama
      .toLowerCase()
      .includes(searchKeyword.toLowerCase());
    const statusMatch = statusFilter ? item.status === statusFilter : true;
    return keywordMatch && statusMatch;
  });

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handleReset = () => {
    setSearchKeyword("");
    setStatusFilter("");
  };
  return (
    <StyledKegiatan>
      <>
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
                <option value="" disabled selected>
                  Status
                </option>
                <option value="Mendatang">Mendatang</option>
                <option value="Selesai">Selesai</option>
                <option value="Dibatalkan">Dibatalkan</option>
              </select>
            </div>
            <ResetFilter onReset={handleReset} />
          </div>
        </div>
        <div className="tabel">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Nama Kegiatan</th>
                <th>Tanggal</th>
                <th>Lokasi</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((item, index) => (
                <tr key={item.id}>
                  <td style={{ textAlign: "center" }}>
                    {indexOfFirstRow + index + 1}
                  </td>
                  <td>{item.nama}</td>
                  <td>{item.tanggal}</td>
                  <td>{item.lokasi}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div
          style={{ marginTop: "12px", display: "flex", gap: "8px" }}
          className="pagination"
        >
          <button
            className="handle-pagination"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              style={{
                fontWeight: currentPage === i + 1 ? "bold" : "normal",
                border: "none",
                color: "#4c934c",
                backgroundColor: "#ffffff",
              }}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="handle-pagination"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </>
    </StyledKegiatan>
  );
}
