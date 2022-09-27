import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PageNotFoundRabbit from '../images/page-not-found-rabbit.png';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <StyledPageNotFoundContainer className="full-screen-error-container">
      <h2>Uh oh! Page not found...</h2>
      <img src={PageNotFoundRabbit} alt="Sad rabbit" />
      <button type="button" onClick={() => navigate('/')}>Back home</button>
    </StyledPageNotFoundContainer>
  );
};

const StyledPageNotFoundContainer = styled.div`
  img {
    height: 100px;
    margin: 10px 0 30px 0;
  }
`;

export default PageNotFound;
