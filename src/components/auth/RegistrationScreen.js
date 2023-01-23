import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { APIPath, avatars } from '../../constants/constants';
import {
  onChangePasswordInputValue,
  onChangeUsernameInputValue,
  onClickSelectAvatar,
  setCurrentUser,
  setIsAvatarMissing,
  setIsPasswordMissing,
  setIsUsernameMissing,
  setRegistrationErrorText,
  setServerErrorTextRegistration,
  setShowFormInvalidErrorMessage,
} from '../../redux/user';

import PickAvatar from '../avatar/PickAvatar';
import Form from './Form';

const RegistrationScreen = () => {
  const {
    serverErrorTextRegistration,
    registrationErrorText,
    usernameInputValue,
    passwordInputValue,
    isAvatarMissing,
    registrationAvatarId,
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [firstAvatar, secondAvatar, thirdAvatar, fourthAvatar, ...lastFourAvatars] = avatars;
  const firstFourAvatars = [firstAvatar, secondAvatar, thirdAvatar, fourthAvatar];

  const onClickCreateNewUser = async () => {
    if (usernameInputValue !== '' && passwordInputValue !== '' && !!registrationAvatarId) {
      try {
        const response = await fetch(`${APIPath}/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: usernameInputValue,
            password: passwordInputValue,
            avatar_id: registrationAvatarId,
          }),
        });

        // Saving id of current user to local storage so they get shown the home screen when they come back to the site
        const result = await response.json();

        if (!result.error) {
          localStorage.setItem('current-user-id', result.id);

          dispatch(setCurrentUser({
            id: result.id,
            name: usernameInputValue,
            avatar_id: registrationAvatarId,
          }));

          dispatch(setShowFormInvalidErrorMessage(false));

          // Go to home screen here instead of using <Link> to make sure the newest current-user-id gets passed
          navigate('/home');
        } else {
          dispatch(setRegistrationErrorText(result.error));
        }
      } catch (e) {
        console.log('>>> onClickCreateNewUser error! ', e);
        dispatch(setServerErrorTextRegistration('Something went wrong with your request'));
      }
    } else {
      dispatch(setShowFormInvalidErrorMessage(true));

      if (usernameInputValue === '') {
        dispatch(setIsUsernameMissing(true));
      }
      if (passwordInputValue === '') {
        dispatch(setIsPasswordMissing(true));
      }
      if (!registrationAvatarId) {
        dispatch(setIsAvatarMissing(true));
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
          formError={registrationErrorText}
          onChangeUsername={(e) => dispatch(onChangeUsernameInputValue({
            inputValue: e.target.value,
            isLoginComponent: false,
          }))}
          onChangePassword={(e) => dispatch(onChangePasswordInputValue({
            inputValue: e.target.value,
            isLoginComponent: false,
          }))}
          onKeyDown={handleEnterPressRegistration} />
        <PickAvatar
          avatarId={registrationAvatarId}
          isAvatarMissing={isAvatarMissing}
          onClickSelectAvatar={(id) => dispatch(onClickSelectAvatar({
            id,
            isLoginComponent: false,
          }))}
          avatars1={firstFourAvatars}
          avatars2={lastFourAvatars}
          tabIndex={0}
          onKeyDown={handleEnterPressRegistration} />
        {serverErrorTextRegistration
          ? <p className="error-message server-error">{serverErrorTextRegistration}</p>
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
    height: 690px;
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
