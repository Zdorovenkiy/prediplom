import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { StoreProvider } from './globalState/provider/StoreProvider.tsx'

createRoot(document.getElementById('root')!).render(
    <StoreProvider>
        <App />
    </StoreProvider>
)
