import { View, Text, Image, ImageBackground } from "react-native";
import React from "react";
import { styles } from "../styles";

const Display = ({ text1, text2 }) => {
  return (
    <View style={[styles.blobWrapper]}>
      <ImageBackground
        source={require("../images/blob.png")}
        resizeMode="cover"
        style={[styles.blob]}
      >
        <View style={{ paddingLeft: "20%", paddingTop: 100 }}>
          <Text style={[styles.onboardingDisplay]}>{text1}</Text>
          <Text style={[styles.onboardingDisplay]}>{text2}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Display;
