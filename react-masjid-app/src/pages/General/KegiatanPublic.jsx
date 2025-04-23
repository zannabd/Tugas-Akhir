import styled from "styled-components";
import Kegiatan from "../Dashboard/Kegiatan";

const StyledKegiatan = styled.div`
  margin: 5.3rem 10px;
`;
export default function KegiatanPublic() {
  return (
    <StyledKegiatan>
      <Kegiatan isAdmin={false} />
    </StyledKegiatan>
  );
}
