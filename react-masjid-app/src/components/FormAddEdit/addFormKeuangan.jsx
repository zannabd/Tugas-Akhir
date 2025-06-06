import { useLocation, useNavigate } from "react-router-dom";
import left from "../../images/left-white.png";
import { useState } from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import { db } from "../../firebase"; // pastikan path ini sesuai
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  onSnapshot,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { cloudName, uploadPreset } from "../../cloudinary";

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
    margin-top: 1rem;
  }
  .main {
    background: #ffffff;
    position: relative;
    width: 70%;
    height: 80%;
    display: flex;
    align-self: center;
    justify-content: center;
    top: 16%;
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
  .intruksi {
    font-size: 12px;
    color: red;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    text-align: center;
    margin: 0 1rem;
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
    h1 {
      margin: 1rem 0;
    }
    .main {
      margin-top: 1rem;
      width: 50%;
      height: 65%;
      top: 20%;
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
  const [file, setFile] = useState(null);
  const [uploadUrl, setUploadUrl] = useState("");
  // const [detail, setDetail] = useState(
  //   keuanganToEdit ? { name: keuanganToEdit.detail } : null
  // );
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
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  // const uploadDetail = async (file, folderName) => {
  //   const detailKeuangan = new FormData();
  //   detailKeuangan.append("file", file);
  //   detailKeuangan.append("upload_preset", uploadPreset);
  //   detailKeuangan.append("resource_type", "raw");
  //   detailKeuangan.append("folder", folderName);
  //   const res = await fetch(
  //     `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
  //     {
  //       method: "POST",
  //       body: detailKeuangan,
  //     }
  //   );
  //   const data = await res.json();
  //   setUploadUrl(data.secure_url);
  //   return data.secure_url;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tanggal || !pendapatan || !pengeluaran || !saldoTotal) return;

    try {
      // let fileUrl = "";

      // if (detail) {
      //   fileUrl = await uploadDetail(detail, "keuangan");
      // }

      const newKeuangan = {
        // detail: fileUrl || "",
        tanggal,
        pendapatan: Number(pendapatan),
        pengeluaran: Number(pengeluaran),
        saldoTotal: Number(saldoTotal),
        createdAt: new Date(),
      };

      if (keuanganToEdit?.id) {
        // EDIT
        const docRef = doc(db, "keuangan", keuanganToEdit.id);
        await updateDoc(docRef, newKeuangan);
        setAlertMessage("Laporan keuangan berhasil diperbarui!");
        setAlertType("success");
      } else {
        // TAMBAH BARU
        await addDoc(collection(db, "keuangan"), newKeuangan);
        setAlertMessage("Laporan keuangan berhasil ditambahkan!");
        setAlertType("success");
      }

      // setDetail(null);
      setTanggal("");
      setPendapatan("");
      setPengeluaran("");
      setSaldoTotal("");
      setTimeout(() => {
        navigate("/keuangan");
      }, 1500);
    } catch (err) {
      console.error("Gagal menyimpan:", err);
      setAlertMessage("Terjadi kesalahan, coba lagi!");
      setAlertType("error");
    }
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    // setDetail(file); // Simpan file yang di-upload
    // uploadDetail(file, "keuangan");
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "text/csv": [".csv"],
      "application/pdf": [".pdf"],
    },
  });
  return (
    <StyledForm>
      <>
        <button onClick={() => navigate("/keuangan")}>
          <img src={left} alt="Kembali" />
        </button>
        <h1 className="text-center">Buat Laporan Keuangan</h1>
        <div className="main">
          {alertMessage && (
            <div
              className={`alert alert-${alertType} mt-3`}
              role="alert"
              style={{
                display: "flex",
                position: "absolute",
              }}
            >
              {alertMessage}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            {/* <div className="file-input" {...getRootProps()}>
              <input {...getInputProps()} />
              <p>
                Drag & drop a file here, or click to select CSV, XLSX, or PDF
              </p>
              {detail && <p>File selected: {detail.name}</p>}
            </div> */}

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
            <p className="intruksi">
              Masukkan angka tanpa titik (misalnya 500000 untuk lima ratus ribu)
            </p>
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
