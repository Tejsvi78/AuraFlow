
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AppContextProvider from './AppContext.jsx'
import { HashRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
    <HashRouter>
        <AppContextProvider>
            <App />
            <Toaster />
        </AppContextProvider>
    </HashRouter>

)
