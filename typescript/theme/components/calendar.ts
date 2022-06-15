import { ComponentMultiStyleConfig } from "@chakra-ui/theme";

export const Calendar: ComponentMultiStyleConfig = {
  parts: ["wdays", "title"],
  baseStyle: ({ colorMode }) => ({
    wdays: {
      borderRadius: 0,
      fontWeight: "semibold",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      color: colorMode === "dark" ? "white" : "black",
      _first: {
        color: "red.500",
      },
      _last: {
        color: "blue.500",
      },
    },
    title: {
      fontWeight: "semibold",
    },
  }),
  sizes: {
    lg: {
      wdays: {
        h: 12,
        minW: 12,
        fontSize: "lg",
        px: 6,
      },
      title: {
        fontSize: "2xl",
        h: 12,
      },
    },
    md: {
      wdays: {
        h: 10,
        minW: 10,
        fontSize: "md",
        px: 4,
      },
      title: {
        fontSize: "xl",
        h: 10,
      },
    },
    sm: {
      wdays: {
        h: 8,
        minW: 8,
        fontSize: "sm",
        px: 3,
      },
      title: {
        fontSize: "lg",
        h: 8,
      },
    },
    xs: {
      wdays: {
        h: 6,
        minW: 6,
        fontSize: "xs",
        px: 2,
      },
      title: {
        fontSize: "md",
        h: 6,
      },
    },
  },
  defaultProps: {
    size: "md",
  },
};
