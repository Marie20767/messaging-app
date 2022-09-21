import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { avatars } from '../../constants/constants';
import useAuthForm from '../../hooks/useAuthForm';
import AvatarDisplay from '../AvatarDisplay';
import NameAndPasswordInput from './NameAndPasswordInput';

// TODO:
// Encrypt password when sending it to back end

const RegistrationScreen = ({ setCurrentUser }) => {
  const [serverError, setServerError] = useState('');

  const {
    userNameInput,
    passwordInput,
    avatarId,
    isNameMissing,
    isPasswordMissing,
    isAvatarMissing,
    isPasswordTooShort,
    setIsNameMissing,
    showFormInvalidErrorMessage,
    setShowFormInvalidErrorMessage,
    setIsPasswordMissing,
    setIsAvatarMissing,
    onChangeUserName,
    onChangePassword,
    onClickSelectAvatar,
  } = useAuthForm();

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

        setShowFormInvalidErrorMessage(false);

        // Go to home screen here instead of using <Link> to make sure the newest current-user-id gets passed
        navigate('/home');
      } catch (e) {
        console.log(e);
        setServerError('Something went wrong with your request');
      }
    } else {
      setShowFormInvalidErrorMessage(true);

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
        <AvatarDisplay
          isAvatarMissing={isAvatarMissing}
          avatarId={avatarId}
          onClickSelectAvatar={onClickSelectAvatar}
          avatars1={firstFourAvatars}
          avatars2={lastFourAvatars} />
        {serverError
          ? <p className="error-message server-error">{serverError}</p>
          : null
        }
        <button type="button" onClick={onClickCreateNewUser}>Register</button>
        <footer>Have an account? <Link to="/login" className="auth-a-tag">Log in</Link></footer>
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

  footer {
    margin-top: 10px;
    font-size: 14px;
    color: #919190;
  }

  button {
    margin-top: 10px;
  }
`;

export default RegistrationScreen;
