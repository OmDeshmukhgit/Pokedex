import { StrictMode, useState, useMemo, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'
import theme, { darkTheme } from './theme'
import App from './App'
import './index.css'

// Add Inter font to the document head
const fontLink = document.createElement('link')
fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
fontLink.rel = 'stylesheet'
document.head.appendChild(fontLink)

function Root() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false
    const stored = localStorage.getItem('pokedex-dark-mode')
    if (stored !== null) return stored === 'true'
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
  })
  
  const currentTheme = useMemo(() => {
    return darkMode ? darkTheme : theme
  }, [darkMode])

  useEffect(() => {
    localStorage.setItem('pokedex-dark-mode', darkMode ? 'true' : 'false')
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev)
  }

  return (
    <StrictMode>
      <ThemeProvider theme={currentTheme}>
        <EmotionThemeProvider theme={currentTheme}>
          <CssBaseline />
          <App onToggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        </EmotionThemeProvider>
      </ThemeProvider>
    </StrictMode>
  )
}

createRoot(document.getElementById('root')).render(<Root />)
