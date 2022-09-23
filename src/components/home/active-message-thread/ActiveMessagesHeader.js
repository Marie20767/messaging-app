/* eslint-disable react/jsx-no-useless-fragment */
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const MessagesHeader = ({ users, demoUserAvatar }) => {
  return (
    <>
      {users.length > 0
        ? (
          <StyledMessagesThreadHeader>
            <StyledMessagesThreadNameAndAvatar>
              <img src={demoUserAvatar?.animal} alt="Avatar" />
              <h3>{users[0].name}</h3>
            </StyledMessagesThreadNameAndAvatar>
            <StyledMessagesThreadIcons>
              <FontAwesomeIcon icon={faMagnifyingGlass} fontSize="18px" className="clickable" />
              <FontAwesomeIcon icon={faTrashCan} fontSize="18px" className="clickable" />
            </StyledMessagesThreadIcons>
          </StyledMessagesThreadHeader>
        )
        : null
      }
    </>
  );
};

const StyledMessagesThreadHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledMessagesThreadNameAndAvatar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  h3 {
    color: black;
    font-weight: bold;
    font-size: 17px;
  }

  img {
    height: 40px;
    margin-right: 10px;
  }
`;

const StyledMessagesThreadIcons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70px;
`;

export default MessagesHeader;
