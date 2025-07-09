// components/Testimonials.jsx
import React from 'react';
import {
  Box,
  Stack,
  Heading,
  Text,
  Avatar,
  Flex,
  Icon,
  HStack,
  useBreakpointValue
} from '@chakra-ui/react';

import { FaQuoteLeft } from 'react-icons/fa';

const TestimonialCard = ({ name, position, quote, avatarSrc }) => {
  return (
    <Box
      bg="white"
      p={6}
      borderRadius="lg"
      shadow="md"
      minW={{ base: "280px", md: "350px" }}
      maxW={{ base: "90vw", md: "350px" }}
      mx={2}
    >
      <Icon as={FaQuoteLeft} boxSize={6} color="brand.orange" mb={4} opacity={0.7} />
      <Text fontSize="md" mb={6}>
        {quote}
      </Text>
      <Flex align="center">
        <Avatar size="md" src={avatarSrc || "/api/placeholder/80/80"} mr={4} />
        <Box>
          <Text fontWeight="bold">{name}</Text>
          <Text fontSize="sm" color="gray.600">{position}</Text>
        </Box>
      </Flex>
    </Box>
  );
};

function Testimonials() {
  const testimonialsData = [
    {
      name: "Sarah Johnson",
      position: "Marketing Director, Chronoelite",
      quote: "Brandomo transformed our product imagery in just 24 hours. The professional results were beyond our expectations and helped increase our conversion rate by 35%.",
      avatarSrc: "/api/placeholder/80/80"
    },
    {
      name: "Anjali Mehta",
      position: "Creative Director, Vespera Beauty",
      quote: "Brandomo captured the essence of Vespera perfectly—every shot, warm highlight, and product detail popped on screen. We've never had a video that feels this editorial and utterly aspirational.",
      avatarSrc: "/api/placeholder/80/80"
    },
    {
      name: "Luca Carver",
      position: "Brand Manager, Organic Peach Co",
      quote: "The CGI Brandomo delivered for our Peach & Bloom Tea looks so real you can almost taste the fruit. Their attention to texture and light turned our organic peach essence into pure visual poetry.",
      avatarSrc: "/api/placeholder/80/80"
    }
  ];

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box py={16} px={{ base: 4, md: 8 }} bg="gray.50">
      <Box maxW="1200px" mx="auto">
        <Heading mb={12} textAlign="center">
          Client Success Stories
        </Heading>

        <Box overflowX="auto" pb={4}>
          <HStack spacing={6} alignItems="stretch" py={4} px={2}>
            {testimonialsData.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                name={testimonial.name}
                position={testimonial.position}
                quote={testimonial.quote}
                avatarSrc={testimonial.avatarSrc}
              />
            ))}
          </HStack>
        </Box>
      </Box>
    </Box>
  );
}

export default Testimonials;