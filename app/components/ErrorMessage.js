import { View, Text } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ErrorMessage = ({ message }) => {
  return (
    <Text style={{ color: "#EB5757", fontSize: 14 }}>
      <Icon name="alert-circle-outline" /> {message}
    </Text>
  );
};

export default ErrorMessage;
