import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { APIDomain, avatars } from '../../constants/constants';
import useAuthForm from '../../hooks/useAuthForm';
import PickAvatar from '../avatar/PickAvatar';
import Form from './Form';

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
        const response = await fetch(`http://${APIDomain}/users`, {
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
          avatar_id: avatarId,
        });

        setShowFormInvalidErrorMessage(false);

        // Go to home screen here instead of using <Link> to make sure the newest current-user-id gets passed
        navigate('/home');
      } catch (e) {
        console.log('>>> onClickCreateNewUser error! ', e);
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

  const handleEnterPressRegistration = (e) => {
    if (e.keyCode === 13) {
      onClickCreateNewUser();
    }
  };

  return (
    <div className="card-container">
      <StyledRegistrationCardContainer>
        <Form
          title="Create your account"
          userNameInput={userNameInput}
          passwordInput={passwordInput}
          isNameMissing={isNameMissing}
          isPasswordMissing={isPasswordMissing}
          isPasswordTooShort={isPasswordTooShort}
          showFormInvalidErrorMessage={showFormInvalidErrorMessage}
          onChangeUserName={onChangeUserName}
          onChangePassword={onChangePassword}
          onKeyDown={handleEnterPressRegistration} />
        <PickAvatar
          isAvatarMissing={isAvatarMissing}
          avatarId={avatarId}
          onClickSelectAvatar={onClickSelectAvatar}
          avatars1={firstFourAvatars}
          avatars2={lastFourAvatars}
          tabIndex={0}
          onKeyDown={handleEnterPressRegistration} />
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
  width: 100%;
  height: 500px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 50px 0px;

  h3 {
    font-size: 15px;
    margin-top: 20px;
  }

  button {
    margin-top: 10px;
  }

  @media screen and (min-width: 768px) {
    width: 60%;
    border-radius: 12px;
  }


  @media screen and (min-width: 1024px) {
    height: 650px;
    width: 550px;

    h3 {
      font-size: 18px;
      margin: 0;  
    }

    button {
      margin-top: 0;
    }
  }

`;

export default RegistrationScreen;
