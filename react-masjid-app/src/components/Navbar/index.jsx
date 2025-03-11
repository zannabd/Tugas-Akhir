import logo from "../../assets/Al-Ihsan.png";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledNavbar = styled.div`
  background-color: #53a548;

  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0rem 1rem;
  }
  #brand {
    display: flex;
  }

  #brand img {
    display: flex;
    flex-shrink: 0;
    width: 50px;
    margin-top: 1rem;
    margin-bottom: 1rem;
    align-items: center;
  }
  a {
    margin: 1rem;
    text-decoration: none;
  }

  button {
    background-color: #eee82c;
    padding: 0rem 1rem 0.2rem;
    border: 1px solid white;
    border-radius: 5px;
    font-weight: bold;
  }
`;

export default function Navbar() {
  return (
    <StyledNavbar>
      <>
        <nav>
          <div id="brand">
            <img src={logo}></img>
            {/* <span className="fs-1 fw-bold">Han-WIKI</span> */}
            <h1 className="ms-2 d-flex align-items-center text-white">
              Masjid Al Ihsan
            </h1>
          </div>
          <div className="listnav">
            <a href="#" className="text-white mx-3">
              Home
            </a>
            <a href="#" className="text-white mx-3">
              Information
            </a>
            <a href="#" className="text-white mx-3">
              About
            </a>
            <button>Login</button>
          </div>
          {/* <ul className="navbar-list">
            <li id="navbar-item">
              <NavLink
                className="text-decoration-none"
                id="list"
                exact="true"
                to="/"
                activeclassname="active"
              >
                Home
              </NavLink>
            </li>
            <li className="dropdown" id="navbar-item">
              <button className="dropbtn">Movie</button>
              <ul className="dropdown-menu">
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/movie/korea"
                    activeclassname="active"
                  >
                    Korea
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="movie/jepang"
                    activeclassname="active"
                  >
                    Jepang
                  </NavLink>
                </li>
              </ul>
            </li>
            <li id="navbar-item">
              <NavLink className="text-decoration-none" id="list" to="create">
                Create
              </NavLink>
            </li>
            <li id="navbar-item">
              <NavLink
                className="text-decoration-none"
                id="list"
                to="openai"
                activeclassname="active"
              >
                OpenAI
              </NavLink>
            </li>
            <li id="navbar-item">
              <NavLink
                className="text-decoration-none"
                id="list"
                to="about"
                activeclassname="active"
              >
                About
              </NavLink>
            </li>
          </ul> */}
        </nav>
      </>
    </StyledNavbar>
  );
}
