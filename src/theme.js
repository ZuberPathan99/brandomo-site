// theme.js
import { extendTheme } from "@chakra-ui/react";

// Global styles
const styles = {
  global: {
    body: {
      bg: "#FAFAFA",
      color: "#1A1A1A",
      fontFeatureSettings: "'ss01', 'ss02', 'cv01', 'cv03'",
      scrollBehavior: "smooth",
      transitionProperty: "all",
      transitionDuration: "normal",
    },
    "::selection": {
      bg: "#FF6B35",
      color: "white",
    },
  },
};

// Design tokens
const theme = extendTheme({
  styles,
  colors: {
    brand: {
      orange: "#FF6B35",
      yellow: "#FFB800",
      light: "#FFF9F1",
      dark: "#14141B",
      muted: "#8F8F8F",
    },
    bg: {
      light: "#FFFFFF",
      dark: "#14141B",
      offWhite: "#F9F9F9",
    },
  },
  fonts: {
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem",
  },
  breakpoints: {
    sm: "30em",
    md: "48em",
    lg: "62em",
    xl: "80em",
    "2xl": "96em",
  },
  sizes: {
    container: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "full",
        fontWeight: "500",
        _focus: {
          boxShadow: "none",
        },
      },
      variants: {
        solid: {
          bg: "brand.orange",
          color: "white",
          _hover: {
            bg: "brand.yellow",
            transform: "translateY(-2px)",
            boxShadow: "lg",
          },
          _active: {
            transform: "translateY(0)",
          },
        },
        outline: {
          borderColor: "brand.orange",
          color: "brand.orange",
          borderWidth: "1px",
          _hover: {
            bg: "brand.light",
          },
        },
        ghost: {
          color: "brand.dark",
          _hover: {
            bg: "brand.light",
          },
        },
        gradient: {
          bgGradient: "linear(to-r, brand.orange, brand.yellow)",
          color: "white",
          _hover: {
            bgGradient: "linear(to-r, brand.yellow, brand.orange)",
            transform: "translateY(-2px)",
            boxShadow: "lg",
          },
          _active: {
            transform: "translateY(0)",
          },
        },
      },
      sizes: {
        xl: {
          h: "16",
          fontSize: "xl",
          px: "10",
        },
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: "700",
        lineHeight: "1.2",
        letterSpacing: "-0.03em",
      },
    },
    Text: {
      baseStyle: {
        lineHeight: "1.6",
        letterSpacing: "-0.01em",
        fontWeight: "400",
      },
    },
    Input: {
      variants: {
        filled: {
          field: {
            borderRadius: "xl",
            bg: "bg.offWhite",
            _hover: {
              bg: "bg.offWhite",
            },
            _focus: {
              bg: "bg.offWhite",
              borderColor: "brand.orange",
            },
          },
        },
      },
      defaultProps: {
        variant: "filled",
      },
    },
    Textarea: {
      variants: {
        filled: {
          borderRadius: "xl",
          bg: "bg.offWhite",
          _hover: {
            bg: "bg.offWhite",
          },
          _focus: {
            bg: "bg.offWhite",
            borderColor: "brand.orange",
          },
        },
      },
      defaultProps: {
        variant: "filled",
      },
    },
  },
});

export default theme;