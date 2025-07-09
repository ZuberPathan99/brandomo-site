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
                  item.title === "Product photoshoot" ? "center" :
                  item.title === "perfume bottles photoshoot" ? "center" :
                  item.title === "luxury perfume bottle photoshoot" ? "center" : "center"
                }
                transition="transform 0.5s ease"
                _hover={{ transform: "scale(1.05)" }}
                bg={
                  item.title === "perfume bottles photoshoot" ? "gray.50" :
                  item.title === "Product photoshoot" ? "gray.50" :
                  item.title === "luxury perfume bottle photoshoot" ? "gray.50" : "gray.50"
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
                          item.title === "perfume bottles photoshoot" ? "cover" :
                          item.title === "Product photoshoot" ? "cover" :
                          item.title === "luxury perfume bottle photoshoot" ? "cover" : "cover"
                        }
                        objectPosition={
                          item.title === "Luxury Perfume Campaign" ? "top" :
                          item.title === "Product photoshoot" ? "center" :
                          item.title === "perfume bottles photoshoot" ? "center" :
                          item.title === "luxury perfume bottle photoshoot" ? "center" : "center"
                        }
                        bg={
                          item.title === "perfume bottles photoshoot" ? "gray.50" :
                          item.title === "Product photoshoot" ? "gray.50" :
                          item.title === "luxury perfume bottle photoshoot" ? "gray.50" : "gray.50"
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
                bg={item.title === "Product photoshoot" || item.title === "luxury perfume bottle photoshoot" ? "white" : "white"}
              >
                <Box>
                  <Heading
                    size="sm"
                    mb={2}
                    color={item.title === "Product photoshoot" || item.title === "luxury perfume bottle photoshoot" ? "gray.700" : "gray.700"}
                  >
                    The Brief
                  </Heading>
                  <Text
                    color={item.title === "Product photoshoot" || item.title === "luxury perfume bottle photoshoot" ? "gray.600" : "gray.600"}
                  >
                    {item.brief}
                  </Text>
                </Box>

                <Box>
                  <Heading
                    size="sm"
                    mb={2}
                    color={item.title === "Product photoshoot" || item.title === "luxury perfume bottle photoshoot" ? "gray.700" : "gray.700"}
                  >
                    The Result
                  </Heading>
                  <Text
                    color={item.title === "Product photoshoot" || item.title === "luxury perfume bottle photoshoot" ? "gray.600" : "gray.600"}
                  >
                    {item.result}
                  </Text>
                </Box>

                {item.features && (
                  <Box width="100%">
                    <Heading
                      size="sm"
                      mb={2}
                      color={item.title === "Product photoshoot" || item.title === "luxury perfume bottle photoshoot" ? "gray.700" : "gray.700"}
                    >
                      Features
                    </Heading>
                    <SimpleGrid columns={2} spacing={2}>
                      {item.features.map((feature, index) => (
                        <Text
                          key={index}
                          fontSize="sm"
                          color={item.title === "Product photoshoot" || item.title === "luxury perfume bottle photoshoot" ? "gray.600" : "gray.600"}
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
      thumbnail: "/perfume-model-2.jpg",
      media: "/perfume-model-2.jpg",
      aspectRatio: 3/4, // Portrait aspect ratio for perfume image
      brief: "Create a high-end product photography series for a luxury perfume brand launching their signature scent.",
      result: "Delivered a set of 10 stunning product images that captured the elegance and exclusivity of the brand, resulting in a 40% increase in pre-launch sign-ups.",
      features: ["Studio lighting", "Luxury styling", "Multiple angles", "Lifestyle shots"]
    },
    {
      id: 2,
      title: "Product photoshoot",
      category: "Photography",
      type: "image",
      thumbnail: "/perfume-bottle.JPG",
      media: "/perfume-bottle.JPG",
      aspectRatio: 3/4, // Portrait aspect ratio for product photography
      brief: "Create stunning product photography for a luxury perfume bottle, highlighting the elegant design and premium quality of the fragrance.",
      result: "Delivered high-quality product images that showcased the perfume's sophisticated packaging and design, resulting in a 40% increase in online engagement and sales.",
      features: ["Studio lighting", "Product styling", "Detail focus", "Premium presentation"]
    },
    {
      id: 3,
      title: "perfume bottles photoshoot",
      category: "Photography",
      type: "image",
      thumbnail: "/perfume-bottles.png",
      media: "/perfume-bottles.png",
      aspectRatio: 3/4, // Portrait aspect ratio for product photography
      brief: "Create stunning product photography for multiple luxury perfume bottles, showcasing the elegant collection and premium quality of the fragrances.",
      result: "Delivered a comprehensive set of product images that highlighted the perfume collection's sophisticated packaging and design, resulting in a 50% increase in online engagement and collection sales.",
      features: ["Studio lighting", "Collection styling", "Detail focus", "Premium presentation"]
    },
    {
      id: 4,
      title: "Perfume video Ad",
      category: "Video",
      type: "video",
      thumbnail: "/api/placeholder/600/400", // Not used for direct video playback
      media: "https://www.youtube.com/embed/2B0RlmsIxZY",
      aspectRatio: 9/16, // Using 9:16 for vertical shorts video
      youtubeId: "2B0RlmsIxZY", // YouTube video ID
      brief: "Create a captivating video ad for a luxury perfume brand that showcases the product's elegance and sophisticated fragrance experience.",
      result: "Delivered a visually stunning video that highlighted the perfume's luxury appeal, resulting in a 70% increase in online sales within the first month of the campaign.",
      features: ["Cinematic product shots", "Elegant transitions", "Luxury styling", "Emotional storytelling"]
    },
    {
      id: 5,
      title: "luxury perfume bottle photoshoot",
      category: "Photography",
      type: "image",
      thumbnail: "/luxury-perfume-bottle.png",
      media: "/luxury-perfume-bottle.png",
      aspectRatio: 3/4, // Portrait aspect ratio for product photography
      brief: "Create stunning product photography for a luxury perfume bottle, highlighting the elegant design and premium quality of the fragrance.",
      result: "Delivered high-quality product images that showcased the perfume's sophisticated packaging and design, resulting in a 40% increase in online engagement and sales.",
      features: ["Studio lighting", "Product styling", "Detail focus", "Premium presentation"]
    },
    {
      id: 6,
      title: "3D Product Reveal",
      category: "CGI",
      type: "video",
      thumbnail: "/api/placeholder/600/400",
      media: "https://www.youtube.com/embed/K2A1rzWq_WA",
      aspectRatio: 9/16, // Using 9:16 for vertical shorts video
      youtubeId: "K2A1rzWq_WA", // YouTube video ID
      brief: "Create a captivating 3D product reveal animation that showcases the product's features and design in an engaging way.",
      result: "Delivered a stunning 3D reveal video that highlighted the product's unique selling points, resulting in a 55% increase in customer engagement and a 35% boost in conversion rates.",
      features: ["3D animation", "Product reveal effects", "Dynamic transitions", "Professional rendering"]
    }
  ];

  // Filter portfolio items based on active filter
  const filteredItems = activeFilter === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeFilter);

  // Filter categories
  const categories = ['All', 'Photography', 'Video', 'CGI'];

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
            achieve their creative goals.
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