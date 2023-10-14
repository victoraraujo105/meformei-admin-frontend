import { createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});


const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#277BC0', // Cor principal para o tema claro
    },
    secondary: {
      main: '#4ABADE',
    },
    // Outras cores e variações para o tema claro
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === "info" && {
            backgroundColor: "#60a5fa",
          }),
        }),
      },
    },
  },
  // Resto do tema claro
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark', // Habilita o modo escuro
    primary: {
      main: '#fff', // Cor principal para o tema escuro
    },
    secondary: {
      main: '#D9D9D9',
    },
    background: {
      default: '#091C2B', // Exemplo de uma cor de fundo escura
      paper: '#10314D', // Cor de fundo para superfícies de papel, como cards
    },
    // Outras cores e variações para o tema escuro
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === "info" && {
            backgroundColor: "#60a5fa",
          }),
        }),
      },
    },
  },
  // Resto do tema escuro
});

export const getDesignTokens = (mode:string) =>{
  if(mode === "dark") return darkTheme
  if(mode === "light") return lightTheme
  return lightTheme
}

export { darkTheme, lightTheme };

