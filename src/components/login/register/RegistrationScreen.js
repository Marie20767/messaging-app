import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { avatars } from '../../../constants/constants';
import NameAndPasswordInput from './NameAndPasswordInput';

// TODO:
// Hide password?
// Display the avatar at the top
// Style error
// Encrypt password when sending it to back end

const RegistrationScreen = ({
  error,
  newUserName,
  setNewUserName,
  newPassword,
  setNewPassword,
  isNameMissing,
  setIsNameMissing,
  isPasswordMissing,
  setIsPasswordMissing,
  isPasswordTooShort,
  onChangeUserName,
  onChangePassword,
  handleErrorMessage,
}) => {
  const [newAvatarId, setNewAvatarId] = useState(null);
  const [isAvatarMissing, setIsAvatarMissing] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const navigate = useNavigate();

  const [firstAvatar, secondAvatar, thirdAvatar, fourthAvatar, ...lastFourAvatars] = avatars;
  const firstFourAvatars = [firstAvatar, secondAvatar, thirdAvatar, fourthAvatar];

  const onClickCreateNewUser = async () => {
    if (newUserName !== '' && newPassword !== '' && newAvatarId !== null) {
      try {
        const response = await fetch('http://localhost:3001/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: newUserName,
            password: newPassword,
            avatar_id: newAvatarId,
          }),
        });

        // Saving id of current user to local storage so they get shown the home screen when they come back to the site
        const newUserId = await response.json();

        localStorage.setItem('current-user-id', newUserId);

        // Resetting relevant states
        setNewUserName('');
        setNewPassword('');
        setNewAvatarId(null);
        setShowErrorMessage(false);

        // Go to home screen here instead of using <Link> to make sure the newest current-user-id gets passed
        navigate('/home');
      } catch (e) {
        console.log(e);
        handleErrorMessage(e);
      }
    } else {
      setShowErrorMessage(true);
      if (newUserName === '') {
        setIsNameMissing(true);
      }
      if (newPassword === '') {
        setIsPasswordMissing(true);
      }
      if (newAvatarId === null) {
        setIsAvatarMissing(true);
      }
    }
  };

  const onClickSelectAvatar = (id) => {
    setNewAvatarId(id);
    setIsAvatarMissing(false);
  };

  if (error) {
    return <p>{error}</p>;
  }

  console.log('>>> newAvatarId: ', newAvatarId);

  return (
    <div className="card-container">
      <StyledRegistrationCardContainer>
        <NameAndPasswordInput
          title="Create your account"
          newUserName={newUserName}
          newPassword={newPassword}
          isNameMissing={isNameMissing}
          isPasswordMissing={isPasswordMissing}
          isPasswordTooShort={isPasswordTooShort}
          showErrorMessage={showErrorMessage}
          onChangeUserName={onChangeUserName}
          onChangePassword={onChangePassword} />
        <StyledAvatarTitleContainer $isAvatarMissing={isAvatarMissing}>
          <h3>Choose your avatar</h3>
          <div className="avatar-title-line" />
        </StyledAvatarTitleContainer>
        <StyledAvatarContainer>
          {firstFourAvatars.map((avatar) => {
            const avatarClassName = newAvatarId === avatar.id ? 'selected-avatar' : '';

            return (
              <img
                key={avatar.id}
                className={avatarClassName}
                src={avatar.animal}
                alt="animal-avatar"
                onClick={() => onClickSelectAvatar(avatar.id)} />
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
        <button type="button" onClick={onClickCreateNewUser}>Register</button>
        <p>Have an account? <Link to="/login">Log in</Link></p>
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
  justify-content: space-between;
  padding: 35px 0px;

  h2 {
    margin-bottom: 20px;
  }

  h3 {
    font-size: 17px;
    color: ç;
  }

  input {
    width: 100%;
    padding: 0px 8px 3px 0;
    border: 0;
    outline: 0;
    border-bottom: 1px solid #8a8a8b;
    color: #8a8a8b;
  }

  p {
    margin-top: 10px;
  }

  a {
  color: #ea738dff;
  font-weight: bold;
  }

  .icon {
    color: #8a8a8b;
    height: 13px;
    margin-bottom: 2px;
    margin-right: 6px;
  }

  button {
    margin-top: 10px;
  }

`;

const StyledAvatarTitleContainer = styled.div`
  h3 {
    margin: 2px 0;
    color: #8a8a8b;
    ${(props) => props.$isAvatarMissing ? 'color: #dd3a08' : ''}
  }

  .avatar-title-line {
    height: 1px;
    width: 100%;
    background-color: #8a8a8b;
    ${(props) => props.$isAvatarMissing ? 'background-color: #dd3a08' : ''}
  }
`;

const StyledAvatarContainer = styled.div`

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
