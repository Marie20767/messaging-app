import moment from 'moment';
import styled from 'styled-components';
import { isToday, isYesterday } from '../../../utils/utils';

const MessageDateContainer = ({ date, message }) => {
  if (isToday(moment(message.timestamp))) {
    return (
      <StyledDateContainer>
        <h4 className="small-black-title">Today</h4>
      </StyledDateContainer>
    );
  }

  if (isYesterday(moment(message.timestamp))) {
    return (
      <StyledDateContainer>
        <h4 className="small-black-title">Yesterday</h4>
      </StyledDateContainer>
    );
  }

  return (
    <StyledDateContainer>
      <h4 className="small-black-title">{date}</h4>
    </StyledDateContainer>
  );
};

const StyledDateContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;

  h4 {
    margin-top: 10px;
  }

  @media screen and (min-width: 768px) {
    margin-top: 10px;
  }
`;

export default MessageDateContainer;
