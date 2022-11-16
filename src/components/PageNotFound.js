import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PageNotFoundRabbit from '../images/page-not-found-rabbit.png';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <StyledPageNotFoundContainer className="full-screen-error-container">
      <h2>Uh oh! Page not found...</h2>
      <img src={PageNotFoundRabbit} alt="Sad rabbit" />
      <button type="button" onClick={() => navigate('/')} className="full-screen-error-button">Back home</button>
    </StyledPageNotFoundContainer>
  );
};

const StyledPageNotFoundContainer = styled.div`
  img {
    height: 60px;
    margin: 10px 0 30px 0;
  }

  @media screen and (min-width: 768px) {
    img {
      height: 80px;
    }
  }

  @media screen and (min-width: 1024px) {
    img {
      height: 100px;
    }
  }
`;

export default PageNotFound;
