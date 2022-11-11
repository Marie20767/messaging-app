import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import WelcomeScreen from './components/auth/WelcomeScreen';
import './App.css';
import HomeScreen from './components/home/HomeScreen';
import RegistrationScreen from './components/auth/RegistrationScreen';
import LoginScreen from './components/auth/LoginScreen';
import AutoLogin from './components/auth/AutoLogin';
import PageNotFound from './components/PageNotFound';
import RedirectLoggedInUser from './components/auth/RedirectLoggedInUser';
import { sanitiseString } from './utils/utils';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [showSettingsPopUpMenu, setShowSettingsPopUpMenu] = useState(false);

  useEffect(() => {
    const closePopUp = (e) => {
      // SVG classnames give back an object so you need to sanitise the string first before using .includes
      if (e?.composedPath()[0]?.className && !sanitiseString(e.composedPath()[0].className).includes('current-user-avatar')) {
        setShowSettingsPopUpMenu(false);
      }
    };

    document.body.addEventListener('click', closePopUp);

    return () => document.body.removeEventListener('click', closePopUp);
  }, [setShowSettingsPopUpMenu]);

  return (
    <StyledAppContainer>
      <Routes>
        <Route
          exact
          path="/"
          element={(
            <RedirectLoggedInUser setCurrentUser={setCurrentUser}>
              <WelcomeScreen />
            </RedirectLoggedInUser>
          )} />
        <Route
          exact
          path="/register"
          element={(
            <RedirectLoggedInUser setCurrentUser={setCurrentUser}>
              <RegistrationScreen setCurrentUser={setCurrentUser} />
            </RedirectLoggedInUser>
          )} />
        <Route
          exact
          path="/login"
          element={(
            <RedirectLoggedInUser setCurrentUser={setCurrentUser}>
              <LoginScreen setCurrentUser={setCurrentUser} />
            </RedirectLoggedInUser>
          )} />
        <Route
          exact
          path="/home"
          element={(
            <AutoLogin setCurrentUser={setCurrentUser}>
              <HomeScreen
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                showSettingsPopUpMenu={showSettingsPopUpMenu}
                setShowSettingsPopUpMenu={setShowSettingsPopUpMenu} />
            </AutoLogin>
          )} />
        <Route exact path="*" element={<PageNotFound />} />
      </Routes>
    </StyledAppContainer>
  );
};

const StyledAppContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: #f8f7f7;
`;

export default App;
