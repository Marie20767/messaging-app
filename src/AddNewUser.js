const AddNewUser = ({ newUsername, newUserEmail, setNewUsername, setNewUserEmail, onClickSaveNewUser }) => {
  return (
    <form action="submit">
      <div>
        <label htmlFor="name">Name
          <input
            type="text"
            label="Name"
            id="name"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)} />
        </label>
      </div>
      <div>
        <label htmlFor="email">Email
          <input
            type="text"
            label="Email"
            id="email"
            value={newUserEmail}
            onChange={(e) => setNewUserEmail(e.target.value)} />
        </label>
      </div>
      <button type="submit" onClick={() => onClickSaveNewUser(newUsername, newUserEmail)}>Save new user</button>
    </form>
  );
};

export default AddNewUser;
