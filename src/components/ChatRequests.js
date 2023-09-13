import { AddIcon, CheckIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";

import { Avatar, Button } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import { getSender, getSenderPic } from "../config/ChatLogic";

const ChatRequests = ({}) => {
  const [loggedUser, setLoggedUser] = useState();

  const {
    selectedChat,
    setSelectedChat,
    user,
    chatRequests,
    setChatRequests,
    fetchAgain,
  } = ChatState();
  const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/chat/not-accepted`,
        config
      );
      setChatRequests(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const acceptRequest = async (chatId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/chat/accept-chat`,
        { chatId },
        config
      );
      const newRequest = chatRequests.filter((req) => req._id !== chatId);
      setChatRequests(newRequest);
      fetchChats();
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Accept the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);
  return (
    <>
      {!chatRequests.length && <p>No new Notifications</p>}
      {chatRequests ? (
        <Stack overflowY="auto" h={"100%"}>
          {chatRequests.map((chat) => (
            <>
              <Box
                // onClick={handleFunction}
                cursor="pointer"
                bg="#E8E8E8"
                _hover={{
                  background: "#38B2AC",
                  color: "white",
                }}
                w="100%"
                alignItems="center"
                color="black"
                px={3}
                py={2}
                mb={2}
                borderRadius="lg"
                className="d-flex gap-2"
              >
                <Avatar
                  mr={2}
                  size="md"
                  cursor="pointer"
                  name={
                    !chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName
                  }
                  src={
                    !chat.isGroupChat
                      ? getSenderPic(loggedUser, chat.users)
                      : "../images/default.jpg"
                  }
                />
                <Box>
                  <Text>
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </Text>
                  <Text fontSize="xs">Wants to send you a message </Text>
                </Box>
                <Button
                  leftIcon={<CheckIcon />}
                  colorScheme="teal"
                  variant="solid"
                  onClick={() => acceptRequest(chat._id)}
                ></Button>
              </Box>
            </>
          ))}
        </Stack>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
};

export default ChatRequests;
