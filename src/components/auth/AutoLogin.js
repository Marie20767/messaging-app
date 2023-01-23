import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Loading } from 'react-loading-dot';
import useRedirectUser from '../../hooks/useRedirectUser';
import { hideLoadingSpinnerOnAutoLogin, setCurrentUser } from '../../redux/user';

const AutoLogin = ({ children }) => {
  const { isShowingLoadingSpinnerOnAutoLogin } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useRedirectUser({
    onUserNotLoggedIn: () => {
      navigate('/login');
    },
    onUserLoggedIn: () => {
      dispatch(hideLoadingSpinnerOnAutoLogin());
    },
    setCurrentUser,
  });

  if (isShowingLoadingSpinnerOnAutoLogin) {
    return (
      <div className="card-container">
        <Loading background="#ea738dff" margin="8px" size="18px" duration="0.6s" />
      </div>
    );
  }

  return children;
};

export default AutoLogin;
