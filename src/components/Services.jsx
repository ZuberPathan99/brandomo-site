// components/Services.jsx
import React, { useRef } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Icon,
  Link,
  Flex,
  Grid,
  GridItem,
  AspectRatio,
  HStack,
  VStack,
  Button
} from '@chakra-ui/react';
import { motion, useInView } from 'framer-motion';
import { FaCamera, FaVideo, FaPencilAlt, FaMicrophone, FaCube, FaHeadphones } from 'react-icons/fa';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionFlex = motion(Flex);
const MotionGrid = motion(Grid);

const ServiceCard = ({ title, description, icon, index, color, imageSrc }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <MotionGrid
      ref={ref}
      templateColumns={{ base: "1fr", md: "1fr 1fr" }}
      gap={6}
      p={6}
      borderRadius="2xl"
      bg="white"
      shadow="md"
      position="relative"
      overflow="hidden"
      transition="all 0.3s ease"
      _hover={{ shadow: "xl", transform: "translateY(-5px)" }}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0, transition: { delay: index * 0.1 } } : {}}
    >
      {/* Content */}
      <GridItem>
        <VStack align="flex-start" spacing={4} h="full" justify="center">
          <Flex
            align="center"
            justify="center"
            w="60px"
            h="60px"
            borderRadius="lg"
            bg={`${color}.50`}
            color={`${color}.500`}
          >
            <Icon as={icon} boxSize={6} />
          </Flex>

          <Heading size="md">{title}</Heading>

          <Text color="brand.muted" fontSize="md">
            {description}
          </Text>
        </VStack>
      </GridItem>

      {/* Image */}
      <GridItem>
        <AspectRatio ratio={4/3} w="full" h="full" borderRadius="xl" overflow="hidden">
          <Box
            bgImage={`url(${imageSrc || "/api/placeholder/400/300"})`}
            bgSize="cover"
            bgPosition="center"
            transition="transform 0.6s ease"
            _hover={{ transform: "scale(1.05)" }}
          />
        </AspectRatio>
      </GridItem>

      {/* Decorative elements */}
      <Box
        position="absolute"
        bottom="-20px"
        right="-20px"
        w="100px"
        h="100px"
        borderRadius="full"
        bg={`${color}.50`}
        opacity={0.3}
      />
    </MotionGrid>
  );
};

function Services() {
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true, margin: "-100px" });

  const services = [
    {
      title: "Product Photography",
      description: "Stunning AI-generated product photos that highlight every detail, perfect for e-commerce and marketing.",
      icon: FaCamera,
      color: "blue",
      imageSrc: "/api/placeholder/400/300"
    },
    {
      title: "Video Ads & Commercials",
      description: "Engaging video content that captures attention and drives conversions across all platforms.",
      icon: FaVideo,
      color: "red",
      imageSrc: "/api/placeholder/400/300"
    },
    {
      title: "Graphic Design & Campaigns",
      description: "Eye-catching visuals for all your branding, marketing and social media needs.",
      icon: FaPencilAlt,
      color: "green",
      imageSrc: "/api/placeholder/400/300"
    },
    {
      title: "Voiceovers & Audio",
      description: "Professional audio production with AI-generated voices in multiple languages and styles.",
      icon: FaMicrophone,
      color: "purple",
      imageSrc: "/api/placeholder/400/300"
    },
    {
      title: "CGI & 3D Modeling",
      description: "Photorealistic 3D models and animations that bring your product concepts to life.",
      icon: FaCube,
      color: "teal",
      imageSrc: "/api/placeholder/400/300"
    },
    {
      title: "Audio Branding",
      description: "Create a distinctive audio identity with custom jingles, sound effects, and music.",
      icon: FaHeadphones,
      color: "orange",
      imageSrc: "/api/placeholder/400/300"
    }
  ];

  return (
    <Box py={24} px={4} bg="bg.offWhite" position="relative" id="services">
      {/* Background decorations */}
      <Box
        position="absolute"
        top="10%"
        left="5%"
        w="300px"
        h="300px"
        borderRadius="full"
        bg="brand.yellow"
        filter="blur(180px)"
        opacity={0.1}
      />

      <Box
        position="absolute"
        bottom="10%"
        right="5%"
        w="400px"
        h="400px"
        borderRadius="full"
        bg="brand.orange"
        filter="blur(180px)"
        opacity={0.1}
      />

      <Container maxW="container.xl" position="relative">
        {/* Section title */}
        <MotionFlex
          ref={titleRef}
          direction="column"
          align="center"
          textAlign="center"
          mb={16}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <HStack mb={3}>
            <Box w="24px" h="3px" bg="brand.orange" borderRadius="full" />
            <Text
              textTransform="uppercase"
              letterSpacing="wider"
              fontWeight="semibold"
              color="brand.orange"
            >
              Our Services
            </Text>
            <Box w="24px" h="3px" bg="brand.orange" borderRadius="full" />
          </HStack>

          <MotionHeading
            as="h2"
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="bold"
            mb={4}
          >
            Transforming Ideas Into Reality
          </MotionHeading>

          <MotionText
            fontSize={{ base: "lg", md: "xl" }}
            color="brand.muted"
            maxW="container.md"
            mx="auto"
          >
            Discover our comprehensive suite of AI-powered creative services designed to elevate your brand
            and captivate your audience across all digital platforms.
          </MotionText>
        </MotionFlex>

        {/* Services grid */}
        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr" }}
          gap={8}
        >
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              index={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              color={service.color}
              imageSrc={service.imageSrc}
            />
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Services;