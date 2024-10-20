import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RouteHandler from "./router/router.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouteHandler/>
  </StrictMode>,
)
