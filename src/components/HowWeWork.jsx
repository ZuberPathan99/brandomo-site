// components/HowWeWork.jsx
import React, { useRef } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  SimpleGrid,
  Circle,
  VStack,
  HStack,
  Icon,
  useBreakpointValue
} from '@chakra-ui/react';
import { motion, useInView } from 'framer-motion';
import { FaLightbulb, FaRocket, FaMagic, FaCheckCircle } from 'react-icons/fa';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

const WorkStep = ({ number, title, description, icon }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <MotionBox
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0, transition: { duration: 0.5, delay: number * 0.1 } } : {}}
      position="relative"
    >
      <VStack spacing={6} width="100%" position="relative" align="center">
        <Circle
          size="80px"
          bgGradient="linear(to-br, brand.orange, brand.yellow)"
          color="white"
          fontSize="xl"
          fontWeight="bold"
          boxShadow="lg"
        >
          {number}
        </Circle>

        <VStack spacing={4} align="center">
          <Heading size="md" textAlign="center">{title}</Heading>
          <Icon as={icon} color="brand.orange" boxSize={6} />
          <Text color="gray.600" textAlign="center" maxW="300px">
            {description}
          </Text>
        </VStack>
      </VStack>
    </MotionBox>
  );
};

function HowWeWork() {
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true, margin: "-100px" });

  const steps = [
    {
      number: 1,
      title: "Discovery",
      description: "We start by understanding your brand, goals, and target audience to create a tailored creative strategy.",
      icon: FaLightbulb
    },
    {
      number: 2,
      title: "Creation",
      description: "Our AI-powered tools generate multiple creative options based on your requirements and brand guidelines.",
      icon: FaMagic
    },
    {
      number: 3,
      title: "Refinement",
      description: "Our expert team reviews and refines the AI-generated content to ensure it meets our high quality standards.",
      icon: FaCheckCircle
    },
    {
      number: 4,
      title: "Delivery",
      description: "We deliver the final assets in your preferred format, ready to use across all your marketing channels.",
      icon: FaRocket
    }
  ];

  return (
    <Box
      py={20}
      position="relative"
      overflow="hidden"
      bg="gray.50"
    >
      {/* Background elements */}
      <Box
        position="absolute"
        top="-10%"
        right="-5%"
        width="300px"
        height="300px"
        borderRadius="full"
        bg="brand.orange"
        opacity={0.03}
      />

      <Box
        position="absolute"
        bottom="-10%"
        left="-5%"
        width="400px"
        height="400px"
        borderRadius="full"
        bg="brand.yellow"
        opacity={0.03}
      />

      <Container maxW="container.xl" position="relative">
        {/* Section header */}
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
              Our Process
            </Text>
            <Box w="24px" h="3px" bg="brand.orange" borderRadius="full" />
          </HStack>

          <MotionHeading
            as="h2"
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="bold"
            mb={4}
          >
            How We Work
          </MotionHeading>

          <MotionText
            fontSize={{ base: "lg", md: "xl" }}
            color="brand.muted"
            maxW="container.md"
            mx="auto"
            px={{ base: 4, md: 0 }}
          >
            Our streamlined process combines AI efficiency with human expertise to deliver exceptional creative content quickly and consistently.
          </MotionText>
        </MotionFlex>

        {/* Process flow diagram */}
        <Box
          position="relative"
          bg="white"
          borderRadius="xl"
          shadow="md"
          p={8}
          py={12}
          overflow="hidden"
        >
          {/* Decorative elements */}
          <Box
            position="absolute"
            top="-50px"
            right="-50px"
            width="200px"
            height="200px"
            borderRadius="full"
            bgGradient="linear(to-br, brand.orange, brand.yellow)"
            opacity={0.1}
          />

          <Box
            position="absolute"
            bottom="-30px"
            left="30%"
            width="100px"
            height="100px"
            borderRadius="full"
            bg="brand.orange"
            opacity={0.05}
          />

          {/* Process steps */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10} position="relative">
            {steps.map((step, index) => (
              <Box key={index} position="relative">
                {/* Connecting line for desktop */}
                {index < steps.length - 1 && (
                  <Box
                    display={{ base: "none", lg: "block" }}
                    position="absolute"
                    top="40px"
                    left="calc(50% + 40px)"
                    height="2px"
                    bgGradient="linear(to-r, brand.orange, brand.yellow)"
                    width="calc(100% - 40px)"
                    zIndex={1}
                  />
                )}

                <WorkStep
                  key={step.number}
                  number={step.number}
                  title={step.title}
                  description={step.description}
                  icon={step.icon}
                />
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
}

export default HowWeWork;
