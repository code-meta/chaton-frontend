import { View, Text } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../styles/colors";

const InfoMessage = ({ message }) => {
  return (
    <Text
      style={{
        color: colors.gray,
        textAlign: "center",
        fontSize: 14,
        marginTop: 16,
        fontWeight: "500",
      }}
    >
      {message}
    </Text>
  );
};

export default InfoMessage;
