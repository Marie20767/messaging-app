import styled from 'styled-components';

const PopUpMenu = ({ children }) => {
  return (
    <StyledPopUpMenu>
      {children}
    </StyledPopUpMenu>
  );
};

const StyledPopUpMenu = styled.div`
  position: absolute;
  top: 80px;
  z-index: 1;
  margin-left: 15px;
  height: 70px;
  width: 110px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .25);

  footer {
    margin: 10px 0 0 10px;
    color: #919190;
    cursor: pointer;
    font-size: 12px;
  }

  @media screen and (min-width: 768px) {
    width: 120px;

    footer {
      font-size: 14px;
    }
  }

  @media screen and (min-width: 1024px) {
   top: 60px;

    footer:hover {
      font-weight: 500;
    }
  } 
`;

export default PopUpMenu;
