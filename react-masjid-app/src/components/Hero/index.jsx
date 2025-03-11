import masjid from "../../images/masjid-ilustrasi.png";
import styled from "styled-components";

const StyledHero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  /* Warna hijau di atas hero */
  .top-section {
    width: 100%;
    height: 150px;
    background-color: #53a548;
  }

  .container {
    display: flex;
    flex-direction: column-reverse; /* Default: teks di atas gambar */
    align-items: center;
    justify-content: center;
    background-color: #f8f5e4;
    padding: 2rem;
    margin-top: 5rem;
    gap: 1.5rem;
  }

  .left img {
    width: 90%;
    max-width: 350px; /* Maksimum ukuran gambar */
    height: auto;
  }

  .right {
    max-width: 600px;
    padding: 0 1rem;
  }

  .right p {
    text-align: center;
    font-size: 1rem;
    line-height: 1.5;
  }

  @media (min-width: 768px) {
  .top-section {
      height: 80px; 
    }
    .container {
      flex-direction: row;
      justify-content: space-evenly;
      text-align: left;
    }

    .left,
    .right {
      flex: 1;
    }

    .right p {
      font-size: 1.1rem;
    }
  }

  @media (min-width: 1024px) {
    .top-section {
      height: 80px; 
    }

    .left img {
      max-width: 500px; /* Gambar lebih besar di layar besar */
    }

    .right p {
      font-size: 1.2rem;
    }
  }
`;

export default function Hero() {
  return (
    <StyledHero>
      <div className="top-section"></div> {/* Efek hijau di atas */}
      <div className="container">
        <div className="left">
          <img src={masjid} alt="Ilustrasi Masjid" />
        </div>
        <div className="right">
          <p>
            Dari Abu Hurairah dan Abu Sa’id{" "}
            <strong>radhiyallahu ‘anhuma</strong>, mereka berdua berkata,
            “Rasulullah <strong>shallallahu ‘alaihi wa sallam</strong> bersabda,
            ‘Tidaklah suatu kaum duduk berdzikir (mengingat) Allah, melainkan
            mereka dikelilingi oleh para malaikat, diliputi oleh rahmat,
            diturunkan sakinah (ketenangan), dan mereka disebut oleh Allah di
            hadapan malaikat yang ada di sisi-Nya.’” (HR. Muslim, no. 2700)
          </p>
        </div>
      </div>
    </StyledHero>
  );
}
