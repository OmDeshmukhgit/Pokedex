import { memo, useMemo, useState, useEffect, Suspense } from "react";
import { FixedSizeGrid } from "react-window";
import { Box, useTheme, useMediaQuery, CircularProgress } from "@mui/material";
import PropTypes from "prop-types";
import PokemonCard from "./PokemonCard";

const VirtualizedPokemonGrid = memo(function VirtualizedPokemonGrid({ pokemonList }) {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));

  const [containerWidth, setContainerWidth] = useState(1280);

  // Handle window resize - fit 4 cards per row comfortably
  useEffect(() => {
    const updateDimensions = () => {
      // Material-UI Container maxWidth="xl" is 1280px, with padding
      const maxContainerWidth = 1380;
      const padding = 48; // Container padding
      const availableWidth = window.innerWidth - padding;
      const width = Math.min(availableWidth, maxContainerWidth);
      setContainerWidth(width);
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Calculate columns - 4 cards per row (2 rows = 8 cards visible)
  const columnCount = useMemo(() => {
    if (isXs) return 1;  // 1 card on mobile
    if (isSm) return 2;  // 2 cards on small screens
    if (isMd) return 3;  // 3 cards on medium screens
    return 4;  // 4 cards per row on large screens (2 rows = 8 cards visible)
  }, [isXs, isSm, isMd]);

  // Card dimensions - consistent height and proper spacing
  const CARD_HEIGHT = 520; // Increased height to fit all card content properly
  const GRID_SPACING = 24; // Material-UI spacing={3} = 24px
  const ROW_HEIGHT = CARD_HEIGHT + GRID_SPACING;

  // Calculate column width accounting for gaps between items
  // Ensure proper spacing: total width minus gaps divided by columns
  const totalGapWidth = GRID_SPACING * (columnCount - 1);
  const columnWidth = (containerWidth - totalGapWidth) / columnCount;
  const rowCount = Math.ceil(pokemonList.length / columnCount);

  // Calculate height to show 2 rows (4 cards per row = 8 cards visible)
  const rowsToShow = 2;
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight - 280 : 1000;
  const totalHeight = rowCount * ROW_HEIGHT;
  // Show exactly 2 rows initially, allow scrolling for more
  const gridHeight = Math.min(totalHeight, Math.max(rowsToShow * ROW_HEIGHT + GRID_SPACING, viewportHeight));

  // eslint-disable-next-line react/prop-types
  const Cell = ({ columnIndex, rowIndex, style }) => {
    const index = rowIndex * columnCount + columnIndex;

    if (index >= pokemonList.length) {
      return <div style={style} />;
    }

    const pokemon = pokemonList[index];

    return (
      <div
        style={{
          ...style,
          paddingLeft: columnIndex === 0 ? 0 : GRID_SPACING / 2,
          paddingRight: columnIndex === columnCount - 1 ? 0 : GRID_SPACING / 2,
          paddingTop: rowIndex === 0 ? GRID_SPACING / 2 : GRID_SPACING / 2,
          paddingBottom: GRID_SPACING / 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          minHeight: CARD_HEIGHT,
          boxSizing: 'border-box',
          overflow: 'visible',
        }}
      >
        <Box sx={{ width: '100%', height: '100%', minHeight: CARD_HEIGHT }}>
          <PokemonCard pokemon={pokemon} />
        </Box>
      </div>
    );
  };

  if (pokemonList.length === 0) return null;

  return (
    <Suspense fallback={<CircularProgress />}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <FixedSizeGrid
          columnCount={columnCount}
          columnWidth={columnWidth}
          height={gridHeight}
          rowCount={rowCount}
          rowHeight={ROW_HEIGHT}
          width={containerWidth}
          style={{
            overflowX: 'hidden',
            overflowY: 'auto',
            margin: '0 auto',
          }}
          className="virtualized-grid"
        >
          {Cell}
        </FixedSizeGrid>
      </Box>
    </Suspense>
  );
});

VirtualizedPokemonGrid.propTypes = {
  pokemonList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default VirtualizedPokemonGrid;