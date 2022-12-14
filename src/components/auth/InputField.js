import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const InputField = ({ isMissing, icon, type, name, placeholder, onChange, value, RightIcon, onKeyDown }) => {
  return (
    <StyledInputContainer $isMissing={isMissing}>
      <StyledInputContent>
        <FontAwesomeIcon icon={icon} className="dark-icon" />
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          onKeyDown={onKeyDown} />
        {RightIcon}
      </StyledInputContent>
    </StyledInputContainer>
  );
};

const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;

  input {
    width: 100%;
    padding: 0px 8px 3px 0;
    border: 0;
    outline: 0;
    color: #8a8a8b;
  }

  & {
    ${(props) => props.$isMissing ? 'border-bottom: 1px solid #b52f06f0' : 'border-bottom: 1px solid #8a8a8b'}
  }

  input::placeholder {
    ${(props) => props.$isMissing ? 'color: #b52f06f0' : ''}
  }
`;

const StyledInputContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;

`;

export default InputField;
