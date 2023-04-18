import {
  View,
  Text,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../styles/colors";
import { styles } from "../styles";
import { removeToken } from "../services/token";
import { useDispatch, useSelector } from "react-redux";
import { unSetUser } from "../features/userSlice";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { get_chat_connections } from "../api";
import { setConnections } from "../features/connectionsSlice";
import { BASE_API_URL } from "../constants";

const Chats = () => {
  const dispatch = useDispatch();
  const navigate = useNavigation();
  const isFocused = useIsFocused();
  const connections = useSelector((state) => state.connections.connections);
  const [refreshing, setRefreshing] = useState(false);

  const getChats = async () => {
    try {
      const res = await get_chat_connections();
      dispatch(setConnections(res.data.connections));
      return res;
    } catch (error) {
      dispatch(setConnections(null));
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    // console.log(connections);
    // console.log('fukc')
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await getChats();
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const onRefresh = React.useCallback(() => {
    (async () => {
      setRefreshing(true);
      try {
        await getChats();
        setRefreshing(false);
      } catch (error) {
        console.log(error);
        setRefreshing(false);
      }
    })();
  }, []);

  const handleEnterChatBoard = (connection) => {
    navigate.navigate("ChatBoard", { connection });
  };

  const handleLogout = async () => {
    try {
      await removeToken();
      dispatch(unSetUser());
      navigate.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={[styles.appBg, styles.displayHeight]}>
      {!connections && (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: "60%",
          }}
        >
          <Text style={[styles.notFoundMsg]}>It seems you don’t have any</Text>
          <Text style={[styles.notFoundMsg]}>connections yet</Text>
        </View>
      )}

      {connections && (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.primaryBlue, colors.primaryBlueMild]}
              progressBackgroundColor={colors.primaryDark}
            />
          }
          data={connections}
          style={{ marginTop: 18 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.chatsCartWrapper]}
              onPress={() => handleEnterChatBoard(item)}
            >
              {item.profile ? (
                <Image
                  source={{
                    uri: `${BASE_API_URL}${item.profile}`,
                  }}
                  style={[styles.chatsAvatar]}
                />
              ) : (
                <View style={[styles.defaultAvatarWrapper]}>
                  <Text style={[styles.defaultAvatarText]}>
                    {item.username[0]}
                  </Text>
                </View>
              )}
              <Text style={[styles.connection_cart_username]}>
                {item.username}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      )}

      <Button title="logout" onPress={handleLogout} />
    </View>
  );
};

export default Chats;
