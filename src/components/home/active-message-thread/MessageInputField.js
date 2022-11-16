import styled from 'styled-components';
import SendMessageIcon from '../../../images/send-message-icon.png';

const MessageInputField = ({ newMessageInput, setNewMessageInput, onKeyDown, onClickSendMessage }) => {
  // For mobile, don't hide keyboard after sending a message
  const onTouchEndKeepDisplayingKeyboard = (e) => {
    e.preventDefault();
    onClickSendMessage(newMessageInput);
  };

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
        <StyledSendMessageIconContainer
          onClick={() => onClickSendMessage(newMessageInput)}
          onTouchEnd={onTouchEndKeepDisplayingKeyboard}>
          <img
            src={SendMessageIcon}
            alt="Send Message Icon"
            className="clickable" />
        </StyledSendMessageIconContainer>
      </StyledMessageInputFieldContainer>
    </div>
  );
};

const StyledMessageInputFieldPlaceholder = styled.div`
  height: 80px;
  background-color: #f8f7f7;
`;

const StyledMessageInputFieldContainer = styled.div`
  padding: 5px 25px 15px 15px;
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

  @media screen and (min-width: 768px) {
    margin-top: 70px;

    textarea {
      padding: 15px 15px 0px 15px;
      line-height: 15px;
      width: 55%;
    }
  }

  @media screen and (min-width: 1024px) {
    textarea {
      width: 60%;
    }
  }
`;

const StyledSendMessageIconContainer = styled.div`
  padding: 20px 15px 15px 15px;

  img {
    height: 18px;
  }

  @media screen and (min-width: 768px) {
    img {
      height: 22px;
    }
  }
`;

export default MessageInputField;
