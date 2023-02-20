import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { CookieProvider } from './contexts'
import { QueryClient, QueryClientProvider } from 'react-query'
import LocalStorageProvider from './contexts/local-storage-context'
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGE_SENDER,
  appId: import.meta.env.VITE_FIREBASE_APP
}
const apiQuery = new QueryClient()
export const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LocalStorageProvider>
      <CookieProvider>
        <QueryClientProvider client={apiQuery}>
          <App />
        </QueryClientProvider>
      </CookieProvider>
    </LocalStorageProvider>
  </React.StrictMode>,
)
