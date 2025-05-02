// components/Portfolio.jsx
import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Flex,
  HStack,
  VStack,
  Image,
  AspectRatio,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Tag
} from '@chakra-ui/react';

import { motion, useInView } from 'framer-motion';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

// Portfolio item component
const PortfolioItem = ({ item }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // No need for video autoplay handling with YouTube embed

  return (
    <>
      <MotionBox
        borderRadius="xl"
        overflow="hidden"
        bg="white"
        shadow="md"
        position="relative"
        cursor={item.type === 'video' || item.category === 'Photography' ? 'default' : 'pointer'}
        onClick={item.type === 'video' || item.category === 'Photography' ? undefined : onOpen}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        {item.type === 'video' ? (
          item.youtubeId ? (
            <AspectRatio ratio={item.aspectRatio || 9/16}>
              <iframe
                src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=0&controls=1&loop=1&playlist=${item.youtubeId}&modestbranding=1&rel=0&start=0&iv_load_policy=3&fs=1&enablejsapi=1`}
                title={item.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; microphone; camera"
                allowFullScreen
                // borderRadius is applied via style prop instead
                style={{ borderRadius: '12px', overflow: 'hidden' }}
              />
            </AspectRatio>
          ) : (
            <AspectRatio ratio={item.aspectRatio || 16/9}>
              <Box
                as="video"
                src={item.media}
                muted
                playsInline
                loop
                width="100%"
                height="100%"
                objectFit="cover"
                style={{ borderRadius: '12px' }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.currentTarget.play();
                }}
                _hover={{ cursor: 'pointer' }}
              />
            </AspectRatio>
          )
        ) : (
          <AspectRatio ratio={item.thumbnailRatio || item.aspectRatio || 4/3}>
            <Box position="relative" width="100%" height="100%" overflow="hidden">
              <Image
                src={item.thumbnail}
                alt={item.title}
                position="absolute"
                top="0"
                left="0"
                width="100%"
                height="100%"
                objectFit="cover"
                objectPosition={
                  item.title === "Luxury Perfume Campaign" ? "top" :
                  item.title === "Luxury Watch Collection" ? "top" :
                  item.title === "Premium Watch Photography" ? "top" :
                  item.title === "Luxury Watch Poster" ? "center" : "center"
                }
                transition="transform 0.5s ease"
                _hover={{ transform: "scale(1.05)" }}
                bg={
                  item.title === "Premium Watch Photography" ? "gray.50" :
                  item.title === "Luxury Watch Poster" ? "gray.100" : "gray.50"
                }
              />
            </Box>
          </AspectRatio>
        )}

        {/* Overlay on hover - only for items that open modal (not videos or photography) */}
        {!(item.type === 'video' || item.category === 'Photography') && (
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            bg="blackAlpha.700"
            opacity="0"
            transition="opacity 0.3s ease"
            _hover={{ opacity: 1 }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            p={4}
            color="white"
          >
            <Heading size="md" mb={2} textAlign="center">{item.title}</Heading>
            <Text fontSize="sm" textAlign="center">Click to view details</Text>
          </Box>
        )}

        {/* Category tag */}
        <Tag
          position="absolute"
          top="3"
          right="3"
          bg="brand.orange"
          color="white"
          fontWeight="medium"
          size="sm"
        >
          {item.category}
        </Tag>
      </MotionBox>

      {/* Modal for detailed view */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay bg="blackAlpha.800" backdropFilter="blur(10px)" />
        <ModalContent borderRadius="xl" overflow="hidden">
          <ModalHeader
            bgGradient="linear(to-r, brand.orange, brand.yellow)"
            color="white"
            py={4}
          >
            {item.title}
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody p={0}>
            <Box>
              {/* Main content - image or video */}
              <Box>
                {item.type === 'video' ? (
                  item.youtubeId ? (
                    <AspectRatio ratio={item.aspectRatio || 9/16}>
                      <iframe
                        src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=0&controls=1&loop=1&playlist=${item.youtubeId}&modestbranding=1&rel=0&start=0&iv_load_policy=3&fs=1&enablejsapi=1&vq=hd720`}
                        title={item.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; microphone; camera"
                        allowFullScreen
                        width="100%"
                        height="100%"
                        style={{ borderRadius: '12px', overflow: 'hidden' }}
                      />
                    </AspectRatio>
                  ) : (
                    <AspectRatio ratio={item.aspectRatio || 16/9}>
                      <Box
                        as="video"
                        src={item.media}
                        controls
                        autoPlay
                        loop
                        muted
                        playsInline
                        width="100%"
                        height="100%"
                        objectFit="contain"
                        bg="black"
                        borderRadius="md"
                      />
                    </AspectRatio>
                  )
                ) : item.type === 'audio' ? (
                  <Box p={6} bg="gray.50">
                    <Box
                      as="audio"
                      src={item.media}
                      controls
                      width="100%"
                      my={4}
                    />
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      borderRadius="lg"
                      mx="auto"
                      maxH="300px"
                    />
                  </Box>
                ) : (
                  <AspectRatio ratio={item.aspectRatio || 4/3}>
                    <Box position="relative" width="100%" height="100%" overflow="hidden">
                      <Image
                        src={item.media || item.thumbnail}
                        alt={item.title}
                        position="absolute"
                        top="0"
                        left="0"
                        width="100%"
                        height="100%"
                        objectFit={
                          item.title === "Premium Watch Photography" ? "cover" :
                          item.title === "Luxury Watch Poster" ? "contain" : "cover"
                        }
                        objectPosition={
                          item.title === "Luxury Perfume Campaign" ? "top" :
                          item.title === "Luxury Watch Collection" ? "top" :
                          item.title === "Premium Watch Photography" ? "top" :
                          item.title === "Luxury Watch Poster" ? "center" : "center"
                        }
                        bg={
                          item.title === "Premium Watch Photography" ? "gray.50" :
                          item.title === "Luxury Watch Poster" ? "black" : "gray.50"
                        }
                      />
                    </Box>
                  </AspectRatio>
                )}
              </Box>

              {/* Project details */}
              <VStack
                align="start"
                p={6}
                spacing={4}
                bg={item.title === "Luxury Watch Poster" ? "black" : "white"}
              >
                <Box>
                  <Heading
                    size="sm"
                    mb={2}
                    color={item.title === "Luxury Watch Poster" ? "white" : "gray.700"}
                  >
                    The Brief
                  </Heading>
                  <Text
                    color={item.title === "Luxury Watch Poster" ? "gray.300" : "gray.600"}
                  >
                    {item.brief}
                  </Text>
                </Box>

                <Box>
                  <Heading
                    size="sm"
                    mb={2}
                    color={item.title === "Luxury Watch Poster" ? "white" : "gray.700"}
                  >
                    The Result
                  </Heading>
                  <Text
                    color={item.title === "Luxury Watch Poster" ? "gray.300" : "gray.600"}
                  >
                    {item.result}
                  </Text>
                </Box>

                {item.features && (
                  <Box width="100%">
                    <Heading
                      size="sm"
                      mb={2}
                      color={item.title === "Luxury Watch Poster" ? "white" : "gray.700"}
                    >
                      Features
                    </Heading>
                    <SimpleGrid columns={2} spacing={2}>
                      {item.features.map((feature, index) => (
                        <Text
                          key={index}
                          fontSize="sm"
                          color={item.title === "Luxury Watch Poster" ? "gray.300" : "gray.600"}
                        >
                          • {feature}
                        </Text>
                      ))}
                    </SimpleGrid>
                  </Box>
                )}
              </VStack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true, margin: "-100px" });

  // Portfolio items data
  const portfolioItems = [
    {
      id: 1,
      title: "Luxury Perfume Campaign",
      category: "Photography",
      type: "image",
      thumbnail: "/perfume-model.png",
      media: "/perfume-model.png",
      aspectRatio: 3/4, // Portrait aspect ratio for perfume image
      brief: "Create a high-end product photography series for a luxury perfume brand launching their signature scent.",
      result: "Delivered a set of 10 stunning product images that captured the elegance and exclusivity of the brand, resulting in a 40% increase in pre-launch sign-ups.",
      features: ["Studio lighting", "Luxury styling", "Multiple angles", "Lifestyle shots"]
    },
    {
      id: 2,
      title: "Luxury Watch Collection",
      category: "Photography",
      type: "image",
      thumbnail: "/watch-model.png",
      media: "/watch-model.png",
      aspectRatio: 3/4, // Portrait aspect ratio for watch model image to match perfume image
      brief: "Develop a sophisticated product photography series for a premium watch brand's new collection launch.",
      result: "Created an elegant set of images that highlighted the craftsmanship and luxury appeal of the watches, contributing to a 35% increase in online sales.",
      features: ["Detail macro shots", "Premium styling", "Material highlighting", "Lifestyle context"]
    },
    {
      id: 3,
      title: "Premium Watch Photography",
      category: "Photography",
      type: "image",
      thumbnail: "/new-watch.png",
      media: "/new-watch.png",
      aspectRatio: 3/4, // Portrait aspect ratio to match perfume image
      brief: "Create detailed product photography for a luxury watch brand's flagship model, highlighting craftsmanship and design details.",
      result: "Produced a series of high-quality images that showcased the watch's premium features, contributing to a 45% increase in conversion rate for the featured product.",
      features: ["Macro photography", "Detail focus", "Material textures", "Professional lighting"]
    },
    {
      id: 4,
      title: "Lipstick Brand Video Ad",
      category: "Video",
      type: "video",
      thumbnail: "/api/placeholder/600/400", // Not used for direct video playback
      media: "https://www.youtube.com/embed/a8XQ-TVsUKs",
      aspectRatio: 9/16, // Using 9:16 for vertical shorts video
      youtubeId: "a8XQ-TVsUKs", // YouTube video ID
      brief: "Create a captivating video ad for a premium lipstick brand that showcases the product's vibrant colors and long-lasting formula.",
      result: "Delivered a visually stunning video that highlighted the product's key features, resulting in a 65% increase in online sales within the first month of the campaign.",
      features: ["Close-up product shots", "Color transition effects", "Elegant typography", "Emotional storytelling"]
    },
    {
      id: 5,
      title: "Luxury Watch Poster",
      category: "Graphics",
      type: "image",
      thumbnail: "/watch-poster.png",
      media: "/watch-poster.png",
      aspectRatio: 1/1.414, // Standard poster aspect ratio (A4)
      brief: "Design a sophisticated advertising poster for a luxury watch brand's flagship model, emphasizing elegance and craftsmanship.",
      result: "Created a visually striking poster that captured the brand's premium positioning, resulting in increased foot traffic to retail locations and a 25% boost in sales for the featured model.",
      features: ["Typography design", "Color grading", "Layout composition", "Brand integration"]
    },
    {
      id: 6,
      title: "Product CGI",
      category: "CGI",
      type: "video",
      thumbnail: "/api/placeholder/600/400",
      media: "https://www.youtube.com/embed/VVQx0PY-1Wc",
      aspectRatio: 9/16, // Using 9:16 for vertical shorts video
      youtubeId: "VVQx0PY-1Wc", // YouTube video ID
      brief: "Create a photorealistic CGI animation showcasing a product's features and design elements.",
      result: "Delivered a stunning CGI video that highlighted the product's unique selling points, resulting in a 50% increase in customer engagement and a 30% boost in conversion rates.",
      features: ["Photorealistic rendering", "Dynamic camera movements", "Lighting effects", "3D modeling"]
    }
  ];

  // Filter portfolio items based on active filter
  const filteredItems = activeFilter === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeFilter);

  // Filter categories
  const categories = ['All', 'Photography', 'Video', 'Graphics', 'CGI'];

  return (
    <Box py={20} bg="gray.50" id="portfolio">
      <Container maxW="container.xl">
        {/* Section header */}
        <MotionFlex
          ref={titleRef}
          direction="column"
          align="center"
          textAlign="center"
          mb={12}
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
              Our Portfolio
            </Text>
            <Box w="24px" h="3px" bg="brand.orange" borderRadius="full" />
          </HStack>

          <MotionHeading
            as="h2"
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="bold"
            mb={4}
          >
            Our Creative Work
          </MotionHeading>

          <MotionText
            fontSize={{ base: "lg", md: "xl" }}
            color="brand.muted"
            maxW="container.md"
            mx="auto"
            mb={8}
          >
            Browse our latest projects and see how we've helped brands across industries
            achieve their creative goals with our AI-powered solutions.
          </MotionText>

          {/* Filter buttons */}
          <Flex
            spacing={{ base: 1, md: 4 }}
            mb={10}
            flexWrap="wrap"
            justify="center"
            gap={{ base: 2, md: 3 }}
            px={{ base: 2, md: 0 }}
          >
            {categories.map((category) => (
              <Button
                key={category}
                size={{ base: "sm", md: "md" }}
                variant={activeFilter === category ? "solid" : "outline"}
                bgGradient={activeFilter === category ? "linear(to-r, brand.orange, brand.yellow)" : "none"}
                borderColor={activeFilter === category ? "transparent" : "brand.orange"}
                color={activeFilter === category ? "white" : "brand.orange"}
                onClick={() => setActiveFilter(category)}
                mb={{ base: 2, md: 0 }}
                borderRadius="full"
                _hover={{
                  bgGradient: activeFilter === category ? "linear(to-r, brand.yellow, brand.orange)" : "none",
                  bg: activeFilter === category ? undefined : "brand.light",
                  transform: "translateY(-2px)",
                  boxShadow: "md"
                }}
              >
                {category}
              </Button>
            ))}
          </Flex>
        </MotionFlex>

        {/* Portfolio grid */}
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3 }}
          spacing={8}
          mb={16}
        >
          {filteredItems.map((item) => (
            <PortfolioItem key={item.id} item={item} />
          ))}
        </SimpleGrid>

        {/* CTA Button */}
        <Flex justify="center">
          <Button
            size="lg"
            bgGradient="linear(to-r, brand.orange, brand.yellow)"
            color="white"
            px={8}
            py={7}
            borderRadius="full"
            fontWeight="bold"
            _hover={{
              bgGradient: "linear(to-r, brand.yellow, brand.orange)",
              transform: "translateY(-2px)",
              boxShadow: "lg"
            }}
            onClick={() => {
              document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Work With Us
          </Button>
        </Flex>
      </Container>
    </Box>
  );
}

export default Portfolio;