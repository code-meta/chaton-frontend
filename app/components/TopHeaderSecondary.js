import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import colors from "../styles/colors";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "../styles";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { BASE_API_URL } from "../constants";

const TopHeaderSecondary = ({ connection }) => {
  const user = useSelector((state) => state.user.user);

  const navigate = useNavigation();

  useEffect(() => {
    console.log(BASE_API_URL);
  }, []);

  return (
    <View
      style={{
        backgroundColor: colors.primaryDark,
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 16,
        zIndex: 100,
      }}
    >
      <View style={[styles.navWrapper]}>
        <View style={{ flexDirection: "row", gap: 14, alignItems: "center" }}>
          <Icons
            name="arrow-left"
            style={[styles.topIcon, { marginLeft: -10 }]}
            onPress={() => navigate.goBack()}
          />
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            {connection.profile ? (
              <Image
                source={{ uri: `${BASE_API_URL}${connection.profile}` }}
                style={{ width: 36, height: 36, borderRadius: 100 }}
              />
            ) : (
              <View
                style={{
                  width: 36,
                  height: 36,
                  backgroundColor: colors.white,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 100,
                }}
              >
                <Text
                  style={{
                    color: colors.dark,
                    fontWeight: "700",
                    fontSize: 20,
                    textTransform: "capitalize",
                  }}
                >
                  {connection.username[0]}
                </Text>
              </View>
            )}

            <Text
              style={{ color: colors.white, fontWeight: "500", fontSize: 16 }}
            >
              {connection.username}
            </Text>
          </View>
        </View>
        <View style={[styles.topIconWrapper]}>
          <Icons name="dots-vertical" style={[styles.topIcon]} />
        </View>
      </View>
    </View>
  );
};

export default TopHeaderSecondary;
