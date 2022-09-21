import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const FullScreenOverlay = ({ children, onClick }) => {
  return (
    <StyledFullScreenOverlayContainer>
      <StyledOverlay />
      <StyledOverlayContent>
        <StyledXIconContainer>
          <FontAwesomeIcon
            icon={faXmark}
            onClick={onClick}
            className="light-icon x-icon"
            fontSize="26px" />
        </StyledXIconContainer>
        <StyledTitleAvatarsAndButtonContainer>
          {children}
        </StyledTitleAvatarsAndButtonContainer>
      </StyledOverlayContent>
    </StyledFullScreenOverlayContainer>
  );
};

const StyledFullScreenOverlayContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const StyledOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const StyledOverlayContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 55%;
  width: 38%;
  padding: 20px 0;
  border-radius: 15px;
  z-index: 1;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .25);
`;

const StyledXIconContainer = styled.div`
  display: flex;
  align-self: flex-end;
  margin: 0px 20px 0 0;
`;

const StyledTitleAvatarsAndButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-around;
  align-items: center;
`;

export default FullScreenOverlay;
