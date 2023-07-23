import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.tsx'
import { SpinNumberProvider } from './shared/context/SpinNumberContext/public/SpinNumberProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SpinNumberProvider>
      <App />
    </SpinNumberProvider>
  </React.StrictMode>,
)
