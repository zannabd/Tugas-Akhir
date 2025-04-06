import styled from "styled-components";

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
  }
  .filtered {
    display: flex;
    gap: 15px;
  }
  .tabel {
    border: 1px solid grey;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-top: 15px;
    padding: 16px;
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
export default function Kegiatan() {
  const kegiatanList = [
    {
      id: 1,
      nama: "Kajian Sabtu",
      tanggal: "13 Mei 2025",
      status: "Mendatang",
    },
    {
      id: 2,
      nama: "Pengajian Akbar",
      tanggal: "5 April 2025",
      status: "Selesai",
    },
    {
      id: 3,
      nama: "Santunan Anak Yatim",
      tanggal: "1 April 2025",
      status: "Selesai",
    },
    {
      id: 4,
      nama: "Buka Puasa Bersama",
      tanggal: "29 Maret 2025",
      status: "Dibatalkan",
    },
    {
      id: 5,
      nama: "Kegiatan Sosial",
      tanggal: "20 April 2025",
      status: "Mendatang",
    },
  ];

  return (
    <StyledKegiatan>
      <>
        <div className="desc">
          <h4>{kegiatanList.length} Total Kegiatan</h4>
          <div className="filtered">
            <div className="dropdown">
              <input type="text" />
            </div>
            <div className="dropdown">
              <select name="" id="">
                <option value="" disabled selected>
                  Status
                </option>
                <option value="Mendatang">Mendatang</option>
                <option value="Selesai">Selesai</option>
                <option value="Dibatalkan">Dibatalkan</option>
              </select>
            </div>
          </div>
        </div>
        <div className="tabel">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Nama Kegiatan</th>
                <th>Tanggal</th>
                <th>Status</th>
                <th>Tidakan</th>
              </tr>
            </thead>
            <tbody>
              {kegiatanList.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.nama}</td>
                  <td>{item.tanggal}</td>
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
                  <td>
                    <button>Edit</button>
                    <button>Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    </StyledKegiatan>
  );
}
