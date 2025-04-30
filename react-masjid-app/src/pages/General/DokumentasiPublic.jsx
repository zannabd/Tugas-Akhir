import styled from "styled-components";
import Dokumentasi from "../Dashboard/Dokumentasi";

const StyledDokumentasi = styled.div`
  margin: 5.3rem 10px;
`;
export default function DokumentasiPublic() {
  return (
    <StyledDokumentasi>
      <Dokumentasi isAdmin={false} />
    </StyledDokumentasi>
  );
}
