import { useEffect, useState, useCallback } from "react";
import debounce from "lodash.debounce";
import {
  Box,
  CircularProgress,
  Container,
  Typography,
  Zoom,
  useTheme,
  Alert,
} from "@mui/material";
import { POKE_API_URL } from "./constants";
import PokedexHeader from "./components/PokedexHeader";
import WelcomeScreen from "./components/WelcomeScreen";
import LoadingSpinner from "./components/LoadingSpinner";
import VirtualizedPokemonGrid from "./components/VirtualizedPokemonGrid";

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
    }, 450);
    debounced();
    return () => debounced.cancel();
  }, [search, allPokemon]);

  const handleSearchChange = useCallback((value) => {
    setSearch(value);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearch("");
  }, []);

  const handleWelcomeSearch = useCallback((name) => {
    setSearch(name);
  }, []);

  return (
    <Zoom in={true}>
      <Box sx={{
        minHeight: '100vh',
        pb: 6,
        background: theme.palette.mode === 'dark'
          ? 'radial-gradient(ellipse at top, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
          : 'radial-gradient(ellipse at top, #f8f9ff 0%, #e6f0ff 100%)',
        willChange: 'auto',
      }}>
        <PokedexHeader
          search={search}
          onSearchChange={handleSearchChange}
          onClearSearch={handleClearSearch}
        />

        <Container maxWidth="xl" sx={{ mt: 4 }}>
          {error ? (
            <Alert severity="error">{error}</Alert>
          ) : loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={{ position: 'relative' }}>
              {fetchingDetails ? (
                <LoadingSpinner />
              ) : (
                <>
                  {results.length === 0 && search.trim() ? (
                    <Box sx={{ textAlign: 'center', py: 10 }}>
                      <Typography variant="h5">No Pokémon found</Typography>
                    </Box>
                  ) : !search.trim() ? (
                    <WelcomeScreen onSearchClick={handleWelcomeSearch} />
                  ) : (
                    <VirtualizedPokemonGrid pokemonList={results} />
                  )}
                </>
              )}
            </Box>
          )}
        </Container>
      </Box>
    </Zoom>
  );
}

export default Pokedex;
