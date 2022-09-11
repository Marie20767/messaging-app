import styled from 'styled-components';
import welcomeDog from '../../../images/welcome-dog-icon.png';

const WelcomeScreen = () => {
  return (
    <div className="card-container">
      <StyledWelcomeScreenCard>
        <h2>Welcome to MessageOh!</h2>
        <img src={welcomeDog} alt="Waving dog with a cape" />
        <StyledButtonContainer>
          <button type="button" className="login-button">Log in</button>
          <button type="button">Register</button>
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

  img {
    height: 100px;
    margin-bottom: 30px;
  }

  .login-button {
    margin-right: 15px;
  }
`;

const StyledButtonContainer = styled.div`
  display: flex;
`;

export default WelcomeScreen;
