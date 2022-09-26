import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faEye, faEyeSlash, faUser } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import InputField from './InputField';

const NameAndPasswordInput = ({
  title,
  userNameInput,
  passwordInput,
  isNameMissing,
  isPasswordMissing,
  isPasswordTooShort,
  showFormInvalidErrorMessage,
  loginError,
  onChangeUserName,
  onChangePassword,
  onKeyDown,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <h2>{title}</h2>
      <div className="error-messages-container">
        <StyledErrorMessageContainer>
          {showFormInvalidErrorMessage
            ? <p className="error-message">Please fill in or select all required fields</p>
            : null
          }
        </StyledErrorMessageContainer>
        <StyledErrorMessageContainer>
          {loginError !== null
            ? <p className="error-message">{loginError}</p>
            : null
          }
        </StyledErrorMessageContainer>
        <StyledErrorMessageContainer>
          {isPasswordTooShort
            ? <p className="error-message">Password needs min. 8 characters</p>
            : null
          }
        </StyledErrorMessageContainer>
      </div>
      <InputField
        isMissing={isNameMissing}
        icon={faUser}
        type="text"
        name="user_name"
        placeholder="Name e.g. Albus"
        onChange={onChangeUserName}
        onKeyDown={onKeyDown}
        value={userNameInput} />
      <InputField
        isMissing={isPasswordMissing}
        icon={faKey}
        type={showPassword ? 'text' : 'password'}
        name="user_password"
        placeholder="Password"
        onChange={onChangePassword}
        onKeyDown={onKeyDown}
        value={passwordInput}
        RightIcon={(
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            className="dark-icon clickable"
            onClick={() => setShowPassword(!showPassword)} />
        )} />
    </>
  );
};
const StyledErrorMessageContainer = styled.div`
  padding: 2px 0;
`;

export default NameAndPasswordInput;
