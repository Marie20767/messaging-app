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
            className="light-icon x-icon" />
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
  padding: 20px 0;
  height: 200px;
  width: 100%;
  z-index: 1;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .25);

  @media screen and (min-width: 1024px) {
    height: 24%;
    width: 40%;
    border-radius: 15px;
  }
`;

const StyledTitleAndButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: space-around;
  padding: 0px 50px;

  @media screen and (min-width: 1024px) {
    padding: 0;
  }
`;

export default SmallFullScreenOverlay;
