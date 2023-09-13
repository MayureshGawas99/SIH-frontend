import { ArrowBackIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import ScrollableChat from "./ScrollableChat";
import { ChatState } from "../Context/ChatProvider";
import { getSender, getSenderFull } from "../config/ChatLogic";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";

var socket, selectedChatCompare;

const SingleChat = () => {
  const [istyping, setIsTyping] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    selectedChat,
    setSelectedChat,
    user,
    setShowProfile,
    notification,
    setNotification,
    fetchAgain,
    setFetchAgain,
  } = ChatState();
  const navigate = useNavigate();
  const toast = useToast();

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      // socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/message`,
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );
        console.log(data);
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };

  useEffect(() => {
    socket = io(process.env.REACT_APP_API_URL);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });
  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "20px", md: "24px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            alignItems="center"
            className="d-flex justify-content-between"
          >
            {messages &&
              (!selectedChat.isGroupChat ? (
                <>
                  {getSender(user, selectedChat.users)}
                  <IconButton
                    d={{ base: "flex" }}
                    icon={<ViewIcon />}
                    onClick={() => {
                      let sender = getSenderFull(user, selectedChat.users);
                      console.log(sender);
                      setShowProfile(sender);
                      navigate("/chatprofile");
                    }}
                  />
                </>
              ) : (
                <>
                  {selectedChat.chatName.toUpperCase()}
                  {/* <UpdateGroupChatModal
                    fetchMessages={fetchMessages}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  /> */}
                </>
              ))}
          </Text>
          <Box
            flexDir="column"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="420px"
            borderRadius="lg"
            overflowY="hidden"
            className="d-flex justify-content-end"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={10}
                h={10}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <ScrollableChat messages={messages} />
            )}

            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
            >
              {istyping ? (
                <div>
                  Lottie
                  {/* <Lottie
                    // options={defaultOptions}
                    height={50}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }} */}
                  {/* /> */}
                </div>
              ) : (
                <></>
              )}
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        // to get socket.io on same page
        <Box d="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
