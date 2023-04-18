import { View, Text, FlatList, Dimensions } from "react-native";
import React, { useRef, useState } from "react";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { ChatMessage, ChatTextInput } from "../components";
import TopHeaderSecondary from "../components/TopHeaderSecondary";
import { styles } from "../styles";
import { BASE_API_URL, BASE_WS_URL } from "../constants";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { get_chat_room_messages } from "../api";
import { useSelector } from "react-redux";
import colors from "../styles/colors";
import axios from "axios";

const { width, height } = Dimensions.get("window");

const ChatBoard = () => {
  const route = useRoute();
  const [connection, setConnection] = useState(null);
  const [text_msg, setText_msg] = useState("");
  const [socketOn, setSocketOn] = useState(false);
  const [socket, setSocket] = useState({});
  const [messages, setMessages] = useState([]);
  const user = useSelector((state) => state.user.user);
  const flatListRef = useRef(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    setConnection(route.params.connection);
  }, [isFocused]);

  useEffect(() => {
    (async () => {
      try {
        const res = await get_chat_room_messages({
          chat_room_id: connection.chat_room_id,
        });
        if (res.data.data.length === 0) {
          setMessages([]);
        } else setMessages(res.data.data);
      } catch (error) {
        console.log(error);
        setMessages([]);
      }
    })();
  }, [connection]);

  useEffect(() => {
    if (connection && user.id) {
      const client = new W3CWebSocket(
        `${BASE_WS_URL}/ws/chat-room/${connection.chat_room_id}/${user.id}/`
      );

      client.onopen = () => {
        console.log("connection open...");
        if (client.readyState === client.OPEN) {
          setSocket(client);
          setSocketOn(true);
        }
      };
    }
  }, [connection, user]);

  useEffect(() => {
    if (socketOn) {
      socket.onmessage = function (e) {
        const message = JSON.parse(e.data).message;
        setMessages((prev) => [...prev, message]);
      };
    }
  }, [socketOn]);

  const handleSend = () => {
    if (text_msg.trim() === "") return;
    if (socketOn && socket.readyState === socket.OPEN) {
      socket.send(JSON.stringify({ message: text_msg }));
      setText_msg("");
    }
  };

  return (
    <View style={[styles.appBg, styles.displayHeight]}>
      {connection && <TopHeaderSecondary connection={connection} />}

      {messages.length < 1 && (
        <View
          style={{
            alignItems: "center",
            justifyContent: "flex-end",
            height: "30%",
          }}
        >
          <Text style={[styles.notFoundMsg]}>No chats yet</Text>
        </View>
      )}

      {messages.length >= 1 && (
        <View
          style={{
            height: height - 140,
          }}
        >
          <FlatList
            data={messages}
            showsVerticalScrollIndicator={false}
            ref={flatListRef}
            onContentSizeChange={() =>
              flatListRef.current.scrollToEnd({ animated: true })
            }
            onLayout={() => flatListRef.current.scrollToEnd({ animated: true })}
            overScrollMode="never"
            style={{
              marginHorizontal: 24,
            }}
            renderItem={({ item }) => (
              <ChatMessage
                BASE_API_URL={BASE_API_URL}
                connection={connection}
                user={user}
                item={item}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}

      <ChatTextInput
        rest={{
          placeholder: "Message",
          value: text_msg,
          onChangeText: (text) => {
            setText_msg(text);
          },
        }}
        handleSend={handleSend}
      />
    </View>
  );
};

export default ChatBoard;
