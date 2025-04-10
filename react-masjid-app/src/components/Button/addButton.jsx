import add from "../../images/icons8-add-50.png";
import styled from "styled-components";

const StyledAdd = styled.div`
  .add-container .add {
    background-color: #4c934c;
    color: #fff;
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
  .add-container .add img {
    margin-left: 5px;
  }
`;
export default function AddButton() {
  return (
    <StyledAdd>
      <>
        <div className="add-container">
          <button className="add">
            Tambah Kegiatan <img src={add} alt="" />
          </button>
        </div>
      </>
    </StyledAdd>
  );
}
