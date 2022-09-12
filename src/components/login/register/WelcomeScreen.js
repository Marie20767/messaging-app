import { Link } from 'react-router-dom';
import styled from 'styled-components';
import messageIcon from '../../../images/message-icon.png';

// TODO: Add line underneath h2 title

const WelcomeScreen = () => {
  return (
    <div className="card-container">
      <StyledWelcomeScreenCard>
        <h2>Welcome to MessageOh!</h2>
        <h3>The instant messaging app that keeps you connected</h3>
        <img src={messageIcon} alt="Waving dog with a cape" />
        <StyledButtonContainer>
          <button type="button" className="login-button">Log in</button>
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
  justify-content: center;

  h2 {
    margin-bottom: 10px;
  }

  h3 {
    margin-bottom: 15px;
  }

  img {
    height: 100px;
    margin-bottom: 20px;
  }

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
