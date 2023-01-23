import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faEye, faEyeSlash, faUser } from '@fortawesome/free-solid-svg-icons';

import InputField from './InputField';
import { toggleShowPassword } from '../../redux/user';

const NameAndPasswordInputs = ({
  onChangeUsername,
  onKeyDown,
  onChangePassword,
}) => {
  const {
    usernameInputValue,
    passwordInputValue,
    isShowingPassword,
    isUsernameMissing,
    isPasswordMissing,
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  return (
    <>
      <InputField
        isMissing={isUsernameMissing}
        icon={faUser}
        type="text"
        name="user_name"
        placeholder="Username e.g. Albus212"
        onChange={onChangeUsername}
        onKeyDown={onKeyDown}
        value={usernameInputValue} />
      <InputField
        isMissing={isPasswordMissing}
        icon={faKey}
        type={isShowingPassword ? 'text' : 'password'}
        name="user_password"
        placeholder="Password"
        onChange={onChangePassword}
        onKeyDown={onKeyDown}
        value={passwordInputValue}
        RightIcon={(
          <FontAwesomeIcon
            icon={isShowingPassword ? faEyeSlash : faEye}
            className="dark-icon clickable"
            onClick={() => dispatch(toggleShowPassword())} />
        )} />
    </>
  );
};

export default NameAndPasswordInputs;
