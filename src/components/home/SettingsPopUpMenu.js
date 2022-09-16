import { useNavigate } from 'react-router-dom';
import PopUpMenu from '../overlays and popups/PopUpMenu';

const SettingsPopUpMenu = ({ setShowAvatarOverlay, setShowSettingsPopUpMenu }) => {
  const navigate = useNavigate();

  const onClickLogOut = () => {
    navigate('/login');
    localStorage.removeItem('current-user-id');
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
