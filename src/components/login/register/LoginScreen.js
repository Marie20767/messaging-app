import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import NameAndPasswordInput from './NameAndPasswordInput';

// TODO:
// Add logic so you can check if a username with that password exists
// Refactor the styling of the container (a lot of duplicate code with Registration Screen)

const LoginScreen = ({
  serverError,
  userNameInput,
  passwordInput,
  isNameMissing,
  isPasswordMissing,
  setIsNameMissing,
  setIsPasswordMissing,
  showErrorMessage,
  setShowErrorMessage,
  setCurrentUser,
  onChangeUserName,
  onChangePassword,
  handleServerErrorMessage,
}) => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);

  const onClickLogin = async () => {
    if (userNameInput !== '' && passwordInput !== '') {
      setLoginError(false);
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

        console.log('>>> result: ', result);

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

        setShowErrorMessage(false);
      } catch (e) {
        console.log(e);
        handleServerErrorMessage(e);
      }
    } else {
      setShowErrorMessage(true);
      if (userNameInput === '') {
        setIsNameMissing(true);
      }
      if (passwordInput === '') {
        setIsPasswordMissing(true);
      }
    }
  };

  if (serverError) {
    return <p>{serverError}</p>;
  }

  return (
    <div className="card-container">
      <StyledLoginScreenContainer>
        <NameAndPasswordInput
          title="Log in to your account"
          userNameInput={userNameInput}
          passwordInput={passwordInput}
          isNameMissing={isNameMissing}
          isPasswordMissing={isPasswordMissing}
          showErrorMessage={showErrorMessage}
          loginError={loginError}
          onChangeUserName={onChangeUserName}
          onChangePassword={onChangePassword} />
        <button type="button" onClick={onClickLogin}>Log in</button>
        <p>No account? <Link to="/register">Register</Link></p>
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

  input {
    width: 100%;
    padding: 0px 8px 3px 0;
    border: 0;
    outline: 0;
    border-bottom: 1px solid #8a8a8b;
    color: #8a8a8b;
  }

  .icon {
    color: #8a8a8b;
    height: 13px;
    margin-bottom: 2px;
    margin-right: 6px;
  }

  a {
  color: #ea738dff;
  font-weight: bold;
  }
`;

export default LoginScreen;
