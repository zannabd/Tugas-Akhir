import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import left from "../../images/left-white.png";

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
`;

export default function AddFormDokumentasi({ onCreate }) {
  const navigate = useNavigate();
  const [kegiatan, setKegiatan] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image || !kegiatan) return;

    const newEntry = {
      id: Date.now(),
      kegiatan,
      keterangan,
      src: preview || URL.createObjectURL(image),
    };

    onCreate(newEntry);

    // Reset form
    setKegiatan("");
    setKeterangan("");
    setImage(null);
    setPreview(null);
  };

  return (
    <StyledForm>
      <button onClick={() => navigate("/dokumentasi")}>
        <img src={left} alt="Kembali" />
      </button>
      <h1>Tambah Dokumentasi</h1>
      <div className="main">
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              style={{ width: "100%", borderRadius: "10px", marginTop: "1rem" }}
            />
          )}
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
      </div>
    </StyledForm>
  );
}
