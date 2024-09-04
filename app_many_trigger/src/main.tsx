import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import { App1 } from './App1.tsx'
//import { App2 } from './App2.tsx'
//import { App2_2 } from './App2_2.tsx'
import { App3 } from './App3.tsx'
//import { App4 } from './App4.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App3 />
  </StrictMode>,
)
