import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading } from 'react-loading-dot';
import useRedirectUser from '../../hooks/useRedirectUser';

const AutoLogin = ({ children, setCurrentUser }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useRedirectUser({
    onUserNotLoggedIn: () => {
      navigate('/login');
    },
    onUserLoggedIn: () => {
      setLoading(false);
    },
    setCurrentUser,
  });

  if (loading) {
    return (
      <div className="card-container">
        <Loading background="#ea738dff" margin="8px" size="18px" duration="0.6s" />
      </div>
    );
  }

  return children;
};

export default AutoLogin;
