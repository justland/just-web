import createApp, { logLevels } from '@just-web/app'
import * as routes from '@just-web/routes'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createDocument } from './document/createDocument'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { createAppStore } from './store'

void (async () => {
  const app = await createApp({ log: { logLevel: logLevels.all } })
    .addPlugin(routes)
  createAppStore(app)

  app.contributions.commands.add({
    command: 'app.newDocument',
    name: 'Create a new document'
  })

  app.commands.register('app.newDocument', () => createDocument())

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
