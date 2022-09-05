import React, { useEffect, useState } from 'react';
import './App.css';
import User from './User';

const App = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await fetch('http://localhost:3001/users');
        const userResults = await response.json();

        setUsers(userResults);
      } catch (e) {
        console.log(e);
        setError('Something went wrong with your request');
      }
    };

    getUserData();
  }, []);

  return (
    <div>
      {!error
        ? (
          <div>
            <h1>Users</h1>
            {users.map((user) => {
              return (
                <User
                  key={user.id}
                  name={user.name}
                  email={user.email} />
              );
            })}
          </div>
        )
        : <p>{error}</p>
      }
    </div>
  );
};

export default App;
