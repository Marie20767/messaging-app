import { useState } from 'react';
import styled from 'styled-components';
import { avatars } from '../../../constants/constants';

// TODO: need some logic if user already exists
// Hide password? Add some password criteria?

// Make input a line and add a placeholder
// Try grey for text colour

const RegistrationScreen = () => {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newAvatarId, setNewAvatarId] = useState(null);

  const [firstAvatar, secondAvatar, thirdAvatar, fourthAvatar, ...lastFourAvatars] = avatars;
  const firstFourAvatars = [firstAvatar, secondAvatar, thirdAvatar, fourthAvatar];

  return (
    <div className="card-container">
      <StyledRegistrationCardContainer>
        <h2>Create your account</h2>
        <h3>Choose your username</h3>
        <input
          type="text"
          onChange={(e) => setNewUsername(e.target.value)}
          value={newUsername} />
        <h3>Choose your password</h3>
        <input
          type="text"
          onChange={(e) => setNewPassword(e.target.value)}
          value={newPassword} />
        <h3>Choose your avatar</h3>
        <StyledAvatarContainer>
          {firstFourAvatars.map((avatar) => {
            const avatarClassName = newAvatarId === avatar.id ? 'selected-avatar' : '';

            return (
              <img
                key={avatar.id}
                className={avatarClassName}
                src={avatar.animal}
                alt="animal-avatar"
                onClick={() => setNewAvatarId(avatar.id)} />
            );
          })}
        </StyledAvatarContainer>
        <StyledAvatarContainer>
          {lastFourAvatars.map((avatar) => {
            const avatarClassName = newAvatarId === avatar.id ? 'selected-avatar' : '';

            return (
              <img
                key={avatar.id}
                className={avatarClassName}
                src={avatar.animal}
                alt="animal-avatar"
                onClick={() => setNewAvatarId(avatar.id)} />
            );
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

  input {
    margin-bottom: 10px;
    margin-top: 10px;
  }

  button {
    margin-top: 20px;
  }

  p {
    margin-top: 10px;
  }
`;

const StyledAvatarContainer = styled.div`
  margin-top: 20px;

  img {
    height: 70px;
    margin-right: 15px;
    cursor: pointer;
  }

  .selected-avatar {
    border: 4.5px dashed #ea738dff;
    border-radius: 55%;
    }
`;

export default RegistrationScreen;
