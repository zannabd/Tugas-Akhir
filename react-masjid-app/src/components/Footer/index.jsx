import styled from "styled-components";

const StyledFooter = styled.div`
  background-color: #000000;
  padding: 1rem;
  bottom: 0%;
  width: 100%;
  p {
    color: white;
    margin: 1rem;
  }
`;
export default function Footer() {
  return (
    <StyledFooter>
      <>
        <footer>
          <p>
            © <b>2025</b> Masjid Al Ihsan. All Rights Reserved
          </p>
        </footer>
      </>
    </StyledFooter>
  );
}
