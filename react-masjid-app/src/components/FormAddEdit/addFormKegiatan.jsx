import { useNavigate } from "react-router-dom";
import left from "../../images/left-white.png";
import { useState } from "react";
import styled from "styled-components";
const StyledForm = styled.div`
  background: linear-gradient(to bottom, #19381f, #53a548, #4c934c);
  display: flex;
  flex-direction: column;
  justify-content: "center";
  min-height: 100vh;
  font-family: "Jost", sans-serif;
  padding: 1rem;
  button {
    display: flex;
    justify-content: flex-start;
    background: none;
    border: none;
  }
  button img {
    max-width: 30px;
  }
  h1 {
    color: #ffffff;
    font-weight: bold;
    transition: 0.5s ease-in-out;
    cursor: pointer;
  }
  .main {
    background: #ffffff;
    position: absolute;
    width: 60%;
    height: 60%;
    display: flex;
    align-self: center;
    justify-content: center;
    top: 25%;
    border-radius: 20px;
    box-shadow: 0 40px 50px rgba(0, 0, 0, 0.1);
  }
  input,
  select {
    width: 80%;
    height: 40px;
    background: #e0dede;
    justify-content: center;
    display: flex;
    margin: 20px auto;
    padding: 12px;
    outline: none;
    border: none;
    border-radius: 5px;
  }
  select {
    height: 43px;
  }
  .submit {
    width: 60%;
    height: 40px;
    margin: 10px auto;
    justify-content: center;
    display: block;
    color: #fff;
    background: #4c934c;
    font-size: 1em;
    font-weight: bold;
    margin-top: 30px;
    outline: none;
    border: none;
    border-radius: 5px;
    transition: 0.2s ease-in;
    cursor: pointer;
  }
  .submit:hover {
    background: #19381f;
  }

  @media (min-width: 768px) {
    form {
      margin-top: 3rem;
    }
    .main {
      width: 50%;
      height: 50%;
    }
    input,
    select {
      height: 45px;
      width: 100%;
    }
  }
  @media (min-width: 1024px) {
    .main {
      margin-top: 1rem;
      width: 50%;
      height: 60%;
    }
    input,
    select {
      margin: 15px auto;
    }
    form {
      width: 80%;
      margin-top: 1rem;
    }
  }
`;

export default function AddFormKegiatan({ onCreate }) {
  const navigate = useNavigate();
  const [nama, setNama] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [status, setStatus] = useState("");
  const [inputType, setInputType] = useState("text");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nama || !tanggal || !lokasi || !status) return;

    const newKegiatan = {
      id: Date.now(), // sementara pakai timestamp
      nama,
      tanggal,
      lokasi,
      status,
    };

    onCreate(newKegiatan);
    setNama("");
    setTanggal("");
    setLokasi("");
    setStatus("");
  };
  return (
    <StyledForm>
      <>
        <button onClick={() => navigate("/kegiatan")}>
          <img src={left} alt="" />
        </button>
        <h1 className="text-center mt-5">Membuat Kegiatan</h1>
        <div className="main">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nama Kegiatan"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
            />
            <input
              id="tanggal"
              type={inputType}
              placeholder="Tanggal"
              value={tanggal}
              onFocus={() => setInputType("date")}
              onChange={(e) => setTanggal(e.target.value)}
              onBlur={() => {
                if (!tanggal) setInputType("text"); // Kembali ke text jika kosong
              }}
              required
            />

            <input
              type="text"
              placeholder="Lokasi"
              value={lokasi}
              onChange={(e) => setLokasi(e.target.value)}
              required
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="">Pilih Status</option>
              <option value="Mendatang">Mendatang</option>
              <option value="Selesai">Selesai</option>
              <option value="Dibatalkan">Dibatalkan</option>
            </select>
            <button type="submit" className="submit">
              Simpan
            </button>
          </form>
        </div>
      </>
    </StyledForm>
  );
}
