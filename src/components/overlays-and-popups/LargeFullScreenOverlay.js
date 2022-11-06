import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const LargeFullScreenOverlay = ({ children, onClick }) => {
  return (
    <div className="full-screen-overlay-container">
      <div className="overlay" />
      <StyledOverlayContent>
        <div className="x-mark-overlay-container">
          <FontAwesomeIcon
            icon={faXmark}
            onClick={onClick}
            className="light-icon x-icon" />
        </div>
        <StyledTitleAvatarsAndButtonContainer>
          {children}
        </StyledTitleAvatarsAndButtonContainer>
      </StyledOverlayContent>
    </div>
  );
};

const StyledOverlayContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
  width: 100%;
  padding: 20px 0;
  z-index: 1;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .25);

  @media screen and (min-width: 1024px) {
    height: 55%;
    width: 38%;
    border-radius: 15px;
  }
`;

const StyledTitleAvatarsAndButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-around;
  align-items: center;
`;

export default LargeFullScreenOverlay;
