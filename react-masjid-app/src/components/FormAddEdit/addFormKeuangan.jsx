import { useLocation, useNavigate } from "react-router-dom";
import left from "../../images/left-white.png";
import { useState } from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";

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
    width: 70%;
    height: 70%;
    display: flex;
    align-self: center;
    justify-content: center;
    top: 25%;
    border-radius: 20px;
    box-shadow: 0 40px 50px rgba(0, 0, 0, 0.1);
  }
  input {
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
  .file-input {
    margin-top: 20px;
    text-align: center;
    background: #e0dede;
    border-radius: 5px;
    padding: 12px;
    width: 80%;
    display: flex;
    justify-content: center;
    margin: 20px auto;
  }
  .file-preview {
    margin-top: 10px;
    font-size: 14px;
    color: #e0dede;
  }
  @media (min-width: 768px) {
    form {
      margin-top: 3rem;
    }
    .main {
      width: 50%;
      height: 50%;
    }
    input {
      height: 45px;
      width: 100%;
    }
  }
  @media (min-width: 1024px) {
    .main {
      margin-top: 1rem;
      width: 50%;
      height: 65%;
    }
    input {
      margin: 15px auto;
    }
    form {
      width: 80%;
      margin-top: 1rem;
    }
  }
`;

export default function AddFormKeuangan({ onCreate }) {
  const navigate = useNavigate();
  const location = useLocation();
  const keuanganToEdit = location.state?.keuangan;
  console.log(keuanganToEdit);
  const [detail, setDetail] = useState(
    keuanganToEdit ? { name: keuanganToEdit.detail } : null
  );
  const [tanggal, setTanggal] = useState(keuanganToEdit?.tanggal || "");
  const [pendapatan, setPendapatan] = useState(
    keuanganToEdit?.pendapatan || ""
  );
  const [pengeluaran, setPengeluaran] = useState(
    keuanganToEdit?.pengeluaran || ""
  );
  const [inputType, setInputType] = useState("text");
  const [saldoTotal, setSaldoTotal] = useState(
    keuanganToEdit?.saldoTotal || ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!detail || !tanggal || !pendapatan || !pengeluaran || !saldoTotal)
      return;

    const newKeuangan = {
      id: keuanganToEdit?.id || Date.now(),
      detail: detail ? detail.name : "", // Jika file ada, ambil nama file
      tanggal,
      pendapatan,
      pengeluaran,
      saldoTotal,
    };

    onCreate(newKeuangan);
    // Reset form
    setDetail(null);
    setTanggal("");
    setPendapatan("");
    setPengeluaran("");
    setSaldoTotal("");
    navigate("/keuangan");
  };

  const onDrop = (acceptedFiles) => {
    setDetail(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".csv, .xlsx, .xls, .pdf",
  });
  return (
    <StyledForm>
      <>
        <button onClick={() => navigate("/keuangan")}>
          <img src={left} alt="Kembali" />
        </button>
        <h1 className="text-center mt-5">Buat Laporan Keuangan</h1>
        <div className="main">
          <form onSubmit={handleSubmit}>
            <div className="file-input" {...getRootProps()}>
              <input {...getInputProps()} />
              <p>
                Drag & drop a file here, or click to select CSV, XLSX, or PDF
              </p>
              {detail && <p>File selected: {detail.name}</p>}
            </div>

            <input
              id="tanggal"
              type={inputType}
              placeholder="Tanggal"
              value={tanggal}
              onFocus={() => setInputType("date")}
              onChange={(e) => setTanggal(e.target.value)}
              onBlur={() => {
                if (!tanggal) setInputType("text");
              }}
              required
            />
            <input
              type="number"
              placeholder="Pendapatan"
              value={pendapatan}
              onChange={(e) => setPendapatan(e.target.value)}
            />
            <input
              type="number"
              placeholder="Pengeluaran"
              value={pengeluaran}
              onChange={(e) => setPengeluaran(e.target.value)}
            />
            <input
              type="number"
              placeholder="Saldo Total"
              value={saldoTotal}
              onChange={(e) => setSaldoTotal(e.target.value)}
              required
            />
            <button type="submit" className="submit">
              Simpan
            </button>
          </form>
        </div>
      </>
    </StyledForm>
  );
}
