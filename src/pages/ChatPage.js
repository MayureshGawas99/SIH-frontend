import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";
import MyChats from "../components/MyChats";
import Chatbox from "../components/Chatbox";
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from "@chakra-ui/react";
import UserListItem from "../components/userAvatar/UserListItem";
import axios from "axios";
import ChatRequests from "../components/ChatRequests";
import SingleChat from "../components/SingleChat";

const Chatpage = () => {
  // const [fetchAgain, setFetchAgain] = useState(false);
  const {
    user,
    setTabIndex,
    tabIndex,
    searchResult,
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
  } = ChatState();
  const toast = useToast();

  const accessChat = async (userId) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/chat`,
        { userId },
        config
      );

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      // onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <div
      style={{ width: "100%", height: "100%" }}
      className="d-flex flex-column"
    >
      {user && <SideDrawer />}
      <Tabs index={tabIndex} isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab onClick={() => setTabIndex(0)}>All Chats</Tab>
          <Tab onClick={() => setTabIndex(1)}>Chat </Tab>
          <Tab onClick={() => setTabIndex(2)}>Search</Tab>
          {/* <Tab onClick={() => setTabIndex(3)}> Group</Tab> */}
        </TabList>
        <TabPanels>
          <TabPanel h={"500"} overflowY={"auto"}>
            <MyChats />
          </TabPanel>
          <TabPanel>
            <SingleChat />
          </TabPanel>
          <TabPanel h={"500"} overflowY={"auto"}>
            {!searchResult.length && <p>No users Found</p>}
            {searchResult?.map((user) => (
              <UserListItem
                user={user}
                key={user._id}
                handleFunction={() => accessChat(user._id)}
              />
            ))}
          </TabPanel>
          <TabPanel h={"500"} overflowY={"auto"}>
            groups
          </TabPanel>
          <TabPanel>
            <ChatRequests handleFunction={() => accessChat(user._id)} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default Chatpage;
