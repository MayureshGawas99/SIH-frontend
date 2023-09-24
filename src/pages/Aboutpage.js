import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Grid,
  GridItem,
  Image,
} from "@chakra-ui/react";
import Myimg from "../images/image.png"
const teamMembers = [
    { name: "John Doe", role: "Web Developer" },
    { name: "Jane Smith", role: "UI/UX Designer" },
    { name: "Alice Johnson", role: "Content Writer" },
    { name: "Bob Smith", role: "Frontend Developer" },
    { name: "Eva Brown", role: "Backend Developer" },
    { name: "Grace Wilson", role: "Graphic Designer" },
  ];
const Aboutpage = () => {
    return (
        <Box w="100%">
          <Box
            bgImage={Myimg} // Replace with the path to your background image
            bgSize="cover"
            bgPosition="center"
            color="white"
            textAlign="center"
            py={{ base: 10, md: 20 }}
        
          >
            <Container maxW="container.xl">
              <Heading as="h2" fontSize={{ base: "3xl", md: "5xl" }}>
                Project Sahyog
              </Heading>
              <Text fontSize={{ base: "xl", md: "2xl" }} mt={{ base: 4, md: 8 }}>
              "Empowering Innovation through Collaboration:
    Share, Connect, Maintain, Enhance, and Enrich Your Projects and Expertise!"
              </Text>
            </Container>
          </Box>
          <Container maxW="container.xl">
            <Heading as="h3" fontSize={{ base: "xl", md: "2xl" }} mt={{ base: 6, md: 12 }}>
              Our Objective
            </Heading>
            <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4} mt={{ base: 4, md: 8 }}>
              {teamMembers.map((member, index) => (
                <GridItem key={index}>
                  <Box
                    borderWidth="1px"
                    borderRadius="md"
                    p={4}
                    boxShadow="md"
                    bg="white"
                  >
                    <Heading as="h5" fontSize={{ base: "lg", md: "xl" }}>
                      {member.name}
                    </Heading>
                    <Text fontSize={{ base: "md", md: "lg" }} color="gray.600">
                      {member.role}
                    </Text>
                  </Box>
                </GridItem>
              ))}
            </Grid>
          </Container>
          <Container maxW="container.xl" mt={{ base: 6, md: 12 }}>
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
              <Box>
                <Heading as="h3" fontSize={{ base: "xl", md: "2xl" }}>
                  Our use case diagram
                </Heading>
                <Text fontSize={{ base: "lg", md: "xl" }} mt={{ base: 4, md: 8 }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget
                  nisl in eros egestas viverra. Pellentesque varius purus nec eros
                  tempor, sed efficitur purus ullamcorper.
                </Text>
              </Box>
              <Box>
                <Image
                  src="office-image.jpg" // Replace with the path to your office image
                  alt="Our Office"
                  borderRadius="md"
                  boxShadow="md"
                />
              </Box>
            </Grid>
          </Container>
        </Box>
      );
}

export default Aboutpage