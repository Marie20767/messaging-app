import { useEffect } from 'react';
import { APIDomain } from '../constants/constants';

const useRedirectUser = ({ onUserNotLoggedIn, onUserLoggedIn, setCurrentUser }) => {
  useEffect(() => {
    const getUser = async () => {
      const currentUserId = localStorage.getItem('current-user-id');

      if (!currentUserId) {
        onUserNotLoggedIn();
      } else {
        try {
          const response = await fetch(`${APIDomain}/users/${currentUserId}`);

          if (!response.ok) {
            onUserNotLoggedIn();
          } else {
            const userResult = await response.json();

            setCurrentUser({
              id: userResult.id,
              name: userResult.name,
              avatar_id: userResult.avatar_id,
            });

            onUserLoggedIn();
          }
        } catch (e) {
          onUserNotLoggedIn();
        }
      }
    };

    getUser();
  }, []);

  return null;
};

export default useRedirectUser;
