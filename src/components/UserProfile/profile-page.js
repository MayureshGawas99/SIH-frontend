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
import { Button } from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [isUser, setIsUser] = useState(true);
  const { showProfile, setShowProfile } = ChatState();
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo) {
      console.log("hi");
      navigate("/");
    } else {
      setShowProfile(userInfo);
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
                    src={showProfile.pic}
                    alt="profile pic"
                    className="rounded-circle"
                    style={{ width: "150px" }}
                    fluid
                  />
                </div>
                <p className="text-muted mb-1">{showProfile.name}</p>
                <p className="text-muted mb-4">{showProfile.organization}</p>
                <div className="d-flex justify-content-center mb-2">
                  {isUser ? <Button>Edit</Button> : <Button>Connect</Button>}
                  <Button outline className="ms-1">
                    Message
                  </Button>
                </div>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 ">
              <MDBCardBody>
                <MDBCardText className="mb-4">
                  <span className="text-primary font-italic me-1">
                    Domain Expertise
                  </span>
                </MDBCardText>
                <MDBCardText className="mb-1" style={{ fontSize: ".77rem" }}>
                  Web Development
                </MDBCardText>
                <MDBProgress className="rounded">
                  <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                </MDBProgress>

                <MDBCardText
                  className="mt-4 mb-1"
                  style={{ fontSize: ".77rem" }}
                >
                  Machine Learning
                </MDBCardText>
                <MDBProgress className="rounded">
                  <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                </MDBProgress>

                <MDBCardText
                  className="mt-4 mb-1"
                  style={{ fontSize: ".77rem" }}
                >
                  Artificial Intellegence
                </MDBCardText>
                <MDBProgress className="rounded">
                  <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                </MDBProgress>

                <MDBCardText
                  className="mt-4 mb-1"
                  style={{ fontSize: ".77rem" }}
                >
                  Blockchain
                </MDBCardText>
                <MDBProgress className="rounded">
                  <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                </MDBProgress>

                <MDBCardText
                  className="mt-4 mb-1"
                  style={{ fontSize: ".77rem" }}
                >
                  Backend API
                </MDBCardText>
                <MDBProgress className="rounded">
                  <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                </MDBProgress>
              </MDBCardBody>
            </MDBCard>
            <MDBCard className="mb-4 mb-md-0">
              <MDBCardBody>
                <MDBCardText className="mb-4">
                  <span className="text-primary font-italic me-1">
                    TechStack
                  </span>
                </MDBCardText>
                <MDBCardText className="mb-1" style={{ fontSize: ".77rem" }}>
                  Web Design
                </MDBCardText>
                <MDBProgress className="rounded">
                  <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                </MDBProgress>

                <MDBCardText
                  className="mt-4 mb-1"
                  style={{ fontSize: ".77rem" }}
                >
                  Website Markup
                </MDBCardText>
                <MDBProgress className="rounded">
                  <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                </MDBProgress>

                <MDBCardText
                  className="mt-4 mb-1"
                  style={{ fontSize: ".77rem" }}
                >
                  One Page
                </MDBCardText>
                <MDBProgress className="rounded">
                  <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                </MDBProgress>

                <MDBCardText
                  className="mt-4 mb-1"
                  style={{ fontSize: ".77rem" }}
                >
                  Mobile Template
                </MDBCardText>
                <MDBProgress className="rounded">
                  <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                </MDBProgress>

                <MDBCardText
                  className="mt-4 mb-1"
                  style={{ fontSize: ".77rem" }}
                >
                  Backend API
                </MDBCardText>
                <MDBProgress className="rounded">
                  <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                </MDBProgress>
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
                      {showProfile.name}
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
                      {showProfile.email}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      (+91) 7972058909
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
                      Sardar Patel Institute of Technology
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
