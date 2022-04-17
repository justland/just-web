import initStoryshots from '@storybook/addon-storyshots'
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer'

import ReactDOM from 'react-dom'

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
ReactDOM.createPortal = node => node as any

if (process.env.VISUAL_TEST)
  initStoryshots({ suite: 'Image storyshots', test: imageSnapshot() })
else initStoryshots()
