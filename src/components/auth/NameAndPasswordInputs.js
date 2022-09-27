import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faEye, faEyeSlash, faUser } from '@fortawesome/free-solid-svg-icons';
import InputField from './InputField';

const NameAndPasswordInputs = ({
  userNameInput,
  passwordInput,
  isNameMissing,
  isPasswordMissing,
  onKeyDown,
  showPassword,
  setShowPassword,
  onChangeUserName,
  onChangePassword,
}) => {
  return (
    <>
      <InputField
        isMissing={isNameMissing}
        icon={faUser}
        type="text"
        name="user_name"
        placeholder="Name e.g. Albus"
        onChange={onChangeUserName}
        onKeyDown={onKeyDown}
        value={userNameInput} />
      <InputField
        isMissing={isPasswordMissing}
        icon={faKey}
        type={showPassword ? 'text' : 'password'}
        name="user_password"
        placeholder="Password"
        onChange={onChangePassword}
        onKeyDown={onKeyDown}
        value={passwordInput}
        RightIcon={(
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            className="dark-icon clickable"
            onClick={() => setShowPassword(!showPassword)} />
        )} />
    </>
  );
};

export default NameAndPasswordInputs;
