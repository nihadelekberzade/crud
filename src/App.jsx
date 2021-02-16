import { useEffect, useState } from "react";
import "./css/style.min.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [checker, setChecker] = useState(4);
  useEffect(() => {
    setUsers([
      {
        id: 1,
        name: "Tania",
        username: "floppydiskette",
      },
      {
        id: 2,
        name: "Craig",
        username: "siliconeidolon",
      },
      {
        id: 3,
        name: "Ben",
        username: "benisphere",
      },
    ]);
  }, []);
  const [isEditMode, setIsEditMode] = useState(false);
  const switchEditMode = () => {
    setIsEditMode(!isEditMode);
    setName("");
    setUsername("");
  };
  const [currentUserId, setCurrentUserId] = useState(null);
  const removeUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const addClickHandler = (e) => {
    e.preventDefault();
    if (name !== "" && username !== "") {
      const newUsers = [...users];
      newUsers.push({
        id: checker,
        name: name,
        username: username,
      });
      setChecker(checker + 1);
      setName("");
      setUsername("");
      setUsers(newUsers);
    }
  };
  const updateUserData = (e) => {
    e.preventDefault();
    const newUsers = [...users];
    newUsers.map((u) => {
      if (u.id === currentUserId) {
        u.name = name;
        u.username = username;
      }
    });
    setUsers(newUsers);
    switchEditMode();
  };

  return (
    <div className="layout">
      <div className="input-zone">
        <h1 className="section-title">Add user</h1>
        <form action="/">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={name} onChange={handleNameChange} />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" value={username} onChange={handleUsernameChange} />
          </div>
          {isEditMode ? (
            <>
              <button className="btn btn-blue" onClick={updateUserData}>
                Update user
              </button>
              <button className="btn" onClick={switchEditMode}>
                Cancel
              </button>
            </>
          ) : (
            <button className="btn btn-blue" onClick={addClickHandler}>
              Add new user
            </button>
          )}
        </form>
      </div>
      <div className="view-zone">
        <h1 className="section-title">View users</h1>
        <table className="user-list">
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td>No users in database</td>
              </tr>
            ) : (
              users.map((u) => (
                <tr className="user-list-item user" key={u.id}>
                  <td className="user__name">{u.name}</td>
                  <td className="user__username">{u.username}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setIsEditMode(true);
                        setCurrentUserId(u.id);
                        setName(u.name);
                        setUsername(u.username);
                      }}
                    >
                      Edit
                    </button>
                    <button className="btn btn-danger" onClick={() => removeUser(u.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
