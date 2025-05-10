import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import left from "../../images/left-white.png";
import { db } from "../../firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { cloudName, uploadPreset } from "../../cloudinary";

const StyledForm = styled.div`
  background: linear-gradient(to bottom, #19381f, #53a548, #4c934c);
  display: flex;
  flex-direction: column;
  justify-content: center;
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
    text-align: center;
    margin-top: 2rem;
  }
  .main {
    background: #ffffff;
    position: relative;
    width: 75%;
    margin: 2rem auto;
    padding: 2rem;
    border-radius: 20px;
    box-shadow: 0 40px 50px rgba(0, 0, 0, 0.1);
  }
  input,
  textarea {
    width: 100%;
    background: #e0dede;
    margin: 1rem 0;
    padding: 12px;
    border: none;
    border-radius: 5px;
    outline: none;
  }
  .submit {
    width: 100%;
    padding: 12px;
    color: #fff;
    background: #4c934c;
    font-size: 1em;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 1.5rem;
    justify-content: center;
    display: block;
  }
  .submit:hover {
    background: #19381f;
  }
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
  }
  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 5px solid #e0e0e0;
    border-top: 5px solid #4c934c;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
  .loading-info {
    font-weight: bold;
    color: #4c934c;
  }
  @media (min-width: 1024px) {
    .main {
      width: 50%;
    }
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default function AddFormDokumentasi({ onCreate }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dokumentasiToEdit = location.state?.dokumentasi;
  const [kegiatan, setKegiatan] = useState(dokumentasiToEdit?.kegiatan || "");
  const [keterangan, setKeterangan] = useState(
    dokumentasiToEdit?.keterangan || ""
  );
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (dokumentasiToEdit?.imageUrl) {
      setPreview(dokumentasiToEdit.imageUrl); // Menampilkan gambar yang ada saat edit
    }
  }, [dokumentasiToEdit?.imageUrl]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const uploadToCloudinary = async (file) => {
    const dokumentasi = new FormData();
    dokumentasi.append("file", file);
    dokumentasi.append("upload_preset", uploadPreset);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: dokumentasi,
      }
    );
    const data = await res.json();
    // if (data.secure_url) {
    //   console.log("Image uploaded to Cloudinary: ", data.secure_url);
    // } else {
    //   console.log("Cloudinary upload failed:", data);
    // }
    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!kegiatan) return;

    setLoading(true);

    try {
      let imageUrl = dokumentasiToEdit?.image || "";

      if (image) {
        imageUrl = await uploadToCloudinary(image);
      }
      const newEntry = {
        image: imageUrl,
        kegiatan,
        keterangan,
        createdAt: new Date(),
      };
      if (dokumentasiToEdit?.id) {
        const docRef = doc(db, "dokumentasi", dokumentasiToEdit.id);
        await updateDoc(docRef, newEntry);
        setAlertMessage("Dokumentsi berhasil diperbarui!");
        setAlertType("success");
      } else {
        await addDoc(collection(db, "dokumentasi"), newEntry);
        setAlertMessage("Dokumentsi berhasil ditambahkan!");
        setAlertType("success");
      }

      setTimeout(() => {
        setKegiatan("");
        setKeterangan("");
        setImage(null);

        if (onCreate) {
          onCreate(newEntry);
        }
        console.log("Berhasil simpan ke Firestore");
        navigate("/dokumentasi");
      }, 1500);
    } catch (error) {
      console.error("Gagal simpan ke Firestore:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledForm>
      <button onClick={() => navigate("/dokumentasi")}>
        <img src={left} alt="Kembali" />
      </button>
      <h1>Tambah Dokumentasi</h1>
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
        {loading ? ( // Tampilkan spinner saat loading
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-info">Mengupload data...</p> {/* Spinner */}
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginTop: "1rem",
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
            ) : dokumentasiToEdit?.imageUrl ? (
              <img
                src={dokumentasiToEdit.imageUrl}
                alt="Dokumentasi"
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginTop: "1rem",
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
            ) : null}
            <input
              type="text"
              placeholder="Nama Kegiatan"
              value={kegiatan}
              onChange={(e) => setKegiatan(e.target.value)}
              required
            />
            <textarea
              placeholder="Keterangan"
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
              rows={4}
            />
            <button type="submit" className="submit">
              Simpan
            </button>
          </form>
        )}
      </div>
    </StyledForm>
  );
}
