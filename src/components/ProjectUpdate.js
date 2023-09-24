import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  ChakraProvider,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stack,
  Select,
  Center,
  Heading,
  Tag,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";
import UserListItem from "./userAvatar/UserListItem";

const ProjectUpdate = () => {
  const [formData, setFormData] = useState({
    title: "",
    domains: [], // Using an array for multiple domains
    description: "",
    techstacks: [], // Using an array for multiple techstacks
    contributors: [],
    mentors: [],
    organization: "",
    mentor: "",
    file: null,
  });
  const { user } = ChatState();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [mentorQuery, setMentorQuery] = useState("");
  const [mentorResults, setMentorResults] = useState([]);
  useEffect(() => {
    let mentorTimeoutId; // Store a reference to the timeout ID

    const handleMentorSearch = async () => {
      if (mentorQuery.trim() === "") {
        setMentorResults([]);
        return;
      }
      // Make an API request to fetch search results
      try {
        // setLoading(true);

        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/user?search=${mentorQuery}`,
          config
        );

        setMentorResults(data);
      } catch (error) {
        console.log(error);
      }
    };
    clearTimeout(mentorTimeoutId);
    mentorTimeoutId = setTimeout(handleMentorSearch, 1000);
  }, [mentorQuery]);

  useEffect(() => {
    let timeoutId; // Store a reference to the timeout ID

    const handleSearch = async () => {
      if (query.trim() === "") {
        setResults([]);
        return;
      }
      // Make an API request to fetch search results
      try {
        // setLoading(true);

        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/user?search=${query}`,
          config
        );

        setResults(data);
      } catch (error) {
        console.log(error);
      }
    };
    clearTimeout(timeoutId);
    timeoutId = setTimeout(handleSearch, 1000);
  }, [query]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      [e.target.name]: e.target.type === "file" ? files[0] : e.target.value,
    });
  };
  const handleAddMentors = () => {
    if (formData.mentor) {
      setFormData({
        ...formData,
        mentors: [...formData.mentors, formData.mentor],
        mentor: "", // Clear the input field
      });
    }
  };
  const handleRemoveMentors = (index) => {
    const updated = formData.mentors.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      mentors: updated,
    });
  };

  const handleAddContributors = () => {
    if (formData.con) {
      setFormData({
        ...formData,
        contributors: [...formData.contributors, formData.con],
        con: "", // Clear the input field
      });
    }
  };
  const handleRemoveContributors = (index) => {
    const updated = formData.contributors.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      contributors: updated,
    });
  };

  const handleAddDomain = () => {
    if (formData.domain) {
      setFormData({
        ...formData,
        domains: [...formData.domains, formData.domain],
        domain: "", // Clear the input field
      });
    }
  };

  const handleRemoveDomain = (index) => {
    const updatedDomains = formData.domains.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      domains: updatedDomains,
    });
  };

  const handleAddTechstack = () => {
    if (formData.techstack) {
      setFormData({
        ...formData,
        techstacks: [...formData.techstacks, formData.techstack],
        techstack: "", // Clear the input field
      });
    }
  };

  const handleRemoveTechstack = (index) => {
    const updatedTechstacks = formData.techstacks.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      techstacks: updatedTechstacks,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can handle form submission logic here
    console.log("hi");

    try {
      formData.domains = JSON.stringify(formData.domains);
      formData.techstacks = JSON.stringify(formData.techstacks);
      formData.contributors = JSON.stringify(
        formData.contributors.map((obj) => obj._id)
      );
      console.log(formData);
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/project/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // Handle success
      console.log("File uploaded successfully");
      setFormData({
        title: "",
        domains: [], // Using an array for multiple domains
        description: "",
        techstacks: [], // Using an array for multiple techstacks
        contributors: [],
        mentors: [],
        organization: "",
        mentor: "",
        file: null,
      });
      alert("successfully uploaded");
    } catch (error) {
      // Handle error
      console.error("Error uploading file", error);
      alert("Error uploaded");
    }

    /// database
  };
  return (
    <div className="h-100 w-100 scrollY p-4">
      <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="lg" w="100%">
        <Center>
          <Heading as="h2" size="xl">
            Project Form
          </Heading>
        </Center>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            {/* titile */}
            <FormControl>
              <FormLabel>Project Title</FormLabel>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </FormControl>
            {/* description */}
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                resize={"none"}
              />
            </FormControl>
            {/* Organization */}
            <FormControl>
              <FormLabel>Organization</FormLabel>
              <Input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
              />
            </FormControl>
            {/* Domain */}
            <FormControl>
              <FormLabel>Domain</FormLabel>
              {formData.domains.map((domain, index) => (
                <Tag
                  key={index}
                  size="sm"
                  variant="solid"
                  colorScheme="blue"
                  className="me-2"
                >
                  <TagLabel>{domain}</TagLabel>
                  <TagCloseButton onClick={() => handleRemoveDomain(index)} />
                </Tag>
              ))}
              <Input
                type="text"
                name="domain"
                value={formData.domain}
                onChange={handleChange}
                onBlur={handleAddDomain}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleAddDomain();
                  }
                }}
              />
            </FormControl>
            {/* techstack */}
            <FormControl>
              <FormLabel>Techstack</FormLabel>
              {formData.techstacks.map((techstack, index) => (
                <Tag
                  key={index}
                  size="sm"
                  variant="solid"
                  colorScheme="blue"
                  className="me-2"
                >
                  <TagLabel>{techstack}</TagLabel>
                  <TagCloseButton
                    onClick={() => handleRemoveTechstack(index)}
                  />
                </Tag>
              ))}
              <Input
                type="text"
                name="techstack"
                value={formData.techstack}
                onChange={handleChange}
                onBlur={handleAddTechstack}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleAddTechstack();
                  }
                }}
              />
            </FormControl>
            {/* contributors */}
            <FormControl>
              <FormLabel>Contributors</FormLabel>
              {formData.contributors.map((con, index) => (
                <Tag
                  key={index}
                  size="sm"
                  variant="solid"
                  colorScheme="blue"
                  className="me-2"
                >
                  <TagLabel>{con.name}</TagLabel>
                  <TagCloseButton
                    onClick={() => handleRemoveContributors(index)}
                  />
                </Tag>
              ))}
              <Input
                type="text"
                placeholder="Search for Users..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="mb-2"
              />
              <Stack>
                {!results.length && <p>No users Found</p>}
                {results?.map((res) => (
                  <UserListItem
                    user={res}
                    key={res._id}
                    handleFunction={() => {
                      formData.con = res;
                      const userExists = formData.contributors.some(
                        (obj) => obj._id === res._id
                      );
                      if (!userExists) {
                        handleAddContributors();
                      }
                    }}
                  />
                ))}
              </Stack>
            </FormControl>

            {/* Mentors  */}
            <FormControl>
              <FormLabel>Mentors</FormLabel>
              {formData.mentors?.map((men, index) => (
                <Tag
                  key={index}
                  size="sm"
                  variant="solid"
                  colorScheme="blue"
                  className="me-2"
                >
                  <TagLabel>{men.name}</TagLabel>
                  <TagCloseButton onClick={() => handleRemoveMentors(index)} />
                </Tag>
              ))}
              <Input
                type="text"
                placeholder="Search for Mentors..."
                value={mentorQuery}
                onChange={(e) => setMentorQuery(e.target.value)}
                className="mb-2"
              />
              <Stack>
                {!mentorResults.length && <p>No Mentors Found</p>}
                {mentorResults?.map((res) => (
                  <UserListItem
                    user={res}
                    key={res._id}
                    handleFunction={() => {
                      formData.mentor = res;
                      const userExists = formData.mentors.some(
                        (obj) => obj._id === res._id
                      );
                      if (!userExists) {
                        handleAddMentors();
                      }
                    }}
                  />
                ))}
              </Stack>
            </FormControl>

            {/* project DOc  */}
            <FormControl>
              <FormLabel>Project PDF</FormLabel>
              <Input
                type="file"
                name="file"
                onChange={handleFileChange}
                accept="application/pdf"
              />
            </FormControl>

            <Button colorScheme="blue" onClick={handleSubmit}>
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </div>
  );
};

export default ProjectUpdate;
