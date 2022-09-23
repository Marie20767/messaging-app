import { useNavigate } from 'react-router-dom';
import PopUpMenu from '../../overlays-and-popups/PopUpMenu';

const SettingsPopUpMenu = ({ setShowAvatarOverlay, setCurrentUser, setShowSettingsPopUpMenu }) => {
  const navigate = useNavigate();

  const onClickLogOut = () => {
    navigate('/login');
    localStorage.removeItem('current-user-id');
    setCurrentUser(null);
  };

  const onClickShowAvatarOverlay = () => {
    setShowAvatarOverlay(true);
    setShowSettingsPopUpMenu(false);
  };

  return (
    <PopUpMenu>
      <footer onClick={onClickShowAvatarOverlay}>Change avatar</footer>
      <footer onClick={onClickLogOut}>Log out</footer>
    </PopUpMenu>
  );
};

export default SettingsPopUpMenu;
