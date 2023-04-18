import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "../styles";

const ButtonTertiary = ({ text, inlineStyle = {} }) => {
  return (
    <View style={[styles.buttonTertiaryBg]}>
      <Text style={[styles.buttonTertiaryText, inlineStyle]}>
        {text ? text : "Button"}
      </Text>
    </View>
  );
};

export default ButtonTertiary;
