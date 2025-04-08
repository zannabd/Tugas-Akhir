import styled from "styled-components";
import left from "../../images/left-white.png";
import { useNavigate } from "react-router-dom";

const StyledForm = styled.div`
  background: linear-gradient(to bottom, #19381f, #53a548, #4c934c);
  display: flex;
  flex-direction: column;
  justify-content: "center";
  min-height: 100vh;
  font-family: "Jost", sans-serif;
  padding: 1rem;
  button {
    display: flex;
    justify-content: flex-start;
    background: none;
    border: none;
  }
  button img {
    max-width: 30px;
  }
  h1 {
    color: #ffffff;
    font-weight: bold;
    transition: 0.5s ease-in-out;
    cursor: pointer;
  }
  .main {
    background: #ffffff;
    position: absolute;
    width: 60%;
    height: 50%;
    top: 25%;
    left: 20%;
    border-radius: 20px;
    box-shadow: 0 40px 50px rgba(0, 0, 0, 0.1);
  }
  input {
    width: 70%;
    height: 30px;
    background: #e0dede;
    justify-content: center;
    display: flex;
    margin: 20px auto;
    padding: 12px;
    outline: none;
    border: none;
    border-radius: 5px;
  }
  .login {
    width: 60%;
    height: 40px;
    margin: 10px auto;
    justify-content: center;
    display: block;
    color: #fff;
    background: #4c934c;
    font-size: 1em;
    font-weight: bold;
    margin-top: 30px;
    outline: none;
    border: none;
    border-radius: 5px;
    transition: 0.2s ease-in;
    cursor: pointer;
  }
  .login:hover {
    background: #19381f;
  }
  @media (min-width: 768px) {
    form {
      margin-top: 3rem;
    }
    input {
      height: 45px;
    }
  }
  @media (min-width: 1024px) {
    .main {
      margin-top: 4rem;
    }
  }
`;
export default function FormLogin() {
  const navigate = useNavigate();
  return (
    <StyledForm>
      <>
        <button onClick={() => navigate("/")}>
          <img src={left} alt="" />
        </button>
        <h1 className="text-center mb-3">Login</h1>
        <div className="main">
          <form>
            <input
              type="text"
              name="uname"
              placeholder="Username"
              required=""
            />
            <input
              type="password"
              name="pass"
              placeholder="Password"
              required=""
            />
            <button onClick={() => navigate("/dashboard")} className="login">
              Login
            </button>
          </form>
        </div>
      </>
    </StyledForm>
  );
}
