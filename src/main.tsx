import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import './index.css'
import App from './App'
import store from './store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <div className=''>
    <Toaster position='top-center'/>
        
    <App />
      </div>
    </Provider>
  </StrictMode>,
)
