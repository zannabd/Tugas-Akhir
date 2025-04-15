import styled from "styled-components";
import Footer from "../Footer";
import Navbar from "../Navbar";

const StyledPublicLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  main {
    flex: 1;
  }
`;

export default function PublicLayout(props) {
  return (
    <StyledPublicLayout>
      <>
        <Navbar />
        <main>{props.children}</main>
        <Footer />
      </>
    </StyledPublicLayout>
  );
}
