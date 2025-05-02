// components/Cursor.jsx
import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const MotionBox = motion(Box);

const Cursor = () => {
  // Removed isHovering state
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 350 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main cursor */}
      <MotionBox
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
        }}
        position="fixed"
        top={-5}
        left={-5}
        w="10px"
        h="10px"
        bgGradient="linear(to-r, brand.orange, brand.yellow)"
        border="none"
        borderRadius="full"
        zIndex="tooltip"
        pointerEvents="none"
        mixBlendMode="difference"
        opacity={0.7}
        transition={{ duration: 0.15 }}
        display={{ base: "none", lg: "block" }}
      />

      {/* Cursor dot */}
      <MotionBox
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
        }}
        position="fixed"
        top={-2}
        left={-2}
        w="4px"
        h="4px"
        bgGradient="linear(to-r, brand.orange, brand.yellow)"
        borderRadius="full"
        zIndex="tooltip"
        pointerEvents="none"
        display={{ base: "none", lg: "block" }}
      />
    </>
  );
};

export default Cursor;