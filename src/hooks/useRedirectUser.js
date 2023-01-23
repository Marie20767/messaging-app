import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { APIPath } from '../constants/constants';
import { setCurrentUser } from '../redux/user';

const useRedirectUser = ({ onUserNotLoggedIn, onUserLoggedIn }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      const currentUserId = localStorage.getItem('current-user-id');

      if (!currentUserId) {
        onUserNotLoggedIn();
      } else {
        try {
          const response = await fetch(`${APIPath}/users/${currentUserId}`);

          if (!response.ok) {
            onUserNotLoggedIn();
          } else {
            const userResult = await response.json();

            dispatch(setCurrentUser({
              id: userResult.id,
              name: userResult.name,
              avatar_id: userResult.avatar_id,
            }));

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
