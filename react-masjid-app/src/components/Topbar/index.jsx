import { useState } from "react";
import logo from "../../assets/Al-Ihsan.png";
import profile from "../../images/admin-profile.png";
import logout from "../../images/logout.png";
import styled from "styled-components";
import { Navigate, useNavigate } from "react-router-dom";

const StyledTopbar = styled.div`
  background: #53a548;
  display: flex;
  justify-content: space-between;
  height: 70px;
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
  .profile-img {
    max-width: 40px;
    height: 40px;
    margin-right: 20px;
  }
  .profile-section {
    position: relative;
    align-self: center;
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
  }
`;
export default function Topbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
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
            </button>
          </div>
          <div className={`logout ${menuOpen ? "show" : ""}`}>
            <h3 className="d-flex justify-content-center">
              <i>Admin</i>
            </h3>
            <button onClick={() => navigate("/")} className="d-flex fw-bold">
              Logout <img src={logout} alt="logout.png" />
            </button>
          </div>
        </div>
      </>
    </StyledTopbar>
  );
}
