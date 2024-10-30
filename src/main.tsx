import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import '../src/index.css'
import App from './App'
import store from './store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster position='top-center'/>
    <Provider store={store}>
      
    <App />
    </Provider>
  </StrictMode>,
)
