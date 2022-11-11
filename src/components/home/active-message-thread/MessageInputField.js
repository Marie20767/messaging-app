import styled from 'styled-components';
import SendMessageIcon from '../../../images/send-message-icon.png';

const MessageInputField = ({ newMessageInput, setNewMessageInput, onKeyDown, onClickSendMessage }) => {
  return (
    <div>
      <StyledMessageInputFieldPlaceholder />
      <StyledMessageInputFieldContainer>
        <textarea
          type="text"
          onKeyDown={onKeyDown}
          placeholder="Message..."
          value={newMessageInput}
          onChange={(e) => setNewMessageInput(e.target.value)} />
        <img src={SendMessageIcon} alt="Send Message Icon" onClick={() => onClickSendMessage(newMessageInput)} className="clickable" />
      </StyledMessageInputFieldContainer>
    </div>
  );
};

const StyledMessageInputFieldPlaceholder = styled.div`
  height: 80px;
  background-color: #f8f7f7;
`;

const StyledMessageInputFieldContainer = styled.div`
  padding: 15px 25px 15px 15px;
  display: flex;
  align-items: center;
  position: fixed;
  z-index: 8;
  bottom: 0;
  background-color: #f8f7f7;
  width: 100%;

  textarea {
    display: flex;
    line-height: 14px;
    resize: none;
    align-content: flex-end;
    justify-content: flex-end;
    border: none;
    overflow-y: scroll;
    background-color: #e7e6e6;
    outline: none;
    padding: 10px 8px 0px 10px;
    border-radius: 10px;
    width: 80%;
    color: #919190;
  }

  img {
    height: 18px;
    margin-left: 15px;
  }

  @media screen and (min-width: 768px) {
    margin-top: 70px;

    textarea {
      padding: 15px 15px 0px 15px;
      line-height: 15px;
      width: 55%;
    }

    img {
      height: 22px;
    }
  }

  @media screen and (min-width: 1024px) {
    textarea {
      width: 60%;
    }
  }
`;

export default MessageInputField;
