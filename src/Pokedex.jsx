import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";
import {
  AppBar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Toolbar,
  Typography,
  Zoom,
  useTheme,
  alpha,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";

const POKE_API_URL = "https://pokeapi.co/api/v2/pokemon?limit=1200";
const FALLBACK_IMAGE = "/public/logo.png";
const TYPE_COLORS = {
  normal: '#A8A878', fire: '#F08030', water: '#6890F0', grass: '#78C850', electric: '#F8D030',
  psychic: '#F85888', ice: '#98D8D8', dragon: '#7038F8', dark: '#705848', fairy: '#EE99AC',
  fighting: '#C03028', flying: '#A890F0', poison: '#A040A0', ground: '#E0C068', rock: '#B8A038',
  bug: '#A8B820', ghost: '#705898', steel: '#B8B8D0'
};

function PokemonCard({ pokemon }) {
  const theme = useTheme();

  if (!pokemon) return null;

  const sprite = pokemon?.sprites?.other?.['official-artwork']?.front_default ||
    pokemon?.sprites?.front_default || FALLBACK_IMAGE;
  const types = (pokemon.types || []).map((t) => t.type?.name).filter(Boolean);
  const mainType = types[0] || 'normal';
  const accent = TYPE_COLORS[mainType] || theme.palette.primary.main;
  const cardBg = theme.palette.mode === 'dark'
    ? `radial-gradient(circle at 50% 0%, ${alpha(accent, 0.35)} 0%, ${theme.palette.background.paper} 100%)`
    : `radial-gradient(circle at 50% 0%, ${alpha(accent, 0.15)} 0%, #ffffff 100%)`;

  const spriteStyles = {
    width: 'auto',
    height: '90%',
    objectFit: 'contain',
    filter: 'drop-shadow(0 8px 12px rgba(0,0,0,0.15))',
    transition: 'transform 0.4s ease',
    imageRendering: pokemon.id < 650 ? 'pixelated' : 'auto',
  };

  return (
    <Zoom in={true} style={{ transitionDelay: '100ms' }}>
      <Box>
        <Card
          sx={{
            borderRadius: 4,
            p: 2,
            bgcolor: cardBg,
            border: `1px solid ${alpha(accent, 0.3)}`,
            boxShadow: `0 6px 18px ${alpha(accent, 0.25)}`,
            transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
            '&:hover': {
              transform: 'translateY(-6px)',
              boxShadow: `0 12px 24px ${alpha(accent, 0.28)}`,
            },
          }}
        >
          <CardContent sx={{ position: 'relative', zIndex: 1, p: '16px !important' }}>
            <Box sx={{ position: 'relative', mb: 2 }}>
              <Typography
                variant="h2"
                sx={{
                  position: 'absolute',
                  top: -10,
                  right: 10,
                  fontWeight: 900,
                  opacity: 0.05,
                  fontSize: '4rem',
                  pointerEvents: 'none',
                }}
              >
                {String(pokemon.id).padStart(3, '0')}
              </Typography>
              <Box
                sx={{
                  width: '100%',
                  height: 136,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                  position: 'relative',
                }}
              >
                <CardMedia
                  component="img"
                  image={sprite}
                  alt={pokemon.name}
                  onError={e => { e.currentTarget.src = FALLBACK_IMAGE; }}
                  sx={spriteStyles}
                />
              </Box>
            </Box>

            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  textTransform: 'capitalize',
                  fontWeight: 800,
                  color: 'text.primary',
                  mb: 0.5,
                  fontSize: '1.25rem',
                  letterSpacing: '0.5px',
                  background: `linear-gradient(90deg, ${accent} 0%, ${theme.palette.primary.main} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block',
                }}
              >
                {pokemon.name}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  color: 'text.secondary',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  mb: 1,
                }}
              >
                #{String(pokemon.id).padStart(3, '0')}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.75, mb: 2, flexWrap: 'wrap' }}>
                {types.map(type => (
                  <Chip
                    key={type}
                    label={type}
                    size="small"
                    sx={{
                      bgcolor: alpha(TYPE_COLORS[type] || theme.palette.primary.main, 0.15),
                      color: TYPE_COLORS[type] || theme.palette.primary.main,
                      border: `1px solid ${alpha(TYPE_COLORS[type] || theme.palette.primary.main, 0.3)}`,
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      fontSize: '0.65rem',
                      letterSpacing: '0.5px',
                      height: 22,
                      '& .MuiChip-label': {
                        px: 1,
                      },
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-1px)',
                        boxShadow: `0 2px 8px ${alpha(TYPE_COLORS[type] || theme.palette.primary.main, 0.3)}`,
                      },
                    }}
                  />
                ))}
              </Box>
              <Box sx={{
                background: theme.palette.mode === 'dark'
                  ? alpha(theme.palette.background.paper, 0.5)
                  : alpha(theme.palette.grey[100], 0.8),
                borderRadius: 2,
                p: 1.5,
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                backdropFilter: 'blur(8px)',
                mt: 1,
              }}>
                <Grid container spacing={1}>
                  {[
                    { label: 'HP', value: pokemon.stats?.[0]?.base_stat ?? '—', color: theme.palette.error.main },
                    { label: 'ATK', value: pokemon.stats?.[1]?.base_stat ?? '—', color: theme.palette.warning.main },
                    { label: 'DEF', value: pokemon.stats?.[2]?.base_stat ?? '—', color: theme.palette.info.main },
                    { label: 'SP.ATK', value: pokemon.stats?.[3]?.base_stat ?? '—', color: theme.palette.error.light },
                    { label: 'SP.DEF', value: pokemon.stats?.[4]?.base_stat ?? '—', color: theme.palette.info.light },
                    { label: 'SPD', value: pokemon.stats?.[5]?.base_stat ?? '—', color: theme.palette.success.main },
                  ].map((stat, index) => (
                    <Grid item xs={4} key={index}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: 'text.secondary',
                            fontWeight: 700,
                            fontSize: '0.6rem',
                            letterSpacing: '0.5px',
                            opacity: 0.8,
                          }}
                        >
                          {stat.label}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 800,
                            color: stat.color,
                            fontSize: '0.9rem',
                            lineHeight: 1.2,
                          }}
                        >
                          {stat.value}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>

                {pokemon.stats && pokemon.stats.length > 0 && (
                  <Box sx={{ mt: 1.5, position: 'relative' }}>
                    <Box sx={{
                      height: 4,
                      background: alpha(theme.palette.divider, 0.2),
                      borderRadius: 2,
                      overflow: 'hidden',
                      position: 'relative',
                    }}>
                      <Box
                        sx={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          height: '100%',
                          width: `${Math.min(100, (pokemon.stats[0]?.base_stat / 255) * 100)}%`,
                          background: `linear-gradient(90deg, ${accent} 0%, ${theme.palette.primary.main} 100%)`,
                          transition: 'width 0.5s ease-out',
                        }}
                      />
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        position: 'absolute',
                        right: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'text.secondary',
                        fontSize: '0.6rem',
                        fontWeight: 700,
                        background: alpha(theme.palette.background.paper, 0.8),
                        px: 0.5,
                        borderRadius: 1,
                        lineHeight: 1,
                      }}
                    >
                      {Math.round((pokemon.stats[0]?.base_stat / 255) * 100)}%
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Zoom>
  );
}

PokemonCard.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    sprites: PropTypes.shape({
      other: PropTypes.shape({
        'official-artwork': PropTypes.shape({
          front_default: PropTypes.string
        })
      }),
      front_default: PropTypes.string
    }),
    types: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.shape({
          name: PropTypes.string
        })
      })
    ),
    stats: PropTypes.arrayOf(
      PropTypes.shape({
        base_stat: PropTypes.number,
        stat: PropTypes.shape({
          name: PropTypes.string
        })
      })
    )
  }).isRequired
};

function Pokedex() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [fetchingDetails, setFetchingDetails] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(POKE_API_URL);
        const data = await res.json();
        setAllPokemon(data.results || []);
        setLoading(false);
      } catch {
        setError("Failed to load Pokémon list");
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const q = search.trim().toLowerCase();
    if (!q) {
      setResults([]);
      return;
    }
    const debounced = debounce(async () => {
      setFetchingDetails(true);
      const shortlist = allPokemon
        .filter((p) => p.name.includes(q))
        .slice(0, 50);
      try {
        const fullData = await Promise.all(
          shortlist.map(async (p) => {
            const resp = await fetch(p.url);
            if (!resp.ok) return null;
            return await resp.json();
          })
        );
        setResults(fullData.filter(Boolean));
      } finally {
        setFetchingDetails(false);
      }
    }, 500);
    debounced();
    return () => debounced.cancel();
  }, [search, allPokemon]);

  return (
    <Zoom in={true}>
      <Box sx={{
        minHeight: '100vh',
        pb: 6,
        background: theme.palette.mode === 'dark'
          ? 'radial-gradient(ellipse at top, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
          : 'radial-gradient(ellipse at top, #f8f9ff 0%, #e6f0ff 100%)',
        backgroundAttachment: 'fixed',
      }}>
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            py: 1,
            background: theme.palette.mode === 'dark'
              ? 'rgba(26, 26, 46, 0.8)'
              : 'rgba(255, 255, 255, 0.8)',
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
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  {search && <IconButton size="small" onClick={() => setSearch('')}>✕</IconButton>}
                </Paper>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        <Container maxWidth="xl" sx={{ mt: 4 }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <Box>
              {fetchingDetails && (
                <Box sx={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1300, p: 3, bgcolor: 'background.paper', borderRadius: 3 }}>
                  <CircularProgress sx={{ mb: 2 }} />
                  <Typography>Fetching details...</Typography>
                </Box>
              )}

              {results.length === 0 && search.trim() ? (
                <Box sx={{ textAlign: 'center', py: 10 }}>
                  <Typography variant="h5">No Pokémon found</Typography>
                </Box>
              ) : !search.trim() ? (
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
                        bgcolor: alpha(theme.palette.background.paper, 0.4),
                        backdropFilter: 'blur(10px)',
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
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
                            onClick={() => setSearch(name.toLowerCase())}
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
              ) : (
                <Grid
                  container
                  spacing={3}
                  justifyContent="center"
                >
                  {results.map((pokemon) => (
                    <Grid item key={pokemon.id} xs={12} sm={6} md={4} lg={3}>
                      <PokemonCard pokemon={pokemon} />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          )}
        </Container>
      </Box>
    </Zoom>
  );
}

export default Pokedex;
