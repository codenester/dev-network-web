import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store'
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_KEY,
  authDomain: import.meta.env.FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.FIREBASE_PROJECT,
  storageBucket: import.meta.env.FIREBASE_STORAGE,
  messagingSenderId: import.meta.env.FIREBASE_MESSAGE_SENDER,
  appId: import.meta.env.FIREBASE_APP
}
export const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
