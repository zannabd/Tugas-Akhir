import Keuangan from "../../pages/Dashboard/Keuangan";
import styled from "styled-components";

const StyledKeuangan = styled.div`
  margin: 5.3rem 10px;
`;
export default function KeuanganPublic() {
  return (
    <StyledKeuangan>
      <Keuangan isAdmin={false} />
    </StyledKeuangan>
  );
}
