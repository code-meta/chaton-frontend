import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import React, { useEffect, useState } from "react";
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
import { setValue } from "../features/createAccountUserInfoSlice.js";
import { userSchema } from "../services/validators.js";
import { create_acount } from "../api/index.js";
import { setUser } from "../features/userSlice.js";
import LoadingSpinnerOverlay from "react-native-loading-spinner-overlay";
import colors from "../styles/colors.js";

const CreateAccount = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(false);

  const username = useSelector((state) => state.createAccountUserInfo.username);

  const email = useSelector((state) => state.createAccountUserInfo.email);

  const password = useSelector((state) => state.createAccountUserInfo.password);

  const navigate = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (username.trim() && email.trim() && password.trim()) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [username, email, password]);

  const handleCreateAccount = async () => {
    setIsLoading(true);

    try {
      const cleanData = userSchema.parse({
        username: username,
        email: email,
        password: password,
      });

      setErrors(false);

      try {
        const res = await create_acount(cleanData);

        const user = res.data.user;

        dispatch(setUser(user));

        navigate.reset({
          index: 0,
          routes: [{ name: "ProfilePhotoUpload" }],
        });
      } catch (error) {
        const usernameErr = error.response.data?.username;
        const emailErr = error.response.data?.email;
        const passwordErr = error.response.data?.password;

        setErrors({
          username: usernameErr && usernameErr[0],
          email: emailErr && emailErr[0],
          password: passwordErr && passwordErr[0],
        });
        setIsLoading(false);
      }
    } catch (err) {
      const formatted = err.format();
      const usernameErr = formatted.username?._errors[0];
      const emailErr = formatted.email?._errors[0];
      const passwordErr = formatted.password?._errors[0];
      setErrors({
        username: usernameErr,
        email: emailErr,
        password: passwordErr,
      });
      setIsLoading(false);
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
          <Display text1={"Create"} text2={"account"} />

          <View style={[styles.formTopOffset]}>
            <View style={{ gap: 16 }}>
              <TextInputWithLabel
                label={"Your Username"}
                value={username}
                setValue={setValue}
                type={"username"}
              />

              {errors?.username && <ErrorMessage message={errors.username} />}

              <TextInputWithLabel
                label={"Your Email"}
                value={email}
                setValue={setValue}
                type={"email"}
              />

              {errors?.email && <ErrorMessage message={errors.email} />}

              <PasswordTextInputWithLabel
                label={"Password"}
                placeholder={"6+ characters"}
                value={password}
                setValue={setValue}
                forgot={false}
                type={"password"}
              />

              {errors?.password && <ErrorMessage message={errors.password} />}
            </View>

            <View style={{ gap: 10, marginTop: 20 }}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={handleCreateAccount}
                disabled={isDisabled}
                style={isDisabled ? { opacity: 0.5 } : { opacity: 1 }}
              >
                <ButtonPrimary text={"Create my account"} />
              </TouchableOpacity>

              <Divder />
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigate.navigate("Login")}
              >
                <ButtonSecondary text={"Login"} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateAccount;
