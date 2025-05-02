// App.jsx
import React, { useEffect } from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { motion, useScroll, useSpring } from 'framer-motion';
import theme from './theme';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import HowWeWork from './components/HowWeWork';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Benefits from './components/Benefits';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cursor from './components/Cursor';

// Create a motion component for the progress bar
const MotionBox = motion(Box);

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Prevent FOUC (Flash Of Unstyled Content)
    document.body.style.visibility = 'visible';

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Box position="relative">
        {/* Progress bar */}
        <MotionBox
          position="fixed"
          top={0}
          left={0}
          right={0}
          height="3px"
          bgGradient="linear(to-r, brand.orange, brand.yellow)"
          style={{ scaleX, transformOrigin: '0%' }}
          zIndex="docked"
        />

        {/* Custom cursor */}
        <Cursor />

        <Header />
        <Hero />
        <Services />
        <HowWeWork />
        <Portfolio />
        <Testimonials />
        <Benefits />
        <Contact id="contact" />
        <Footer />
      </Box>
    </ChakraProvider>
  );
}

export default App;