import { useNavigate, useLocation } from "react-router-dom";
import left from "../../images/left-white.png";
import { useState } from "react";
import styled from "styled-components";
import { doc, setDoc, addDoc, updateDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
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
    margin-top: 3rem;
  }
  .main {
    background: #ffffff;
    position: relative;
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
    h1 {
      margin: 1.5rem;
    }
    form {
      margin-top: 2rem;
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
    h1 {
      margin-top: 2%;
    }
    .main {
      margin-top: 0.5rem;
      width: 50%;
      height: 70%;
      top: 20%;
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
  const location = useLocation();
  const kegiatanToEdit = location.state?.kegiatan;
  const [nama, setNama] = useState(kegiatanToEdit?.nama || "");
  const [tanggal, setTanggal] = useState(kegiatanToEdit?.tanggal || "");
  const [waktu, setWaktu] = useState(kegiatanToEdit?.waktu || "");
  const [lokasi, setLokasi] = useState(kegiatanToEdit?.lokasi || "");
  const [status, setStatus] = useState(kegiatanToEdit?.status || "");
  const [inputType, setInputType] = useState("text");
  const [inputTime, setInputTime] = useState("text");

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nama || !tanggal || !waktu || !lokasi || !status) return;

    const newKegiatan = {
      nama,
      tanggal,
      waktu,
      lokasi,
      status,
    };
    try {
      if (kegiatanToEdit?.id) {
        // for edit
        const docRef = doc(db, "kegiatan", kegiatanToEdit.id);
        await updateDoc(docRef, newKegiatan);
        setAlertMessage("Kegiatan berhasil diperbarui!");
        setAlertType("success");
      } else {
        // for add
        const docRef = await addDoc(collection(db, "kegiatan"), newKegiatan);
        await updateDoc(docRef, { id: docRef.id }); // abis add, update field id di dokumen
        setAlertMessage("Kegiatan berhasil ditambahkan!");
        setAlertType("success");
      }
      setTimeout(() => {
        navigate("/kegiatan");
        setAlertMessage("");
        setAlertType("");
      }, 1500);
    } catch (err) {
      console.error("Gagal menyimpan:", err);
      setAlertMessage("Tindakan gagal! Silakan coba lagi.");
      setAlertType("danger");
      setTimeout(() => {
        setAlertMessage("");
        setAlertType("");
      }, 2000);
    }
  };
  return (
    <StyledForm>
      <>
        <button onClick={() => navigate("/kegiatan")}>
          <img src={left} alt="" />
        </button>
        <h1 className="text-center">
          {kegiatanToEdit ? "Edit Kegiatan" : "Membuat Kegiatan"}
        </h1>
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
              type={inputTime}
              placeholder="Waktu"
              value={waktu}
              onFocus={() => setInputTime("time")}
              onChange={(e) => setWaktu(e.target.value)}
              onBlur={() => {
                if (!waktu) setInputTime("text");
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
