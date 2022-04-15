import createApp from '@just-web/app'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { setStore } from './store'

const app = createApp()
setStore({ app })

// eslint-disable-next-line @typescript-eslint/no-misused-promises
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

void (async () => {
  await app.start()
})()
