import { useEffect, useState } from 'react';
import './Pokedex.css';

function Pokedex() {
  const [apidata, setapidata] = useState([]);
  const [search, setSearch] = useState('');
  const [allPokemon, setAllPokemon] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState("");

  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1200');
        const data = await res.json();
        setAllPokemon(data.results);
        setloading(false);
      } catch (error) {
        console.error('Error:', error);
        seterror(error);
        setloading(false);
      }
    };

    fetchAllPokemon();
  }, []);

  const fetchdata = async (pokemonName) => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      const data = await res.json();
      console.log(data);
      return data; 
    } catch (error) {
      console.error('Error:', error);
      return null; 
    }
  };

  const handleSearch = async (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    const searchdata = allPokemon.filter(pokemon =>
      pokemon.name.toLowerCase().includes(value)
    ).slice(0, 20);

    setapidata([]); 

    const fetchedData = await Promise.all(
      searchdata.map(async (pokemon) => {
        return await fetchdata(pokemon.name);
      })
    );

    setapidata(fetchedData.filter(data => data)); 
  };

  if (loading)
    return (
      <div>
        <h1>Loading.........</h1>
      </div>
    );

  if (error)
    return (
      <div>
        <h1>Error: {error.message}</h1>
      </div>
    );

  return (
    <>
      <section className='container'>
        <header>
          <h1 className='title'>POKEDEX</h1>
          <input
            type='text'
            value={search}
            onChange={handleSearch}
            placeholder='Search Pokémon'
            className='search-bar'
          />
          <button>Search</button>
        </header>
        <ul className='card'>
          {apidata.map((pokemon, index) => (
            <li key={index} className='pokemon-card'>
              <figure>
                <img
                  src={pokemon.sprites.other.dream_world.front_default}
                  alt={pokemon.name}
                  className='pokeimg'
                />
              </figure>
              <h1>{pokemon.name}</h1>

              <p className='pokemon-type'>
                <b><span id='types'>{pokemon.types.map((curtype) => curtype.type.name).join(", ")}</span></b>
              </p>
              <div className='grid-three-cols'>
                <div className='pokemon-info'>
                  <span>{pokemon.height}</span>
                  <b>Height</b>
                </div>
                <div className='pokemon-info'>
                  <span>{pokemon.weight}</span>
                  <b>Weight</b>
                </div>
                <div className='pokemon-info'>
                  <span>{pokemon.stats[5].base_stat}</span>
                  <b>Speed</b>
                </div>
              </div>

              <div className='grid-three-cols'>
                <div className='pokemon-info'>
                  <span>{pokemon.base_experience}</span>
                  <b>Experience</b>
                </div>
                <div className='pokemon-info'>
                  <span>{pokemon.stats[1].base_stat}</span>
                  <b>Attack</b>
                </div>
                <div className='pokemon-info'>
                  <span>{pokemon.abilities.map((abinfo) => abinfo.ability.name).slice(0, 1).join(", ")}</span>
                  <b>Abilities</b>
                </div>
              </div>

            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default Pokedex;
