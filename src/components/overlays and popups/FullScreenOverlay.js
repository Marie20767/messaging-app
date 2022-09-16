import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const FullScreenOverlay = ({ children, onClick }) => {
  return (
    <StyledFullScreenOverlayContainer>
      <StyledOverlay />
      <StyledOverlayContent>
        <FontAwesomeIcon
          icon={faXmark}
          onClick={onClick}
          className="light-icon x-mark"
          fontSize="26px" />
        {children}
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
  height: 62%;
  width: 40%;
  border-radius: 15px;
  z-index: 1;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .25);
`;

export default FullScreenOverlay;
