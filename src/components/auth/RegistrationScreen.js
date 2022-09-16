import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { avatars } from '../../constants/constants';
import NameAndPasswordInput from './NameAndPasswordInput';

// TODO:
// Encrypt password when sending it to back end

const RegistrationScreen = ({
  userNameInput,
  passwordInput,
  isNameMissing,
  setIsNameMissing,
  isPasswordMissing,
  setIsPasswordMissing,
  showFormInvalidErrorMessage,
  setshowFormInvalidErrorMessage,
  setCurrentUser,
  isPasswordTooShort,
  onChangeUserName,
  onChangePassword,
}) => {
  const [isAvatarMissing, setIsAvatarMissing] = useState(false);
  const [avatarId, setAvatarId] = useState(null);
  const [serverError, setServerError] = useState('');

  const navigate = useNavigate();

  const [firstAvatar, secondAvatar, thirdAvatar, fourthAvatar, ...lastFourAvatars] = avatars;
  const firstFourAvatars = [firstAvatar, secondAvatar, thirdAvatar, fourthAvatar];

  const onClickCreateNewUser = async () => {
    if (userNameInput !== '' && passwordInput !== '' && avatarId !== null) {
      try {
        const response = await fetch('http://localhost:3001/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: userNameInput,
            password: passwordInput,
            avatar_id: avatarId,
          }),
        });

        // Saving id of current user to local storage so they get shown the home screen when they come back to the site
        const newUserId = await response.json();

        localStorage.setItem('current-user-id', newUserId);

        setCurrentUser({
          id: newUserId,
          name: userNameInput,
          avatarId,
        });

        setshowFormInvalidErrorMessage(false);

        // Go to home screen here instead of using <Link> to make sure the newest current-user-id gets passed
        navigate('/home');
      } catch (e) {
        console.log(e);
        setServerError('Something went wrong with your request');
      }
    } else {
      setshowFormInvalidErrorMessage(true);

      if (userNameInput === '') {
        setIsNameMissing(true);
      }
      if (passwordInput === '') {
        setIsPasswordMissing(true);
      }
      if (avatarId === null) {
        setIsAvatarMissing(true);
      }
    }
  };

  const onClickSelectAvatar = (id) => {
    setAvatarId(id);
    setIsAvatarMissing(false);
  };

  if (userNameInput !== '' && passwordInput !== '' && avatarId !== null) {
    setshowFormInvalidErrorMessage(false);
  }

  return (
    <div className="card-container">
      <StyledRegistrationCardContainer>
        <NameAndPasswordInput
          title="Create your account"
          userNameInput={userNameInput}
          passwordInput={passwordInput}
          isNameMissing={isNameMissing}
          isPasswordMissing={isPasswordMissing}
          isPasswordTooShort={isPasswordTooShort}
          showFormInvalidErrorMessage={showFormInvalidErrorMessage}
          onChangeUserName={onChangeUserName}
          onChangePassword={onChangePassword} />
        <StyledAvatarTitleContainer $isAvatarMissing={isAvatarMissing}>
          <h3>Choose your avatar</h3>
          <div className="avatar-title-line" />
        </StyledAvatarTitleContainer>
        <StyledAvatarContainer>
          {firstFourAvatars.map((avatar) => {
            const avatarClassName = avatarId === avatar.id ? 'selected-avatar' : '';

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
            const avatarClassName = avatarId === avatar.id ? 'selected-avatar' : '';

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
        {serverError
          ? <p className="error-message server-error">{serverError}</p>
          : null
        }
        <button type="button" onClick={onClickCreateNewUser}>Register</button>
        <footer>Have an account? <Link to="/login">Log in</Link></footer>
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

  h3 {
    font-size: 17px;
  }

  input {
    width: 100%;
    padding: 0px 8px 3px 0;
    border: 0;
    outline: 0;
    color: #8a8a8b;
  }


  footer {
    margin-top: 10px;
    font-size: 14px;
    color: #919190;
  }

  a {
  color: #ea738dff;
  font-weight: bold;
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
