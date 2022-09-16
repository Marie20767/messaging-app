import { useState } from 'react';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import WelcomeScreen from './components/auth/WelcomeScreen';
import './App.css';
import HomeScreen from './components/home/HomeScreen';
import RegistrationScreen from './components/auth/RegistrationScreen';
import LoginScreen from './components/auth/LoginScreen';
import AutoLogin from './components/auth/AutoLogin';

// Command to set up the database again:
// psql -h localhost -p 5432 -U marieimpens -d react_message_app -f db/init.sql (in the api)

// TODO:
// Align the x mark for the search box so that you don't have to use  margins (align self didn't work)

// TODO:
// Change all names to Harry Potter names

// TODO: together:
// Make it so if I go to login, register or welcome screen, if im already logged in it sends me to the home page
// - Make sure you can't access /home if not logged in
// - Make sure if going to /home and logged in, it keeps you on /home

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userNameInput, setUserNameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isNameMissing, setIsNameMissing] = useState(false);
  const [isPasswordMissing, setIsPasswordMissing] = useState(false);
  const [isPasswordTooShort, setIsPasswordTooShort] = useState(false);
  const [showFormInvalidErrorMessage, setshowFormInvalidErrorMessage] = useState(false);
  const [isAvatarMissing, setIsAvatarMissing] = useState(false);
  const [avatarId, setAvatarId] = useState(null);

  const onChangeUserName = (event) => {
    setUserNameInput(event.target.value);
    setIsNameMissing(false);
  };

  const onChangePassword = (event) => {
    setPasswordInput(event.target.value);
    setIsPasswordMissing(false);

    if (event.target.value.length < 8) {
      setIsPasswordTooShort(true);
    } else {
      setIsPasswordTooShort(false);
    }
  };

  const onClickSelectAvatar = (id) => {
    setAvatarId(id);
    setIsAvatarMissing(false);
  };

  return (
    <StyledAppContainer>
      <Routes>
        <Route
          exact
          path="/"
          element={<WelcomeScreen />} />
        <Route
          exact
          path="/register"
          element={(
            <RegistrationScreen
              userNameInput={userNameInput}
              passwordInput={passwordInput}
              isNameMissing={isNameMissing}
              setIsNameMissing={setIsNameMissing}
              isPasswordMissing={isPasswordMissing}
              setIsPasswordMissing={setIsPasswordMissing}
              avatarId={avatarId}
              isAvatarMissing={isAvatarMissing}
              setIsAvatarMissing={setIsAvatarMissing}
              showFormInvalidErrorMessage={showFormInvalidErrorMessage}
              setshowFormInvalidErrorMessage={setshowFormInvalidErrorMessage}
              setCurrentUser={setCurrentUser}
              isPasswordTooShort={isPasswordTooShort}
              onChangeUserName={onChangeUserName}
              onChangePassword={onChangePassword}
              onClickSelectAvatar={onClickSelectAvatar} />
          )} />
        <Route
          exact
          path="/login"
          element={(
            <LoginScreen
              userNameInput={userNameInput}
              passwordInput={passwordInput}
              isNameMissing={isNameMissing}
              isPasswordMissing={isPasswordMissing}
              setIsNameMissing={setIsNameMissing}
              setIsPasswordMissing={setIsPasswordMissing}
              showFormInvalidErrorMessage={showFormInvalidErrorMessage}
              setshowFormInvalidErrorMessage={setshowFormInvalidErrorMessage}
              setCurrentUser={setCurrentUser}
              onChangeUserName={onChangeUserName}
              onChangePassword={onChangePassword} />
          )} />
        <Route
          exact
          path="/home"
          element={(
            <AutoLogin setCurrentUser={setCurrentUser}>
              <HomeScreen
                currentUser={currentUser}
                avatarId={avatarId}
                onClickSelectAvatar={onClickSelectAvatar} />
            </AutoLogin>
          )} />
      </Routes>
    </StyledAppContainer>
  );
};

const StyledAppContainer = styled.div`
  height: 100%;
  width: 100%;
`;

export default App;
