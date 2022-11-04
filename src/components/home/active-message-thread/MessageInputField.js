import styled from 'styled-components';

const MessageInputField = ({ onKeyDown, newMessageInput, setNewMessageInput }) => {
  return (
    <StyledMessageInputFieldContainer>
      <textarea
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

  textarea {
    display: flex;
    line-height: 15px;
    resize: none;
    align-content: flex-end;
    justify-content: flex-end;
    border: none;
    overflow-y: scroll;
    background-color: #e7e6e6;
    outline: none;
    padding: 15px 15px 0px 15px;
    border-radius: 10px;
    width: 80%;
    font-size: 15px;
    color: #919190;
  }
`;

export default MessageInputField;
