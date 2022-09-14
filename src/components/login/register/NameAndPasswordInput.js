import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';

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
      <StyledInputContainer $isNameMissing={isNameMissing}>
        <StyledInputContent>
          <FontAwesomeIcon icon={faUser} className="icon" />
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
          <FontAwesomeIcon icon={faKey} className="icon" />
          <input
            type="text"
            name="user_password"
            placeholder="Password"
            onChange={onChangePassword}
            value={passwordInput} />
        </StyledInputContent>
        {isPasswordTooShort
          ? <p className="error-message">Password needs min. 8 characters</p>
          : null
        }
      </StyledInputContainer>
    </>
  );
};

const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;

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
