import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [search, setSearch] = useState();
  const [updateProject, setUpdateProject] = useState();
  const [tabIndex, setTabIndex] = useState(0);
  const [showProfile, setShowProfile] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [chats, setChats] = useState([]);
  const [chatRequests, setChatRequests] = useState([]);

  const [selectedChat, setSelectedChat] = useState();
  const [fetchAgain, setFetchAgain] = useState(false);
  const [notification, setNotification] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (!userInfo) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        showProfile,
        setShowProfile,
        search,
        setSearch,
        searchResult,
        setSearchResult,
        tabIndex,
        setTabIndex,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        chatRequests,
        setChatRequests,
        fetchAgain,
        setFetchAgain,
        notification,
        setNotification,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
