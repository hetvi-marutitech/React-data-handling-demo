const API_URL = "https://jsonplaceholder.typicode.com";

export async function getUsersWithFetch() {
  const response = await fetch(`${API_URL}/users`);

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  const data = await response.json();

  return data;
}

export async function getUserByIdWithFetch(id) {
  const response = await fetch(`${API_URL}/users/${id}`);

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  return await response.json();
}

export async function createUserWithFetch(user) {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  });

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  const data = await response.json();

  return data;
}

export async function deleteUserWithFetch(id) {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  return true;
}