import {
  Avatar,
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BellIcon, ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { ChatState } from "../../Context/ChatProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SideDrawer = () => {
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const toast = useToast();
  const {
    user,
    setUser,
    setShowProfile,
    search,
    setSearch,
    searchResult,
    setSearchResult,
    setTabIndex,
  } = ChatState();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    navigate("/");
    toast({
      title: "Logout Successfull.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom-left",
    });
  };

  const handleSearch = async (e) => {
    console.log(search);
    setTabIndex(2);

    if (!search) {
      // toast({
      //   title: "Please Enter something in search",
      //   status: "warning",
      //   duration: 5000,
      //   isClosable: true,
      //   position: "top-left",
      // });
      return;
    }
    try {
      // setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user?search=${search}`,
        config
      );

      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <div className="p-2 d-flex justify-content-around align-items-center gap-2">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            type="tel"
            size="sm"
            placeholder="Search User"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </InputGroup>
        <Button colorScheme="teal" size="sm" onClick={handleSearch}>
          Go
        </Button>
        <Menu>
          <MenuButton onClick={() => setTabIndex(4)} p={1}>
            <BellIcon />
          </MenuButton>
        </Menu>
        <Menu>
          <MenuButton as={Button} p={"0px"}>
            <Avatar
              size="sm"
              cursor={"pointer"}
              name={user.name}
              src={user.pic}
            />
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={() => {
                setShowProfile(user);
                navigate("/profile");
              }}
            >
              My profile
            </MenuItem>
            {user?.role === 0 && (
              <>
                <MenuItem onClick={() => navigate("/project-upload")}>
                  Upload Project
                </MenuItem>
                <MenuItem onClick={() => navigate("/projects")}>
                  All Project
                </MenuItem>
              </>
            )}
            <MenuDivider />
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </>
  );
};

export default SideDrawer;
