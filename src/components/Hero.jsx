// components/Hero.jsx
import React, { useRef, useEffect, useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Flex,
  Stack,
  Image,
  Grid,
  GridItem,
  HStack,
  VStack
} from '@chakra-ui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRightIcon } from '@chakra-ui/icons';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionImage = motion(Image);
const MotionFlex = motion(Flex);

function Hero() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Handle video autoplay after 5 seconds
  useEffect(() => {
    if (videoRef.current) {
      // Add event listener for when video is loaded
      videoRef.current.addEventListener('loadeddata', () => {
        setVideoLoaded(true);
      });

      // Set up timer to play video after 5 seconds
      const timer = setTimeout(() => {
        if (videoRef.current && videoLoaded) {
          videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
        }
      }, 5000);

      return () => {
        clearTimeout(timer);
        if (videoRef.current) {
          videoRef.current.removeEventListener('loadeddata', () => {
            setVideoLoaded(true);
          });
        }
      };
    }
  }, [videoLoaded]);

  const scrollToContact = () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  };

  // Animation variants
  const fadeInUp = {
    initial: { y: 60, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <Box
      ref={heroRef}
      position="relative"
      pt={{ base: 24, md: 32 }}
      pb={{ base: 24, md: 32 }}
      overflow="hidden"
    >
      {/* Background elements */}
      <MotionBox
        position="absolute"
        top="20%"
        left="5%"
        w="40px"
        h="40px"
        borderRadius="full"
        bg="brand.yellow"
        filter="blur(50px)"
        opacity={0.6}
        style={{ y: parallaxY }}
      />

      <MotionBox
        position="absolute"
        bottom="10%"
        right="10%"
        w="120px"
        h="120px"
        borderRadius="full"
        bg="brand.orange"
        filter="blur(80px)"
        opacity={0.3}
        style={{ y: useTransform(parallaxY, v => v * -0.5) }}
      />

      <MotionBox
        position="absolute"
        top="60%"
        left="20%"
        w="200px"
        h="200px"
        borderRadius="full"
        bgGradient="radial(brand.orange, transparent)"
        filter="blur(100px)"
        opacity={0.2}
        style={{ y: useTransform(parallaxY, v => v * 0.2) }}
      />

      {/* Main content */}
      <Container maxW="container.xl" position="relative" style={{ opacity }}>
        <Grid
          templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
          gap={{ base: 12, lg: 16 }}
          alignItems="center"
        >
          {/* Left column - Text content */}
          <GridItem>
            <MotionFlex
              direction="column"
              align={{ base: "center", lg: "flex-start" }}
              textAlign={{ base: "center", lg: "left" }}
              variants={staggerChildren}
              initial="initial"
              animate="animate"
            >
              <MotionBox
                mb={6}
                variants={fadeInUp}
              >
                <HStack
                  display="inline-flex"
                  bg="brand.light"
                  color="brand.orange"
                  px={4}
                  py={2}
                  borderRadius="full"
                  fontSize="sm"
                  fontWeight="medium"
                >
                  <Box as="span">AI-POWERED CREATIVE STUDIO</Box>
                </HStack>
              </MotionBox>

              <MotionHeading
                as="h1"
                fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
                fontWeight="bold"
                lineHeight={{ base: "1.3", md: "1.1" }}
                mb={6}
                variants={fadeInUp}
                maxW={{ base: "100%", md: "90%" }}
              >
                <Box as="span" position="relative" display="inline-block">
                  Smart
                  <Box
                    position="absolute"
                    bottom="-4px"
                    left="0"
                    height="6px"
                    width="100%"
                    bgGradient="linear(to-r, brand.orange, brand.yellow)"
                    borderRadius="full"
                    opacity="0.6"
                  />
                </Box>
                . Swift. Stunning.
              </MotionHeading>

              <MotionText
                fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                fontWeight="medium"
                color="brand.muted"
                mb={8}
                maxW="560px"
                variants={fadeInUp}
              >
                Revolutionizing creative production with AI-driven solutions that deliver extraordinary results in record time.
              </MotionText>

              <MotionBox variants={fadeInUp}>
                <Stack
                  direction={{ base: "column", md: "row" }}
                  spacing={4}
                  w={{ base: "full", md: "auto" }}
                >
                  <Button
                    size="lg"
                    variant="gradient"
                    px={8}
                    py={7}
                    fontSize="md"
                    fontWeight="500"
                    onClick={scrollToContact}
                    rightIcon={<ChevronRightIcon />}
                  >
                    Book Your Consultation
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    px={8}
                    py={7}
                    fontSize="md"
                    fontWeight="500"
                    onClick={() => {
                      document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    View Our Work
                  </Button>
                </Stack>
              </MotionBox>
            </MotionFlex>
          </GridItem>

          {/* Right column - Visual content */}
          <GridItem>
            <MotionBox
              position="relative"
              h={{ base: "400px", md: "500px", lg: "600px" }}
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              <MotionBox
                position="absolute"
                top="5%"
                right="10%"
                w={{ base: "140px", md: "180px" }}
                h={{ base: "180px", md: "240px" }}
                borderRadius="3xl"
                overflow="hidden"
                shadow="lg"
                variants={fadeInUp}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 2, 0],
                  transition: {
                    duration: 8,
                    ease: "easeInOut",
                    repeat: Infinity
                  }
                }}
              >
                <Image
                  src="/perfume-model.png"
                  alt="Perfume product photography"
                  w="full"
                  h="full"
                  objectFit="contain"
                  bg="white"
                  transition="transform 0.3s ease"
                  _hover={{ transform: "scale(1.05)" }}
                />
              </MotionBox>

              <MotionBox
                position="absolute"
                top="30%"
                left="15%"
                w={{ base: "180px", md: "240px" }}
                h={{ base: "240px", md: "320px" }}
                borderRadius="3xl"
                overflow="hidden"
                shadow="xl"
                variants={fadeInUp}
                animate={{
                  y: [0, 15, 0],
                  transition: {
                    duration: 7,
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: 1
                  }
                }}
              >
                <Box
                  as="video"
                  ref={videoRef}
                  src="/perfume-video.mp4"
                  w="full"
                  h="full"
                  objectFit="cover"
                  borderRadius="3xl"
                  muted
                  loop
                  playsInline
                  sx={{
                    '&:hover': {
                      transform: 'scale(1.05)',
                      transition: 'transform 0.3s ease'
                    }
                  }}
                />
              </MotionBox>

              {/* Floating badges */}
              <MotionBox
                position="absolute"
                bottom="30%"
                right="5%"
                zIndex={1}
                animate={{
                  y: [0, -10, 0],
                  transition: {
                    duration: 5,
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: 2
                  }
                }}
              >
                <VStack
                  bg="white"
                  shadow="lg"
                  borderRadius="xl"
                  p={3}
                  spacing={1}
                  align="center"
                >
                  <Text fontWeight="bold" fontSize="sm">24-Hour Delivery</Text>
                  <Text fontSize="xs" color="brand.muted">For urgent projects</Text>
                </VStack>
              </MotionBox>

              <MotionBox
                position="absolute"
                top="20%"
                left="2%"
                zIndex={1}
                animate={{
                  y: [0, 10, 0],
                  transition: {
                    duration: 4,
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: 1
                  }
                }}
              >
                <HStack
                  bg="white"
                  shadow="lg"
                  borderRadius="xl"
                  p={3}
                  spacing={2}
                  align="center"
                >
                  <Box
                    borderRadius="full"
                    bg="green.400"
                    w="10px"
                    h="10px"
                  />
                  <Text fontWeight="bold" fontSize="sm">AI-Powered</Text>
                </HStack>
              </MotionBox>
            </MotionBox>
          </GridItem>
        </Grid>
      </Container>

      {/* Scroll indicator */}
      <MotionBox
        position="absolute"
        bottom="40px"
        left="50%"
        transform="translateX(-50%)"
        animate={{
          y: [0, 10, 0],
          transition: {
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity
          }
        }}
        style={{ opacity }}
      >
        <VStack spacing={2}>
          <Text fontSize="sm" fontWeight="medium" color="brand.muted">Scroll</Text>
          <Box h="30px" w="1px" bg="brand.muted" opacity={0.5} />
        </VStack>
      </MotionBox>
    </Box>
  );
}

export default Hero;