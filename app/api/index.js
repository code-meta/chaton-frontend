import axios from "axios";
import { getToken, setToken } from "../services/token";
import { BASE_API_URL } from "../constants";

export const open_api = axios.create({
  baseURL: `${BASE_API_URL}/api`,
  timeout: 1000,
});

export const closed_api = axios.create({
  baseURL: `${BASE_API_URL}/api`,
  timeout: 1000,
});

const setAuthToken = async () => {
  try {
    const token = await getToken();
    closed_api.defaults.headers.common.Authorization = `Bearer ${token.access}`;
  } catch (error) {
    console.log(error);
  }
};

setAuthToken();

closed_api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetryRequest
    ) {
      originalRequest._isRetryRequest = true;
      try {
        const token = await getToken();

        const refreshResponse = await axios.post(
          `http://192.168.0.107:8000/api/auth/token/refresh/`,
          {
            refresh: token.refresh,
          }
        );

        const newAccessToken = refreshResponse.data.access;

        await setToken(refreshResponse.data);

        closed_api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return closed_api.request(originalRequest);
      } catch (error) {
        console.log("something went wrong!");
      }
    }

    throw error;
  }
);

export const create_acount = async (data) => {
  return await open_api.post("auth/create-account/", data);
};

export const login_user = async (data) => {
  return await open_api.post("/auth/login/", data);
};

export const upload_profile = async ({ user, profile }) => {
  return await closed_api.put(`/user/upload-profile/${user.id}/`, profile, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const get_user_info = async () => {
  return await closed_api.get(`user/get-user/`);
};

export const find_connection = async (data) => {
  return await closed_api.post(`connection/find-connection/`, data);
};

export const make_connection = async (data) => {
  return await closed_api.post(`connection/make-connection/`, data);
};

export const get_chat_connections = async () => {
  return await closed_api.get(`connection/get-chat-connections/`);
};

export const get_chat_room_messages = async (data) => {
  return await closed_api.post(`connection/get-chat-room-messsages/`, data);
};
