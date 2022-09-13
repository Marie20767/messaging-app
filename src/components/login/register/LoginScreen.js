import { Link } from 'react-router-dom';
import styled from 'styled-components';
import NameAndPasswordInput from './NameAndPasswordInput';

// TODO: 
// Add whole logic of registration screen (need username and password to be able to login)
// Add logic so you can check if a username with that password exists
// add error handling
// Refactor the styling of the container (a lot of duplicate code with Registration Screen)

const LoginScreen = ({
  error,
  newUserName,
  newPassword,
  setNewUserName,
  setNewPassword,
  isNameMissing,
  isPasswordMissing,
  setIsNameMissing,
  setIsPasswordMissing,
  onChangeUserName,
  onChangePassword,
  handleErrorMessage,
}) => {
  return (
    <div className="card-container">
      <StyledLoginScreenContainer>
        <NameAndPasswordInput
          title="Log in to your account"
          newUserName={newUserName}
          newPassword={newPassword}
          isNameMissing={isNameMissing}
          isPasswordMissing={isPasswordMissing}
          onChangeUserName={onChangeUserName}
          onChangePassword={onChangePassword} />
        <button type="button">Log in</button>
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
