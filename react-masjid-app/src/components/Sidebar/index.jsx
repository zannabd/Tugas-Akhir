import styled from "styled-components";
import { NavLink } from "react-router-dom";
const StyledSidebar = styled.div`
  background-color: #4c934c;

  ul {
    display: flex;
    justify-content: space-between;
  }
  span {
    text-decoration: none;
    color: #ffffff;
    transition: 0.3s;
    font-weight: 450;
    font-size: 16px;
  }
  .active {
    background: #306c3c;
  }
  @media (min-width: 768px) {
    ul {
      justify-content: space-around;
    }
    span {
      font-weight: 500;
      font-size: 17px;
    }
  }
  @media (min-width: 1024px) {
    max-width: 25%;
    min-height: 100vh;
    font-weight: bold;
    font-size: 18px;

    ul {
      display: flex;
      flex-direction: column;
      margin: 1rem;
      gap: 32px;
    }
    span {
      font-weight: 600;
      font-size: 18px;
    }
  }
`;
export default function Sidebar() {
  return (
    <StyledSidebar>
      <>
        <ul className="nav">
          <li className="nav-item">
            <NavLink to="/dashboard" className="nav-link">
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/kegiatan" className="nav-link">
              <span>Kegiatan</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/keuangan" className="nav-link">
              <span>Keuangan</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/dokumentasi" className="nav-link">
              <span>Dokumentasi</span>
            </NavLink>
          </li>
        </ul>
      </>
    </StyledSidebar>
  );
}
