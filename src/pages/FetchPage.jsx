import { useState } from "react";

import {
  getUsersWithFetch,
  getUserByIdWithFetch,
  createUserWithFetch,
  deleteUserWithFetch
} from "../services/fetchUserService";

function FetchPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getUsersWithFetch();

      setUsers(data);
    } catch (error) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };


  const getUserById = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getUserByIdWithFetch(1);

      setSelectedUser(data);
    } catch (error) {
      setError("Failed to fetch user");
    } finally {
      setLoading(false);
    }
  };


  const createUser = async () => {
    try {
      setLoading(true);
      setError("");

      const newUser = {
        name: "John Doe",
        username: "john",
        email: "john@test.com"
      };

      const data = await createUserWithFetch(newUser);

      console.log("Created User:", data);

      alert(`User created with ID: ${data.id}`);
    } catch (error) {
      setError("Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async () => {
    try {
      setLoading(true);
      setError("");

      await deleteUserWithFetch(1);

      alert("User deleted successfully");
    } catch (error) {
      setError("Failed to delete user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Fetch API Practice</h2>

      {/* Loading */}
      {loading && (
        <p>
          Loading...
        </p>
      )}

      {/* Error */}
      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}
 
      <section>
        <button onClick={getUsers}>
          GET Users
        </button>

        <button
          onClick={getUserById}
          style={{ marginLeft: "10px" }}
        >
          GET User By ID
        </button>

        <button
          onClick={createUser}
          style={{ marginLeft: "10px" }}
        >
          POST Create User
        </button>

        <button
          onClick={deleteUser}
          style={{ marginLeft: "10px" }}
        >
          DELETE User
        </button>
      </section>
      {users.length > 0 && (
        <section style={{ marginTop: "30px" }}>
          <h3>Users</h3>

          <table
            border="1"
            cellPadding="10"
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {selectedUser && (
        <section style={{ marginTop: "30px" }}>
          <h3>Selected User</h3>

          <pre>
            {JSON.stringify(selectedUser, null, 2)}
          </pre>
        </section>
      )}
    </div>
  );
}

export default FetchPage;

