import { Box, Chip, Paper, Typography, Zoom, useTheme, alpha } from "@mui/material";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import PropTypes from "prop-types";

function WelcomeScreen({ onSearchClick }) {
  const theme = useTheme();

  return (
    <Zoom in timeout={800}>
      <Box
        sx={{
          py: { xs: 6, md: 12 },
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
        }}
      >
        {/* Animated Icon Container */}
        <Box
          sx={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
            animation: 'bounce 3s infinite ease-in-out',
            '@keyframes bounce': {
              '0%, 100%': { transform: 'translateY(0)' },
              '50%': { transform: 'translateY(-20px)' },
            },
          }}
        >
          <CatchingPokemonIcon
            sx={{ fontSize: 70, color: theme.palette.primary.main, opacity: 0.8 }}
          />
        </Box>

        {/* Main Heading */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 900,
            letterSpacing: '-1px',
            background: 'linear-gradient(45deg, #3f51b5, #f50057)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: { xs: '2.5rem', md: '3.5rem' }
          }}
        >
          Gotta Search &apos;Em All!
        </Typography>

        {/* Subtext with Glassmorphism */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            maxWidth: 600,
            borderRadius: 4,
            bgcolor: alpha(theme.palette.background.paper, 0.6),
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            contain: 'layout style',
          }}
        >
          <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 500, mb: 2 }}>
            Your digital companion to the Pokémon world. Enter a name to reveal hidden stats, abilities, and types.
          </Typography>

          {/* Suggestion Chips */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Typography variant="body2" sx={{ width: '100%', mb: 1, fontWeight: 700, color: 'primary.main', textTransform: 'uppercase', fontSize: '0.75rem' }}>
              Try searching for:
            </Typography>
            {['Gengar', 'Lucario', 'Snorlax', 'Mewtwo'].map((name) => (
              <Chip
                key={name}
                label={name}
                onClick={() => onSearchClick(name.toLowerCase())}
                sx={{
                  fontWeight: 600,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  '&:hover': { bgcolor: 'primary.main', color: 'white' },
                  transition: '0.3s'
                }}
              />
            ))}
          </Box>
        </Paper>
      </Box>
    </Zoom>
  );
}
WelcomeScreen.propTypes = {
  onSearchClick: PropTypes.func.isRequired
}
export default WelcomeScreen;

