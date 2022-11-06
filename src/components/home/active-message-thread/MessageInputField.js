import styled from 'styled-components';
import SendMessageIcon from '../../../images/send-message-icon.png';

const MessageInputField = ({ newMessageInput, setNewMessageInput, onClickSendMessage }) => {
  return (
    <StyledMessageInputFieldContainer>
      <textarea
        type="text"
        placeholder="Message..."
        value={newMessageInput}
        onChange={(e) => setNewMessageInput(e.target.value)} />
      <img src={SendMessageIcon} alt="Send Message Icon" onClick={() => onClickSendMessage(newMessageInput)} className="clickable" />
    </StyledMessageInputFieldContainer>
  );
};

const StyledMessageInputFieldContainer = styled.div`
  margin-top: 30px;
  padding: 0px 25px 15px 15px;
  display: flex;
  align-items: center;

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

  @media screen and (min-width: 1024px) {
    textarea {
      padding: 15px 15px 0px 15px;
      line-height: 15px;
    }

    img {
      height: 22px;
    }
  }
`;

export default MessageInputField;
