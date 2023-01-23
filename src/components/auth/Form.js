import { useSelector } from 'react-redux';
import styled from 'styled-components';

import NameAndPasswordInputs from './NameAndPasswordInputs';

const Form = ({
  title,
  formError,
  onChangePassword,
  onChangeUsername,
  onKeyDown,
}) => {
  const { isShowingFormInvalidErrorMessage, isPasswordTooShort } = useSelector((state) => state.user);

  return (
    <>
      <h2>{title}</h2>
      <div className="error-messages-container">
        <StyledErrorMessageContainer>
          {isShowingFormInvalidErrorMessage
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
        onChangeUsername={onChangeUsername}
        onKeyDown={onKeyDown}
        onChangePassword={onChangePassword} />
    </>
  );
};
const StyledErrorMessageContainer = styled.div`
  padding: 2px 0;
`;

export default Form;
