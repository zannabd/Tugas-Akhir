import reset from "../../images/icons8-reset-50.png";
import styled from "styled-components";

const StyledReset = styled.div`
  button {
    background-color: #4c934c;
    color: #ffffff;
    border: none;
    display: flex;
    align-items: center;
    align-self: center;
    padding: 0px 5px;
    height: 30px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #306c3c;
    }
  }
  button img {
    margin-left: 5px;
    width: 23px;
    height: 23px;
  }
`;
export default function ResetFilter({ onReset }) {
  return (
    <StyledReset>
      <>
        <button onClick={onReset}>
          Reset Filter <img src={reset} alt="" />
        </button>
      </>
    </StyledReset>
  );
}
