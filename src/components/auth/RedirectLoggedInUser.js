import { useNavigate } from 'react-router-dom';
import { Loading } from 'react-loading-dot';
import { useDispatch, useSelector } from 'react-redux';

import useRedirectUser from '../../hooks/useRedirectUser';
import { hideLoadingSpinnerOnRedirectUser } from '../../redux/user';

const RedirectLoggedInUser = ({ children }) => {
  const { isShowingLoadingSpinnerOnRedirectUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useRedirectUser({
    onUserNotLoggedIn: () => {
      dispatch(hideLoadingSpinnerOnRedirectUser());
    },
    onUserLoggedIn: () => {
      navigate('/home');
    },
  });

  if (isShowingLoadingSpinnerOnRedirectUser) {
    return (
      <div className="card-container">
        <Loading background="#ea738dff" margin="8px" size="18px" duration="0.6s" />
      </div>
    );
  }

  return children;
};

export default RedirectLoggedInUser;
