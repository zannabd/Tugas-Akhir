import styled from "styled-components";
import Footer from "../Footer";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";

const StyledLayout = styled.div`
  main {
    margin: 0.5rem;
  }

  @media (min-width: 768px) {
    main {
      margin: 1rem;
    }
  }
  @media (min-width: 1024px) {
    .contain {
      display: flex;
    }
  }
`;

export default function Layout(props) {
  return (
    <StyledLayout>
      <>
        <Topbar />
        <div style={{ width: "100%" }} className="contain">
          <Sidebar />
          <main>{props.children}</main>
        </div>
      </>
    </StyledLayout>
  );
}
