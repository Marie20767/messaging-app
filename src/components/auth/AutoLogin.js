import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading } from 'react-loading-dot';

const AutoLogin = ({ children, setCurrentUser }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const currentUserId = parseInt(localStorage.getItem('current-user-id'));

      if (!currentUserId) {
        navigate('/login');
      } else {
        try {
          const response = await fetch(`http://localhost:3001/users/${currentUserId}`);

          const userResult = await response.json();

          setCurrentUser({
            id: userResult.id,
            name: userResult.name,
            avatarId: userResult.avatar_id,
          });

          setLoading(false);
        } catch (e) {
          console.log(e);
          navigate('/login');
        }
      }
    };

    getUser();
  }, []);

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
