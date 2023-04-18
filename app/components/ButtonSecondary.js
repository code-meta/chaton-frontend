import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "../styles";

const ButtonSecondary = ({ text }) => {
  return (
    <View style={[styles.buttonSecondaryBg]}>
      <Text style={[styles.buttonSecondaryText]}>{text ? text : "Button"}</Text>
    </View>
  );
};

export default ButtonSecondary;
