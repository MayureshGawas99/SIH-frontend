import axios from "axios";
import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { useToast } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const { user, setUpdateProject } = ChatState();
  const navigate = useNavigate();
  const toast = useToast();
  const fetchProjects = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/project`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(data);
      setProjects(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (projectId) => {
    // setUpdateProject(projectId);
    navigate(`/project-update?projectId=${projectId}`);
  };
  const handleDelete = async (projectId) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/project/delete/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const updated = projects.filter((pro) => pro._id !== projectId);
      setProjects(updated);
      toast({
        title: data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="p-3">
      {projects.length ? (
        projects.map((pro) => (
          <div key={pro._id} className="card mb-3">
            <div className="card-body">
              <div className="d-flex justify-content-between ">
                <div className="d-flex flex-row align-items-center">
                  <div>
                    <img
                      src={pro.img}
                      className="img-fluid rounded-3"
                      alt="Shopping item"
                      style={{ width: 100 }}
                    />
                  </div>
                  <div className="ms-3 d-flex gap-2 flex-column">
                    <h5>{pro.title}</h5>
                    <p className="small mb-0">{pro.description}</p>
                    <div>
                      {pro.techstacks.map((tech) => (
                        <button
                          type="button"
                          className="btn btn-outline-info me-2 btn-sm"
                          style={{ borderRadius: "50px", color: "black" }}
                        >
                          {tech}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <button
                    onClick={() => handleUpdate(pro._id)}
                    style={{ color: "#0b1f37" }}
                    className="me-2"
                  >
                    <EditIcon boxSize={6} />
                  </button>
                  <button
                    onClick={() => handleDelete(pro._id)}
                    style={{ color: "#d11a2a" }}
                  >
                    <DeleteIcon boxSize={6} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p> No projects to show</p>
      )}
    </div>
  );
};

export default AllProjects;
