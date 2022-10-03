import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
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
        const response = await fetch('http://localhost:3001/login', {
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
            avatarId: result.avatar_id,
          });

          // Go to home screen here instead of using <Link> to make sure the newest current-user-id gets passed
          navigate('/home');
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
          loginError={loginError}
          onChangeUserName={onChangeUserName}
          onChangePassword={onChangePassword}
          onKeyDown={handleEnterKeyPressLogin} />
        {serverError
          ? <p className="error-message">{serverError}</p>
          : null
        }
        <button type="button" onClick={onClickLogin}>Log in</button>
        <p>No account? <Link to="/register" className="auth-a-tag">Register</Link></p>
      </StyledLoginScreenContainer>
    </div>
  );
};

const StyledLoginScreenContainer = styled.div`
  height: 40%;
  width: 40%;
  background-color: white;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 20px 0;
`;

export default LoginScreen;
