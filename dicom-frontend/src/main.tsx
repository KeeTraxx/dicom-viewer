import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import AppRoutes from './app-routes.tsx'
import './index.css'
import Nav from './nav/Nav.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Nav />
    <main>
      <AppRoutes />
    </main>
  </BrowserRouter>,
)
