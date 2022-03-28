import app from '@just-web/app'
import initStoryshots from '@storybook/addon-storyshots'
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer'
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import ReactDOM from 'react-dom'

ReactDOM.createPortal = node => node as any
// jest.mock('rc-util/lib/Portal')

app.states.enableMapSet()

if (process.env.VISUAL_TEST)
  initStoryshots({ suite: 'Image storyshots', test: imageSnapshot() })
else initStoryshots()
