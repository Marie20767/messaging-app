import styled from 'styled-components';

const MessageInputField = ({ onKeyDown, newMessageInput, setNewMessageInput }) => {
  return (
    <StyledMessageInputFieldContainer>
      <input
        type="text"
        placeholder="Message"
        value={newMessageInput}
        onChange={(e) => setNewMessageInput(e.target.value)}
        onKeyDown={onKeyDown} />
    </StyledMessageInputFieldContainer>
  );
};

const StyledMessageInputFieldContainer = styled.div`
  margin-top: 30px;
  padding: 0px 25px 15px 15px;
  display: flex;

  input {
    display: flex;
    align-content: flex-end;
    justify-content: flex-end;
    border: none;
    background-color: #e7e6e6;
    outline: none;
    min-height: 40px;
    padding: 0px 15px;
    border-radius: 10px;
    width: 70%;
    font-size: 15px;
    color: #919190;
  }
`;

export default MessageInputField;
