import { View, ScrollView, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../styles/index.js";
import { StatusBar } from "react-native";
import {
  ButtonPrimary,
  ButtonSecondary,
  Divder,
  PasswordTextInputWithLabel,
  TextInputWithLabel,
  Display,
  ErrorMessage,
} from "../components/index.js";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { setValue } from "../features/loginUserInfoSlice.js";
import { loginSchema } from "../services/validators.js";
import LoadingSpinnerOverlay from "react-native-loading-spinner-overlay";
import colors from "../styles/colors.js";
import { login_user } from "../api/index.js";
import { setToken } from "../services/token.js";

const Login = () => {
  const dispatch = useDispatch();

  const [isDisabled, setIsDisabled] = useState(true);
  const [errors, setErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const email = useSelector((state) => state.loginUserInfo.email);
  const password = useSelector((state) => state.loginUserInfo.password);

  const navigate = useNavigation();

  useEffect(() => {
    if (email.trim() && password.trim()) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password]);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const cleanData = loginSchema.parse({
        email,
        password,
      });

      setErrors(false);

      try {
        const res = await login_user({ email, password });

        setToken(res.data.token);

        navigate.reset({
          index: 0,
          routes: [{ name: "Dashboard" }],
        });
      } catch (error) {
        msg = error.response.data.message;
        setErrors({
          non_field_error: msg,
        });
        setIsLoading(false);
      }
    } catch (err) {
      const formatted = err.format();
      const emailErr = formatted.email?._errors[0];
      const passwordErr = formatted.password?._errors[0];

      setErrors({
        email: emailErr,
        password: passwordErr,
      });
    }

    setIsLoading(false);
  };

  return (
    <SafeAreaView style={[styles.appBg]}>
      <StatusBar backgroundColor={"#0E1825"} />

      <LoadingSpinnerOverlay
        visible={isLoading}
        color={colors.white}
        size={30}
      />

      <ScrollView>
        <View style={styles.displayHeight}>
          <Display text1={"Welcome"} text2={"back"} />

          <View style={[styles.formTopOffset]}>
            <View style={{ gap: 16 }}>
              <TextInputWithLabel
                label={"Email"}
                value={email}
                setValue={setValue}
                type={"email"}
              />

              {errors?.email && <ErrorMessage message={errors.email} />}

              <PasswordTextInputWithLabel
                label={"Password"}
                placeholder={"**********"}
                value={password}
                setValue={setValue}
                forgot={true}
                type={"password"}
              />

              {errors?.password && <ErrorMessage message={errors.password} />}

              {errors?.non_field_error && (
                <ErrorMessage message={errors.non_field_error} />
              )}
            </View>

            <View style={{ gap: 10, marginTop: 20 }}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={handleLogin}
                disabled={isDisabled}
                style={isDisabled ? { opacity: 0.5 } : { opacity: 1 }}
              >
                <ButtonPrimary text={"Login"} />
              </TouchableOpacity>
              <Divder />
              <TouchableOpacity
                onPress={() => navigate.navigate("CreateAccount")}
                activeOpacity={0.6}
              >
                <ButtonSecondary text={"Create a new Account"} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
