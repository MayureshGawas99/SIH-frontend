import { color } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/layout/ProjectCard";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
import { Box } from "@chakra-ui/react";
const Home = () => {
  const [recentProject, setRecentProject] = useState([]);
  const RP = [1, 2, 3, 4, 5, 6, 7];
  const pro = {
    admin: "65028f5aaceeb0e9bd833e7e",
    contributors: ["651089dc16647a9ac531b112"],
    createdAt: "2023-10-02T10:26:20.405Z",
    description: "this is PSC exp 1",
    domains: ["Soft Computing"],
    file: "uploads\\1696242380364-PSC exp 1.pdf",
    img: "http://res.cloudinary.com/djuseai07/image/upload/v1696242380/lsesyr699arfx9cpecbz.jpg",
    mentors: ["6502a32c3b01c54c6f842a53"],
    organization: "SPIT",
    techstacks: ["Python"],
    title: "PSC 1",
    updatedAt: "2023-10-02T10:30:12.798Z",
    __v: 0,
    _id: "651a9acc7ff1e24fa8d6e27e",
  };
  const Categories = [
    "Java",
    "Python",
    "CSS",
    "HTML",
    "JavaScript",
    "Java",
    "Python",
    "CSS",
    "HTML",
    "JavaScript",
    "Java",
    "Python",
    "CSS",
    "HTML",
    "JavaScript",
    "Java",
    "Python",
    "CSS",
    "HTML",
    "JavaScript",
    "Java",
    "Python",
    "CSS",
    "HTML",
    "JavaScript",
  ];
  const RecentProject = [
    { title: "Python3 Project", tech: ["Python3"] },
    { title: "Java Project", tech: ["java", "Swing"] },
    { title: "React Project", tech: ["MongoDB", "React", "Node"] },
    { title: "Python# Project", tech: ["C#"] },
  ];
  const { user } = ChatState();

  useEffect(() => {
    const fetchRecentProjects = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/project/recent?page=1&limit=5`
        );
        console.log(data);
        setRecentProject(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecentProjects();
  }, []);

  return (
    <div className="h-100 w-100 scrollY p-3">
      {!user && (
        <div className="background-image mb-2">
          <div>
            <h2 className="text-center">
              EMPOWERING MINDS, IGNITING INNOVATION,
            </h2>
            <h2 className="text-center">YOUR GATEWAY TO STUDENT PROJECTS.</h2>
          </div>
        </div>
      )}
      <div
        className="w-100 container card p-2 mb-2"
        style={{ backgroundColor: "#eee" }}
      >
        <h3>Categories</h3>
        <div className="d-flex flex-wrap">
          <button
            type="button"
            className="btn btn-info mx-2 my-1 "
            style={{ borderRadius: "50px" }}
          >
            All Categories
          </button>
          {Categories.map((cat, ind) => (
            <button
              type="button"
              className="btn btn-outline-info mx-2 my-1"
              style={{ borderRadius: "50px", color: "black" }}
              key={ind}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div
        className="w-100 container card p-2"
        style={{ backgroundColor: "#eee" }}
      >
        <Link to={"/"} className="d-flex justify-content-between mb-2">
          <h3>Recently Added</h3>
          <span className="material-symbols-outlined">chevron_right</span>
        </Link>

        <div className="row">
          {recentProject?.map((pro) => (
            <ProjectCard project={pro} key={pro._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
