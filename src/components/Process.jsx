// components/Process.jsx
import React from 'react';
import {
  Box,
  Stack,
  Heading,
  Text,
  Icon,
  Flex,
  Circle,
  useBreakpointValue
} from '@chakra-ui/react';

import { FaPhone, FaMagic, FaDownload } from 'react-icons/fa';

const ProcessStep = ({ title, description, icon, number }) => {
  return (
    <Box p={5} flex="1">
      <Flex direction="column" align="center" textAlign="center">
        <Circle size="70px" bg="gray.100" mb={4}>
          <Icon as={icon} boxSize={6} color="brand.orange" />
        </Circle>
        <Circle
          size="24px"
          bg="brand.orange"
          color="white"
          fontWeight="bold"
          fontSize="sm"
          position="absolute"
          top={0}
          right="0"
          transform="translate(50%, -50%)"
        >
          {number}
        </Circle>
        <Heading size="md" mt={2} mb={4}>
          {title}
        </Heading>
        <Text>
          {description}
        </Text>
      </Flex>
    </Box>
  );
};

function Process() {
  const direction = useBreakpointValue({ base: 'column', md: 'row' });

  return (
    <Box py={16} px={{ base: 4, md: 8 }} bg="gray.50">
      <Box maxW="1200px" mx="auto">
        <Heading mb={12} textAlign="center">
          How We Work
        </Heading>
        <Stack
          direction={direction}
          spacing={8}
          align="stretch"
        >
          <Box position="relative">
            <ProcessStep
              title="Consultation & Brief"
              description="We start with understanding your needs and goals through a detailed consultation."
              icon={FaPhone}
              number="1"
            />
          </Box>

          <Box position="relative">
            <ProcessStep
              title="AI Generation & Editing"
              description="Our AI generates initial content, which our experts then refine and perfect."
              icon={FaMagic}
              number="2"
            />
          </Box>

          <Box position="relative">
            <ProcessStep
              title="Delivery & Revisions"
              description="Receive your finalized content with opportunity for revisions until you're satisfied."
              icon={FaDownload}
              number="3"
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

export default Process;