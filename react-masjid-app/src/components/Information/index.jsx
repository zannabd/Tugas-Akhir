import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import kegiatan from "../../images/kegiatan.png";
import keuangan from "../../images/laporan-keuangan.jpg";
import gallery from "../../images/dokumentasi.png";
import styled from "styled-components";

const StyledInformation = styled.div`
  background-color: #f8f5e4;
  margin: 0;
  .card-information {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 5rem 0rem;
    gap: 1rem;
    padding-bottom: 2rem;
  }
  .card-img {
    width: 100%;
    height: 250px;
    object-fit: cover;
  }

  @media (min-width: 768px) {
    .card-information {
      gap: 70px;
    }
  }
  @media (min-width: 1024px) {
    .card-information {
      gap: 100px;
    }
  }
`;
export default function Information() {
  return (
    <StyledInformation>
      <>
        <h1 className="text-center" id="information">
          Informasi
        </h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ borderTop: "2px solid black", width: "50%" }}></div>
        </div>
        <div className="card-information">
          <Card style={{ width: "18rem" }} className="card-container">
            <Card.Img variant="top" src={kegiatan} className="card-img" />
            <Card.Body>
              <Card.Title>Kegiatan</Card.Title>
              <Card.Text>
                Seluruh informasi kegiatan masjid terdapat disini
              </Card.Text>
              <Button variant="warning">Go somewhere</Button>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem" }} className="card-container">
            <Card.Img variant="top" src={keuangan} className="card-img" />
            <Card.Body>
              <Card.Title>Keuangan</Card.Title>
              <Card.Text>
                Informasi mengenai laporan keuangan ada disini
              </Card.Text>
              <Button variant="warning">Go somewhere</Button>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem" }} className="card-container">
            <Card.Img variant="top" src={gallery} className="card-img" />
            <Card.Body>
              <Card.Title>Dokumentasi</Card.Title>
              <Card.Text>
                Dokumentasi foto kegiatan yang dilakukan ada disini.
              </Card.Text>
              <Button variant="warning">Go somewhere</Button>
            </Card.Body>
          </Card>
        </div>
      </>
    </StyledInformation>
  );
}
