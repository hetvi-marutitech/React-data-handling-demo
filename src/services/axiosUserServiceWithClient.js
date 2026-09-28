import axiosClient from "./axiosClient";

export async function getUsersWithAxios() {
  const response = await axiosClient.get("/users", {
    headers: {
      Accept: "application/json",
      "X-Demo-Header": "Axios-Demo",
    },
  });

  return response.data;
}

export async function getUsersWithAxiosCancellation(signal) {
  const response = await axiosClient.get("/users", {
    signal
  });

  return response.data;
}

export async function getDashboardData() {
  const [usersResponse, postsResponse, commentsResponse] =
    await Promise.all([
      axiosClient.get("/users"),
      axiosClient.get("/posts"),
      axiosClient.get("/comments")
    ]);

  return {
    users: usersResponse.data,
    posts: postsResponse.data,
    comments: commentsResponse.data
  };
}