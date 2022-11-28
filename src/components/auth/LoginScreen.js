import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { APIPath } from '../../constants/constants';
import useAuthForm from '../../hooks/useAuthForm';
import Form from './Form';

const LoginScreen = ({ setCurrentUser }) => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);
  const [serverError, setServerError] = useState('');

  const {
    userNameInput,
    passwordInput,
    isNameMissing,
    isPasswordMissing,
    showFormInvalidErrorMessage,
    setIsNameMissing,
    setIsPasswordMissing,
    setShowFormInvalidErrorMessage,
    onChangeUserName,
    onChangePassword,
  } = useAuthForm(true);

  const onClickLogin = async () => {
    if (userNameInput !== '' && passwordInput !== '') {
      setLoginError(false);
      setShowFormInvalidErrorMessage(false);

      try {
        const response = await fetch(`${APIPath}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: userNameInput,
            password: passwordInput,
          }),
        });

        const result = await response.json();

        if (!result.error) {
          const newUserId = result.id;

          // Saving id of current user to local storage so they get shown the home screen when they come back to the site
          localStorage.setItem('current-user-id', newUserId);

          setCurrentUser({
            id: result.id,
            name: result.name,
            avatar_id: result.avatar_id,
          });

          // Go to home screen here instead of using <Link> to make sure the newest current-user-id gets passed
          navigate('/home');
          setLoginError(null);
        } else {
          setLoginError(result.error);
        }
      } catch (e) {
        console.log('>>> onClickLogin error! ', e);
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
          userNameInput={userNameInput}
          passwordInput={passwordInput}
          isNameMissing={isNameMissing}
          isPasswordMissing={isPasswordMissing}
          showFormInvalidErrorMessage={showFormInvalidErrorMessage}
          formError={loginError}
          onChangeUserName={onChangeUserName}
          onChangePassword={onChangePassword}
          onKeyDown={handleEnterKeyPressLogin} />
        {serverError
          ? <p className="error-message">{serverError}</p>
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
