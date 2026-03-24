import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserProvider from './context/userContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import DriverProvider from './context/driverContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <UserProvider>
    <DriverProvider>
    <App />
    </DriverProvider>
  </UserProvider>
  </BrowserRouter>
)
