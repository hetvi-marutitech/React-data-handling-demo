import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com";

export async function getUsersWithAxios() {
  const response = await axios.get(`${API_URL}/users`);

    console.log("Data:", response.data);
    console.log("Status:", response.status);
    console.log("Status Text:", response.statusText);
    console.log("Headers:", response.headers);
    console.log("Config:", response.config);
  return response.data;
}

export async function getUserByIdWithAxios(id) {
  const response = await axios.get(`${API_URL}/users/${id}`);

  return response.data;
}

export async function createUserWithAxios(user) {
  const response = await axios.post(
    `${API_URL}/users`,
    user
  );

  return response.data;
}

export async function updateUserWithAxios(id, user) {
  const response = await axios.put(
    `${API_URL}/users/${id}`,
    user
  );

  return response.data;
}

export async function patchUserWithAxios(id, user) {
  const response = await axios.patch(
    `${API_URL}/users/${id}`,
    user
  );

  return response.data;
}

export async function deleteUserWithAxios(id) {
  const response = await axios.delete(
    `${API_URL}/users/${id}`
  );

  return response.data;
}

export async function searchUsersWithAxios(params) {
  const response = await axios.get(
    `${API_URL}/users`,
    {
      params
    }
  );

  return response.data;
}