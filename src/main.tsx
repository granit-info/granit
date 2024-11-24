//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "antd/dist/reset.css"; // Современный Ant Design требует "reset.css" вместо "antd.css"


createRoot(document.getElementById('root')!).render(
  //<StrictMode>
    <App />
  //</StrictMode>,
)
