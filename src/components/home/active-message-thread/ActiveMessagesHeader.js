/* eslint-disable react/jsx-no-useless-fragment */
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const MessagesHeader = ({ users, demoUserAvatar }) => {
  return (
    <>
      {users.length > 0
        ? (
          <StyledHeader>
            <StyledNameAndAvatarContainer>
              <img src={demoUserAvatar?.animal} alt="Avatar" />
              <h3>{users[0].name}</h3>
            </StyledNameAndAvatarContainer>
            <StyledIconsContainer>
              <FontAwesomeIcon icon={faMagnifyingGlass} fontSize="18px" className="clickable" />
              <FontAwesomeIcon icon={faTrashCan} fontSize="18px" className="clickable" />
            </StyledIconsContainer>
          </StyledHeader>
        )
        : null
      }
    </>
  );
};

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  padding: 15px 25px 15px 15px;
`;

const StyledNameAndAvatarContainer = styled.div`
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

const StyledIconsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70px;
`;

export default MessagesHeader;
