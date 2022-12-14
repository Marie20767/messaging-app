import { Link } from 'react-router-dom';
import styled from 'styled-components';
import messageIcon from '../../images/message-icon.png';

const WelcomeScreen = () => {
  return (
    <div className="card-container">
      <StyledWelcomeScreenCard>
        <h2>Welcome to MessageOh!</h2>
        <h3>The instant messaging app that keeps you connected</h3>
        <img src={messageIcon} alt="message icon" className="message-icon" />
        <StyledButtonContainer>
          <button type="button" className="login-button">
            <Link to="/login">Log in</Link>
          </button>
          <button type="button">
            <Link to="/register">Register</Link>
          </button>
        </StyledButtonContainer>
      </StyledWelcomeScreenCard>
    </div>
  );
};

const StyledWelcomeScreenCard = styled.div`
  height: 300px;
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 40px 20px;

  h3, h2 {
    text-align: center;
  }

  @media screen and (min-width: 768px) {
    border-radius: 12px;
    width: 70%;
  }

  @media screen and (min-width: 1024px) {
    height: 350px;
    width: 550px;
    padding: 30px 0;

    h3, h2 {
      text-align: unset;
    }
  }
`;

const StyledButtonContainer = styled.div`
  display: flex;

  a {
    color: white;
    text-decoration: none;
  }

  .login-button {
    margin-right: 15px;
  }
`;

export default WelcomeScreen;
