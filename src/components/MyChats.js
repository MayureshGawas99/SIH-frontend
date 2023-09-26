import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";

import { Avatar, Button } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import { getSender, getSenderPic } from "../config/ChatLogic";

const MyChats = ({}) => {
  const [loggedUser, setLoggedUser] = useState();

  const {
    selectedChat,
    setSelectedChat,
    user,
    chats,
    setChats,
    fetchAgain,
    setTabIndex,
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
        `${process.env.REACT_APP_API_URL}/api/chat/accepted`,
        config
      );
      setChats(data);
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

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <>
      {chats && (
        <>
          <Stack overflowY="auto" h={"100%"}>
            {chats.map((chat) => (
              <Box
                onClick={() => {
                  setSelectedChat(chat);
                  setTabIndex(1);
                }}
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
                key={chat._id}
              >
                <Avatar
                  mr={2}
                  size="md"
                  cursor="pointer"
                  name={getSender(loggedUser, chat.users)}
                  src={getSenderPic(loggedUser, chat.users)}
                />
                <Box>
                  <Text>{getSender(loggedUser, chat.users)}</Text>
                  <Text fontSize="xs">
                    <b>{chat.latestMessage?.sender?.name} : </b>
                    {chat.latestMessage ? (
                      chat.latestMessage.content.length > 50 ? (
                        chat.latestMessage.content.substring(0, 51) + "..."
                      ) : (
                        chat.latestMessage.content
                      )
                    ) : (
                      <></>
                    )}
                  </Text>
                </Box>
              </Box>
            ))}
          </Stack>
        </>
      )}
    </>
  );
};

export default MyChats;
