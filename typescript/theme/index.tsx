import {
  ChakraProvider,
  extendTheme,
  ThemeConfig,
  ThemeOverride,
  withDefaultColorScheme,
} from '@chakra-ui/react'
import React from 'react'

import { colors } from './colors'
import { GradientButton } from './components/button'
import { Calendar } from './components/calendar'
import { ThemeContext } from './context'
import { fonts } from './fonts'

export { colors, ThemeContext }

export const config: ThemeConfig = {
  useSystemColorMode: false,
  initialColorMode: 'light',
}

type ChuiProviderProps = {
  children?: React.ReactNode
}

export const ChuiProvider = ({ children }: ChuiProviderProps) => {
  const [brand, setBrand] = React.useState('blue')

  const overrides: ThemeOverride = {
    colors: { brand: colors[brand] },
    config,
    fonts,
    shadows: {
      outline: `0 0 0 3px ${colors[brand][500]}`,
    },
    components: {
      GradientButton,
      Calendar,
    },
  }
  const customTheme = extendTheme(
    overrides,
    withDefaultColorScheme({ colorScheme: 'brand' })
  )

  // useEffect(() => {
  //   setBrand(window.localStorage.getItem('brand') || 'blue')
  // }, [])
  // useEffect(() => {
  //   window.localStorage.setItem('brand', brand)
  // }, [brand])

  const themeProps = React.useMemo(
    () => ({
      brand,
      setBrand,
      colors,
    }),
    [brand]
  )
  return (
    <ChakraProvider theme={customTheme}>
      <ThemeContext.Provider value={themeProps}>
        {children}
      </ThemeContext.Provider>
    </ChakraProvider>
  )
}
