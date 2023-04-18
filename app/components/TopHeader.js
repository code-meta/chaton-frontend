import { View, Text } from "react-native";
import React from "react";
import colors from "../styles/colors";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "../styles";

const TopHeader = () => {
  return (
    <View
      style={{
        backgroundColor: colors.primaryDark,
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 16,
      }}
    >
      <View style={[styles.navWrapper]}>
        <Text style={[styles.logo]}>Chat On</Text>
        <View style={[styles.topIconWrapper]}>
          <Icons name="magnify" style={[styles.topIcon]} />
          <Icons name="dots-vertical" style={[styles.topIcon]} />
        </View>
      </View>
    </View>
  );
};

export default TopHeader;
