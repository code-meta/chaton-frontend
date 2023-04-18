import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "../styles";

const ButtonLink = ({ text, inlineStyle = {} }) => {
  return (
    <View style={[styles.buttonLinkBg]}>
      <Text style={[styles.buttonLinkText, inlineStyle]}>
        {text ? text : "Button"}
      </Text>
    </View>
  );
};

export default ButtonLink;
