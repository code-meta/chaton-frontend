import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import Login from "../screens/Login";
import { getToken } from "../services/token";
import { setToken as setAuthToken } from "../features/tokenSlice";
import { useNavigation } from "@react-navigation/native";
import { setAuth, setUser } from "../features/userSlice";
import { get_user_info } from "../api";

function withAuthentication(Component) {
  return function WrappedComponent(props) {
    const dispatch = useDispatch();
    const navigate = useNavigation();

    useEffect(() => {
      (async () => {
        try {
          const token = await getToken();

          if (!token) {
            navigate.navigate("Login");
          }

          if (token) {
            dispatch(
              setAuthToken({ access: token.access, refresh: token.refresh })
            );

            try {
              const res = await get_user_info();
              dispatch(setUser(res.data.data));
            } catch (error) {
              console.log(error.response.data);
            }

            dispatch(setAuth(true));
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }, []);

    return <Component {...props} />;
  };
}

export default withAuthentication;
