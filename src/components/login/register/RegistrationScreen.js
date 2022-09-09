import styled from 'styled-components';
import { avatars } from '../../../constants/constants';

const RegistrationScreen = () => {
  const [firstAvatar, secondAvatar, thirdAvatar, fourthAvatar, ...lastFourAvatars] = avatars;
  const firstFourAvatars = [firstAvatar, secondAvatar, thirdAvatar, fourthAvatar];

  return (
    <div className="card-container">
      <StyledRegistrationCardContainer>
        <h2>Create Account</h2>
        <h3>Choose your username</h3>
        <input type="text" />
        <h3>Choose your password</h3>
        <input type="text" />
        <h3>Choose your avatar</h3>
        <StyledAvatarContainer>
          {firstFourAvatars.map((avatar) => {
            return <img key={avatar.id} src={avatar.animal} alt="animal-avatar" />;
          })}
        </StyledAvatarContainer>
        <StyledAvatarContainer>
          {lastFourAvatars.map((avatar) => {
            return <img key={avatar.id} src={avatar.animal} alt="animal-avatar" />;
          })}
        </StyledAvatarContainer>
        <button type="button">Register</button>
        <p>Have an account? <a href="null">Log in</a></p>
      </StyledRegistrationCardContainer>
    </div>
  );
};

const StyledRegistrationCardContainer = styled.div`
height: 80%;
  width: 40%;
  background-color: white;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledAvatarContainer = styled.div`
  margin-top: 20px;

  img {
    height: 70px;
    margin-right: 15px;
    cursor: pointer;
  }
`;

export default RegistrationScreen;
