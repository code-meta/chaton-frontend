import { View, Text, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "../styles";
import colors from "../styles/colors";
import { useSelector, useDispatch } from "react-redux";

const PasswordTextInputWithLabel = ({
  label,
  placeholder,
  value,
  setValue,
  forgot,
  type,
}) => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const handleEyeall = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={[styles.textInputLabel]}>{label ? label : "label"}</Text>
        <Text
          style={{ color: colors.primaryBlue, fontSize: 16, fontWeight: "500" }}
        >
          {forgot ? "Forgot Password?" : ""}
        </Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <TextInput
          placeholder={placeholder ? placeholder : ""}
          placeholderTextColor={colors.gray}
          value={value}
          onChangeText={(text) => dispatch(setValue({ data: text, type }))}
          secureTextEntry={!isOpen}
          caretColor="red"
          style={[styles.textInput, { marginTop: 0 }]}
        />
        <Icon
          name="eye-off-outline"
          style={[{ display: isOpen ? "none" : "flex" }, styles.eyeball]}
          onPress={handleEyeall}
        />
        <Icon
          name="eye-outline"
          style={[{ display: isOpen ? "flex" : "none" }, styles.eyeball]}
          onPress={handleEyeall}
        />
      </View>
    </View>
  );
};

export default PasswordTextInputWithLabel;
