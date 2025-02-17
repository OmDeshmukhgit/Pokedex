import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Pokedex from './Pokedex.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Pokedex />
  </StrictMode>,
)
