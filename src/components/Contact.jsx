// components/Contact.jsx
import React from 'react';
import {
  Box,
  Container,
  Heading,
  Input,
  Button,
  VStack,
  Text,
  Textarea,
  Select,
  FormControl,
  FormLabel
} from '@chakra-ui/react';

function Contact({ id }) {

  return (
    <Box py={{ base: 12, md: 16 }} px={{ base: 4, md: 8 }} id={id}>
      <Container maxW="800px">
        <Heading
          mb={{ base: 8, md: 10 }}
          textAlign="center"
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
        >
          Request a Consultation
        </Heading>

        <Box
          bg="white"
          p={{ base: 5, md: 10 }}
          borderRadius="lg"
          shadow="md"
          mx={{ base: 2, md: 0 }}
        >
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            action="/success"
          >
            {/* Hidden fields for Netlify Forms */}
            <input type="hidden" name="form-name" value="contact" />
            <div hidden>
              <input name="bot-field" />
            </div>
            <VStack spacing={6}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  name="name"
                  placeholder="Your full name"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Company</FormLabel>
                <Input
                  name="company"
                  placeholder="Your company name"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Phone</FormLabel>
                <Input
                  name="phone"
                  placeholder="Your contact number"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Service Interested</FormLabel>
                <Select
                  name="service"
                  placeholder="Select service"
                >
                  <option value="Product Photography">Product Photography</option>
                  <option value="Video Ads & Commercials">Video Ads & Commercials</option>
                  <option value="Graphic Design & Campaigns">Graphic Design & Campaigns</option>
                  <option value="Voiceovers & Audio">Voiceovers & Audio</option>
                  <option value="CGI & 3D Modeling">CGI & 3D Modeling</option>
                  <option value="Other">Other</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Project Brief</FormLabel>
                <Textarea
                  name="brief"
                  placeholder="Tell us about your project and requirements"
                  minHeight="150px"
                />
              </FormControl>

              <Button
                type="submit"
                bgGradient="linear(to-r, brand.orange, brand.yellow)"
                color="white"
                size="lg"
                width="full"
                _hover={{
                  bgGradient: "linear(to-l, brand.orange, brand.yellow)",
                  transform: "scale(1.03)",
                  boxShadow: "md"
                }}
              >
                Request Consultation
              </Button>
            </VStack>
          </form>
        </Box>
      </Container>
    </Box>
  );
}

export default Contact;