// import { Image, Transformation } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import axios from "axios";
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
  useToast,
} from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import UserListItem from "./userAvatar/UserListItem";

const cloudinary = new Cloudinary({ cloud: { cloudName: "djuseai07" } });

const UpdateProfile = () => {
  const [imageUrl, setImageUrl] = useState("");
  const toast = useToast();
  const { user } = ChatState();
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    about: "",
    domains: [], // Using an array for multiple domains
    techstacks: [], // Using an array for multiple techstacks
    pic: "",
  });
  useEffect(() => {
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
        setFormData({
          name: data.name,
          organization: data.organization,
          about: data.about,
          domains: data.domains, // Using an array for multiple domains
          techstacks: data.techstacks, // Using an array for multiple techstacks
          pic: "",
        });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpdate = async () => {
    try {
      formData.domains = JSON.stringify(formData.domains);
      formData.techstacks = JSON.stringify(formData.techstacks);
      if (selectedFile) {
        const cloudData = new FormData();
        cloudData.append("file", selectedFile);
        cloudData.append("upload_preset", "chat-app");
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/djuseai07/image/upload`,
          cloudData
        );
        formData.pic = response.data.url;
      }
      console.log(formData);
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/user/update`,
        formData,
        {
          headers: {
            // "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      navigate("/profile");
      toast({
        title: "Profile Updated!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });

      // alert("succesfull");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  return (
    <div className="h-100 w-100 scrollY p-4">
      <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="lg" w="100%">
        <Center>
          <Heading as="h2" size="xl">
            Update Profile
          </Heading>
        </Center>
        <form>
          <Stack spacing={4}>
            {/* titile */}
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </FormControl>
            {/* abou */}
            <FormControl>
              <FormLabel>About</FormLabel>
              <Input
                type="text"
                name="about"
                value={formData.about}
                onChange={handleChange}
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
              <FormLabel>Skills</FormLabel>
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

            {/* pic  */}
            <FormControl>
              <FormLabel>Profile Pic</FormLabel>
              <Input
                type="file"
                name="img"
                onChange={handleFileChange}
                accept="image/*"
              />
            </FormControl>
            {/* // <div>
    //   <input type="file" onChange={handleFileChange} />
    //   <button onClick={handleUpload}>Upload</button>
    // </div> */}

            <Button colorScheme="blue" onClick={handleUpdate}>
              Update
            </Button>
          </Stack>
        </form>
      </Box>
    </div>
  );
};

export default UpdateProfile;
