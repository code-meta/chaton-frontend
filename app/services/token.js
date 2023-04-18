import AsyncStorage from "@react-native-async-storage/async-storage";

export const setToken = async (token) => {
  try {
    await AsyncStorage.setItem("token", JSON.stringify(token));
  } catch (e) {
    console.log("something went wrong!");
  }
};

export const getToken = async (token) => {
  try {
    token = await AsyncStorage.getItem("token");
    if (token) return JSON.parse(token);
  } catch (e) {
    console.log("something went wrong!");
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("token");
  } catch (e) {
    console.log("something went wrong!");
  }
};
