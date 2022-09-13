import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { avatars } from '../../../constants/constants';

// TODO:
// Make it so you can only register if all fields are filled in
// Hide password? Add password criteria logic
// Display the avatar at the top
// Style error

const RegistrationScreen = ({ error, handleErrorMessage }) => {
  const [newUserName, setNewUserName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newAvatarId, setNewAvatarId] = useState(null);
  const navigate = useNavigate();

  const [firstAvatar, secondAvatar, thirdAvatar, fourthAvatar, ...lastFourAvatars] = avatars;
  const firstFourAvatars = [firstAvatar, secondAvatar, thirdAvatar, fourthAvatar];

  const onClickCreateNewUser = async () => {
    try {
      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newUserName,
          password: newPassword,
          avatar_id: newAvatarId,
        }),
      });

      const newUserId = await response.json();

      localStorage.setItem('current-user-id', newUserId);

      // Go to home screen here instead of using <Link> to make sure the newest current-user-id gets passed
      navigate('/home');

      // go to home screen
    } catch (e) {
      console.log(e);
      handleErrorMessage(e);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="card-container">
      <StyledRegistrationCardContainer>
        <h2>Create your account</h2>
        <h3>Add your name</h3>
        <input
          type="text"
          placeholder="e.g. Fred"
          onChange={(e) => setNewUserName(e.target.value)}
          value={newUserName} />
        <h3>Choose your password</h3>
        <input
          type="text"
          placeholder="at least 8 characters"
          onChange={(e) => setNewPassword(e.target.value)}
          value={newPassword} />
        <h3>Choose your avatar</h3>
        <StyledAvatarContainer>
          {firstFourAvatars.map((avatar) => {
            const avatarClassName = newAvatarId === avatar.id ? 'selected-avatar' : '';

            return (
              <img
                key={avatar.id}
                className={avatarClassName}
                src={avatar.animal}
                alt="animal-avatar"
                onClick={() => setNewAvatarId(avatar.id)} />
            );
          })}
        </StyledAvatarContainer>
        <StyledAvatarContainer>
          {lastFourAvatars.map((avatar) => {
            const avatarClassName = newAvatarId === avatar.id ? 'selected-avatar' : '';

            return (
              <img
                key={avatar.id}
                className={avatarClassName}
                src={avatar.animal}
                alt="animal-avatar"
                onClick={() => setNewAvatarId(avatar.id)} />
            );
          })}
        </StyledAvatarContainer>
        <button type="button" onClick={onClickCreateNewUser}>Register</button>
        <p>Have an account? <a href="null">Log in</a></p>
      </StyledRegistrationCardContainer>
    </div>
  );
};

const StyledRegistrationCardContainer = styled.div`
  height: 80%;
  width: 40%;
  background-color: white;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 40px 0px;

  h2 {
    margin-bottom: 20px;
  }

  input {
    width: 180px;
    padding: 0px 8px 3px 0;
    border: 0;
    outline: 0;
    border-bottom: 1px solid #8a8a8b;
  }

  p {
    margin-top: 10px;
  }

  a {
  color: #ea738dff;
  font-weight: bold;
  }
`;

const StyledAvatarContainer = styled.div`
  margin-top: 10px;
  
  img {
    height: 70px;
    margin-right: 15px;
    cursor: pointer;
  }

  .selected-avatar {
    border: 4.5px dashed #ea738dff;
    border-radius: 55%;
    }
`;

export default RegistrationScreen;
