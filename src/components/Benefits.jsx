// components/Benefits.jsx
import React from 'react';
import {
  Box,
  Heading,
  Text,
  Container,
  SimpleGrid,
  Flex,
  Icon
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

function Benefits() {
  const benefits = [
    {
      title: "Lightning-Fast Turnarounds",
      description: "Get polished visuals in as little as 1-2 business days, not weeks."
    },
    {
      title: "Zero Technical Expertise Needed",
      description: "We handle all the technical work under the hood."
    },
    {
      title: "Human-Perfected Quality",
      description: "Every asset is vetted and refined by experts to match your brand's style."
    },
    {
      title: "Global Reach & Support",
      description: "Whether you're in Mumbai, Dubai or New York, we've got you covered—24/7."
    }
  ];

  return (
    <Box
      py={16}
      bgGradient="linear(to-br, brand.orange, brand.yellow)"
      color="white"
      position="relative"
      overflow="hidden"
    >
      {/* Subtle pattern overlay */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bgImage="url('data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E')"
        zIndex="0"
      />
      <Container maxW="1200px" position="relative" zIndex="1">
        <Heading
          textAlign="center"
          mb={12}
          size="xl"
          fontWeight="800"
          letterSpacing="tight"
          textShadow="0 2px 10px rgba(0,0,0,0.1)"
        >
          Why Choose Brandomo?
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 6, md: 10 }} px={{ base: 4, md: 0 }}>
          {benefits.map((benefit, index) => (
            <Box
              key={index}
              bg="whiteAlpha.200"
              p={{ base: 5, md: 6 }}
              borderRadius="xl"
              shadow="md"
              transition="transform 0.3s ease"
              _hover={{ transform: "translateY(-5px)" }}
            >
              <Flex align="flex-start" mb={3}>
                <Icon as={CheckCircleIcon} color="white" boxSize={{ base: 5, md: 6 }} mr={3} mt={1} />
                <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold">{benefit.title}</Text>
              </Flex>
              <Text fontSize={{ base: "sm", md: "md" }} ml={{ base: 8, md: 9 }} opacity={0.9}>{benefit.description}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export default Benefits;