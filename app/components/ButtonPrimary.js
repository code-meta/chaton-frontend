import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "../styles";

const ButtonPrimary = ({ text }) => {
  return (
    <View style={[styles.buttonPrimaryBg]}>
      <Text style={[styles.buttonPrimaryText]}>{text ? text : "Button"}</Text>
    </View>
  );
};

export default ButtonPrimary;
