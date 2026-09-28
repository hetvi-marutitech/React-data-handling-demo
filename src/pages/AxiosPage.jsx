import { useState } from "react";
import { useRef } from "react";

import {
  getUserByIdWithAxios,
  createUserWithAxios,
  updateUserWithAxios,
  patchUserWithAxios,
  deleteUserWithAxios,
  searchUsersWithAxios,
} from "../services/axiosUserService";

import {
  getUsersWithAxios,
  getUsersWithAxiosCancellation,
  getDashboardData,
} from "../services/axiosUserServiceWithClient";
function AxiosPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [searchUsername, setSearchUsername] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const abortControllerRef = useRef(null);

  const getUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getUsersWithAxios();

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

      const data = await getUserByIdWithAxios(9999);

      setSelectedUser(data);
    } catch (error) {
      console.log("Server responded with an error");
      console.log("Status:", error.response.status);
      console.log("Status Text:", error.response.statusText);
      console.log("Data:", error.response.data);
      console.log("Headers:", error.response.headers);

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
        email: "john@test.com",
      };

      const data = await createUserWithAxios(newUser);

      console.log("Created User:", data);

      alert(`User created with ID: ${data.id}`);
    } catch (error) {
      setError("Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async () => {
    try {
      setLoading(true);
      setError("");

      const updatedUser = {
        name: "Updated User",
        username: "updated",
        email: "updated@test.com",
      };

      const data = await updateUserWithAxios(1, updatedUser);

      console.log("Updated User:", data);

      alert("User updated successfully");
    } catch (error) {
      setError("Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  const patchUser = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await patchUserWithAxios(1, {
        name: "Patched User",
      });

      console.log("Patched User:", data);

      alert("User patched successfully");
    } catch (error) {
      setError("Failed to patch user");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async () => {
    try {
      setLoading(true);
      setError("");

      await deleteUserWithAxios(1);

      alert("User deleted successfully");
    } catch (error) {
      setError("Failed to delete user");
    } finally {
      setLoading(false);
    }
  };

  const searchUsers = async () => {
    try {
      setLoading(true);
      setError("");
      setSearchResults([]);

      const data = await searchUsersWithAxios({
        username: searchUsername,
      });

      setSearchResults(data);
    } catch (error) {
      setError("Failed to search users");
    } finally {
      setLoading(false);
    }
  };

  const handleStartCancellableRequest = async () => {
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError("");

    try {
      const data = await getUsersWithAxiosCancellation(
        abortControllerRef.current.signal,
      );

      setUsers(data);
    } catch (error) {
      if (error.code === "ERR_CANCELED") {
        console.log("Request was cancelled");
        setError("Request cancelled");
      } else {
        console.error(error);
        setError("Request failed");
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleCancelRequest = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  const handleGetDashboardData = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getDashboardData();

      console.log("Dashboard Data:", data);

      setUsers(data.users);

      setSelectedUser({
        posts: data.posts,
        comments: data.comments,
      });
    } catch (error) {
      console.error("Dashboard Error:", error);

      setError("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>API calls using Axios</h2>

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      <section>
        <button onClick={getUsers}>GET Users</button>

        <button onClick={getUserById} style={{ marginLeft: "10px" }}>
          GET User By ID
        </button>

        <button onClick={createUser} style={{ marginLeft: "10px" }}>
          POST Create User
        </button>

        <button onClick={updateUser} style={{ marginLeft: "10px" }}>
          PUT Update User
        </button>

        <button onClick={patchUser} style={{ marginLeft: "10px" }}>
          PATCH User
        </button>

        <button onClick={deleteUser} style={{ marginLeft: "10px" }}>
          DELETE User
        </button>
      </section>

      {users.length > 0 && (
        <section style={{ marginTop: "30px" }}>
          <h3>Users</h3>

          <table border="1" cellPadding="10">
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

          <pre>{JSON.stringify(selectedUser, null, 2)}</pre>
        </section>
      )}

      <hr style={{ margin: "30px 0" }} />

      <section>
        <h3>2. Query Parameters</h3>

        <input
          type="text"
          placeholder="Username"
          value={searchUsername}
          onChange={(e) => setSearchUsername(e.target.value)}
        />

        <button onClick={searchUsers} style={{ marginLeft: "10px" }}>
          Search
        </button>
      </section>

      {searchResults.length > 0 && (
        <section style={{ marginTop: "20px" }}>
          <h3>Search Results</h3>

          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
              </tr>
            </thead>

            <tbody>
              {searchResults.map((user) => (
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

      <hr style={{ margin: "30px 0" }} />

      <h3>Request Cancellation</h3>

      <button onClick={handleStartCancellableRequest}>Start Request</button>

      <button onClick={handleCancelRequest} style={{ marginLeft: "10px" }}>
        Cancel Request
      </button>

      <h3>Concurrent Requests</h3>

      <button onClick={handleGetDashboardData}>Load Dashboard Data</button>
    </div>
  );
}

export default AxiosPage;
