import { debounce } from 'lodash';
import { useRef, useState } from 'react';

const useAuthForm = (isLogin = false) => {
  const [userNameInput, setUserNameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [avatarId, setAvatarId] = useState(null);
  const [isNameMissing, setIsNameMissing] = useState(false);
  const [isPasswordMissing, setIsPasswordMissing] = useState(false);
  const [isPasswordTooShort, setIsPasswordTooShort] = useState(false);
  const [isAvatarMissing, setIsAvatarMissing] = useState(false);
  const [showFormInvalidErrorMessage, setShowFormInvalidErrorMessage] = useState(false);

  const resetFormInvalidError = (name, password, updatedAvatarId) => {
    if (name !== '' && password !== '' && (isLogin || updatedAvatarId !== null)) {
      setShowFormInvalidErrorMessage(false);
    }
  };

  const onHandleDebouncedPasswordErrorMessage = (input) => {
    if (input.length < 8 && input !== '') {
      setIsPasswordTooShort(true);
    } else {
      setIsPasswordTooShort(false);
    }
  };

  const onChangeDebouncePasswordErrorMessage = useRef(debounce(onHandleDebouncedPasswordErrorMessage, 750)).current;

  const onChangeUserName = (e) => {
    setUserNameInput(e.target.value);
    setIsNameMissing(false);
    resetFormInvalidError(e.target.value, passwordInput, avatarId);
  };

  const onChangePassword = (e) => {
    setPasswordInput(e.target.value);
    setIsPasswordMissing(false);

    onChangeDebouncePasswordErrorMessage(e.target.value);

    resetFormInvalidError(userNameInput, e.target.value, avatarId);
  };

  const onClickSelectAvatar = (id) => {
    setAvatarId(id);
    setIsAvatarMissing(false);
    resetFormInvalidError(userNameInput, passwordInput, id);
  };

  return {
    userNameInput,
    passwordInput,
    avatarId,
    isNameMissing,
    isPasswordMissing,
    isAvatarMissing,
    isPasswordTooShort,
    showFormInvalidErrorMessage,
    setShowFormInvalidErrorMessage,
    setIsNameMissing,
    setIsPasswordMissing,
    setIsAvatarMissing,
    onChangeUserName,
    onChangePassword,
    onClickSelectAvatar,
  };
};

export default useAuthForm;
