import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="full-screen-error-container">
      <h2>Page Not Found</h2>
      <button type="button" className="home-screen-server-error-button" onClick={() => navigate('/')}>Back home</button>
    </div>
  );
};

export default PageNotFound;
