import createApp, { createStore } from '@just-web/app'
import * as routes from '@just-web/routes'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { setStore } from './store'

void (async () => {
  const app = await createApp().addPlugin(routes)
  setStore(createStore({ app }))

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  app.routes.register('/', () => {
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

  app.routes.register('/error', () => {
    ReactDOM.render(
      <div>something went wrong</div>,
      document.getElementById('root')
    )
  })

  await app.start()
})()
