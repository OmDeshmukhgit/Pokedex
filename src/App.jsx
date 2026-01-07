// App.jsx
import { Box, IconButton, useTheme } from '@mui/material';
import { Brightness4 as Brightness4Icon, Brightness7 as Brightness7Icon } from '@mui/icons-material';
import Pokedex from './Pokedex';

function App({ onToggleDarkMode, darkMode }) {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
        transition: 'background-color 0.3s ease, color 0.3s ease',
      }}
    >
      <IconButton
        onClick={onToggleDarkMode}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
          bgcolor: 'background.paper',
          boxShadow: 3,
          '&:hover': {
            bgcolor: 'action.hover',
          },
        }}
        aria-label="toggle theme"
      >
        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      <Pokedex />
    </Box>
  );
}

export default App;
