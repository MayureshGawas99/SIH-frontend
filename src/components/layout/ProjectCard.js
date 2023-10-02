import React from "react";
import myImage from "../../images/projectIcon.png";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  return (
    <div className="col-md-3">
      <div className="card mb-3 " style={{ width: "100%" }}>
        <img
          src={project.img}
          className="card-img-top"
          alt="..."
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body">
          <div className="mb-1">
            {project.techstacks.map((cat, ind) => (
              <button
                type="button"
                key={ind}
                className="btn btn-sm btn-outline-info me-2"
                style={{
                  borderRadius: "50px",
                  color: "black",
                  fontSize: "10px",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
          <h5 className="card-title">{project.title}</h5>
          <p className="card-text">{project.description}</p>

          <Link
            to={`/project-view?projectId=${project._id}`}
            className="btn btn-primary w-100"
          >
            View Project
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
