import styled from 'styled-components';
import { useState } from 'react';
import NameAndPasswordInputs from './NameAndPasswordInputs';

const Form = ({
  title,
  userNameInput,
  passwordInput,
  isNameMissing,
  isPasswordMissing,
  isPasswordTooShort,
  showFormInvalidErrorMessage,
  formError,
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
          {formError
            ? <p className="error-message">{formError}</p>
            : null
          }
        </StyledErrorMessageContainer>
        <StyledErrorMessageContainer>
          {isPasswordTooShort
            ? <p className="error-message">Password needs at least 8 characters</p>
            : null
          }
        </StyledErrorMessageContainer>
      </div>
      <NameAndPasswordInputs
        userNameInput={userNameInput}
        passwordInput={passwordInput}
        isNameMissing={isNameMissing}
        isPasswordMissing={isPasswordMissing}
        onKeyDown={onKeyDown}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        onChangeUserName={onChangeUserName}
        onChangePassword={onChangePassword} />
    </>
  );
};
const StyledErrorMessageContainer = styled.div`
  padding: 2px 0;
`;

export default Form;
