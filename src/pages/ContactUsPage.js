import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Grid,
  GridItem,
  Image,
  Icon,
} from "@chakra-ui/react";
import { FaMapMarker, FaEnvelope, FaPhone } from "react-icons/fa";
import Myimg from "../images/image.png"

const ContactInfoItem = ({ icon, label, value }) => (
    <GridItem>
      <Box
        borderWidth="1px"
        borderRadius="md"
        p={4}
        boxShadow="md"
        bg="white"
      >
        {icon}
        <Heading as="h5" fontSize={{ base: "lg", md: "xl" }} mt={2}>
          {label}
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }} color="gray.600" mt={2}>
          {value}
        </Text>
      </Box>
    </GridItem>
  );

const ContactUsPage = () => {
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
                Contact Us
              </Heading>
              <Text fontSize={{ base: "xl", md: "2xl" }} mt={{ base: 4, md: 8 }}>
                "Feel free to reach out to us. We're here to help!"
              </Text>
            </Container>
          </Box>
          <Container maxW="container.xl">
            <Heading as="h3" fontSize={{ base: "xl", md: "2xl" }} mt={{ base: 6, md: 12 }}>
              Contact Information
            </Heading>
            <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4} mt={{ base: 4, md: 8 }}>
              <ContactInfoItem
                icon={<Icon as={FaMapMarker} boxSize={6} />}
                label="Address"
                value="123 Main Street, City, Country"
              />
              <ContactInfoItem
                icon={<Icon as={FaEnvelope} boxSize={6} />}
                label="Email"
                value="contact@example.com"
              />
              <ContactInfoItem
                icon={<Icon as={FaPhone} boxSize={6} />}
                label="Phone"
                value="+1 (123) 456-7890"
              />
            </Grid>
          </Container>
        </Box>
      );
}

export default ContactUsPage