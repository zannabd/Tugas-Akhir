import styled from "styled-components";

const StyledAbout = styled.div`
  background-color: #4c934c;
  text-align: center;
  padding: 1rem 0rem;
  color: white;
  h1 {
    margin-bottom: 1rem;
  }
  p {
    font-style: italic;
    margin: 2rem 2rem;
  }
`;
export default function About() {
  return (
    <StyledAbout>
      <>
        <h1 className="judul" id="about">
          About
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
          libero obcaecati deserunt, cum in praesentium quas sapiente nostrum
          vero vitae nobis rem porro provident. Quibusdam autem nostrum saepe
          consequuntur nesciunt.
        </p>
      </>
    </StyledAbout>
  );
}
