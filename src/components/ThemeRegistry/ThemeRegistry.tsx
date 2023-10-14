'use client';
import useLocalStorage from '@/hooks/useLocalStorage';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import NextAppDirEmotionCacheProvider from './EmotionCache';
import { getDesignTokens } from './theme';

export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const [value, setValue] = useLocalStorage('theme_mode', '')
  // const themeStorage: string | null | PaletteMode = localStorage.getItem('theme_mode')

  const [mode, setMode] = React.useState<string>(value ?? 'light');
  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode) => {
          setValue(prevMode === 'light' ? 'dark' : 'light')
          return prevMode === 'light' ? 'dark' : 'light'
        }
          ,
        );

      },
    }),
    [],
  );
  // const theme = React.useMemo(
  //   () =>
  //     createTheme({
  //       palette: {
  //         mode,
  //       },
  //     }),
  //   [mode],
  // );

  // // Update the theme only if the mode changes
  const theme = React.useMemo(() => getDesignTokens(mode), [mode]);
  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ColorModeContext.Provider>
    </NextAppDirEmotionCacheProvider>
  );
}
