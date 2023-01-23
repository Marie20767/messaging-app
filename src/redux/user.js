/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { onChangeDebouncePasswordErrorMessage, shouldHideFormErrorMessage } from '../utils/utils';

const initialState = {
  currentUser: null,
  loginErrorText: null,
  registrationErrorText: null,
  serverErrorTextLogin: '',
  serverErrorTextRegistration: '',
  isShowingLoadingSpinnerOnRedirectUser: true,
  isShowingLoadingSpinnerOnAutoLogin: true,
  isShowingPassword: false,
  usernameInputValue: '',
  passwordInputValue: '',
  isPasswordMissing: false,
  isUsernameMissing: false,
  isAvatarMissing: false,
  registrationAvatarId: null,
  isShowingFormInvalidErrorMessage: false,
  isPasswordTooShort: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },

    setLoginErrorText: (state, action) => {
      state.loginErrorText = action.payload;
    },

    setRegistrationErrorText: (state, action) => {
      state.registrationErrorText = action.payload;
    },

    setServerErrorTextLogin: (state, action) => {
      state.serverErrorTextLogin = action.payload;
    },

    setServerErrorTextRegistration: (state, action) => {
      state.serverErrorTextRegistration = action.payload;
    },

    hideLoadingSpinnerOnRedirectUser: (state) => {
      state.isShowingLoadingSpinnerOnRedirectUser = false;
    },

    hideLoadingSpinnerOnAutoLogin: (state) => {
      state.isShowingLoadingSpinnerOnAutoLogin = false;
    },

    toggleShowPassword: (state) => {
      state.isShowingPassword = !state.isShowingPassword;
    },

    setShowFormInvalidErrorMessage: (state, action) => {
      state.isShowingFormInvalidErrorMessage = action.payload;
    },

    setIsUsernameMissing: (state, action) => {
      state.isUsernameMissing = action.payload;
    },

    setIsPasswordMissing: (state, action) => {
      state.isPasswordMissing = action.payload;
    },

    setIsAvatarMissing: (state, action) => {
      state.isAvatarMissing = action.payload;
    },

    onChangeUsernameInputValue: (state, { payload }) => {
      const shouldHideFormError = shouldHideFormErrorMessage(payload.inputValue, state.passwordInputValue, state.registrationAvatarId, payload.isLoginComponent);

      return {
        ...state,
        loginErrorText: payload.isLoginComponent ? null : state.loginErrorText,
        registrationErrorText: !payload.isLoginComponent ? null : state.registrationErrorText,
        usernameInputValue: payload.inputValue,
        isUsernameMissing: payload.inputValue === '',
        ...(shouldHideFormError ? {
          isShowingFormInvalidErrorMessage: false,
        } : {}),
      };
    },

    onChangePasswordInputValue: (state, { payload }) => {
      const shouldHideFormError = shouldHideFormErrorMessage(state.usernameInputValue, payload.inputValue, state.registrationAvatarId, payload.isLoginComponent);

      return {
        ...state,
        loginErrorText: payload.isLoginComponent ? null : state.loginErrorText,
        passwordInputValue: payload.inputValue,
        isPasswordMissing: payload.inputValue === '',
        isPasswordTooShort: onChangeDebouncePasswordErrorMessage(payload.inputValue),
        ...(shouldHideFormError ? {
          isShowingFormInvalidErrorMessage: false,
        } : {}),
      };
    },

    onClickSelectAvatar: (state, { payload }) => {
      const shouldHideFormError = shouldHideFormErrorMessage(state.usernameInputValue, state.passwordInputValue, payload.id, payload.isLoginComponent);

      return {
        ...state,
        registrationAvatarId: payload.id,
        isAvatarMissing: false,
        ...(shouldHideFormError ? {
          isShowingFormInvalidErrorMessage: false,
        } : {}),
      };
    },
  },
});

export const {
  setCurrentUser,
  setLoginErrorText,
  setRegistrationErrorText,
  setServerErrorTextLogin,
  setServerErrorTextRegistration,
  hideLoadingSpinnerOnRedirectUser,
  hideLoadingSpinnerOnAutoLogin,
  toggleShowPassword,
  setShowFormInvalidErrorMessage,
  setIsUsernameMissing,
  setIsPasswordMissing,
  setIsAvatarMissing,
  onChangeUsernameInputValue,
  onChangePasswordInputValue,
  onClickSelectAvatar,
} = userSlice.actions;
export default userSlice.reducer;
