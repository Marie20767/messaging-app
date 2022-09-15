import styled from 'styled-components';

const SettingsOverlay = () => {
  return (
    <StyledSettingsOverlay>
      <footer>Change avatar</footer>
      <footer>Change name</footer>
      <footer>Log out</footer>
    </StyledSettingsOverlay>
  );
};

const StyledSettingsOverlay = styled.div`
  position: absolute;
  z-index: 1;
  height: 100px;
  width: 250px;
  border: 1px solid black;
  background-color: white;
`;

export default SettingsOverlay;
