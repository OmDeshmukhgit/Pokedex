import { memo } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography,
  useTheme,
  alpha,
} from "@mui/material";
import { TYPE_COLORS, FALLBACK_IMAGE } from "../constants";

const PokemonCard = memo(function PokemonCard({ pokemon }) {
  const theme = useTheme();

  if (!pokemon) return null;

  const sprite = pokemon?.sprites?.other?.['official-artwork']?.front_default ||
    pokemon?.sprites?.front_default || FALLBACK_IMAGE;
  const types = (pokemon.types || []).map((t) => t.type?.name).filter(Boolean);
  const mainType = types[0] || 'normal';
  const accent = TYPE_COLORS[mainType] || theme.palette.primary.main;
  const cardBg = theme.palette.mode === 'dark'
    ? `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.95)} 0%, ${alpha(theme.palette.background.paper, 0.85)} 100%)`
    : `linear-gradient(145deg, #ffffff 0%, ${alpha(theme.palette.grey[50], 0.5)} 100%)`;

  const spriteStyles = {
    width: 'auto',
    height: '90%',
    objectFit: 'contain',
    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.12))',
    imageRendering: pokemon.id < 650 ? 'pixelated' : 'auto',
    willChange: 'auto',
  };

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Card
        sx={{
          borderRadius: 4,
          p: 0,
          background: cardBg,
          border: `2px solid ${alpha(accent, 0.2)}`,
          boxShadow: `
            0 4px 6px ${alpha(accent, 0.1)},
            0 10px 20px ${alpha('#000', 0.15)},
            inset 0 1px 0 ${alpha('#fff', theme.palette.mode === 'dark' ? 0.05 : 0.2)}
          `,
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'transform',
          height: '100%',
          minHeight: '520px',
          display: 'flex',
          flexDirection: 'column',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: `linear-gradient(90deg, ${accent}, ${alpha(accent, 0.6)}, ${accent})`,
            opacity: 0.7,
            transition: 'opacity 0.3s ease',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: -50,
            right: -50,
            width: '150px',
            height: '150px',
            background: `radial-gradient(circle, ${alpha(accent, 0.15)} 0%, transparent 70%)`,
            borderRadius: '50%',
            transition: 'transform 0.3s ease',
          },
          '&:hover': {
            transform: 'translateY(-8px) scale(1.01)',
            boxShadow: `
              0 8px 12px ${alpha(accent, 0.2)},
              0 20px 40px ${alpha('#000', 0.2)},
              inset 0 1px 0 ${alpha('#fff', theme.palette.mode === 'dark' ? 0.1 : 0.3)}
            `,
            borderColor: alpha(accent, 0.4),
            '&::before': {
              opacity: 1,
            },
            '&::after': {
              transform: 'scale(1.2)',
            },
            '& img': {
              transform: 'scale(1.08)',
            },
          },
        }}
      >
        <CardContent sx={{ position: 'relative', zIndex: 1, p: '28px 28px 32px 28px !important', flex: 1, display: 'flex', flexDirection: 'column', overflow: 'visible', minHeight: 0 }}>
          <Box sx={{ position: 'relative', mb: 1 }}>
            <Box
              className="pokemon-image-container"
              sx={{
                width: '100%',
                height: 160,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                contain: 'layout style paint',
                background: `radial-gradient(ellipse at center, ${alpha(accent, 0.15)} 0%, ${alpha(accent, 0.05)} 50%, transparent 80%)`,
                borderRadius: 4,
                mb: 1,
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  background: `radial-gradient(circle at 50% 50%, ${alpha(accent, 0.1)} 0%, transparent 60%)`,
                  borderRadius: 4,
                  zIndex: 0,
                },
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontWeight: 900,
                  opacity: theme.palette.mode === 'dark' ? 0.08 : 0.06,
                  fontSize: '6rem',
                  pointerEvents: 'none',
                  background: `linear-gradient(135deg, ${accent}, ${alpha(accent, 0.4)})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1,
                  zIndex: 0,
                  letterSpacing: '-2px',
                }}
              >
                {String(pokemon.id).padStart(3, '0')}
              </Typography>
              <CardMedia
                component="img"
                image={sprite}
                alt={pokemon.name}
                loading="lazy"
                onError={e => { e.currentTarget.src = FALLBACK_IMAGE; }}
                sx={{
                  ...spriteStyles,
                  position: 'relative',
                  zIndex: 2,
                  filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.2))',
                  transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />
            </Box>
          </Box>

          <Box sx={{ textAlign: 'center', mb: 1, position: 'relative', zIndex: 2 }}>
            {/* Pokemon Name */}
            <Typography
              variant="h6"
              sx={{
                textTransform: 'capitalize',
                fontWeight: 900,
                mb: 1,
                fontSize: pokemon.name.length > 15 ? '1.2rem' : '1.5rem',
                letterSpacing: '0.3px',
                background: `linear-gradient(135deg, ${accent} 0%, ${alpha(accent, 0.8)} 50%, ${theme.palette.primary.main} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'block',
                position: 'relative',
                width: '100%',
                maxWidth: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                px: 1,
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60%',
                  height: '3px',
                  background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
                  borderRadius: 2,
                  opacity: 0.7,
                },
              }}
              title={pokemon.name}
            >
              {pokemon.name}
            </Typography>

            {/* Pokemon ID */}
            <Box sx={{ mb: 1 }}>
              <Typography
                variant="caption"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  color: accent,
                  fontWeight: 800,
                  letterSpacing: '1px',
                  px: 2,
                  py: 0.75,
                  borderRadius: 999,
                  bgcolor: alpha(accent, 0.15),
                  border: `1.5px solid ${alpha(accent, 0.35)}`,
                  fontSize: '0.75rem',
                  boxShadow: `0 2px 4px ${alpha(accent, 0.2)}`,
                }}
              >
                #{String(pokemon.id).padStart(3, '0')}
              </Typography>
            </Box>

            {/* Pokemon Types */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
              {types.map(type => (
                <Chip
                  key={type}
                  label={type}
                  size="small"
                  sx={{
                    bgcolor: alpha(TYPE_COLORS[type] || theme.palette.primary.main, 0.18),
                    color: TYPE_COLORS[type] || theme.palette.primary.main,
                    border: `1.5px solid ${alpha(TYPE_COLORS[type] || theme.palette.primary.main, 0.45)}`,
                    textTransform: 'uppercase',
                    fontWeight: 800,
                    fontSize: '0.7rem',
                    letterSpacing: '0.8px',
                    height: 26,
                    borderRadius: 999,
                    boxShadow: `0 2px 4px ${alpha(TYPE_COLORS[type] || theme.palette.primary.main, 0.25)}`,
                    '& .MuiChip-label': {
                      px: 1.75,
                      py: 0.5,
                    },
                    transition: 'transform 0.18s ease-out, box-shadow 0.18s ease-out, background-color 0.18s ease-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: `0 4px 8px ${alpha(TYPE_COLORS[type] || theme.palette.primary.main, 0.4)}`,
                      bgcolor: alpha(TYPE_COLORS[type] || theme.palette.primary.main, 0.28),
                    },
                  }}
                />
              ))}
            </Box>
            <Box sx={{
              background: theme.palette.mode === 'dark'
                ? `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)}, ${alpha(theme.palette.background.paper, 0.6)})`
                : `linear-gradient(135deg, ${alpha(theme.palette.grey[50], 0.9)}, ${alpha('#fff', 0.8)})`,
              borderRadius: 4,
              p: 2,
              border: `1.5px solid ${alpha(accent, 0.2)}`,
              boxShadow: `
                inset 0 1px 2px ${alpha('#fff', theme.palette.mode === 'dark' ? 0.05 : 0.4)},
                0 2px 6px ${alpha(accent, 0.1)}
              `,
              mt: 0,
              contain: 'layout style',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: `linear-gradient(90deg, ${accent}, ${alpha(accent, 0.6)})`,
                opacity: 0.5,
              },
            }}>
              <Grid container spacing={2}>
                {[
                  { label: 'HP', value: pokemon.stats?.[0]?.base_stat ?? '—', color: theme.palette.error.main },
                  { label: 'ATK', value: pokemon.stats?.[1]?.base_stat ?? '—', color: theme.palette.warning.main },
                  { label: 'DEF', value: pokemon.stats?.[2]?.base_stat ?? '—', color: theme.palette.info.main },
                  { label: 'SP.ATK', value: pokemon.stats?.[3]?.base_stat ?? '—', color: theme.palette.error.light },
                  { label: 'SP.DEF', value: pokemon.stats?.[4]?.base_stat ?? '—', color: theme.palette.info.light },
                  { label: 'SPD', value: pokemon.stats?.[5]?.base_stat ?? '—', color: theme.palette.success.main },
                ].map((stat, index) => (
                  <Grid size={{ xs: 4 }} key={index}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography
                        variant="caption"
                        sx={{
                          color: 'text.secondary',
                          fontWeight: 700,
                          fontSize: '0.6rem',
                          letterSpacing: '0.6px',
                          opacity: 0.85,
                          textTransform: 'uppercase',
                          mb: 0.75,
                        }}
                      >
                        {stat.label}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 800,
                          color: stat.color,
                          fontSize: '1rem',
                          lineHeight: 1.2,
                          textShadow: `0 1px 2px ${alpha(stat.color, 0.2)}`,
                        }}
                      >
                        {stat.value}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              {pokemon.stats && pokemon.stats.length > 0 && (
                <Box sx={{ mt: 3.5, position: 'relative' }}>
                  <Box sx={{
                    height: 5,
                    background: alpha(theme.palette.divider, 0.18),
                    borderRadius: 3,
                    overflow: 'hidden',
                    position: 'relative',
                    boxShadow: `inset 0 1px 2px ${alpha('#000', 0.12)}`,
                  }}>
                    <Box
                      sx={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        height: '100%',
                        width: `${Math.min(100, (pokemon.stats[0]?.base_stat / 255) * 100)}%`,
                        background: `linear-gradient(90deg, ${accent} 0%, ${alpha(accent, 0.8)} 50%, ${theme.palette.primary.main} 100%)`,
                        transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        borderRadius: 3,
                        boxShadow: `0 0 8px ${alpha(accent, 0.4)}`,
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: `linear-gradient(90deg, transparent, ${alpha('#fff', 0.3)}, transparent)`,
                          borderRadius: 3,
                        },
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
                      color: accent,
                      fontSize: '0.6rem',
                      fontWeight: 800,
                      background: alpha(theme.palette.background.paper, 0.95),
                      px: 0.75,
                      py: 0.25,
                      borderRadius: 999,
                      lineHeight: 1,
                      border: `1px solid ${alpha(accent, 0.25)}`,
                      boxShadow: `0 1px 3px ${alpha('#000', 0.18)}`,
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
  );
});

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

export default PokemonCard;

