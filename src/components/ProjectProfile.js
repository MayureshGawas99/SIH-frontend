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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { ChatState } from "../Context/ChatProvider";

export default function ProjectProfile() {
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
  const [project, setProject] = useState([]);
  const [pdfUrl, setPdfUrl] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();
  const fetchProject = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const projectId = urlParams.get("projectId");
      if (projectId) {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/project/single/${projectId}`
        );
        console.log(data);
        setProject(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
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

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = "downloaded-file.pdf"; // Set the desired download filename
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      navigate("/");
    } else {
      fetchProject();
    }
  }, []);
  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const projectId = urlParams.get("projectId");
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/project/file/${projectId}`,
          {
            responseType: "blob",
          }
        );
        console.log("data", response);
        if (response.status === 200) {
          const pdfBlob = new Blob([response.data], {
            type: "application/pdf",
          });
          const pdfUrl = URL.createObjectURL(pdfBlob);
          setPdfUrl(pdfUrl);
        } else {
          console.error("Failed to fetch PDF");
        }
      } catch (error) {
        console.error("Error fetching PDF:", error);
        setPdfUrl(null);
      }
    };

    fetchPdf();
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
                    src={project?.img}
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
                <p className="text-muted mb-1">{project?.title}</p>
                {/* <p className="text-muted mb-4">{showProfile?.about}</p> */}
                <div className="d-flex justify-content-center mb-2">
                  <Button onClick={handleDownload}>Download</Button>
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
                  {project?.domains?.map((dom, ind) => (
                    <button
                      type="button"
                      className="btn btn-outline-info my-2 btn-sm"
                      style={{ borderRadius: "50px", color: "black" }}
                      key={ind}
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
                  <span className="text-primary font-italic me-1">
                    Technology Used
                  </span>
                </MDBCardText>
                <div className="d-flex flex-column">
                  {project?.techstacks?.map((dom, ind) => (
                    <button
                      type="button"
                      className="btn btn-outline-info my-2 btn-sm"
                      style={{ borderRadius: "50px", color: "black" }}
                      key={ind}
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
                    <MDBCardText>Title</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {project?.title}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Description</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {project?.description}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />

                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>College</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {project?.organization}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                {/* <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Graduation Year</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">Final Year</MDBCardText>
                  </MDBCol>
                </MDBRow> */}
              </MDBCardBody>
            </MDBCard>
            <MDBCard className="text-primary font-italic me-1 mb-4">
              <MDBCardBody>
                <MDBCardText className="mb-4">
                  <span className="text-primary font-italic me-1">
                    Contributors
                  </span>
                </MDBCardText>
                {project?.contributors?.length ? (
                  project?.contributors?.map((con) => (
                    <MDBRow className="p-2" key={con._id}>
                      <div className="card mb-3">
                        <div className="card-body">
                          <div className="d-flex justify-content-between ">
                            <div className="d-flex flex-row align-items-center">
                              <div>
                                <img
                                  src={con.pic}
                                  className="img-fluid rounded-3"
                                  alt="Shopping item"
                                  style={{ width: 100 }}
                                />
                              </div>
                              <div className="ms-3 d-flex gap-2 flex-column">
                                <h5>{con.name}</h5>
                                <p className="small mb-0">{con.organization}</p>
                                <div>
                                  {con.techstacks.map((tech, ind) => (
                                    <button
                                      type="button"
                                      className="btn btn-outline-info me-2 btn-sm"
                                      style={{
                                        borderRadius: "50px",
                                        color: "black",
                                      }}
                                      key={ind}
                                    >
                                      {tech}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="d-flex flex-row align-items-center">
                              <Button
                                onClick={() => {
                                  setShowProfile(con);
                                  navigate("/profile");
                                }}
                              >
                                View Profile
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </MDBRow>
                  ))
                ) : (
                  <p> No Contributors to show</p>
                )}
              </MDBCardBody>
            </MDBCard>
            <MDBCard className="text-primary font-italic me-1">
              <MDBCardBody>
                <MDBCardText className="mb-4">
                  <span className="text-primary font-italic me-1">Mentors</span>
                </MDBCardText>
                {project?.mentors?.length ? (
                  project?.mentors?.map((con) => (
                    <MDBRow className="p-2" key={con._id}>
                      <div className="card mb-3">
                        <div className="card-body">
                          <div className="d-flex justify-content-between ">
                            <div className="d-flex flex-row align-items-center">
                              <div>
                                <img
                                  src={con.pic}
                                  className="img-fluid rounded-3"
                                  alt="Shopping item"
                                  style={{ width: 100 }}
                                />
                              </div>
                              <div className="ms-3 d-flex gap-2 flex-column">
                                <h5>{con.name}</h5>
                                <p className="small mb-0">{con.organization}</p>
                                <div>
                                  {con.techstacks.map((tech, ind) => (
                                    <button
                                      type="button"
                                      className="btn btn-outline-info me-2 btn-sm"
                                      style={{
                                        borderRadius: "50px",
                                        color: "black",
                                      }}
                                      key={ind}
                                    >
                                      {tech}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="d-flex flex-row align-items-center">
                              <Button
                                onClick={() => {
                                  setShowProfile(con);
                                  navigate("/profile");
                                }}
                              >
                                View Profile
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </MDBRow>
                  ))
                ) : (
                  <p> No Mentors to show</p>
                )}
              </MDBCardBody>
            </MDBCard>
            <MDBCard className="text-primary font-italic me-1">
              <MDBCardBody>
                <MDBCardText className="mb-4">
                  <span className="text-primary font-italic me-1">
                    Project Paper
                  </span>
                </MDBCardText>
                {pdfUrl ? (
                  <div>
                    <embed
                      src={pdfUrl}
                      type="application/pdf"
                      width="100%"
                      height="500px"
                    />
                  </div>
                ) : (
                  <p>Error loading PDF.</p>
                )}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
