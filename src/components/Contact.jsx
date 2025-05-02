// components/Contact.jsx
import React, { useState } from 'react';
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
  useToast,
  FormControl,
  FormLabel,
  Flex,
  IconButton
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

function Contact({ id }) {
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    brief: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // The form will be handled by Netlify Forms
    // We're just showing the success toast here

    // Show success toast with custom styling
    toast({
      title: "Form submitted!",
      description: "We'll get back to you shortly.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
      render: ({ title, description, onClose }) => (
        <Box
          bgGradient="linear(to-r, brand.orange, brand.yellow)"
          color="white"
          p={4}
          borderRadius="md"
          boxShadow="lg"
        >
          <Flex justify="space-between" align="center">
            <Box>
              <Heading size="md" mb={1}>{title}</Heading>
              <Text>{description}</Text>
            </Box>
            <IconButton
              icon={<CloseIcon />}
              variant="ghost"
              colorScheme="whiteAlpha"
              size="sm"
              onClick={onClose}
              aria-label="Close notification"
            />
          </Flex>
        </Box>
      ),
    });

    // Reset form after submission
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      service: '',
      brief: ''
    });

    setIsSubmitting(false);
  };

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
            onSubmit={handleSubmit}
          >
            {/* Hidden fields for Netlify Forms */}
            <input type="hidden" name="form-name" value="contact" />
            <input type="hidden" name="bot-field" />
            <VStack spacing={6}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Company</FormLabel>
                <Input
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your company name"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Phone</FormLabel>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your contact number"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Service Interested</FormLabel>
                <Select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
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
                  value={formData.brief}
                  onChange={handleChange}
                  placeholder="Tell us about your project and requirements"
                  minHeight="150px"
                />
              </FormControl>

              <Button
                type="submit"
                isLoading={isSubmitting}
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