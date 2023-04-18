import {
  View,
  Text,
  TouchableOpacity,
  Image,
  RefreshControl,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "../styles";
import { ButtonTertiary, Divder, InfoMessage, TextInput } from "../components";
import { find_connection, get_chat_connections, make_connection } from "../api";
import { BASE_API_URL } from "@env";
import ButtonLink from "../components/ButtonLink";
import LoadingSpinnerOverlay from "react-native-loading-spinner-overlay";
import colors from "../styles/colors.js";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import * as Clipboard from "expo-clipboard";
import { setConnections } from "../features/connectionsSlice";

const AddNew = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [connection_id, setConnectionId] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const current_user = useSelector((state) => state.user.user);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  const isFocused = useIsFocused();

  useEffect(() => {
    setIsLoading(false);
  }, [isFocused]);

  const findConnection = async () => {
    if (connection_id.trim() === "") return false;

    setIsLoading(true);
    try {
      const res = await find_connection({ connection_id });
      setUser(res.data.data);
      setIsLoading(false);
      setMessage(null);
    } catch (error) {
      const msg = error.response.data.message;
      setMessage(msg);
      setUser(null);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
    setUser(null);
    setConnectionId("");
    setMessage(null);
  }, []);

  const handleConnection = async () => {
    try {
      const res = await make_connection({
        to_user: user.id,
      });
      setUser(res.data.data);

      try {
        const response = await get_chat_connections();
        dispatch(setConnections(response.data.connections));
      } catch (error) {
        dispatch(setConnections(null));
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleCopingId = async () => {
    try {
      await Clipboard.setStringAsync(`${current_user.connection_id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView
      style={[styles.appBg]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[colors.primaryBlue, colors.primaryBlueMild]}
          progressBackgroundColor={colors.primaryDark}
        />
      }
    >
      <LoadingSpinnerOverlay
        visible={isLoading}
        color={colors.white}
        size={30}
      />

      <View style={{ marginHorizontal: 24, marginTop: 34, gap: 20 }}>
        <TextInput
          placeholder={"Please enter your friend's id"}
          setValue={setConnectionId}
          value={connection_id}
          local={true}
          onSubmit={findConnection}
        />
        {user && (
          <View style={[styles.connect_cart_wrapper]}>
            <View style={[styles.connect_cart_avatar_wrapper]}>
              {user.profile ? (
                <Image
                  source={{ uri: `${BASE_API_URL}/${user.profile}` }}
                  style={[styles.chatsAvatar]}
                />
              ) : (
                <View style={[styles.defaultAvatarWrapper]}>
                  <Text style={[styles.defaultAvatarText]}>
                    {user.username[0]}
                  </Text>
                </View>
              )}

              <Text style={[styles.connection_cart_username]}>
                {user.username}
              </Text>
            </View>

            <View>
              {user.connected ? (
                <ButtonLink text={"connected"} />
              ) : (
                <TouchableOpacity onPress={handleConnection}>
                  <ButtonLink text={"connect"} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}

        {!user && !message && (
          <>
            <Divder />

            <TouchableOpacity onPress={handleCopingId}>
              <ButtonTertiary
                text={"Copy my connection Id"}
                inlineStyle={{ textTransform: "none" }}
              />
            </TouchableOpacity>
          </>
        )}

        {message && <InfoMessage message={message} />}
      </View>
    </ScrollView>
  );
};

export default AddNew;
