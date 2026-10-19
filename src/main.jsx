import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import i18n, { applyLang, SUPPORTED } from './i18n'

import './styles/fonts.css'
import './styles/index.css'

// hreflang alternates point at /?lang=en — respect that before first paint.
const requested = new URLSearchParams(window.location.search).get('lang')
if (requested && SUPPORTED.includes(requested) && requested !== i18n.language) {
  i18n.changeLanguage(requested)
}
applyLang(i18n.language)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
