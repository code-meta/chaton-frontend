import {
  View,
  Text,
  TextInput,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { styles } from "../styles";
import { useSelector, useDispatch } from "react-redux";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import SimpleIcons from "react-native-vector-icons/SimpleLineIcons";
import colors from "../styles/colors";

const ChatTextInput = ({ rest, handleSend }) => {
  const dispatch = useDispatch();
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const sendInputRef = useRef();

  const keyboardDidShowListener = Keyboard.addListener(
    "keyboardDidShow",
    (event) => {
      setKeyboardHeight(event.endCoordinates.height);
    }
  );

  const keyboardDidHideListener = Keyboard.addListener(
    "keyboardDidHide",
    (event) => {
      setKeyboardHeight(0);
    }
  );

  return (
    <View
      style={{
        flex: 1,
        zIndex: 200,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        marginBottom: keyboardHeight,
        paddingBottom: 12,
        backgroundColor: colors.dark,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          gap: 10,
          marginHorizontal: 20,
        }}
      >
        <TextInput
          {...rest}
          style={[styles.chatTextInput]}
          placeholderTextColor={colors.gray}
          ref={sendInputRef}
          multiline
          cursorColor={colors.primaryBlue}
        />

        <TouchableOpacity style={styles.sendBtnWrapper} onPress={handleSend}>
          <Icons name="send" style={styles.sendBtn} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatTextInput;
