import { View, Text, TextInput as TextInputNative } from "react-native";
import React from "react";
import { styles } from "../styles";
import { useSelector, useDispatch } from "react-redux";

const TextInput = ({
  placeholder,
  value,
  setValue,
  type,
  local = false,
  onSubmit = false,
}) => {
  const dispatch = useDispatch();

  return (
    <View>
      <TextInputNative
        placeholder={placeholder ? placeholder : ""}
        placeholderTextColor={"#DEDCDC"}
        value={value}
        onChangeText={(text) => {
          local ? setValue(text) : dispatch(setValue({ data: text, type }));
        }}
        onSubmitEditing={
          onSubmit
            ? onSubmit
            : () => {
                return;
              }
        }
        style={[styles.textInput]}
      />
    </View>
  );
};

export default TextInput;
