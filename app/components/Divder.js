import { View, Text } from "react-native";
import React from "react";
import { styles } from "../styles";

const Divder = () => {
  return (
    <View style={[styles.dividerWrapper]}>
      <View style={[styles.dividerLine]}></View>
      <Text style={[styles.dividerText]}>or</Text>
      <View style={[styles.dividerLine]}></View>
    </View>
  );
};

export default Divder;
