import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { APIPath } from '../../constants/constants';
import {
  onChangePasswordInputValue,
  onChangeUsernameInputValue,
  setCurrentUser,
  setIsPasswordMissing,
  setIsUsernameMissing,
  setLoginErrorText,
  setServerErrorTextLogin,
  setShowFormInvalidErrorMessage,
} from '../../redux/user';

import Form from './Form';

const LoginScreen = () => {
  const {
    loginErrorText,
    serverErrorTextLogin,
    usernameInputValue,
    passwordInputValue,
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onClickLogin = async () => {
    if (usernameInputValue !== '' && passwordInputValue !== '') {
      dispatch(setLoginErrorText(null));
      dispatch(setShowFormInvalidErrorMessage(false));

      try {
        const response = await fetch(`${APIPath}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: usernameInputValue,
            password: passwordInputValue,
          }),
        });

        const result = await response.json();

        if (!result.error) {
          const newUserId = result.id;

          // Saving id of current user to local storage so they get shown the home screen when they come back to the site
          localStorage.setItem('current-user-id', newUserId);

          dispatch(setCurrentUser({
            id: result.id,
            name: result.name,
            avatar_id: result.avatar_id,
          }));

          // Go to home screen here instead of using <Link> to make sure the newest current-user-id gets passed
          navigate('/home');
          dispatch(setLoginErrorText(null));
        } else {
          dispatch(setLoginErrorText(result.error));
        }
      } catch (e) {
        console.log('>>> onClickLogin error! ', e);
        dispatch(setServerErrorTextLogin('Something went wrong with your request'));
      }
    } else {
      dispatch(setShowFormInvalidErrorMessage(true));

      if (usernameInputValue === '') {
        dispatch(setIsUsernameMissing(true));
      }
      if (passwordInputValue === '') {
        dispatch(setIsPasswordMissing(true));
      }
    }
  };

  const handleEnterKeyPressLogin = (e) => {
    if (e.keyCode === 13) {
      onClickLogin();
    }
  };

  return (
    <div className="card-container">
      <StyledLoginScreenContainer>
        <Form
          title="Log in to your account"
          formError={loginErrorText}
          onChangePassword={(e) => dispatch(onChangePasswordInputValue({
            inputValue: e.target.value,
            isLoginComponent: true,
          }))}
          onChangeUsername={(e) => dispatch(onChangeUsernameInputValue({
            inputValue: e.target.value,
            isLoginComponent: true,
          }))}
          onKeyDown={handleEnterKeyPressLogin} />
        {serverErrorTextLogin
          ? <p className="error-message">{serverErrorTextLogin}</p>
          : null
        }
        <button type="button" onClick={onClickLogin}>Log in</button>
        <footer>No account? <Link to="/register" className="auth-a-tag">Register</Link></footer>
      </StyledLoginScreenContainer>
    </div>
  );
};

const StyledLoginScreenContainer = styled.div`
  height: 300px;
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 40px 0;

  button {
    margin-top: 10px;
  }

  @media screen and (min-width: 768px) {
    width: 70%;
    border-radius: 12px;
  }

  @media screen and (min-width: 1024px) {
    height: 400px;
    width: 600px;
    padding: 20px 0;

    button {
      margin: 0;
    }
  }
`;

export default LoginScreen;
