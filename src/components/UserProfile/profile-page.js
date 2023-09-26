import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import { Button, useToast } from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";
import { useNavigate } from "react-router-dom";
import { accessChat } from "../../pages/ChatPage";
import axios from "axios";

export default function ProfilePage() {
  const [isUser, setIsUser] = useState(true);
  const {
    user,
    showProfile,
    setShowProfile,
    setTabIndex,
    tabIndex,
    searchResult,
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
  } = ChatState();
  const navigate = useNavigate();
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
      setTabIndex(1);
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
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const fetchDetails = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/user/self`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setShowProfile(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (!userInfo) {
      console.log("hi");
      navigate("/");
    } else {
      if (!showProfile || showProfile._id === userInfo._id) {
        fetchDetails();
      }
    }
  }, []);
  return (
    <section style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <div className="d-flex justify-content-center">
                  <MDBCardImage
                    src={showProfile?.pic}
                    alt="profile pic"
                    className="rounded-circle"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "contain",
                    }}
                    fluid
                  />
                </div>
                <p className="text-muted mb-1">{showProfile?.name}</p>
                <p className="text-muted mb-4">{showProfile?.about}</p>
                <div className="d-flex justify-content-center mb-2">
                  {user._id === showProfile?._id ? (
                    <Button onClick={() => navigate("/profile-update")}>
                      Edit
                    </Button>
                  ) : (
                    <Button onClick={() => accessChat(showProfile?._id)}>
                      Connect
                    </Button>
                  )}
                </div>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 ">
              <MDBCardBody>
                <MDBCardText className="mb-2">
                  <span className="text-primary font-italic me-1">
                    Domain Expertise
                  </span>
                </MDBCardText>
                <div className="d-flex flex-column">
                  {showProfile?.domains.map((dom, ind) => (
                    <button
                      type="button"
                      className="btn btn-outline-info my-2 btn-sm"
                      style={{ borderRadius: "50px", color: "black" }}
                    >
                      {dom}
                    </button>
                  ))}
                </div>
              </MDBCardBody>
            </MDBCard>
            <MDBCard className="mb-4 mb-md-0">
              <MDBCardBody>
                <MDBCardText className="mb-2">
                  <span className="text-primary font-italic me-1">Skills</span>
                </MDBCardText>
                <div className="d-flex flex-column">
                  {showProfile?.techstacks.map((dom, ind) => (
                    <button
                      type="button"
                      className="btn btn-outline-info my-2 btn-sm"
                      style={{ borderRadius: "50px", color: "black" }}
                    >
                      {dom}
                    </button>
                  ))}
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4 ">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {showProfile?.name}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {showProfile?.email}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                {/* <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      (+91) 7972058909
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr /> */}
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>College</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {showProfile?.organization}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Graduation Year</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">Final Year</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
            <MDBCard className="text-primary font-italic me-1">
              <MDBCardBody>
                <MDBCardText className="mb-4">
                  <span className="text-primary font-italic me-1">
                    My Projects
                  </span>
                </MDBCardText>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Project Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      This is Project
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Project Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      This is Project
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Project Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      This is Project
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Project Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      This is Project
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Project Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      This is Project
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
