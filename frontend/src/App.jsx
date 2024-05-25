import React from 'react';
import { CssBaseline, ThemeProvider } from "@mui/material";
import Header1 from './components/header/Header1';
import Header2 from './components/header/Header2';
import Header3 from './components/header/Header3';
import { ColorModeContext, useMode} from "./theme";
import Hero from './components/hero/Hero'; 
import Main from './components/main/main';
import Footer from './components/footer/footer';
import { Routes, Route } from 'react-router-dom';





function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header1 />
        <Header2 />
        <Header3 />
        <Hero />
        <Main />
        <Footer/>
        
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;



