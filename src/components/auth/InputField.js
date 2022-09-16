import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const InputField = ({ isMissing, icon, type, name, placeholder, onChange, value, RightIcon }) => {
  return (
    <StyledInputContainer $isMissing={isMissing}>
      <StyledInputContent>
        <FontAwesomeIcon icon={icon} className="dark-icon" />
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value} />
        {RightIcon}
      </StyledInputContent>
    </StyledInputContainer>
  );
};

const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;

  & {
    ${(props) => props.$isMissing ? 'border-bottom: 1px solid #dd3a08' : 'border-bottom: 1px solid #8a8a8b'}
  }

  input::placeholder {
    ${(props) => props.$isMissing ? 'color: #dd3a08' : ''}
  }
`;

const StyledInputContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;

`;

export default InputField;
