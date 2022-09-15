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
  height: 40%;
  width: 40%;
  background-color: white;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 30px 0;
  
  .login-button {
    margin-right: 15px;
  }
`;

const StyledButtonContainer = styled.div`
  display: flex;

  a {
    color: white;
    text-decoration: none;
  }
`;

export default WelcomeScreen;
