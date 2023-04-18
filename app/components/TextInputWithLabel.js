import { View, Text, TextInput } from "react-native";
import React from "react";
import { styles } from "../styles";
import { useSelector, useDispatch } from "react-redux";

const TextInputWithLabel = ({ label, placeholder, value, setValue, type }) => {
  const dispatch = useDispatch();

  return (
    <View>
      <Text style={[styles.textInputLabel]}>{label ? label : "label"}</Text>

      <TextInput
        placeholder={placeholder ? placeholder : ""}
        placeholderTextColor={"#DEDCDC"}
        value={value}
        onChangeText={(text) => dispatch(setValue({ data: text, type }))}
        style={[styles.textInput]}
      />
    </View>
  );
};

export default TextInputWithLabel;
