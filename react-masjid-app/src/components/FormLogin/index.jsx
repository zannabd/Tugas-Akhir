import styled from "styled-components";
import left from "../../images/left-white.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "../../firebase";

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
    height: 50%;
    top: 25%;
    left: 20%;
    border-radius: 20px;
    box-shadow: 0 40px 50px rgba(0, 0, 0, 0.1);
  }
  input {
    width: 70%;
    height: 30px;
    background: #e0dede;
    justify-content: center;
    display: flex;
    margin: 20px auto;
    padding: 12px;
    outline: none;
    border: none;
    border-radius: 5px;
  }
  .login {
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
  .login:hover {
    background: #19381f;
  }
  @media (min-width: 768px) {
    form {
      margin-top: 5rem;
    }
    input {
      height: 45px;
    }
  }
  @media (min-width: 1024px) {
    .main {
      margin-top: 4rem;
    }
  }
`;
const users = [{ email: "admin@gmail.com", password: "12345" }];
export default function FormLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const SUPER_ADMIN_UID = import.meta.env.VITE_FIREBASE_SUPER_ADMIN_UID;

  const handleLogin = (e) => {
    e.preventDefault();

    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, email, password);
      })
      .then(async (userCredential) => {
        const user = userCredential.user;
        try {
          if (user.uid === SUPER_ADMIN_UID) {
            setAlertMessage("Login berhasil!");
            setAlertType("success");
            setTimeout(() => {
              navigate("/dashboard");
            }, 1000);
          } else {
            setAlertMessage("Akses ditolak. Anda bukan admin.");
            setAlertType("danger");
          }
        } catch (error) {
          setAlertMessage("Error verifikasi token");
          setAlertType("danger");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        let message = "Email atau password salah";

        if (errorCode === "auth/invalid-email") {
          message = "Format email tidak valid.";
        } else if (errorCode === "auth/user-not-found") {
          message = "Email tidak ditemukan.";
        } else if (errorCode === "auth/wrong-password") {
          message = "Password salah.";
        }

        setAlertMessage(message);
        setAlertType("danger");
      });
  };
  return (
    <StyledForm>
      <>
        <button onClick={() => navigate("/")}>
          <img src={left} alt="" />
        </button>
        <h1 className="text-center mb-3">Login</h1>
        <div className="main">
          <form onSubmit={handleLogin}>
            {alertMessage && (
              <div
                className={`alert alert-${alertType} text-center`}
                role="alert"
                style={{
                  borderTopRightRadius: "20px",
                  borderTopLeftRadius: "20px",
                  borderBottomRightRadius: "0",
                  borderBottomLeftRadius: "0",
                  position: "absolute",
                  top: "0%",
                  width: "100%",
                }}
              >
                {alertMessage}
              </div>
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="login">
              Login
            </button>
          </form>
        </div>
      </>
    </StyledForm>
  );
}
