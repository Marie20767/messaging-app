import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faEye, faEyeSlash, faUser } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const NameAndPasswordInput = ({
  title,
  userNameInput,
  passwordInput,
  isNameMissing,
  isPasswordMissing,
  isPasswordTooShort,
  showErrorMessage,
  loginError,
  onChangeUserName,
  onChangePassword,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <h2>{title}</h2>
      {showErrorMessage
        ? <p className="error-message">Please fill in or select all required fields</p>
        : null
      }
      {loginError !== null
        ? <p className="error-message">{loginError}</p>
        : null
      }
      {isPasswordTooShort
        ? <p className="error-message">Password needs min. 8 characters</p>
        : null
        }
      <StyledInputContainer $isNameMissing={isNameMissing}>
        <StyledInputContent>
          <FontAwesomeIcon icon={faUser} className="dark-icon" />
          <input
            type="text"
            name="user_name"
            placeholder="Name e.g. Albus"
            onChange={onChangeUserName}
            value={userNameInput} />
        </StyledInputContent>
      </StyledInputContainer>
      <StyledInputContainer $isPasswordMissing={isPasswordMissing}>
        <StyledInputContent>
          <FontAwesomeIcon icon={faKey} className="dark-icon" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="user_password"
            placeholder="Password"
            onChange={onChangePassword}
            value={passwordInput} />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            className="dark-icon clickable"
            onClick={() => setShowPassword(!showPassword)} />
        </StyledInputContent>
      </StyledInputContainer>
    </>
  );
};

const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  border-bottom: 1px solid #8a8a8b;

  input[name="user_name"] {
    ${(props) => props.$isNameMissing ? 'border-bottom: 1px solid #dd3a08' : ''}
  }

  input[name="user_name"]::placeholder {
    ${(props) => props.$isNameMissing ? 'color: #dd3a08' : ''}
  }

  input[name="user_password"] {
    ${(props) => props.$isPasswordMissing ? 'border-bottom: 1px solid #dd3a08' : ''}
  }

  input[name="user_password"]::placeholder {
    ${(props) => props.$isPasswordMissing ? 'color: #dd3a08' : ''}
  }
`;

const StyledInputContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;

`;

export default NameAndPasswordInput;
