import logo from "../../assets/Al-Ihsan.png";
import styled from "styled-components";
import whatsapp from "../../images/icons8-whatsapp-50.png";
import instagram from "../../images/icons8-instagram-logo-30.png";
import youtube from "../../images/icons8-youtube-50.png";
import phone from "../../images/icons8-phone-50.png";
const StyledAddress = styled.div`
  background-color: #19381f;
  color: #ffffff;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 1rem;
  gap: 1rem;
  .brand img {
    width: 50px;
    margin-right: 10px;
    border-radius: 10px;
  }
  .brand-main {
    display: flex;
    align-items: center;
  }
  iframe {
    width: 100%;
    height: 350px;
    border: none;
  }
  .info-icon {
    display: flex;
  }
  .info-icon p {
    align-items: center;
  }
  .icon-img {
    width: 30px;
    height: 30px;
    margin-right: 5px;
  }
    @media (min-width: 768px) {
    padding: 1.5rem;
    .brand {
      margin-bottom: 3rem;
    }
  @media (min-width: 1024px) {
    padding: 2rem;
    .brand {
      margin-bottom: 5rem;
    }
    .socmed,
    .kontak,
    .tentang {
      margin-top: 9.5rem;
    }
  }
`;
export default function Address() {
  return (
    <StyledAddress>
      <>
        <div className="address">
          <div className="brand">
            <div className="brand-main">
              <img src={logo} alt="logo-masjid" />
              <h1>MASJID AL IHSAN</h1>
            </div>
            <p>Aplikasi Website Manajemen Informasi Masjid Al Ihsan</p>
          </div>
          <div className="real-addres">
            <p>
              Legenda Wisata Jl. Van Gogh, Nagrak, Kec. Gn. Putri, Kabupaten
              Bogor, Jawa Barat 16967
            </p>
            <iframe
              src="https://maps.app.goo.gl/HVPDaegsG5G5qLf29"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
        <div className="socmed">
          <h3>Media Sosial</h3>
          <div className="info-icon">
            <img src={instagram} alt="instagram" className="icon-img" />
            <p>@alihsanvangogh</p>
          </div>
          <div className="info-icon">
            <img src={youtube} alt="youtube" className="icon-img" />
            <p>@alihsan</p>
          </div>
        </div>
        <div className="kontak">
          <h3>Kontak</h3>
          <div className="info-icon">
            <img src={phone} alt="phone" className="icon-img" />
            <p>012345678</p>
          </div>
          <div className="info-icon">
            <img src={whatsapp} alt="whatapp" className="icon-img" />
            <p>089452725373</p>
          </div>
        </div>
        <div className="tentang">
          <h3>Tentang</h3>
          <p>Infaq & Sodaqoh</p>
        </div>
      </>
    </StyledAddress>
  );
}
