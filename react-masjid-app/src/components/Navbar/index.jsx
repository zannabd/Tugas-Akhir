import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/Al-Ihsan.png";
import { Link } from "react-scroll";

const StyledNavbar = styled.div`
  background-color: #53a548;
  padding: 10px 20px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999999;
  transition: all 0.3s ease-in-out;
  box-shadow: ${(props) =>
    props.isScrolled ? "0px 4px 10px rgba(0, 0, 0, 0.3)" : "none"};
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

  .listlink {
    margin: 0 1rem;
    text-decoration: none;
    color: white;
    font-size: 1rem;
    cursor: pointer;
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

  .dropdown-menu .listlink {
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
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true); // Aktifkan shadow saat scroll turun
      } else {
        setIsScrolled(false); // Hilangkan shadow jika kembali ke atas
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <StyledNavbar isScrolled={isScrolled}>
      <nav>
        <div id="brand">
          <img src={logo} alt="Logo Masjid" />
          <h1 className="text-white">Masjid Al Ihsan</h1>
        </div>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <div className={`dropdown-menu ${menuOpen ? "show" : ""}`}>
          <Link to="home" smooth={true} duration={500} className="listlink">
            Home
          </Link>
          <Link
            to="information"
            smooth={true}
            duration={500}
            className="listlink"
          >
            Information
          </Link>
          <Link to="about" smooth={true} duration={500} className="listlink">
            About
          </Link>
          <button onClick={() => navigate("/login")}>Login</button>
        </div>

        <div className="listnav">
          <Link to="home" smooth={true} duration={500} className="listlink">
            Home
          </Link>
          <Link
            to="information"
            smooth={true}
            duration={500}
            className="listlink"
          >
            Information
          </Link>
          <Link to="about" smooth={true} duration={500} className="listlink">
            About
          </Link>
          <button onClick={() => navigate("/login")}>Login</button>
        </div>
      </nav>
    </StyledNavbar>
  );
}
