import styled from "styled-components";

const StyledPrayerWidget = styled.div`
  position: absolute;
  top: 5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  background-color: #d9d9d9;
  text-align: center;
  border-radius: 20px;
  padding: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  .judul h5 {
    margin-bottom: 10px;
    font-size: 1.2rem;
    color: #333;
  }

  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 10px;
  }

  .contain {
    background: white;
    padding: 8px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  h6 {
    font-size: 0.9rem;
    color: #555;
  }

  h4 {
    font-size: 1.1rem;
    font-weight: bold;
    color: #333;
  }

  @media (min-width: 768px) {
    width: 70%;
  }

  @media (min-width: 1024px) {
      width: 50%;
  }
`;

export default function PrayerWidget() {
  return (
    <StyledPrayerWidget>
      <div className="judul">
        <h5>Jadwal Sholat</h5>
      </div>
      <div className="container">
        {["Subuh", "Syuruq", "Dzuhur", "Ashar", "Maghrib", "Isya"].map(
          (prayer) => (
            <div className="contain" key={prayer}>
              <h6>{prayer}</h6>
              <h4>04.41</h4>
            </div>
          )
        )}
      </div>
    </StyledPrayerWidget>
  );
}
