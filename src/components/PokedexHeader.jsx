import {
  AppBar,
  Box,
  Container,
  IconButton,
  InputBase,
  Paper,
  Toolbar,
  Typography,
  useTheme,
  alpha,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import PropTypes from "prop-types";
function PokedexHeader({ search, onSearchChange, onClearSearch }) {
  const theme = useTheme();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        py: 1,
        background: theme.palette.mode === 'dark'
          ? 'rgba(26, 26, 46, 0.85)'
          : 'rgba(255, 255, 255, 0.85)',
        willChange: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            gap: 2,
            justifyContent: 'space-between',
            px: { xs: 0, sm: 2 },
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'stretch', sm: 'center' },
          }}
          disableGutters
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, justifyContent: 'space-between', width: { xs: '100%', sm: 'auto' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <CatchingPokemonIcon fontSize="large" sx={{ color: 'primary.main' }} />
              <Typography variant="h4" sx={{ fontWeight: 900, background: 'linear-gradient(90deg, #3f51b5 0%, #f50057 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Pokédex
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, width: { xs: '100%', sm: 'auto' }, alignItems: 'center' }}>
            <Paper component="form" elevation={0} sx={{ display: 'flex', alignItems: 'center', px: 2, borderRadius: 3, border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`, width: { xs: '100%', sm: 400 } }}>
              <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
              <InputBase
                fullWidth
                placeholder="Search Pokémon..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
              />
              {search && <IconButton size="small" onClick={onClearSearch}>✕</IconButton>}
            </Paper>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

PokedexHeader.propTypes = {
  search: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onClearSearch: PropTypes.func.isRequired,
};

export default PokedexHeader;

