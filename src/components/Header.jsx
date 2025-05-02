// components/Header.jsx
import React from 'react';
import {
  Box,
  Flex,
  HStack,
  Button,
  Text,
  Link,
  IconButton,
  Stack,
  Collapse,
  useDisclosure,
  Image
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const NavLink = ({ children, href }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{ textDecoration: 'none', bg: 'gray.100' }}
    href={href}
  >
    {children}
  </Link>
);

function Header() {
  const { isOpen, onToggle } = useDisclosure();

  const scrollToContact = () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box position="sticky" top="0" zIndex="sticky" bg="white" boxShadow="sm">
      <Flex
        h={{ base: '16', md: '20' }}
        alignItems={'center'}
        justifyContent={'space-between'}
        px={{ base: 4, md: 8 }}
      >
        <Flex flex={{ base: 1 }} justify={{ base: 'start', md: 'start' }}>
          <Flex align="center">
            <Image
              src="/brandomo-logo.png"
              alt="Brandomo Logo"
              height="30px"
              mr={2}
            />
            <Text
              fontFamily={'heading'}
              fontWeight="bold"
              fontSize="xl"
            >
              Brandomo
            </Text>
          </Flex>
        </Flex>

        <Flex display={{ base: 'none', md: 'flex' }}>
          <HStack spacing={8} alignItems={'center'}>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              <NavLink href="#services">Services</NavLink>
              <NavLink href="#portfolio">Portfolio</NavLink>
              <NavLink href="#about">About</NavLink>
              <NavLink href="#contact">Contact</NavLink>
            </HStack>
            <Button
              bgGradient="linear(to-r, brand.orange, brand.yellow)"
              color="white"
              _hover={{
                bgGradient: "linear(to-l, brand.orange, brand.yellow)",
                transform: "scale(1.03)",
                boxShadow: "md"
              }}
              onClick={scrollToContact}
            >
              Get Started
            </Button>
          </HStack>
        </Flex>

        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onToggle}
          icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
          variant={'ghost'}
          aria-label={'Toggle Navigation'}
        />
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Stack
          bg={'white'}
          p={4}
          display={{ md: 'none' }}
        >
          <NavLink href="#services">Services</NavLink>
          <NavLink href="#portfolio">Portfolio</NavLink>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#contact">Contact</NavLink>
          <Button
            w="full"
            bgGradient="linear(to-r, brand.orange, brand.yellow)"
            color="white"
            _hover={{
              bgGradient: "linear(to-l, brand.orange, brand.yellow)",
              transform: "scale(1.03)",
              boxShadow: "md"
            }}
            onClick={scrollToContact}
          >
            Get Started
          </Button>
        </Stack>
      </Collapse>
    </Box>
  );
}

export default Header;