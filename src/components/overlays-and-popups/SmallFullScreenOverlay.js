import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const SmallFullScreenOverlay = ({ children, onClick }) => {
  return (
    <div className="full-screen-overlay-container">
      <div className="overlay" />
      <StyledOverlayContent>
        <div className="x-mark-overlay-container">
          <FontAwesomeIcon
            icon={faXmark}
            onClick={onClick}
            className="light-icon x-icon"
            fontSize="26px" />
        </div>
        <StyledTitleAndButtonsContainer>
          {children}
        </StyledTitleAndButtonsContainer>
      </StyledOverlayContent>
    </div>
  );
};

const StyledOverlayContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 24%;
  width: 35%;
  padding: 20px 0;
  border-radius: 15px;
  z-index: 1;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .25);
`;

const StyledTitleAndButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-around;
  align-items: center;
`;

export default SmallFullScreenOverlay;
