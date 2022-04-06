import createApp from '@just-web/app'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import reportWebVitals from './reportWebVitals'
// import * as reactCommandsModule from '@just-web/react-commands'

const app = createApp()
// app.loadModule(reactCommandsModule)
// app.loadRemoteModule(url)
// app.registerModule({})

app.routes.registerRoute('/', () => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  )

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals()
})

app.routes.registerRoute('/error', () => {
  ReactDOM.render(
    <div>something went wrong</div>,
    document.getElementById('root')
  )
})

app.start()
