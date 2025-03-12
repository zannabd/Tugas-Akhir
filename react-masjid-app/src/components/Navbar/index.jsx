import React, { useState } from "react";
import styled from "styled-components";
import logo from "../../assets/Al-Ihsan.png";

const StyledNavbar = styled.div`
  background-color: #53a548;
  padding: 10px 20px;
  position: relative;
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  #brand {
    display: flex;
    align-items: center;
  }

  #brand img {
    width: 50px;
    margin-right: 10px;
    border-radius: 10px;
  }

  .listnav {
    display: flex;
    align-items: center;
  }

  a {
    margin: 0 1rem;
    text-decoration: none;
    color: white;
    font-size: 1rem;
  }

  button {
    background-color: #eee82c;
    padding: 0.2rem 1rem;
    border: 1px solid white;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    align-items: center;
  }

  .menu-toggle {
    display: none;
    background: none;
    border: none;
    color: white;
    font-size: 1.8rem;
    cursor: pointer;
  }

  .dropdown-menu {
    display: none;
    flex-direction: column;
    background: #2e7d32;
    position: absolute;
    padding: 1rem 1rem;
    top: 60px;
    right: 10px;
    width: 200px;
    border-radius: 10px;
    z-index: 9999;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }

  .dropdown-menu a {
    padding: 0.3rem;
    text-align: center;
  }

  .dropdown-menu.show {
    display: flex;
  }

  @media (max-width: 768px) {
    .listnav {
      display: none;
    }

    .menu-toggle {
      display: block;
    }
  }
`;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <StyledNavbar>
      <nav>
        <div id="brand">
          <img src={logo} alt="Logo Masjid" />
          <h1 className="text-white">Masjid Al Ihsan</h1>
        </div>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <div className={`dropdown-menu ${menuOpen ? "show" : ""}`}>
          <a href="#">Home</a>
          <a href="#">Information</a>
          <a href="#">About</a>
          <button>Login</button>
        </div>

        <div className="listnav">
          <a href="#">Home</a>
          <a href="#">Information</a>
          <a href="#">About</a>
          <button>Login</button>
        </div>
      </nav>
    </StyledNavbar>
  );
}
