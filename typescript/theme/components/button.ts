import { ComponentStyleConfig } from '@chakra-ui/theme'
import type { SystemStyleFunction } from '@chakra-ui/theme-tools'
import { mode } from '@chakra-ui/theme-tools'

type AccessibleColor = {
  bg?: [string, string]
  color?: [string, string]
  hoverBg?: [string, string]
  activeBg?: [string, string]
}

/** Accessible color overrides for less accessible colors. */
const accessibleColorMap: { [key: string]: AccessibleColor } = {
  gray: {
    bg: [`linear(to-t, gray.100, gray.50)`, `whiteAlpha.200`],
    color: ['black', 'black'],
    hoverBg: [`linear(to-t, gray.200, gray.100)`, `whiteAlpha.300`],
    activeBg: [`linear(to-t, gray.300, gray.200)`, `whiteAlpha.400`],
  },
  yellow: {
    bg: [
      `linear(to-t, yellow.400, yellow.100)`,
      `linear(to-t, yellow.100, yellow.400)`,
    ],
    color: ['black', 'black'],
    hoverBg: [
      `linear(to-t, yellow.500, yellow.200)`,
      `linear(to-t, yellow.200, yellow.500)`,
    ],
    activeBg: [
      `linear(to-t, yellow.600, yellow.300)`,
      `linear(to-t, yellow.300, yellow.600)`,
    ],
  },
  cyan: {
    bg: [
      `linear(to-t, cyan.400, cyan.100)`,
      `linear(to-t, cyan.100, cyan.400)`,
    ],
    color: ['black', 'black'],
    hoverBg: [
      `linear(to-t, cyan.500, cyan.200)`,
      `linear(to-t, cyan.200, cyan.500)`,
    ],
    activeBg: [
      `linear(to-t, cyan.600, cyan.300)`,
      `linear(to-t, cyan.300, cyan.600)`,
    ],
  },
}

const variantSolid: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props

  const {
    bg = [
      `linear(to-t, ${c}.500, ${c}.200)`,
      `linear(to-t, ${c}.200, ${c}.100)`,
    ],
    color = ['white', 'white'],
    hoverBg = [
      `linear(to-t, ${c}.600, ${c}.300)`,
      `linear(to-t, ${c}.300, ${c}.200)`,
    ],
    activeBg = [
      `linear(to-t, ${c}.700, ${c}.400)`,
      `linear(to-t, ${c}.400, ${c}.300)`,
    ],
  } = accessibleColorMap[c] ?? {}

  const background = mode(bg[0], bg[1])(props)

  return {
    bgGradient: background,
    color: mode(color[0], `gray.800`)(props),
    _hover: {
      bgGradient: mode(hoverBg[0], hoverBg[1])(props),
      _disabled: {
        bgGradient: background,
      },
    },
    _active: {
      bgGradient: mode(activeBg[0], activeBg[1])(props),
    },
  }
}

const defaultProps = {
  variant: 'solid',
}

const variants = {
  solid: variantSolid,
}

export const GradientButton: ComponentStyleConfig = {
  variants,
  defaultProps,
}
