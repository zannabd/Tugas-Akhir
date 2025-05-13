import { useState, useEffect } from "react";
import logo from "../../assets/Al-Ihsan.png";
import profile from "../../images/admin-profile.png";
import logout from "../../images/logout.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const StyledTopbar = styled.div`
  background: #53a548;
  display: flex;
  justify-content: space-between;
  height: 75px;
  min-width: 100%;
  .brand {
    display: flex;
  }
  .brand h1 {
    font-size: 25px;
  }
  img {
    width: 45px;
    height: 45px;
    margin-right: 10px;
    border-radius: 10px;
    margin: 0.5rem 0.8rem;
  }
  .profile-info {
    display: flex;
    justify-content: center;
  }
  .profile-img {
    max-width: 35px;
    height: 35px;
    margin-bottom: 0px;
    margin-top: 20px;
  }
  .profile-section {
    position: relative;
    align-self: center;
    align-items: center;
  }
  h1 {
    color: #fff;
    align-self: center;
    margin-top: 8px;
  }
  button {
    border: none;
    background: none;
    cursor: pointer;
  }
  .logout {
    display: none;
    position: absolute;
    background: #ffffff;
    align-items: center;
    align-self: center;
    height: 150px;
    padding: 1.5rem 3rem;
    border: 1px solid gray;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    top: 63px;
    right: 5px;
    z-index: 999;
  }
  .logout.show {
    display: block;
  }
  .logout button {
    margin-top: 1rem;
    background: #eee82c;
    border-radius: 5px;
    align-items: center;
  }
  .logout button img {
    max-width: 24px;
    height: 24px;
  }
  @media (min-width: 768px) {
    .brand h1 {
      font-size: 30px;
    }
  }
  @media (min-width: 1024px) {
    min-height: 12vh;
    img {
      margin-left: 2rem;
    }
    .brand h1 {
      font-size: 30px;
    }
    .profile-img {
      margin-right: 35px;
      width: 40px;
    }
  }
`;
export default function Topbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserInfo(docSnap.data());
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log("User signed out");
      navigate("/");
    } catch (error) {
      console.error("Error saat logout:", error);
    }
  };
  return (
    <StyledTopbar>
      <>
        <div className="brand">
          <img src={logo} alt="logo" className="align-self-center" />
          <h1>MASJID AL IHSAN</h1>
        </div>
        <div className="profile-section">
          <div className="profile-info">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <img src={profile} alt="Profile" className="profile-img" />
              <p style={{ color: "white", textAlign: "center" }}>
                {" "}
                {userInfo ? `${userInfo.nama || userInfo.role}` : "Admin"}
              </p>
            </button>
          </div>
          <div className={`logout ${menuOpen ? "show" : ""}`}>
            <h3 className="d-flex justify-content-center">
              <i>{userInfo ? `${userInfo.nama || userInfo.role}` : "Admin"}</i>
            </h3>
            <button
              onClick={() => setShowModal(true)}
              className="d-flex fw-bold"
            >
              Logout <img src={logout} alt="logout.png" />
            </button>
          </div>
        </div>
        {showModal && (
          <div
            className="modal fade show"
            style={{
              display: "block",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
            tabIndex="-1"
            role="dialog"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Konfirmasi Logout</h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setShowModal(false)}
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>Apakah Anda yakin ingin keluar?</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary px-4"
                    style={{
                      color: "white",
                      backgroundColor: "#6c757d",
                      borderColor: "#6c757d",
                      transition: "background-color 0.3s, border-color 0.3s",
                    }}
                    onClick={() => setShowModal(false)}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#5a6268")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#6c757d")
                    }
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger fw-bold px-4"
                    style={{
                      color: "white",
                      backgroundColor: "#dc3545",
                      borderColor: "#dc3545",
                      transition: "background-color 0.3s, border-color 0.3s",
                    }}
                    onClick={() => {
                      setShowModal(false);
                      handleLogout();
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#c82333")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#dc3545")
                    }
                  >
                    Ya, Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    </StyledTopbar>
  );
}
