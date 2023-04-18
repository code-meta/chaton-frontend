import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import colors from "../styles/colors";

const ChatMessage = ({ BASE_API_URL, connection, user, item, index }) => {
  return (
    <View>
      <Pressable
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: user.id === item.user_id ? "flex-end" : "flex-start",
          marginVertical: 10,
          gap: 10,
        }}
        key={item.id}
        activeOpacity={user.id === item.user_id ? 0.6 : 1}
      >
        {user.id !== item.user_id && (
          <Image
            source={{ uri: `${BASE_API_URL}${connection.profile}` }}
            style={{
              width: 24,
              height: 24,
              borderRadius: 50,
              marginBottom: -6,
            }}
          />
        )}
        <Text
          style={{
            color: "white",
            backgroundColor: colors.primaryBlueDark,
            fontSize: 16,
            padding: 10,
            borderRadius: 10,
            borderBottomRightRadius: user.id === item.user_id ? 0 : 10,
            borderBottomLeftRadius: user.id !== item.user_id ? 0 : 10,
          }}
        >
          {item.text_message}
        </Text>
      </Pressable>
    </View>
  );
};

export default ChatMessage;
