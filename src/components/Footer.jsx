// components/Footer.jsx
import React from 'react';
import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Link,
  IconButton,
  Heading
} from '@chakra-ui/react';
import {
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaLinkedin
} from 'react-icons/fa';

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight="bold" fontSize="lg" mb={2}>
      {children}
    </Text>
  );
};

function Footer() {
  return (
    <Box bg="black" color="white">
      <Container as={Stack} maxW="1200px" py={{ base: 8, md: 10 }} px={{ base: 4, md: 8 }}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={{ base: 10, md: 8 }}>
          {/* About Column */}
          <Stack spacing={6}>
            <Box>
              <Flex align="center" mb={2}>
                <Heading size="md">Brandomo</Heading>
              </Flex>
              <Text fontSize="sm" mt={4}>
                Revolutionizing creative content production with solutions that deliver exceptional results faster and more affordably than traditional methods.
              </Text>
            </Box>
          </Stack>

          {/* Links Column */}
          <Stack align="flex-start">
            <ListHeader>Quick Links</ListHeader>
            <Link href="#services">Services</Link>
            <Link href="#portfolio">Portfolio</Link>
            <Link href="#about">About Us</Link>
            <Link href="#contact">Contact</Link>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
          </Stack>

          {/* Contact Column */}
          <Stack align="flex-start">
            <ListHeader>Contact Info</ListHeader>
            <Text>brandomo.official@gmail.com</Text>
            <Text>+91 9579171844</Text>
            <Text>+91 91127 30101</Text>

            <Stack direction="row" spacing={4} mt={4}>
              <IconButton
                as="a"
                href="https://x.com/Brandomo99"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                icon={<FaTwitter />}
                size="md"
                color="white"
                variant="ghost"
                _hover={{ bg: "whiteAlpha.200" }}
              />
              <IconButton
                as="a"
                href="https://www.youtube.com/@Brandomo-99"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                icon={<FaYoutube />}
                size="md"
                color="white"
                variant="ghost"
                _hover={{ bg: "whiteAlpha.200" }}
              />
              <IconButton
                as="a"
                href="https://www.instagram.com/brandomo.official?igsh=NnNyeWt3Z212NnN2&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                icon={<FaInstagram />}
                size="md"
                color="white"
                variant="ghost"
                _hover={{ bg: "whiteAlpha.200" }}
              />
              <IconButton
                as="a"
                href="https://www.linkedin.com/company/107283196/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                icon={<FaLinkedin />}
                size="md"
                color="white"
                variant="ghost"
                _hover={{ bg: "whiteAlpha.200" }}
              />
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>

      <Box borderTopWidth={1} borderColor="gray.600">
        <Flex
          align="center"
          justify="center"
          py={{ base: 5, md: 4 }}
          px={{ base: 4, md: 0 }}
          textAlign="center"
        >
          <Text fontSize={{ base: "sm", md: "md" }}>© 2025 Brandomo. All rights reserved.</Text>
        </Flex>
      </Box>
    </Box>
  );
}

export default Footer;