import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { App } from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './store/rootReducer.js'
import { AuthProvider } from './Auth.js'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
   <Provider store={store}>
      <AuthProvider>
         <Router>
            <App />
         </Router>
      </AuthProvider>
   </Provider>
)
