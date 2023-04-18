import { View, ScrollView, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../styles/index.js";
import { StatusBar } from "react-native";
import {
  ButtonPrimary,
  Display,
  ButtonTertiary,
  ErrorMessage,
} from "../components";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons.js";
import * as ImagePicker from "expo-image-picker";
import { useSelector } from "react-redux";
import { login_user, upload_profile } from "../api/index.js";
import LoadingSpinnerOverlay from "react-native-loading-spinner-overlay";
import colors from "../styles/colors.js";
import { setToken } from "../services/token.js";
  
const ProfilePhotoUpload = () => {
  const [image, setImage] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const email = useSelector((state) => state.createAccountUserInfo.email);

  const password = useSelector((state) => state.createAccountUserInfo.password);

  const user = useSelector((state) => state.user.user);

  const navigate = useNavigation();

  const handleImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [6, 6],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setIsDisabled(false);
    } else {
      setErrorMessage("No image selected");
    }
  };

  const uploadProfile = async () => {
    if (!image) return;

    setIsLoading(true);

    try {
      const profile = new FormData();

      profile.append("profile", {
        uri: image,
        type: "image/jpeg",
        name: "profile.jpg",
      });

      const res = await upload_profile({ user, profile });

      try {
        const result = await login_user({ email, password });

        setToken(result.data.token);
      } catch (error) {
        navigate.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      }

      navigate.reset({
        index: 0,
        routes: [{ name: "Dashboard" }],
      });
    } catch (error) {
      setErrorMessage(error.response.data.message);
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
          <Display text1={"Hello"} text2={"Mike"} />

          <View style={[styles.formTopOffset]}>
            <View style={{ gap: 16 }}>
              <View>
                {image ? (
                  <TouchableOpacity
                    onPress={handleImage}
                    style={[styles.uploadWrapper]}
                  >
                    <Image
                      source={{ uri: image }}
                      style={[styles.uploadImage]}
                      onPress={handleImage}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={handleImage}>
                    <View style={[styles.uploadWrapper]}>
                      <Icon name="account" style={[styles.uploadIcon]} />
                      <Icon name="camera" style={[styles.uploadCamera]} />
                    </View>
                  </TouchableOpacity>
                )}

                <Text style={[styles.uploadText]}>
                  Add a profile picture now
                </Text>

                {errorMessage && (
                  <View style={{ alignItems: "center", marginVertical: 10 }}>
                    {<ErrorMessage message={errorMessage} />}
                  </View>
                )}
              </View>
            </View>

            <View style={{ gap: 10, marginTop: 250 }}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={uploadProfile}
                disabled={isDisabled}
                style={isDisabled ? { opacity: 0.5 } : { opacity: 1 }}
              >
                <ButtonPrimary text={"Continue"} />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() =>
                  navigate.reset({
                    index: 0,
                    routes: [{ name: "Dashboard" }],
                  })
                }
              >
                <ButtonTertiary text={"Skip for now"} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfilePhotoUpload;
